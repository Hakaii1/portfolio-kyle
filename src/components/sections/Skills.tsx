"use client";

import { motion } from "framer-motion";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", 
  "MongoDB", "Prisma", "Tailwind CSS", "Framer Motion", "Docker", "Git",
  "PHP", "Laravel", "MS SQL Server", "REST APIs", "GraphQL", "Redis"
];

export default function Skills() {
  return (
    <section className="py-24 bg-zinc-950 overflow-hidden border-y border-white/5">
      <div className="mb-12 text-center">
        <h2 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-mono">Expertise & Technology</h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee flex whitespace-nowrap gap-8 py-4">
          {[...skills, ...skills].map((skill, index) => (
            <div 
              key={index}
              className="px-8 py-4 bg-zinc-900 border border-white/5 rounded-2xl flex items-center gap-4 transition-all hover:border-accent/40 group cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-accent group-hover:animate-ping" />
              <span className="text-2xl md:text-4xl font-bold text-zinc-400 group-hover:text-white transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
      </div>
    </section>
  );
}
