"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import LiquidSphere from "../canvas/LiquidSphere";

export default function Hero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 100, opacity: 0, filter: "blur(10px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  const nameVariants = {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    show: {
      clipPath: "inset(0% 0 0 0)",
      transition: { duration: 1.5, ease: [0.19, 1, 0.22, 1] as any, delay: 0.8 }
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Cinematic Entrance Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="fixed inset-0 z-[100] bg-background pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-[1px] bg-accent"
        />
      </motion.div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-50 z-0" />

      {/* 3D Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
          <LiquidSphere />
        </Canvas>
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 items-center"
        >
          {/* Profile Picture / User ID */}
          <motion.div
            variants={item}
            className="relative group"
          >
            <div className="relative w-40 h-40 md:w-56 md:h-56">
              {/* Spinning Decorative Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-accent/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border border-accent/50 rounded-full border-t-transparent border-b-transparent"
              />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                <img 
                  src="/assets/1x1.png" 
                  alt="Kyle Gulapa" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-background rounded-full flex items-center justify-center border-2 border-accent shadow-lg z-10">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>

              {/* Tag */}
              <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden md:block">
                <div className="px-3 py-1 bg-accent/10 border border-accent/20 backdrop-blur-sm text-[8px] font-mono text-accent uppercase tracking-[0.3em]">
                  ID: USER_001 <br />
                  LVL: EXPERT
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col items-center">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-tight tracking-tighter">
              <div className="flex justify-center gap-4 overflow-hidden">
                <motion.span
                  initial={{ y: -150, opacity: 0, filter: "blur(20px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  className="inline-block"
                >
                  Kyle
                </motion.span>
                <motion.span
                  initial={{ x: 150, opacity: 0, filter: "blur(20px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                  className="inline-block"
                >
                  Eurie
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: 100, opacity: 0, filter: "blur(20px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1], delay: 1 }}
                  className="text-accent text-glow"
                >
                  Alvaro Gulapa
                </motion.div>
              </div>
            </h1>
          </div>

          <div className="overflow-hidden">
            <motion.p
              variants={item}
              className="text-lg md:text-2xl font-sans text-muted-foreground uppercase tracking-[0.2em]"
            >
              Full Stack Web Developer
            </motion.p>
          </div>

          <motion.div variants={item} className="mt-8 text-center flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="magnetic-area group px-8 py-3 brutalist-border bg-foreground text-background font-bold uppercase transition-all hover:bg-accent hover:text-foreground relative overflow-hidden"
            >
              <span className="relative z-10">Explore Projects</span>
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-accent z-0"
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-2">
        <div className="w-1 h-32 bg-border relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent shadow-[0_0_10px_#00f0ff]"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground rotate-90 origin-left translate-y-4">
          Scroll to Protocol
        </span>
      </div>
    </section>
  );
}
