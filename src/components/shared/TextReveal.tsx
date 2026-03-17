"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TextReveal = ({ text, className }: { text: string; className?: string }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const letters = text.split("");

  return (
    <div ref={targetRef} className={className}>
      {letters.map((char, i) => {
        const start = i / letters.length;
        const end = start + 1 / letters.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        
        return (
          <motion.span key={i} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};
