"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function LiquidSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { clock, mouse } = state;
    
    // Smoothly rotate based on mouse
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.5,
      0.1
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.5,
      0.1
    );
    
    // Wobble effect
    meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#00f0ff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
}
