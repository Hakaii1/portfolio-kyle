"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  
  // Parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Dynamic Mesh Gradients */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-accent/10 blur-[140px] mix-blend-screen"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-secondary/10 blur-[120px] mix-blend-screen"
      />
      
      {/* Extra Atmospheric Glows */}
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[20%] left-[40%] w-[500px] h-[500px] bg-accent-secondary/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Floating Particles/Shapes */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            y: useTransform(scrollYProgress, [0, 1], ["0%", `${(Math.random() - 0.5) * 200}%`]),
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
        />
      ))}

      {/* Distant Grid Layer */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-[0.05] bg-grid scale-150"
      />
    </div>
  );
}
