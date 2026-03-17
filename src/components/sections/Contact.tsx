"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <footer id="contact" className="py-24 px-4 bg-zinc-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter">
            Let's build something <br />
            <span className="text-accent underline decoration-accent/20">extraordinary</span>.
          </h2>

          <a
            href="mailto:contact@kylegulapa.com"
            className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl font-light hover:text-accent transition-colors"
          >
            kyleeuriealvaro@gmail.com
            <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="flex gap-8 mb-16">
          <Link href="#" className="p-4 bg-zinc-900 border border-white/5 rounded-full hover:border-accent transition-all group">
            <Github className="w-6 h-6 text-zinc-400 group-hover:text-accent" />
          </Link>
          <Link href="#" className="p-4 bg-zinc-900 border border-white/5 rounded-full hover:border-accent transition-all group">
            <Linkedin className="w-6 h-6 text-zinc-400 group-hover:text-accent" />
          </Link>
          <Link href="#" className="p-4 bg-zinc-900 border border-white/5 rounded-full hover:border-accent transition-all group">
            <Mail className="w-6 h-6 text-zinc-400 group-hover:text-accent" />
          </Link>
        </div>

        <div className="w-full pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-mono">
          <p>© 2026 Kyle Eurie Alvaro Gulapa. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
