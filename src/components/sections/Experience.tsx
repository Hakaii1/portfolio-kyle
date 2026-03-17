"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Full-stack Web Developer Intern",
    company: "La Rose Noire",
    period: "2025 - Present",
    description: "Contributing to full-stack development, website maintenance, and user interface improvements. Engineering solutions using vanilla PHP and MS SQL.",
    tech: ["PHP", "HTML", "CSS", "MS SQL", "JavaScript"],
    image: "/assets/Images/lrn.jpg"
  },
  {
    role: "BS Computer Science",
    company: "Holy Angel University",
    period: "2022 - Present",
    description: "Pursuing a degree with a core focus on software development, algorithms, and complex system design.",
    tech: ["Algorithms", "Software Dev", "System Design"],
    image: "/assets/Images/hau.jpg"
  }
];

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => {
  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] min-h-[550px] h-[65vh] flex flex-col justify-center p-12 pb-16 brutalist-border bg-muted/5 backdrop-blur-xl relative group transition-all duration-500 hover:border-accent">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={exp.image}
          alt={exp.company}
          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Decorative Glitch Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/30 group-hover:bg-accent transition-colors duration-500" />
      <div className="scanline absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" />

      {/* Main Content Info Block */}
      <div className="relative z-10 flex flex-col gap-4 p-6 bg-background/40 border border-white/10 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <span className="px-2 py-1 border border-accent/30 text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
            REG_PERIOD: {exp.period}
          </span>
          <span className="text-[10px] font-mono text-accent/40">ID_REF: 00{experiences.indexOf(exp) + 1}</span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-accent pl-4 mt-2">
          <h3 className="text-3xl md:text-4xl font-display uppercase leading-tight tracking-tighter group-hover:text-accent transition-colors">
            {exp.role}
          </h3>
          <p className="text-accent font-mono text-xs uppercase tracking-widest opacity-60">
            {exp.company}
          </p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-accent/20 via-transparent to-transparent mt-2" />

        <p className="text-muted-foreground font-sans text-sm leading-relaxed max-w-md">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-accent/5 border border-accent/20 text-[9px] uppercase font-mono tracking-tighter hover:bg-accent hover:text-background hover:border-accent transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Cyberpunk Footer Data */}
      <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[10px] font-mono tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        {exp.company.replace(/\s+/g, '_').toUpperCase()} // STABLE
      </div>
    </div>
  );
};

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Calculate the total horizontal scroll distance
    const totalWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalWidth * 1.5}`, // Make the scroll a bit longer for feel
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Fade in animation for the elements
    gsap.from(".exp-reveal", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
      delay: 0.5,
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
      }
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative h-screen bg-transparent overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

      <div className="relative h-screen w-full flex flex-col justify-center gap-8 z-10">
        {/* Section Header - Compressed to prevent vertical clipping */}
        <div className="exp-reveal flex flex-col px-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-20 bg-accent" />
            <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase">Archive_01</span>
          </div>
          <div className="flex flex-col">
            <motion.div
              initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-glow leading-none">
                PROFESSIONAL <br /> EXPERIENCE
              </h2>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-accent font-mono text-xs uppercase tracking-[0.3em] mt-2 block">
                Evolution_Protocol // Career_Timeline
              </span>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Scroll Container - Centered to prevent clipping */}
        <div
          ref={containerRef}
          className="exp-reveal flex gap-12 items-center pb-10 px-10"
        >
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} />
          ))}

          {/* Ending Margin */}
          <div className="flex-shrink-0 w-[50vw]" />
        </div>
      </div>

      {/* Section Footer UI */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 text-[10px] font-mono opacity-20 z-10">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-accent" />
          <span>LOC: HOLY_ANGEL_REGISTRY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-accent" />
          <span suppressHydrationWarning>TS: {new Date().getFullYear()}.03.16.v3</span>
        </div>
      </div>
    </section>
  );
}
