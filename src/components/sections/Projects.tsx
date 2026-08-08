"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Github, ExternalLink, Lock, FileText, X, CheckCircle2, AlertTriangle, Database, Cpu, ArrowRight, Layers, FolderCheck, Workflow, ChevronLeft, ChevronRight } from "lucide-react";

interface CaseStudyData {
  title: string;
  role: string;
  techStack: string[];
  context: string;
  problem: { title: string; detail: string }[];
  schemaFolders: {
    name: string;
    count: string;
    fields: string[];
    note?: string;
  }[];
  deduplication: string[];
  automations: { id: string; name: string; trigger: string; logic: string; image: string }[];
  migration: string[];
  results: { metric: string; label: string; desc: string }[];
}

interface Project {
  title: string;
  category: "automation" | "personal" | "intern";
  locked?: boolean;
  type: string;
  description: string;
  video?: string;
  image?: string;
  images?: string[];
  imageLabels?: string[];
  color: string;
  github?: string;
  external?: string;
  hasCaseStudy?: boolean;
  caseStudyData?: CaseStudyData;
}

const projects: Project[] = [
  {
    title: "GHL CRM & Automation Engine",
    category: "automation",
    type: "Automation Architecture // GoHighLevel",
    description: "Decoupled 3-stage automation engine & 20-field master schema consolidation for an international sports placement agency, reducing field memory by 50% with 100% execution reliability.",
    video: "/assets/mp4/ghl-automation1.mp4",
    images: [
      "/assets/Projects/ghl-a1.png",
      "/assets/Projects/ghl-a2.png",
      "/assets/Projects/ghl-a3.png"
    ],
    imageLabels: [
      "A1 - New Highlight Notify",
      "A2 - Application Qualifier",
      "A3 - Contact Auto Reply"
    ],
    color: "#00f0ff",
    hasCaseStudy: true,
    caseStudyData: {
      title: "GoHighLevel CRM Architecture & Automation Engine Optimization",
      role: "Lead CRM Developer / Full-Stack System Architect",
      techStack: ["GoHighLevel (GHL)", "Webhooks", "Form Mapping", "Workflow Automations"],
      context: "Anonymized International Sports Placement & Talent Agency",
      problem: [
        {
          title: "Database Bloat",
          detail: "~40 overlapping and duplicate custom fields (e.g., multiple fields capturing Position, Level, and Source)."
        },
        {
          title: "Workflow Execution Failures",
          detail: "Single-canvas automations failed or skipped steps when incoming leads submitted forms lacking specific conditional fields."
        },
        {
          title: "Contact Duplication",
          detail: "Submissions lacking mandatory primary keys (Email/Phone) generated duplicate, unlinked contact records."
        }
      ],
      schemaFolders: [
        {
          name: "1. Personal & Demographics",
          count: "2 Fields",
          fields: ["Nationality (Single Line)", "Current Location (Single Line)"],
          note: "Complemented by native identity fields: First Name, Last Name, Email, Phone, DOB"
        },
        {
          name: "2. Football Profile",
          count: "10 Fields",
          fields: [
            "Primary Playing Position (Dropdown: GK, DEF, MID, FWD)",
            "Current Playing Level (Single Line)",
            "Current Club / Team (Single Line)",
            "Highlight Reel / Footage URL (URL)",
            "Transfermarkt / Profile Link (URL)",
            "Preferred Foot (Dropdown: Left, Right, Both)",
            "Height (cm), Weight (kg), Years of Experience (Numeric)",
            "Playing History (Multi-line)"
          ]
        },
        {
          name: "3. Pro Pathway Application",
          count: "5 Fields",
          fields: [
            "EU Passport Holder (Radio: Yes/No)",
            "Able to Fund Relocation (Radio: Yes/No)",
            "Relocation Date (Date Picker)",
            "Player Goals / Ambitions (Multi-line)",
            "Lead Source (Single Line)"
          ]
        },
        {
          name: "4. Support & Inquiries",
          count: "3 Fields",
          fields: [
            "Inquiry Reason (Dropdown: Billing, Application, General)",
            "Inquiry Message (Multi-line)",
            "Preferred Contact Method (Dropdown: Email, SMS, WhatsApp)"
          ]
        }
      ],
      deduplication: [
        "Primary Key Enforcement: Set required Email fields on all 5 intake forms to trigger GHL's global deduplication engine automatically.",
        "Form Attribution: Utilized submission tags (e.g., submitted-form-1) rather than creating redundant custom fields to track lead attribution cleanly on contact timelines."
      ],
      automations: [
        {
          id: "Automation A1",
          name: "Highlight Notify",
          trigger: "Form 1 Submission",
          logic: "Sends an internal email notification containing player position and video link to custom email endpoints.",
          image: "/assets/Projects/ghl-a1.png"
        },
        {
          id: "Automation A2",
          name: "Lead Qualifier",
          trigger: "Form 4 Submission",
          logic: "Evaluates EU Passport = Yes AND Relocation Funding = Yes → Dynamically applies Qualified tags and fires follow-up sequences.",
          image: "/assets/Projects/ghl-a2.png"
        },
        {
          id: "Automation A3",
          name: "Auto-Reply Router",
          trigger: "Form 5 Submission",
          logic: "Evaluates Preferred Contact Method → Dynamically routes auto-replies via Email or SMS/WhatsApp.",
          image: "/assets/Projects/ghl-a3.png"
        }
      ],
      migration: [
        "Dual-Trigger Buffer: Configured active triggers to accept legacy or new field variables during form updates so incoming leads were never dropped.",
        "CSV Transformation: Executed a COALESCE column merge script to combine legacy duplicate columns into the single Master Schema.",
        "Safe Re-import: Re-imported transformed records using Email as the matching key with 'Update Existing Contacts' enabled."
      ],
      results: [
        { metric: "50%", label: "Field Memory Reduction", desc: "Condensed ~40 scattered fields down to 20 master fields." },
        { metric: "100%", label: "Automation Reliability", desc: "Decoupled execution paths eliminated logic dropouts across all 5 intake forms." },
        { metric: "100%", label: "Database Governance", desc: "Enforced mandatory primary keys to prevent duplicate contact creation." }
      ]
    }
  },
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

const ProjectSlideshow = ({
  images,
  labels,
  title
}: {
  images: string[];
  labels?: string[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - canvas ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-contain p-2 md:p-6 transition-transform duration-700 group-hover:scale-105"
        />
      </AnimatePresence>

      {/* Top Banner Status Tag */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-background/85 backdrop-blur-md border border-accent/40 font-mono text-[10px] uppercase text-accent tracking-widest brutalist-border shadow-lg">
        <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
        <span>GHL_WORKFLOW [0{currentIndex + 1}/0{images.length}]</span>
        {labels && labels[currentIndex] && (
          <span className="text-white font-semibold hidden sm:inline">:: {labels[currentIndex]}</span>
        )}
      </div>

      {/* Navigation Controls & Indicators */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-background/85 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-lg">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
          }}
          className="text-white/70 hover:text-accent transition-colors p-1"
          aria-label="Previous workflow screenshot"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "bg-accent w-6" : "bg-white/30 hover:bg-white/60 w-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex((prev) => (prev + 1) % images.length);
          }}
          className="text-white/70 hover:text-accent transition-colors p-1"
          aria-label="Next workflow screenshot"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const CaseStudyModal = ({
  data,
  onClose
}: {
  data: CaseStudyData;
  onClose: () => void;
}) => {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-6 bg-background/90 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl h-[85vh] max-h-[85vh] bg-background border border-accent/40 shadow-[0_0_80px_rgba(0,240,255,0.15)] my-auto overflow-hidden brutalist-border flex flex-col"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
      >
        {/* Top Terminal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-accent/20 bg-muted/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            <span className="ml-3 font-mono text-xs uppercase tracking-widest text-accent/80">
              SYS_CASE_STUDY // GHL_ENGINE_SPEC.MD
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-accent/30 hover:bg-accent hover:text-background transition-colors rounded-sm text-accent"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          className="flex-1 p-6 md:p-10 overflow-y-auto space-y-10 font-sans overscroll-contain"
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
        >
          {/* Header Banner */}
          <div className="border-b border-white/10 pb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-accent/10 border border-accent/40 text-accent font-mono text-xs tracking-widest uppercase">
                {data.role}
              </span>
              <span className="px-3 py-1 bg-muted border border-white/10 text-muted-foreground font-mono text-xs tracking-widest uppercase">
                {data.context}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-white leading-tight">
              {data.title}
            </h2>

            <div className="flex flex-wrap gap-2 pt-2">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-accent/5 border border-accent/20 text-accent font-mono text-[10px] uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Section 1: Problem Statement & Challenge */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-l-2 border-red-500 pl-4">
              <AlertTriangle className="text-red-400" size={24} />
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white">
                01 // Problem Statement & Challenge
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {data.problem.map((item, i) => (
                <div
                  key={i}
                  className="p-5 bg-red-950/20 border border-red-500/30 rounded-none space-y-2 relative overflow-hidden group hover:border-red-500/60 transition-all"
                >
                  <div className="text-red-400 font-mono text-xs tracking-widest uppercase">
                    ISSUE_0{i + 1}
                  </div>
                  <h4 className="text-lg font-display uppercase text-white tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Technical Architecture & Solution */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-l-2 border-accent pl-4">
              <Cpu className="text-accent" size={24} />
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white">
                02 // Technical Architecture & Solution
              </h3>
            </div>

            {/* Sub-A: Master Custom Field Schema */}
            <div className="space-y-4 bg-muted/10 p-6 border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Database className="text-accent" size={18} />
                  <h4 className="text-lg font-display uppercase tracking-wider text-accent">
                    A. Master Custom Field Schema
                  </h4>
                </div>
                <span className="font-mono text-xs text-accent/70 uppercase">
                  Consolidated ~40 Legacy → 20 Master Fields
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.schemaFolders.map((folder, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-background border border-accent/20 space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-accent/10 pb-2">
                      <span className="font-display uppercase text-white text-sm tracking-wide">
                        {folder.name}
                      </span>
                      <span className="font-mono text-[10px] text-accent px-2 py-0.5 border border-accent/30 uppercase">
                        {folder.count}
                      </span>
                    </div>

                    <ul className="space-y-1.5 font-mono text-xs text-muted-foreground">
                      {folder.fields.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <span className="text-accent">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {folder.note && (
                      <p className="text-[11px] font-mono text-accent/60 italic pt-1 border-t border-white/5">
                        *{folder.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-B: Deduplication Strategy */}
            <div className="p-6 bg-muted/10 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-accent font-display uppercase tracking-wider">
                <FolderCheck size={18} />
                <h4>B. Deduplication & Data Mapping Strategy</h4>
              </div>
              <ul className="space-y-2 font-sans text-sm text-muted-foreground">
                {data.deduplication.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sub-C: Decoupled Workflow Automation Engine with Live Interactive Canvas Gallery */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent font-display uppercase tracking-wider">
                <Workflow size={18} />
                <h4>C. Decoupled Workflow Automation Engine</h4>
              </div>

              {/* Live Screen Recording Video */}
              <div className="bg-zinc-950 border border-accent/30 p-4 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    LIVE_GHL_SCREEN_RECORDING // DEMO
                  </span>
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest hidden sm:inline">
                    3-STAGE_WORKFLOW_EXECUTION
                  </span>
                </div>

                <div className="relative aspect-video w-full bg-zinc-900 border border-white/10 overflow-hidden group">
                  <video
                    src="/assets/mp4/ghl-automation1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-background/90 border border-accent/30 font-mono text-[10px] text-accent uppercase tracking-widest">
                    RECORDING: GHL_AUTOMATION1.MP4 // FULL_SYSTEM_WORKFLOW
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.automations.map((auto) => (
                  <div
                    key={auto.id}
                    className="p-5 bg-background border border-accent/30 space-y-3 relative group hover:border-accent transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-accent font-bold">
                        {auto.id}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground uppercase px-2 py-0.5 border border-white/10">
                        {auto.trigger}
                      </span>
                    </div>

                    <h5 className="font-display uppercase text-white text-base">
                      {auto.name}
                    </h5>

                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {auto.logic}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Production Migration Strategy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-l-2 border-yellow-500 pl-4">
              <Layers className="text-yellow-400" size={24} />
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white">
                03 // Production Migration Strategy (Zero Downtime)
              </h3>
            </div>

            <div className="p-6 bg-yellow-950/10 border border-yellow-500/30 space-y-3">
              <div className="space-y-2">
                {data.migration.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 font-sans text-sm text-muted-foreground">
                    <span className="font-mono text-yellow-400 font-bold shrink-0">
                      Step {i + 1}:
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Key Results & Impact */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3 border-l-2 border-accent pl-4">
              <CheckCircle2 className="text-accent" size={24} />
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white">
                04 // Key Results & Impact
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {data.results.map((res, i) => (
                <div
                  key={i}
                  className="p-6 bg-accent/5 border border-accent/40 space-y-2 text-center relative overflow-hidden group hover:bg-accent/10 transition-colors"
                >
                  <div className="text-4xl md:text-5xl font-display text-accent tracking-tight">
                    {res.metric}
                  </div>
                  <div className="font-display uppercase text-white text-sm tracking-wider">
                    {res.label}
                  </div>
                  <p className="font-sans text-xs text-muted-foreground">
                    {res.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-accent text-background font-display text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              CLOSE_CASE_STUDY
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  index,
  onOpenCaseStudy
}: {
  project: Project;
  index: number;
  onOpenCaseStudy?: (data: CaseStudyData) => void;
}) => {
  const [showLocked, setShowLocked] = useState(false);

  const handleAction = (e: React.MouseEvent, type: "github" | "external" | "casestudy") => {
    e.stopPropagation();
    if (type === "casestudy" && project.caseStudyData && onOpenCaseStudy) {
      onOpenCaseStudy(project.caseStudyData);
    } else if (project.locked) {
      setShowLocked(true);
      setTimeout(() => setShowLocked(false), 3000);
    } else if (type === "github" && project.github) {
      window.open(project.github, "_blank");
    } else if (type === "external" && project.external) {
      window.open(project.external, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="sticky top-20 w-full mb-16 sm:mb-28 md:mb-40"
    >
      <div
        className="relative aspect-square sm:aspect-video md:aspect-[21/9] w-full bg-muted brutalist-border overflow-hidden group cursor-pointer"
        style={{ borderColor: project.color }}
        onClick={(e) => {
          if (project.hasCaseStudy && project.caseStudyData && onOpenCaseStudy) {
            onOpenCaseStudy(project.caseStudyData);
          }
        }}
      >
        {/* Security Alert Overlay */}
        <AnimatePresence>
          {showLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 sm:p-8 text-center"
            >
              <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-4 sm:mb-6 animate-bounce" />
              <h4 className="text-2xl sm:text-4xl font-display uppercase tracking-widest text-white mb-2">Access Denied</h4>
              <p className="text-white/80 font-mono text-xs sm:text-sm uppercase tracking-tighter max-w-md">
                This project is intellectual property of <br />
                <span className="text-white font-bold">La Rose Noire IT Dept.</span> <br />
                External source code access is restricted.
              </p>
              <div className="mt-4 sm:mt-8 px-4 py-2 border border-white/40 text-[10px] font-mono text-white animate-pulse">
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
        ) : project.images && project.images.length > 0 ? (
          <ProjectSlideshow
            images={project.images}
            labels={project.imageLabels}
            title={project.title}
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-95 pointer-events-none" />

        <div className="absolute bottom-0 left-0 p-4 sm:p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-6 pointer-events-none">
          <div className="flex-1 pointer-events-auto">
            <span className="text-accent-secondary font-mono text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2 block flex items-center gap-2 flex-wrap">
              {project.type}
              {project.hasCaseStudy && (
                <span className="px-2 py-0.5 bg-accent/20 border border-accent text-accent text-[9px] sm:text-[10px]">
                  FULL_CASE_STUDY
                </span>
              )}
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-6xl font-display uppercase tracking-tighter mb-2 sm:mb-4">
              {project.title}
            </h3>
            <p className="text-muted-foreground font-sans max-w-xl text-xs sm:text-base md:text-lg line-clamp-2 md:line-clamp-none opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 relative z-10 pointer-events-auto mt-2 md:mt-0">
            {project.hasCaseStudy && project.caseStudyData && (
              <button
                onClick={(e) => handleAction(e, "casestudy")}
                className="h-10 sm:h-14 px-4 sm:px-6 rounded-full border border-accent bg-accent/10 hover:bg-accent hover:text-background text-accent flex items-center gap-2 sm:gap-3 transition-all font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <FileText size={16} /> READ_CASE_STUDY
              </button>
            )}

            {project.github && (
              <button
                onClick={(e) => handleAction(e, "github")}
                className="h-10 sm:h-14 px-4 sm:px-6 rounded-full border border-white/20 flex items-center gap-2 sm:gap-3 hover:bg-white hover:text-black transition-all font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white"
              >
                <Github size={16} /> Source_Code
              </button>
            )}

            {!project.hasCaseStudy && (
              <button
                onClick={(e) => handleAction(e, project.external ? "external" : "github")}
                className="h-10 w-10 sm:h-14 sm:w-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:text-background transition-all hover:border-accent text-white"
              >
                {project.locked ? <Lock size={16} /> : <ExternalLink size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyData | null>(null);

  const filteredProjects = projects.filter((p) =>
    filter === "all" ? true : p.category === filter
  );

  return (
    <section id="projects" className="relative px-4 py-16 sm:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 sm:mb-16 border-b border-border pb-8 sm:pb-10">
          <motion.div
            initial={{ y: 80, opacity: 0, filter: "blur(15px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl sm:text-7xl md:text-9xl font-display uppercase tracking-tighter">
              Selected <br /> <span className="text-accent">PROJECTS</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-12 md:text-right w-full md:w-auto mt-12 md:mt-0">
            {/* Command Bar Navigation */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40">
                Filter_Command_Input
              </span>
              <div className="flex flex-wrap gap-3 md:justify-end">
                {[
                  { id: "all", label: "All//Sys" },
                  { id: "automation", label: "Automation//Flow" },
                  { id: "personal", label: "Personal//Proj" },
                  { id: "intern", label: "Intern//Apps" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`relative px-6 py-3 uppercase font-mono text-xs tracking-[0.2em] transition-all duration-500 overflow-hidden group ${
                      filter === f.id
                        ? "text-background"
                        : "text-accent border border-accent/20 hover:border-accent"
                    }`}
                  >
                    {/* Active Background Slide */}
                    {filter === f.id && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-accent z-0"
                      />
                    )}

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />

                    <span className="relative z-10">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="max-w-md text-accent uppercase text-sm tracking-widest font-mono">
                {filteredProjects.length.toString().padStart(2, "0")} SYSTEM_DEPLOYMENTS // FOUND
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
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onOpenCaseStudy={(data) => setActiveCaseStudy(data)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <CaseStudyModal
            data={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}


