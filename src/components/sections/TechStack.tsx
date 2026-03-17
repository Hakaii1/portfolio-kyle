"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Cpu, Zap, Code2, Database, Layout, Smartphone, Trophy, Lock } from "lucide-react";
import { useLenis } from "lenis/react";

// Asset paths
const ASSETS_PATH = "/assets/game/sprites.png";
const IDLE_FRAMES = [
  "/assets/game/idle-1.png",
  "/assets/game/idle-2.png",
  "/assets/game/idle-3.png",
  "/assets/game/idle-4.png",
];
const WALK_FRAMES = [
  "/assets/game/walk-1.png",
  "/assets/game/walk-2.png",
  "/assets/game/walk-3.png",
  "/assets/game/walk-4.png",
  "/assets/game/walk-5.png",
  "/assets/game/walk-6.png",
  "/assets/game/walk-7.png",
  "/assets/game/walk-8.png",
];
const JUMP_FRAMES = [
  "/assets/game/jump-1.png",
  "/assets/game/jump-2.png",
  "/assets/game/jump-3.png",
  "/assets/game/jump-4.png",
];
const FALLING_FRAMES = [
  "/assets/game/falling-1.png",
  "/assets/game/falling-2.png",
  "/assets/game/falling-3.png"
];
const BACKGROUND_ASSET = "/assets/game/background.png";
const PIPE_FRAMES = [
  "/assets/game/pipe-1.png",
  "/assets/game/pipe-2.png",
  "/assets/game/pipe-3.png",
  "/assets/game/pipe-4.png",
];
const BLOCK_IDLE = [
  "/assets/game/block-1.png",
  "/assets/game/block-2.png",
  "/assets/game/block-3.png",
  "/assets/game/block-4.png",
];
const BLOCK_HIT = [
  "/assets/game/block-5.png",
  "/assets/game/block-6.png",
  "/assets/game/block-7.png",
];

// Preload images to prevent flickering
const ALL_ASSETS = [
  ...IDLE_FRAMES,
  ...WALK_FRAMES,
  ...JUMP_FRAMES,
  ...PIPE_FRAMES,
  ...BLOCK_IDLE,
  ...BLOCK_HIT,
  BACKGROUND_ASSET,
  ...FALLING_FRAMES
];

const techData = [
  { name: "HTML", icon: <Code2 />, desc: "Blueprint of the web. Semantic structure for modern applications.", color: "#e34c26", x: 600 },
  { name: "CSS", icon: <Layout />, desc: "The artistry of layout. Crafting responsive & dynamic interfaces.", color: "#264de4", x: 1000 },
  { name: "JavaScript", icon: <Zap />, desc: "The engine of interaction. Bringing pages to life with logic.", color: "#f7df1e", x: 1400 },
  { name: "React", icon: <Cpu />, desc: "Component architecture. Building scalable high-performance UIs.", color: "#61dafb", x: 1800 },
  { name: "PHP", icon: <Database />, desc: "Backend heavy-lifter. Powering robust server-side workflows.", color: "#777bb4", x: 2200 },
  { name: "Python", icon: <Code2 />, desc: "Versatile intelligence. Scripting, data, and ML automation.", color: "#3776ab", x: 2600 },
  { name: "Java", icon: <Cpu />, desc: "Enterprise backbone. Scalable multi-threaded architectures.", color: "#007396", x: 3000 },
  { name: "MS SQL", icon: <Database />, desc: "Data foundation. Organizing complex relational ecosystems.", color: "#cc2927", x: 3400 },
  { name: "Flutter", icon: <Smartphone />, desc: "Cross-platform fluidity. Cinematic mobile experiences.", color: "#02569b", x: 3800 },
  { name: "Dart", icon: <Code2 />, desc: "Optimized for speed. Powering the Flutter UI framework.", color: "#0175c2", x: 4200 },
  { name: "Next.js", icon: <Zap />, desc: "The React Framework. Optimized for production and SEO.", color: "#ffffff", x: 4600 }
];

