"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import FloatingRobot from "../canvas/FloatingRobot";
import { Compass } from "lucide-react";

export default function Hero() {
  const [isBooted] = useState(true);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.0,
        ease: [0.22, 1, 0.36, 1]
      }
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">


      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30 z-0" />

      {/* 2. DYNAMIC 3D HOVERING ROBOT BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-[#06060c]/40">
        <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: true }} camera={{ position: [0, 0, 3.5], fov: 75 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
          <pointLight position={[-5, 5, -5]} intensity={0.8} color="#ff00ff" />
          <spotLight position={[0, 5, 2]} angle={0.6} penumbra={1} intensity={1.8} color="#ffffff" />
          <FloatingRobot isBooted={isBooted} />
        </Canvas>
      </div>

      {/* 3. COCKPIT HUD OVERLAYS (Fades in after preloading completes) */}
      <AnimatePresence>
        {isBooted && (
          <>
            {/* Left Console Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
              className="absolute left-6 top-32 w-44 hidden xl:flex flex-col border-l border-white/5 pl-4 py-4 z-20 font-mono text-[9px] text-white/40"
            >
              <div className="flex flex-col gap-6">
                {/* Rotating compass visual */}
                <div className="relative w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute inset-2 border border-dashed border-accent/30 rounded-full flex items-center justify-center"
                  >
                    <Compass size={12} className="text-accent/50" />
                  </motion.div>
                  <div className="w-1 h-3 bg-accent absolute top-1" />
                  <div className="w-1 h-3 bg-white/20 absolute bottom-1" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. MAIN HERO TYPOGRAPHY & INTERACTIVE CORE */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <AnimatePresence>
          {isBooted && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-4 sm:gap-6 items-center"
            >
              {/* Profile Image with dual neon rotating rings */}
              <motion.div
                variants={item}
                className="relative group mt-12 sm:mt-0"
              >
                <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52">
                  {/* Outer Pulsing Neon cyan dashes */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-3 sm:-inset-4 border-2 border-dashed border-accent/40 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.1)]"
                  />
                  {/* Inner neon magenta border */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-1.5 sm:-inset-2 border border-accent-secondary/60 rounded-full border-t-transparent border-b-transparent shadow-[0_0_20px_rgba(255,0,255,0.15)]"
                  />

                  {/* Core Image container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-background shadow-[0_0_35px_rgba(0,240,255,0.3)] bg-[#0c0c14]">
                    <img
                      src="/assets/1x1.jpeg"
                      alt="Kyle Gulapa"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Pulsing online status indicator */}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#0c0c14] rounded-full flex items-center justify-center border-2 border-accent shadow-[0_0_10px_rgba(0,240,255,0.5)] z-10">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_6px_#00f0ff]" />
                  </div>

                  {/* HUD detail tooltip tag */}
                  <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden md:block">
                    <div className="px-3.5 py-1.5 bg-background/50 border border-white/5 backdrop-blur-md text-[8px] font-mono text-white/50 hover:text-accent hover:border-accent/40 rounded-md transition-colors text-left shadow-lg">
                      <span className="text-accent font-bold">NODE::</span> Kyle_Eurie <br />
                      <span className="text-accent font-bold">DEPT::</span> CS_Graduate
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Typography Header */}
              <div className="flex flex-col items-center mt-1 sm:mt-2">
                <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-display uppercase leading-tight tracking-tighter">
                  <div className="flex justify-center gap-2 sm:gap-4 overflow-hidden">
                    <motion.span
                      initial={{ y: -100, opacity: 0, filter: "blur(15px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                      className="inline-block"
                    >
                      Kyle
                    </motion.span>
                    <motion.span
                      initial={{ x: 100, opacity: 0, filter: "blur(15px)" }}
                      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                      className="inline-block"
                    >
                      Eurie
                    </motion.span>
                  </div>
                  <div className="overflow-hidden mt-1 pb-1 sm:pb-2">
                    <motion.div
                      initial={{ y: 100, opacity: 0, filter: "blur(15px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: 0.7 }}
                      className="text-accent text-glow font-extrabold uppercase font-display"
                    >
                      Alvaro Gulapa
                    </motion.div>
                  </div>
                </h1>
              </div>

              {/* Sub-header description */}
              <div className="overflow-hidden -mt-1 sm:-mt-2">
                <motion.p
                  variants={item}
                  className="text-xs sm:text-base md:text-lg lg:text-xl font-mono text-white/50 uppercase tracking-[0.2em] sm:tracking-[0.4em]"
                >
                  Full Stack Web Developer // Designer
                </motion.p>
              </div>

              {/* Call to action button */}
              <motion.div variants={item} className="mt-6 text-center flex justify-center z-20">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="magnetic-area group px-8 py-3.5 border border-accent/40 rounded-xl bg-accent/5 backdrop-blur-md text-accent font-mono text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-accent hover:text-background hover:border-accent hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Initialize Protocol</span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-accent via-accent-secondary to-accent z-0 opacity-20"
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. SCROLL PROCESS DETECTOR */}
      <AnimatePresence>
        {isBooted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.9 }}
            className="absolute bottom-10 left-10 flex flex-col gap-2 z-20"
          >
            <div className="w-[2px] h-24 bg-white/5 relative overflow-hidden rounded-full">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-accent shadow-[0_0_10px_#00f0ff] rounded-full"
              />
            </div>
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-white/40 rotate-90 origin-left translate-y-6">
              Scroll to Sync
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
