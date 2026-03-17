"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

const navLinks = [
  { name: "EXPERIENCE.LOG", href: "#experience" },
  { name: "PROJECTS.EXE", href: "#projects" },
  { name: "TECHSTACK.RPG", href: "#tech-stack" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cinematic easing
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-accent/20 py-3 shadow-[0_5px_30px_rgba(0,240,255,0.1)]" : "bg-transparent py-8"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-10 h-10 border-2 border-accent flex items-center justify-center text-accent font-display text-xl group-hover:bg-accent group-hover:text-background transition-all duration-300">
            <span className="relative z-10">K</span>
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-display uppercase tracking-tighter leading-none">KYLE.GULAPA</span>
            <span className="text-[8px] font-mono text-accent opacity-40 tracking-[0.3em]">DEV_PORTFOLIO</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="group relative py-1 overflow-hidden"
            >
              <span className={cn(
                "text-[11px] font-display uppercase tracking-widest transition-colors duration-300",
                activeSection === link.href ? "text-accent" : "text-white/60 group-hover:text-accent"
              )}>
                {link.name}
              </span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[1px] bg-accent"
                initial={false}
                animate={{ translateX: activeSection === link.href ? "0%" : "-101%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="px-6 py-2 bg-accent text-background font-display text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            RESUME.BIN
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-2xl flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-4xl font-display uppercase tracking-widest text-white/50 hover:text-accent transition-all hover:scale-110 active:scale-95 text-center"
                >
                  <span className={cn(
                    "underline decoration-accent/20",
                    activeSection === link.href ? "text-accent" : "text-white/50"
                  )}>{link.name}</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="mt-4 px-10 py-4 bg-accent text-background font-display text-lg uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                RESUME.BIN
              </a>
              <div className="mt-12 p-3 border border-white/5 bg-white/5 font-mono text-[8px] uppercase tracking-widest opacity-30">
                SYSTEM_NAV_LINK: ACTIVE // PORT_8080
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