export default function TechStack() {
  const [isEnteringTunnel, setIsEnteringTunnel] = useState(false);
  const lenis = useLenis();

  const motionX = useMotionValue(200);
  const motionY = useMotionValue(0);
  const motionCameraX = useMotionValue(0);
  const bgTransform = useTransform(motionCameraX, x => `translateX(-${x * 0.08}px) scale(1.8)`);
  const levelTransform = useTransform(motionCameraX, x => `translateX(-${x}px)`);
  const playerBottom = useTransform(motionY, y => y + 45);
  const mapMarkerLeft = useTransform(motionX, x => `${(Math.max(0, x) / 5500) * 100}%`);

  // Refs for high-performance physics (no React state lag)
  const physicsRef = useRef({
    x: 200,
    y: 0,
    vx: 0,
    vy: 0,
    cameraX: 0,
    lastTime: 0,
    isEntering: false,
    hasBounced: true,
    targetScreenX: -1,
    isJumping: false,
    isWalking: false
  });

  const keysPressed = useRef<Set<string>>(new Set());
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [frame, setFrame] = useState(0);
  const [activeTech, setActiveTech] = useState<{ tech: typeof techData[0], id: number } | null>(null);
  const [blocksHit, setBlocksHit] = useState<string[]>([]);
  const gameRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [isMarioVisible, setIsMarioVisible] = useState(true);

  // Constants
  const GRAVITY = -0.6; // Negative pulls down
  const JUMP_FORCE = 14; // Positive pushes up
  const MOVE_SPEED = 13;
  const BLOCK_Y = 240;
  const PLAYER_SIZE = 128;
  const LEVEL_WIDTH = 5500; // Increased to ensure space for all blocks and parallax

  // Preload assets
  useEffect(() => {
    ALL_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Animation frame loop for sprite
  useEffect(() => {
    const animInterval = setInterval(() => {
      setFrame(f => (f + 1) % 8);
    }, 100);
    return () => clearInterval(animInterval);
  }, []);

  // Broadcast listeners to toggle mario duplicate state
  useEffect(() => {
    const handleHide = () => setIsMarioVisible(false);
    const handleShow = () => setIsMarioVisible(true);
    window.addEventListener("mario-hide", handleHide);
    window.addEventListener("mario-show", handleShow);
    return () => {
      window.removeEventListener("mario-hide", handleHide);
      window.removeEventListener("mario-show", handleShow);
    };
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    keysPressed.current.add(key);

    // Directional facing updates immediately for visuals
    if (key === "arrowleft" || key === "a") setFacing("left");
    if (key === "arrowright" || key === "d") setFacing("right");
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current.delete(e.key.toLowerCase());
  }, []);

  const update = useCallback((time: number) => {
    const p = physicsRef.current;

    // Calculate Delta Time (Normalized to 60fps)
    if (!p.lastTime) p.lastTime = time;
    const deltaTime = (time - p.lastTime) / 16.666; // 16.666ms is 60fps
    p.lastTime = time;

    // Cap deltaTime to avoid huge jumps on tab switch or lag spikes
    const dt = Math.min(deltaTime, 3);

    const keys = keysPressed.current;

    // Horizontal Movement
    let targetVx = 0;
    if (keys.has("a") || keys.has("arrowleft") || keys.has("touch-left")) targetVx = -MOVE_SPEED;
    if (keys.has("d") || keys.has("arrowright") || keys.has("touch-right")) targetVx = MOVE_SPEED;
    p.vx = targetVx;

    // Jump Logic (Instant response)
    if ((keys.has("w") || keys.has("arrowup") || keys.has(" ") || keys.has("touch-jump")) && !p.isJumping) {
      p.vy = JUMP_FORCE;
      p.isJumping = true;
      setIsJumping(true);
    }

    // Apply Physics scaled by Delta Time
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += GRAVITY * dt;

    // Ground collision
    if (p.y <= 0 && p.vy <= 0) {
      p.y = 0;
      if (!p.hasBounced && p.vy < -15) {
        p.vy = 12; // Little bounce
        p.hasBounced = true;
      } else {
        p.vy = 0;
        if (p.isJumping) {
          p.isJumping = false;
          setIsJumping(false);
        }
      }
    }

    // Bounds
    if (p.x < 0) p.x = 0;
    if (p.x > LEVEL_WIDTH - PLAYER_SIZE) p.x = LEVEL_WIDTH - PLAYER_SIZE;

    // Movement animation state - only update if changed
    const isNowWalking = Math.abs(p.vx) > 0;
    if (isNowWalking !== p.isWalking) {
      p.isWalking = isNowWalking;
      setIsWalking(isNowWalking);
    }


    // Block collision (Headbutt)
    if (p.vy > 0) {
      const playerTop = p.y + 155;
      const playerCenterX = p.x + PLAYER_SIZE / 2;

      techData.forEach((tech) => {
        if (
          playerCenterX > tech.x - 30 &&
          playerCenterX < tech.x + 110 &&
          playerTop >= BLOCK_Y &&
          playerTop <= BLOCK_Y + 50
        ) {
          setBlocksHit(prevHits => {
            if (!prevHits.includes(tech.name)) return [...prevHits, tech.name];
            return prevHits;
          });
          setActiveTech({ tech, id: Date.now() });
          p.vy = -3; // Bounce down harder
          p.y = BLOCK_Y - 156; // Position just below the block
        }
      });
    }

    // Camera Calculation
    const screenWidth = window.innerWidth;

    let currentTargetScreenX = screenWidth / 2 - PLAYER_SIZE / 2;
    if (p.targetScreenX !== undefined && p.targetScreenX !== -1) {
      if (Math.abs(p.vx) > 0 && p.y <= 0) { // Only re-center when walking on ground
        p.targetScreenX += (currentTargetScreenX - p.targetScreenX) * 0.05 * dt;
        if (Math.abs(p.targetScreenX - currentTargetScreenX) < 5) {
          p.targetScreenX = -1; // Snap back to center behavior
        }
      }
      currentTargetScreenX = p.targetScreenX !== -1 ? p.targetScreenX : currentTargetScreenX;
    }

    const targetCameraX = Math.max(0, Math.min(p.x - currentTargetScreenX, LEVEL_WIDTH - screenWidth));
    p.cameraX += (targetCameraX - p.cameraX) * 0.1 * dt; // Smooth camera follow

    (window as any).marioTechStackScreenX = p.x - p.cameraX;

    // Sync to Motion Values once per frame
    motionX.set(p.x);
    motionY.set(p.y);
    motionCameraX.set(p.cameraX);

    requestRef.current = requestAnimationFrame(update);
  }, [motionX, motionY, motionCameraX]);

  useEffect(() => {
    if (activeTech) {
      const timer = setTimeout(() => {
        setActiveTech(null);
      }, 5000); // Bubble disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [activeTech]);

  useEffect(() => {
    if (isEnteringTunnel && lenis) {
      const timer = setTimeout(() => {
        lenis.scrollTo('#contact', { duration: 2, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) });
      }, 500); // Wait for Mario to fall deep enough
      return () => clearTimeout(timer);
    }
  }, [isEnteringTunnel, lenis]);

  useEffect(() => {
    const handleReturn = (e: any) => {
      const returnX = e.detail?.marioX ?? 200;
      setIsEnteringTunnel(false);
      setIsMarioVisible(true);
      physicsRef.current.isEntering = false;
      physicsRef.current.hasBounced = false; // Reset bounce flag

      let newX = physicsRef.current.cameraX + returnX;
      if (newX < 0) newX = 0;
      if (newX > 5500 - 128) newX = 5500 - 128; // LEVEL_WIDTH - PLAYER_SIZE

      physicsRef.current.x = newX;
      physicsRef.current.y = -1000; // Shoot from below ground to simulate jumping UP from Contacts
      physicsRef.current.vy = 35; // Fine-tune upward velocity
      physicsRef.current.vx = 0;
      physicsRef.current.targetScreenX = returnX; // Freeze camera centering to this exact screen offset
      // Do not snap cameraX, allow smooth follow to pick him up from his exact screen position

      physicsRef.current.isJumping = true;
      setIsJumping(true);
      motionX.set(physicsRef.current.x);
      motionY.set(physicsRef.current.y);
      motionCameraX.set(physicsRef.current.cameraX);
    };
    window.addEventListener("mario-return", handleReturn);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    requestRef.current = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mario-return", handleReturn);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [handleKeyDown, handleKeyUp, update]);

  // Pixel offsets from 1024x1024 sheet (legacy but kept for logic if needed)
  const isJumpingVal = isJumping;
  const isWalkingVal = isWalking;

  return (
    <section id="tech-stack" className="relative h-screen bg-transparent overflow-hidden border-y border-white/5">
      {/* City Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url(${BACKGROUND_ASSET})`,
          transform: bgTransform
        }}
      />
      <div className="absolute inset-0 bg-background/40 z-0" />

      <div className="relative h-full flex flex-col pt-24 z-10">
        <div className="container mx-auto px-4 flex flex-col items-center mb-8">
          <motion.h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-glow text-center">
            Tech<span className="text-accent">Stacks</span>
          </motion.h2>
          <div className="flex gap-4 mt-2">
            <div className="px-6 py-1 bg-accent/10 border border-accent/30 text-accent font-mono text-[9px] uppercase tracking-[0.5em]">
              HEADBUTT  BLOCKS TO REVEAL
            </div>
            <div className="px-6 py-1 bg-accent text-background font-mono text-[9px] uppercase tracking-[0.5em]">
              MODULES: {blocksHit.length}/11
            </div>
          </div>
        </div>

        {/* Tech Archive / Achievement Hub */}
        <div
          className="absolute left-6 top-32 z-50 w-64"
          onWheel={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-background/80 backdrop-blur-2xl border-2 border-white/5 rounded-2xl shadow-[20px_0_50px_rgba(0,0,0,0.5)] overscroll-contain"
          >
            <div className="flex flex-col gap-1 mb-4 border-b border-white/10 pb-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-bold">Protocol_Archive</span>
                <Trophy size={12} className="text-accent animate-pulse" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(blocksHit.length / techData.length) * 100}%` }}
                    className="h-full bg-accent shadow-[0_0_10px_#00f0ff]"
                  />
                </div>
                <span className="text-[9px] font-mono text-white/40">{blocksHit.length}/{techData.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {techData.filter(t => blocksHit.includes(t.name)).map((tech) => (
                  <motion.div
                    key={tech.name}
                    initial={{ scale: 0.8, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-accent/30 transition-all group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-inner border border-white/5"
                      style={{ color: tech.color }}
                    >
                      {React.cloneElement(tech.icon as React.ReactElement<any>, { size: 16 })}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-display uppercase tracking-wider text-white group-hover:text-accent transition-colors">{tech.name}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[7px] font-mono text-white/40 uppercase tracking-tighter">Achievement_Unlocked</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {blocksHit.length === 0 && (
                <div className="py-8 flex flex-col items-center justify-center gap-3 opacity-20">
                  <Lock size={20} className="text-white" />
                  <span className="text-[9px] font-mono text-white uppercase tracking-widest text-center leading-tight">
                    Headbutt blocks <br /> to sync data
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Game Viewport */}
        <div ref={gameRef} className="flex-1 relative overflow-hidden mt-6">
          <motion.div
            className="absolute top-0 bottom-0"
            style={{ transform: levelTransform, width: LEVEL_WIDTH }}
          >
            {/* Ground Bricks */}
            {[...Array(Math.floor(LEVEL_WIDTH / 85))].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-[-40px] w-[85px] h-[85px]"
                style={{
                  left: i * 85,
                  backgroundImage: `url(${BLOCK_IDLE[0]})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated'
                }}
              />
            ))}

            {/* Tech Blocks */}
            {techData.map((tech, i) => (
              <div
                key={tech.name}
                className="absolute"
                style={{
                  left: tech.x,
                  bottom: BLOCK_Y,
                  width: 80,
                  height: 80,
                }}
              >
                <AnimatePresence>
                  {activeTech?.tech.name === tech.name && (
                    <motion.div
                      initial={{ y: 0, opacity: 0, scale: 0.5 }}
                      animate={{ y: -60, opacity: 1, scale: 1.2 }}
                      exit={{ y: 0, opacity: 0, scale: 0.5 }}
                      key={activeTech.id}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute inset-0 flex items-center justify-center z-0"
                    >
                      <div className="p-2 rounded-full bg-accent/20 backdrop-blur-md border border-accent shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                        <div style={{ color: tech.color }}>{tech.icon}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${activeTech?.tech.name === tech.name
                      ? BLOCK_HIT[0]
                      : BLOCK_IDLE[0]
                      })`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                  animate={activeTech?.tech.name === tech.name ? {
                    y: [0, -15, 0],
                    transition: { duration: 0.2 }
                  } : {
                    y: [0, -8, 0],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                  }}
                  className={`relative z-10 transition-all duration-300 ${activeTech?.tech.name === tech.name ? "brightness-125" : ""}`}
                />
              </div>
            ))}

            {/* PIPES */}
            {[...Array(Math.floor(LEVEL_WIDTH / 800))].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-[45px] w-32 h-64"
                style={{
                  left: i * 800 + 400,
                  backgroundImage: `url(${PIPE_FRAMES[i % 4]})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'bottom',
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated'
                }}
              />
            ))}


            <motion.div
              className={`absolute z-[55] ${!isMarioVisible ? "opacity-0 transition-opacity duration-100" : "opacity-100 transition-opacity duration-200"}`}
              style={{
                left: motionX,
                bottom: playerBottom,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}
            >
              <AnimatePresence>
                {activeTech && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: -100, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={activeTech.id}
                    className="absolute left-1/2 -translate-x-1/2 w-64 p-4 rounded-2xl bg-background/90 backdrop-blur-xl border-2 border-accent shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                  >
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <div style={{ color: activeTech.tech.color }}>{activeTech.tech.icon}</div>
                        <span className="font-display text-lg uppercase tracking-wider" style={{ color: activeTech.tech.color }}>
                          {activeTech.tech.name}
                        </span>
                      </div>
                      <p className="text-[13px] leading-snug text-muted-foreground font-sans">
                        {activeTech.tech.desc}
                      </p>
                      {/* Bubble Point */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/90 border-r-2 border-b-2 border-accent rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <img
                src={isJumping ? (physicsRef.current.vy < 0 ? FALLING_FRAMES[2] : JUMP_FRAMES[physicsRef.current.vy < 10 ? 1 : 0]) : isWalking ? WALK_FRAMES[frame % 8] : IDLE_FRAMES[Math.floor(frame / 2) % 4]}
                alt="Mario"
                className="pixelated block"
                style={{
                  width: isJumping && physicsRef.current.vy < 0 ? '180px' : '120px',
                  height: 'auto',
                  objectPosition: 'bottom',
                  transform: `scaleX(${facing === "right" ? 1 : -1})`,
                  transformOrigin: 'bottom center',
                  imageRendering: 'pixelated'
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Arcade Mobile Controls */}
        <div className="absolute inset-x-0 bottom-12 flex md:hidden justify-between px-6 pointer-events-none z-[150]">
          {/* D-Pad */}
          <div className="flex gap-4 pointer-events-auto items-end">
            <button
              onPointerDown={() => {
                keysPressed.current.add("touch-left");
                setFacing("left");
              }}
              onPointerUp={() => keysPressed.current.delete("touch-left")}
              onPointerLeave={() => keysPressed.current.delete("touch-left")}
              className="w-16 h-16 bg-background/60 backdrop-blur-md rounded-2xl border-2 border-white/20 flex items-center justify-center active:bg-accent active:border-accent group transition-all"
            >
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[20px] border-r-white group-active:border-r-background" />
            </button>
            <button
              onPointerDown={() => {
                keysPressed.current.add("touch-right");
                setFacing("right");
              }}
              onPointerUp={() => keysPressed.current.delete("touch-right")}
              onPointerLeave={() => keysPressed.current.delete("touch-right")}
              className="w-16 h-16 bg-background/60 backdrop-blur-md rounded-2xl border-2 border-white/20 flex items-center justify-center active:bg-accent active:border-accent group transition-all"
            >
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[20px] border-l-white group-active:border-l-background" />
            </button>
          </div>

          {/* Jump Button */}
          <div className="pointer-events-auto flex items-end">
            <button
              onPointerDown={() => keysPressed.current.add("touch-jump")}
              onPointerUp={() => keysPressed.current.delete("touch-jump")}
              onPointerLeave={() => keysPressed.current.delete("touch-jump")}
              className="w-20 h-20 bg-accent/30 backdrop-blur-md rounded-full border-4 border-accent flex flex-col items-center justify-center active:bg-accent active:scale-95 group transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)]"
            >
              <span className="text-[10px] font-mono text-accent uppercase font-bold group-active:text-background">Jump</span>
              <div className="w-6 h-6 border-2 border-white/60 rounded-full mt-1 group-active:border-background" />
            </button>
          </div>
        </div>

        {/* Mini-Map only */}
        <div className="absolute bottom-10 right-10 z-[100]">
          <div className="w-64 h-20 border border-white/10 bg-background/40 backdrop-blur-md relative overflow-hidden p-3 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7px] opacity-30 font-mono tracking-widest">MINI_MAP_SCNR</span>
              <span className="text-[7px] text-accent font-mono uppercase">Sync: {blocksHit.length}/11</span>
            </div>
            <div className="absolute bottom-6 left-4 right-4 h-[1px] bg-white/5">
              <motion.div
                style={{ left: mapMarkerLeft }}
                className="absolute top-[-2px] w-1.5 h-4 border-x border-accent"
              />
              {techData.map(t => (
                <div
                  key={t.name}
                  className="absolute group"
                  style={{ left: `${(t.x / LEVEL_WIDTH) * 100}%`, top: "-8px" }}
                >
                  <AnimatePresence mode="wait">
                    {blocksHit.includes(t.name) ? (
                      <motion.div
                        key="icon"
                        initial={{ opacity: 0, scale: 0, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        style={{ color: t.color }}
                        className="scale-[0.6] origin-bottom drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]"
                      >
                        {t.icon}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="bar"
                        className="w-[2px] h-3 bg-white/10 translate-y-2"
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
