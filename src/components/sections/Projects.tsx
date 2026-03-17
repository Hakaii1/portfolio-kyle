"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Lock } from "lucide-react";

const projects = [
  {
    title: "MP3 Streamer",
    category: "intern",
    locked: true,
    type: "Media Streaming // La Rose Noire",
    description: "Synchronized client-host architecture with dynamic playlist management, real-time state synchronization, and alarm scheduling.",
    video: "/assets/mp4/mp3.mp4",
    color: "#00f0ff"
  },
  {
    title: "Secure Pass",
    category: "intern",
    locked: true,
    type: "Security & Access // La Rose Noire",
    description: "Corporate Gate Pass & Asset Management solution with multi-tier approval routing and real-time request synchronization.",
    video: "/assets/mp4/secure-pass.mp4",
    color: "#ffea00"
  },
  {
    title: "Uniform Inspection",
    category: "intern",
    locked: true,
    type: "Management System // La Rose Noire",
    description: "Web-based monitoring for workforce compliance. Features supervisor dashboards and automated reporting workflows.",
    video: "/assets/mp4/unif-inspec.mp4",
    color: "#ff00ff"
  },
  {
    title: "Genesis",
    category: "intern",
    locked: true,
    type: "Manufacturing & ERP // La Rose Noire",
    description: "Enterprise Food Manufacturing solution. Engineered functional navigations and optimized core system synchronization architecture.",
    video: "/assets/mp4/genesis.mp4",
    color: "#00ffb2"
  },
  {
    title: "Survey System",
    category: "intern",
    locked: true,
    type: "Feedback Management // La Rose Noire",
    description: "Enterprise platform for employee feedback analytics, featuring custom form builders and real-time visualization dashboards.",
    video: "/assets/mp4/survey.mp4",
    color: "#8a2be2"
  },
  {
    title: "Driver Request",
    category: "intern",
    locked: true,
    type: "Fleet Management // La Rose Noire",
    description: "Streamlined vehicle request processes with real-time scheduling and automated approval workflows.",
    video: "/assets/mp4/Dr-vid.mp4",
    color: "#00c3ff"
  },
  {
    title: "Benefits Form",
    category: "intern",
    locked: true,
    type: "Human Resources // La Rose Noire",
    description: "Centralized digital portal for HR services and benefit forms with an intuitive link-based interface.",
    video: "/assets/mp4/benefits-form.mp4",
    color: "#ff3366"
  },
  {
    title: "FB Phishing Detector",
    category: "personal",
    github: "https://github.com/Gamakichii/Thesis",
    external: "https://chromewebstore.google.com/detail/facebook-phishing-detecto/gijaklfaegcklbdgikikgocmedcohmdl",
    type: "Security Tool // Personal",
    description: "Browser extension using pattern recognition to detect and neutralize phishing threats on social media in real-time.",
    image: "/assets/Projects/Extension.png",
    color: "#1877f2"
  },
  {
    title: "Battle Chess",
    category: "personal",
    github: "https://github.com/Hakaii1/chess",
    external: "https://hakaii1.github.io/chess/",
    type: "Web Game // Personal",
    description: "Tactical strategy reimagining chess with combat mechanics, unique piece stats, and a custom rendering engine.",
    video: "/assets/mp4/battle-chess.mp4",
    color: "#ffffff"
  },
  {
    title: "Kapampangan Quiz App",
    category: "personal",
    github: "https://github.com/Gamakichii/sulyap_kapampangan-og",
    external: "https://drive.google.com/file/d/1LM_QiIAx7sjftbbsuZt3utUyp-ytqUmx/view",
    type: "Mobile App // Personal",
    description: "Interactive language learning application promoting Kapampangan culture through gamified quizzes.",
    image: "/assets/Projects/Sulyap.png",
    color: "#ff9900"
  },
  {
    title: "MP3 Downloader",
    category: "personal",
    github: "https://github.com/Hakaii1/MP3-Downloader",
    type: "Utility Tool // Personal",
    description: "YouTube/Spotify downloader with extensive metadata tagging and robust backend processing.",
    image: "/assets/Projects/mp3-downloader.png",
    color: "#1db954"
  },
  {
    title: "File Converter",
    category: "personal",
    github: "https://github.com/Hakaii1/file-converter",
    type: "Utility Tool // Personal",
    description: "Versatile media conversion tool supporting various audio and video formats using FFmpeg.",
    image: "/assets/Projects/image-converter.png",
    color: "#9933ff"
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [showLocked, setShowLocked] = useState(false);

  const handleAction = (e: React.MouseEvent, type: 'github' | 'external') => {
    e.stopPropagation();
    if (project.locked) {
      setShowLocked(true);
      setTimeout(() => setShowLocked(false), 3000);
    } else if (type === 'github' && project.github) {
      window.open(project.github, "_blank");
    } else if (type === 'external' && project.external) {
      window.open(project.external, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="sticky top-20 w-full mb-40"
    >
      <div
        className="relative aspect-video md:aspect-[21/9] w-full bg-muted brutalist-border overflow-hidden group"
        style={{ borderColor: project.color }}
      >
        {/* Security Alert Overlay */}
        <AnimatePresence>
          {showLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
            >
              <Lock className="w-16 h-16 text-white mb-6 animate-bounce" />
              <h4 className="text-4xl font-display uppercase tracking-widest text-white mb-2">Access Denied</h4>
              <p className="text-white/80 font-mono text-sm uppercase tracking-tighter max-w-md">
                This project is intellectual property of <br />
                <span className="text-white font-bold">La Rose Noire IT Dept.</span> <br />
                External source code access is restricted.
              </p>
              <div className="mt-8 px-4 py-2 border border-white/40 text-[10px] font-mono text-white animate-pulse">
                ERR_PROPRIETARY_LICENSE_LOCKED
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex-1">
            <span className="text-accent-secondary font-mono text-sm uppercase tracking-widest mb-2 block">
              {project.type}
            </span>
            <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-4">
              {project.title}
            </h3>
            <p className="text-muted-foreground font-sans max-w-xl text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {project.description}
            </p>
          </div>

          <div className="flex gap-4 relative z-10">
            {project.github && (
              <button 
                onClick={(e) => handleAction(e, 'github')}
                className="h-14 px-6 rounded-full border border-white/20 flex items-center gap-3 hover:bg-white hover:text-black transition-all font-mono text-xs uppercase tracking-widest"
              >
                <Github size={18} /> Source_Code
              </button>
            )}
            <button 
              onClick={(e) => handleAction(e, project.external ? 'external' : 'github')}
              className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:text-background transition-all hover:border-accent"
            >
              {project.locked ? <Lock size={20} /> : <ExternalLink size={20} />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(p =>
    filter === "all" ? true : p.category === filter
  );

  return (
    <section id="projects" className="relative px-4 py-32 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-border pb-10">
          <motion.div
            initial={{ y: 80, opacity: 0, filter: "blur(15px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-7xl md:text-9xl font-display uppercase tracking-tighter">
              Selected <br /> <span className="text-accent">PROJECTS</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-12 md:text-right w-full md:w-auto mt-12 md:mt-0">
            {/* Command Bar Navigation */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40">Filter_Command_Input</span>
              <div className="flex flex-wrap gap-3 md:justify-end">
                {["all", "personal", "intern"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative px-8 py-3 uppercase font-mono text-xs tracking-[0.2em] transition-all duration-500 overflow-hidden group ${
                      filter === f 
                      ? "text-background" 
                      : "text-accent border border-accent/20 hover:border-accent"
                    }`}
                  >
                    {/* Active Background Slide */}
                    {filter === f && (
                      <motion.div 
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-accent z-0"
                      />
                    )}
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
                    
                    <span className="relative z-10">
                      {f === "all" ? "All//Sys" : f === "personal" ? "Personal//Proj" : "Intern//Apps"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="max-w-md text-accent uppercase text-sm tracking-widest font-mono">
                {filteredProjects.length.toString().padStart(2, '0')} SYSTEM_DEPLOYMENTS // FOUND
              </p>
              <p className="max-w-md text-muted-foreground uppercase text-[10px] tracking-widest font-mono">
                ACTIVE_FILTER: {filter.toUpperCase()}_MODE
              </p>
            </div>
          </div>
        </div>

        <div className="relative min-h-screen">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
