"use client";

import React from "react";
import { motion } from "framer-motion";

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0f]">
      {/* Stable Architectural Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.15] bg-[length:60px_60px]" />
      
      {/* Static Atmospheric Glows - No dizziness, just depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-secondary/5 blur-[100px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#00ffb2]/5 blur-[110px]" />
      </div>

      {/* Very Slow Grain Overaly */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />

      {/* Decorative Technical Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}
