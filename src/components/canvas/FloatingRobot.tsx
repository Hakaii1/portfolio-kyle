"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

interface FloatingRobotProps {
  isBooted?: boolean;
}

export default function FloatingRobot({ isBooted = false }: FloatingRobotProps) {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.Group>(null);
  const reactorLightRef = useRef<THREE.PointLight>(null);

  // Time tracker for mounting assembly animation
  const mountTimeRef = useRef(0);
  const isAssembledRef = useRef(false);

  // Time tracker for waving hand and speaking bobbing
  const waveProgressRef = useRef(0);

  // Interactive Dialogue States
  const [activeDialogue, setActiveDialogue] = useState<string | null>(null);
  const dialogueTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Draggable State Refs
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const hasBeenDraggedRef = useRef(false);

  // Dialogue Content
  const idleDialogues = useMemo(() => [
    "Hi there! Welcome to Kyle's space.",
    "Scanning sector grid... All systems optimal.",
    "Uptime protocol is running smoothly.",
    "Core power level at 100%. Ready.",
    "Need me to locate any tech blocks below?",
    "Hakai is fully operational.",
    "Holographic diagnostic running... Stable.",
    "Move your mouse to drag me around!"
  ], []);

  const dragDialogues = useMemo(() => [
    "AHHH WHERE ARE YOU TAKING ME!!",
    "Hey! Watch the chassis! Where are you dragging me?",
    "Whoa! Where are we going?",
    "Gravity override engaged! Placing me somewhere new?",
    "Hold on! Where are you putting me?"
  ], []);

  // Dialogue triggering function
  const triggerDialogue = (text: string) => {
    setActiveDialogue(text);
    if (dialogueTimerRef.current) {
      clearTimeout(dialogueTimerRef.current);
    }
    // Auto dismiss after 4 seconds
    dialogueTimerRef.current = setTimeout(() => {
      setActiveDialogue(null);
    }, 4000);
  };

  // Materials configuration with high contrast colors to stand out on dark background
  const materials = useMemo(() => {
    return {
      metalBody: new THREE.MeshStandardMaterial({
        color: "#e4e4e7", // Bright platinum white ceramic/metal
        metalness: 0.95,
        roughness: 0.12,
      }),
      joints: new THREE.MeshStandardMaterial({
        color: "#27272a", // Contrast dark carbon fiber joints
        metalness: 0.8,
        roughness: 0.45,
      }),
      glowBlue: new THREE.MeshStandardMaterial({
        color: "#00f0ff", // Neon Cyan
        emissive: "#00f0ff",
        emissiveIntensity: 0.0, // Swapped to 3.5 in animation loop on boot completion
        roughness: 0.1,
      }),
      glowOrange: new THREE.MeshStandardMaterial({
        color: "#ff5500", // Thruster Flame orange
        emissive: "#ffaa00",
        emissiveIntensity: 0.0,
        roughness: 0.2,
      }),
      glassVisor: new THREE.MeshStandardMaterial({
        color: "#09090b", // Deep black shiny glass
        roughness: 0.05,
        metalness: 0.95,
      }),
    };
  }, []);

  // Global triggers for idle dialogues (click listener is now locally on R3F meshes)
  useEffect(() => {
    if (!isBooted) return;

    // Trigger initial greeting after boot completes (5.5s assembly + 600ms buffer)
    const greetingTimer = setTimeout(() => {
      triggerDialogue("Greetings human! Hakai is online. Try dragging me!");
    }, 6100);

    // Idle dialogue loop (adjusted to 25 seconds)
    const idleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * idleDialogues.length);
      triggerDialogue(idleDialogues[randomIndex]);
    }, 25000);

    return () => {
      clearTimeout(greetingTimer);
      clearInterval(idleInterval);
      if (dialogueTimerRef.current) {
        clearTimeout(dialogueTimerRef.current);
      }
    };
  }, [isBooted, idleDialogues]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Start tracking assembly time only once isBooted triggers true
    if (!isBooted) {
      mountTimeRef.current = 0;
    } else if (mountTimeRef.current === 0) {
      mountTimeRef.current = time;
    }

    const elapsed = mountTimeRef.current > 0 ? time - mountTimeRef.current : 0;

    // 2. Viewport Responsive Fixed Positioning (Edge-aligned)
    const { width, height } = state.viewport;
    const isMobile = width < 5.0; // standard R3F width unit check
    const targetX = isMobile ? 0 : (width / 2) - 1.25;
    const targetY = isMobile ? 0.75 : -0.15;
    const targetScale = isMobile ? 1.35 : 1.7;

    // 3. Iron Man Style Staggered Assembly Logic (5.5s duration)
    const assemblyDuration = 5.5;
    const assemblyFactor = Math.min(elapsed / assemblyDuration, 1.0);
    const isAssembled = elapsed > assemblyDuration;
    isAssembledRef.current = isAssembled;

    // Sub-timelines (staggered phases, each lasting 2.2 seconds)
    const f_body = Math.min(Math.max(elapsed / 2.2, 0.0), 1.0);
    const f_thruster = Math.min(Math.max((elapsed - 1.0) / 2.2, 0.0), 1.0);
    const f_arms = Math.min(Math.max((elapsed - 2.0) / 2.2, 0.0), 1.0);
    const f_head = Math.min(Math.max((elapsed - 3.0) / 2.2, 0.0), 1.0);
    
    // Elastic spring ease out function
    const elasticEaseOut = (x: number): number => {
      const c4 = (2 * Math.PI) / 2.2;
      return x === 0
        ? 0
        : x === 1
        ? 1
        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    };
    
    const s_body = elasticEaseOut(f_body);
    const s_thruster = elasticEaseOut(f_thruster);
    const s_arms = elasticEaseOut(f_arms);
    const s_head = elasticEaseOut(f_head);

    // 4. Dialogue Wave & Speech Bobbing Interpolation (Snaps to 1.0 during active speech/dialogues, excluding dragging/drag dialogues)
    const isDragDialogue = activeDialogue ? dragDialogues.includes(activeDialogue) : false;
    const targetWave = (isAssembled && activeDialogue && !isDragDialogue && !isDraggingRef.current) ? 1.0 : 0.0;
    waveProgressRef.current = THREE.MathUtils.lerp(waveProgressRef.current, targetWave, 0.1);
    const wp = waveProgressRef.current;

    // Dragging updates
    if (isAssembled) {
      if (isDraggingRef.current) {
        const mouseX = state.pointer.x * (width / 2);
        const mouseY = state.pointer.y * (height / 2);
        const newX = mouseX + dragOffsetRef.current.x;
        const newY = mouseY + dragOffsetRef.current.y;
        
        // Clamp to viewport boundaries to prevent dragging completely off-screen
        const padX = 0.6;
        const padY = 0.6;
        const clampedX = THREE.MathUtils.clamp(newX, -width / 2 + padX, width / 2 - padX);
        const clampedY = THREE.MathUtils.clamp(newY, -height / 2 + padY, height / 2 - padY);

        targetPositionRef.current.x = clampedX;
        targetPositionRef.current.y = clampedY;
        hasBeenDraggedRef.current = true;
      } else if (!hasBeenDraggedRef.current) {
        targetPositionRef.current.x = isMobile ? 0 : (width / 2) - 1.25;
        targetPositionRef.current.y = isMobile ? 0.75 : -0.15;
      }
    } else {
      // During assembly, just use responsive default coordinates
      targetPositionRef.current.x = isMobile ? 0 : (width / 2) - 1.25;
      targetPositionRef.current.y = isMobile ? 0.75 : -0.15;
    }

    // 5. Gaze-Tracking Math (Always face the camera/user from its current position)
    const targetYaw = Math.atan2(-targetPositionRef.current.x, 3.5);
    const targetPitch = -Math.atan2(targetPositionRef.current.y, 3.5);

    // 6. Smooth Floating Physics & Snappy Cursor Gaze
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPositionRef.current.x, 0.05);
      
      const hoverY = targetPositionRef.current.y + (isDraggingRef.current ? 0 : Math.sin(time * 2.0) * 0.16);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, hoverY, 0.05);
      
      const currentScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05);
      groupRef.current.scale.setScalar(currentScale);

      // Body chassis leans slightly towards cursor (Snappy lerp 0.15)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw * 0.45 * s_body, 0.15);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch * 0.35 * s_body, 0.15);
    }

    // 7. Detached Suit Assembly Interpolation & Head Gaze
    if (headRef.current) {
      headRef.current.position.y = 0.55 + (1.0 - s_head) * 5.0;
      
      if (isAssembled) {
        // Head bobs slightly while speaking to simulate active speech articulation
        const isSpeaking = activeDialogue ? 1.0 : 0.0;
        const speechBobX = Math.sin(time * 15.0) * 0.03 * isSpeaking;
        const speechBobY = Math.cos(time * 12.0) * 0.02 * isSpeaking;

        // Head turns Snappier and further than the body (Snappy lerp 0.3)
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetYaw * 0.8 + speechBobY, 0.3);
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetPitch * 0.8 + speechBobX, 0.3);
      } else {
        headRef.current.rotation.set(0, 0, 0);
      }
    }

    // Body: scales up from nothing
    if (bodyRef.current) {
      bodyRef.current.scale.setScalar(s_body);
    }

    // Left Arm: flies in from bottom left (x = -5, y = +3) and waves on active dialogue
    if (leftArmRef.current) {
      leftArmRef.current.position.x = -0.42 - (1.0 - s_arms) * 5.0;
      leftArmRef.current.position.y = 0.15 + (1.0 - s_arms) * 3.0;

      // Normal drift sway
      const swayZ = Math.sin(time * 3.0) * 0.08 - 0.2;
      const normalX = Math.cos(time * 2.0) * 0.05 * s_arms;

      // Waving position (raised arm shaking rapidly on Z/X) - Mirrored angles for Left Arm
      const waveZ = -2.1 - Math.sin(time * 16.0) * 0.28;
      const waveX = 0.3 + Math.cos(time * 12.0) * 0.1;

      // Interpolate based on assembly progress s and dialogue wave progress wp
      const finalZ = THREE.MathUtils.lerp(swayZ, waveZ, wp);
      const finalX = THREE.MathUtils.lerp(normalX, waveX, wp);

      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(-0.2, finalZ, s_arms);
      leftArmRef.current.rotation.x = finalX;
    }

    // Right Arm: flies in from bottom right (x = +5, y = +3)
    if (rightArmRef.current) {
      rightArmRef.current.position.x = 0.42 + (1.0 - s_arms) * 5.0;
      rightArmRef.current.position.y = 0.15 + (1.0 - s_arms) * 3.0;

      // Drift sway
      const swayZ = -Math.sin(time * 3.0) * 0.08 + 0.2;
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(0.2, swayZ, s_arms);
      rightArmRef.current.rotation.x = Math.cos(time * 2.0) * 0.05 * s_arms;
    }

    // Thruster base: rises from bottom (-5.0 units)
    if (thrusterRef.current) {
      thrusterRef.current.position.y = -0.35 - (1.0 - s_thruster) * 5.0;
    }

    // Thruster flame: scales and flickers
    if (flameRef.current) {
      const flicker = s_thruster * (1.0 + Math.sin(time * 35.0) * 0.25);
      flameRef.current.scale.y = flicker * 1.25;
      flameRef.current.scale.x = s_thruster * (1.0 + Math.cos(time * 35.0) * 0.15);
      flameRef.current.scale.z = s_thruster * (1.0 + Math.cos(time * 35.0) * 0.15);
    }

    // 8. System Boot Power-Up Flash (visor and thruster glows flickers online)
    if (materials.glowBlue) {
      const isPowerOn = elapsed > 5.0;
      if (isPowerOn) {
        if (activeDialogue) {
          // Sync with dialogue: rapid erratic pulse to mimic "speaking" waves
          materials.glowBlue.emissiveIntensity = 4.0 + Math.sin(time * 40.0) * 1.5 + Math.cos(time * 15.0) * 0.8;
        } else {
          // Standard idle breathing visor
          materials.glowBlue.emissiveIntensity = 3.5 + Math.sin(time * 4.0) * 0.3;
        }
      } else {
        materials.glowBlue.emissiveIntensity = 0.0;
      }
    }
    if (materials.glowOrange) {
      materials.glowOrange.emissiveIntensity = s_thruster * 4.5;
    }

    if (reactorLightRef.current) {
      if (activeDialogue) {
        reactorLightRef.current.intensity = 2.2 + Math.sin(time * 40.0) * 0.6 + Math.cos(time * 15.0) * 0.4;
      } else {
        reactorLightRef.current.intensity = 2.2 + Math.sin(time * 4.0) * 0.15;
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      scale={1.7} 
      position={[0, -0.15, 0]}
      onPointerDown={(e: any) => {
        e.stopPropagation();
        if (!isBooted || !isAssembledRef.current) return;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        isDraggingRef.current = true;

        const currentX = groupRef.current ? groupRef.current.position.x : targetPositionRef.current.x;
        const currentY = groupRef.current ? groupRef.current.position.y : targetPositionRef.current.y;

        const mouseX = e.pointer.x * (viewport.width / 2);
        const mouseY = e.pointer.y * (viewport.height / 2);

        dragOffsetRef.current.x = currentX - mouseX;
        dragOffsetRef.current.y = currentY - mouseY;

        // Trigger drag dialogue
        const randomIndex = Math.floor(Math.random() * dragDialogues.length);
        triggerDialogue(dragDialogues[randomIndex]);
      }}
      onPointerUp={(e: any) => {
        e.stopPropagation();
        if (!isBooted || !isAssembledRef.current) return;
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        isDraggingRef.current = false;
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (isBooted && isAssembledRef.current) {
          document.body.style.cursor = "pointer";
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* 0. HOLOGRAPHIC SPEECH CLOUD DIALOGUE OVERLAY */}
      <Html position={[0, 1.15, 0]} center>
        <AnimatePresence>
          {activeDialogue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 8 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="px-5 py-3 bg-zinc-950/95 border-2 border-accent text-accent font-mono text-[12px] font-bold uppercase tracking-wider text-center shadow-[0_0_25px_rgba(0,240,255,0.35)] select-none whitespace-nowrap relative rounded-2xl"
            >
              {activeDialogue}
              {/* Pointing caret */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-zinc-950/95 border-r-2 border-b-2 border-accent rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </Html>

      {/* A. HEAD SECTOR */}
      <group ref={headRef} position={[0, 0.55, 0]}>
        {/* Head Base */}
        <mesh material={materials.metalBody} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.38, 0.45]} />
        </mesh>

        {/* Glossy Black Visor Pane */}
        <mesh position={[0, 0, 0.226]} material={materials.glassVisor}>
          <boxGeometry args={[0.48, 0.22, 0.01]} />
        </mesh>

        {/* Glowing Eyes */}
        <mesh position={[-0.12, 0, 0.231]} material={materials.glowBlue}>
          <sphereGeometry args={[0.045, 16, 16]} />
        </mesh>
        <mesh position={[0.12, 0, 0.231]} material={materials.glowBlue}>
          <sphereGeometry args={[0.045, 16, 16]} />
        </mesh>

        {/* Visor Scanner Horizontal Bar */}
        <mesh position={[0, 0, 0.228]} material={materials.glowBlue}>
          <boxGeometry args={[0.36, 0.02, 0.01]} />
        </mesh>

        {/* Ear caps */}
        <mesh position={[-0.285, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.joints}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
        </mesh>
        <mesh position={[0.285, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.joints}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.24, 0]} material={materials.joints}>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
        </mesh>
        <mesh position={[0, 0.31, 0]} material={materials.glowBlue}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>
      </group>

      {/* B. MAIN TORSO GROUP */}
      <group ref={bodyRef} position={[0, 0, 0]}>
        {/* Neck cylinders */}
        <mesh position={[0, 0.31, 0]} material={materials.joints}>
          <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
        </mesh>

        {/* Torso Capsule Cylinder */}
        <mesh material={materials.metalBody} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.55, 32]} />
        </mesh>

        {/* Chest Plate Cover */}
        <mesh position={[0, 0.05, 0.14]} rotation={[0.08, 0, 0]} material={materials.metalBody} castShadow>
          <boxGeometry args={[0.34, 0.25, 0.08]} />
        </mesh>

        {/* Reactor Core Dial */}
        <mesh position={[0, 0.05, 0.185]} rotation={[Math.PI / 2, 0, 0]} material={materials.glowBlue}>
          <cylinderGeometry args={[0.08, 0.08, 0.01, 32]} />
        </mesh>

        {/* Reactor Emissive Core Highlight PointLight */}
        <pointLight ref={reactorLightRef} position={[0, 0.05, 0.35]} distance={2.5} intensity={2.2} color="#00f0ff" />
      </group>

      {/* C. DETACHED ARMS */}
      {/* Left Arm Group */}
      <group ref={leftArmRef} position={[-0.42, 0.15, 0]}>
        <mesh material={materials.joints}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.16, 0]} material={materials.metalBody} castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.22, 12]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} material={materials.joints}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={materials.glowBlue}>
          <sphereGeometry args={[0.025, 12, 12]} />
        </mesh>
      </group>

      {/* Right Arm Group */}
      <group ref={rightArmRef} position={[0.42, 0.15, 0]}>
        <mesh material={materials.joints}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.16, 0]} material={materials.metalBody} castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.22, 12]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} material={materials.joints}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={materials.glowBlue}>
          <sphereGeometry args={[0.025, 12, 12]} />
        </mesh>
      </group>

      {/* D. THRUSTER BASE */}
      <group ref={thrusterRef} position={[0, -0.35, 0]}>
        <mesh material={materials.joints}>
          <cylinderGeometry args={[0.16, 0.16, 0.08, 16]} />
        </mesh>
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI, 0, 0]} material={materials.metalBody} castShadow>
          <coneGeometry args={[0.14, 0.24, 16]} />
        </mesh>

        {/* Exhaust Flame */}
        <mesh ref={flameRef} position={[0, -0.34, 0]} rotation={[Math.PI, 0, 0]} material={materials.glowOrange}>
          <coneGeometry args={[0.095, 0.35, 16]} />
        </mesh>
        
        {/* Exhaust Flame Light */}
        <pointLight position={[0, -0.4, 0]} distance={1.8} intensity={1.8} color="#ffaa00" />
      </group>
    </group>
  );
}
