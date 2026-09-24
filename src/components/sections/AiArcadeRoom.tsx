"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Sparkles,
  Tv,
  Film,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  FolderOpen,
  X,
  ChevronRight,
  ChevronLeft,
  Wand2,
  ArrowLeft,
  Clapperboard,
  Layers,
  Cpu
} from "lucide-react";
import { useLenis } from "lenis/react";
import { videoAds, VideoAd } from "./AiVideoAds";

interface AiSkillModule {
  id: string;
  title: string;
  category: "Pixar 3D" | "UGC Viral" | "Physics & VFX" | "Audio Synthesis";
  iconName: "wand" | "clapper" | "sparkles" | "tv";
  tools: string[];
  summary: string;
  workflow: string;
  linkedAdId: string;
  accentColor: string;
}

const aiSkills: AiSkillModule[] = [
  {
    id: "ugc-problem-solution",
    title: "Relatable Car Vlog & Telehealth Direct Response",
    category: "UGC Viral",
    iconName: "clapper",
    tools: ["Direct-Response Copywriting", "CapCut Pro", "Mobile UI Pacing"],
    summary:
      "High-retention relatable car-vlog hook addressing medical expenses, followed by mobile UI screencast demonstration and QR code conversion CTA.",
    workflow: "Pattern-interrupt hook, emotional price-anchoring, mobile app UI overlay & QR retention loop.",
    linkedAdId: "ugc-trimrx",
    accentColor: "#06b6d4"
  },
  {
    id: "pixar-narrative",
    title: "Character Storytelling & Shade Adaptation",
    category: "Pixar 3D",
    iconName: "sparkles",
    tools: ["Midjourney V6", "Subsurface Scattering", "Macro Fluid Simulation"],
    summary:
      "Full-pipeline stylized character animation showing multi-character dialogues in retail & domestic settings, leading to dynamic cosmetics macro droplet simulation.",
    workflow: "Stylized character performance, facial emotion consistency & color-adaptive skin blend.",
    linkedAdId: "pixar-smooche",
    accentColor: "#ec4899"
  },
  {
    id: "pixar-3d",
    title: "Stylized 3D Character Cinema",
    category: "Pixar 3D",
    iconName: "sparkles",
    tools: ["Midjourney V6", "Generative 3D Shaders", "Procedural Lighting"],
    summary:
      "Full-pipeline stylized character animation emphasizing subsurface skin scattering, expressive gestures, and whimsical commercial pacing.",
    workflow: "Prompt-to-character rigging, spatial consistency enforcement & cinematic grade.",
    linkedAdId: "pixar-bedfoam",
    accentColor: "#00f0ff"
  },
  {
    id: "ugc-conversion",
    title: "Direct-Response UGC & Viral Retention",
    category: "UGC Viral",
    iconName: "clapper",
    tools: ["CapCut Pro", "Premiere Pro", "AI Dynamic Voice Hooks"],
    summary:
      "High-CTR social ads engineered around the crucial 3-second hook, macro product stretch demonstrations, and natural consumer pacing.",
    workflow: "Hook sequencing, kinetic speed ramps, on-screen text anchors & viral audio sync.",
    linkedAdId: "ugc-sneaker",
    accentColor: "#ff007f"
  },
  {
    id: "generative-motion",
    title: "Kinetic Camera Physics & Speed-Ramping",
    category: "Physics & VFX",
    iconName: "wand",
    tools: ["Runway Gen-3 Alpha", "Kling AI", "Camera Motion Control"],
    summary:
      "Advanced motion prompting for dynamic drone sweeps, orbit tracking, and macro texture fly-throughs with zero visual jitter.",
    workflow: "Motion vector steering, multi-camera angle alignment & 60fps frame interpolation.",
    linkedAdId: "ugc-headphone",
    accentColor: "#f59e0b"
  },
  {
    id: "macro-liquid",
    title: "D2C Beauty & Droplet Fluid Simulation",
    category: "Physics & VFX",
    iconName: "sparkles",
    tools: ["Fluid Dynamics Prompting", "High-Refraction Glass VFX"],
    summary:
      "Photorealistic cosmetic liquid physics, showing viscous droplet release, velvet skin absorption, and dewy light refractions.",
    workflow: "Refractive index simulation, droplet surface tension & specular highlight timing.",
    linkedAdId: "ugc-serum",
    accentColor: "#a855f7"
  },
  {
    id: "audio-synthesis",
    title: "Voice Cloning & Spatial Soundscapes",
    category: "Audio Synthesis",
    iconName: "tv",
    tools: ["ElevenLabs", "Commercial Audio Mastering"],
    summary:
      "Ultra-natural AI voice-overs with organic human breath cadences, matched with immersive product foley and licensed energetic beats.",
    workflow: "Voice actor cadence cloning, emotional inflection tuning & audio ducking.",
    linkedAdId: "ugc-tights",
    accentColor: "#10b981"
  },
  {
    id: "ugc-podcast",
    title: "Podcast & Conversational Direct-Response",
    category: "UGC Viral",
    iconName: "clapper",
    tools: ["Conversational Scripting", "Organic Dialogue Pacing", "Direct-Response Hooks"],
    summary:
      "Engaging podcast interview format framing authentic viral recommendations, Baccarat Rouge fragrance comparisons, and compelling price-anchored CTA.",
    workflow: "Problem-solution conversational hook, dual-speaker dynamic pacing & retention loops.",
    linkedAdId: "ugc-keyla",
    accentColor: "#f43f5e"
  }
];

export default function AiArcadeRoom({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const lenis = useLenis();
  const [selectedAdId, setSelectedAdId] = useState<string>(videoAds[0]?.id || "ugc-trimrx");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("00:00");
  const [durationStr, setDurationStr] = useState<string>("00:00");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeAd = videoAds.find((a) => a.id === selectedAdId) || videoAds[0];
  const activeSkill = aiSkills.find((s) => s.linkedAdId === selectedAdId) || aiSkills[0];

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, lenis, onClose]);

  // Handle ad switch
  const selectAd = (id: string) => {
    setSelectedAdId(id);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    setCurrentTimeStr(formatTime(v.currentTime));
    setDurationStr(formatTime(v.duration));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    v.currentTime = pos * v.duration;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[250] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-background/95 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
        data-lenis-prevent
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl h-[94vh] max-h-[94vh] bg-zinc-950 border-2 border-accent/50 shadow-[0_0_90px_rgba(0,240,255,0.25)] rounded-3xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent
        >
          {/* Scanline & Grid Ambient Effects */}
          <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
          <div className="scanline opacity-10 pointer-events-none" />

          {/* Top Arcade Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-muted/40 shrink-0 relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-accent" size={18} />
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  WORLD 1-AI // SECRET BONUS DIMENSION
                </span>
              </div>
              <span className="hidden md:inline px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 uppercase">
                AI_CREATIVE_LAB_ONLINE
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-accent/80 uppercase tracking-widest">
                <span>STAGE: BONUS_ROOM</span>
                <span className="text-white/30">•</span>
                <span>CREDITS: ∞</span>
              </div>

              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg border border-accent/40 bg-accent/10 hover:bg-accent text-accent hover:text-background font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <ArrowLeft size={14} />
                <span>Return to World 1-1</span>
              </button>
            </div>
          </div>

          {/* Main Arcade Stage Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto font-sans relative z-10">
            {/* LEFT COLUMN: The AI Skills Console */}
            <div className="lg:col-span-6 xl:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto">
              <div className="space-y-5">
                {/* Header intro */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest">
                    <Wand2 size={14} />
                    <span>Unlocked Skill Tree // Creative Direction</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-display uppercase tracking-tight text-white leading-tight">
                    AI Commercial <span className="text-accent">Production Lab</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
                    Mario warped into the AI creative dimension! Explore the core disciplines powering these next-gen commercials, then click any module to load its synchronized ad in the CRT monitor.
                  </p>
                </div>

                {/* Skill Modules List */}
                <div className="space-y-3 pt-2">
                  {aiSkills.map((skill) => {
                    const isSelected = skill.linkedAdId === selectedAdId;
                    return (
                      <div
                        key={skill.id}
                        onClick={() => selectAd(skill.linkedAdId)}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? "bg-accent/10 border-accent shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                            : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: skill.accentColor }}
                              />
                              <span className="font-display uppercase text-white text-sm sm:text-base tracking-wide group-hover:text-accent transition-colors">
                                {skill.title}
                              </span>
                            </div>

                            <p className="text-xs text-muted-foreground font-sans leading-relaxed pl-4">
                              {skill.summary}
                            </p>

                            <div className="flex flex-wrap items-center gap-1.5 pt-1.5 pl-4">
                              {skill.tools.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 font-mono text-[9px] uppercase text-white/70"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="shrink-0 pt-1">
                            <span
                              className={`px-2 py-1 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 ${
                                isSelected
                                  ? "bg-accent text-background"
                                  : "bg-white/10 text-white/60 group-hover:text-white"
                              }`}
                            >
                              <Play size={10} className="fill-current" />
                              <span>{isSelected ? "PLAYING" : "LOAD"}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Vault Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                  <Film size={14} className="text-accent" />
                  <span>{videoAds.length} Full HD Video Ads Rendered</span>
                </div>

                <a
                  href="https://drive.google.com/drive/folders/1e0LE6UgU2SmIJZ46MR8I3XfoZtyC2_9b?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent text-accent hover:text-background font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 group"
                >
                  <FolderOpen size={14} className="group-hover:scale-110 transition-transform" />
                  <span>Google Drive Vault</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: The Arcade CRT Video Monitor */}
            <div className="lg:col-span-6 xl:col-span-5 p-4 sm:p-6 lg:p-8 bg-zinc-950/80 flex flex-col justify-between items-center space-y-6 overflow-y-auto">
              <div className="w-full flex flex-col items-center space-y-4">
                {/* Arcade Monitor Bezel */}
                <div
                  className={`relative w-full ${
                    activeAd.aspect?.includes("16:9")
                      ? "max-w-[420px] aspect-[16/9]"
                      : "max-w-[310px] sm:max-w-[340px] aspect-[9/16]"
                  } bg-black rounded-2xl border-4 border-accent/40 shadow-[0_0_40px_rgba(0,240,255,0.3)] overflow-hidden group transition-all duration-300`}
                >
                  <video
                    ref={videoRef}
                    key={activeAd.videoUrl}
                    src={activeAd.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onClick={togglePlay}
                    className={`w-full h-full ${
                      activeAd.aspect?.includes("16:9") ? "object-contain" : "object-cover"
                    } cursor-pointer`}
                  />

                  {/* Scanline CRT overlay */}
                  <div className="scanline opacity-15 pointer-events-none" />

                  {/* Center Play overlay */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                    >
                      <div className="w-14 h-14 rounded-full bg-accent text-background flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                        <Play size={24} className="ml-1 fill-background" />
                      </div>
                    </div>
                  )}

                  {/* In-Monitor Top Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-accent/40 text-accent font-mono text-[9px] uppercase tracking-widest font-bold">
                      {activeAd.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md font-mono text-[9px] text-white/80 uppercase">
                      {activeAd.aspect?.includes("16:9") ? "16:9 HD" : "9:16 HD"}
                    </span>
                  </div>

                  {/* In-Monitor Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col gap-2 z-10">
                    {/* Progress scrubber */}
                    <div
                      onClick={handleSeek}
                      className="w-full h-1.5 bg-white/20 hover:h-2 transition-all cursor-pointer rounded-full overflow-hidden"
                    >
                      <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-white/90">
                      <div className="flex items-center gap-3">
                        <button onClick={togglePlay} className="hover:text-accent transition-colors">
                          {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
                        </button>
                        <button onClick={toggleMute} className="hover:text-accent transition-colors">
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-accent" />}
                        </button>
                        <span>
                          {currentTimeStr} / {durationStr}
                        </span>
                      </div>

                      <span className="text-[9px] font-mono text-accent uppercase">
                        AUDIO: {isMuted ? "MUTED" : "ACTIVE"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active Ad Metadata Card */}
                <div className="w-full max-w-[340px] text-center space-y-1">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                    {activeAd.brand}
                  </span>
                  <h4 className="text-lg font-display uppercase tracking-tight text-white line-clamp-1">
                    {activeAd.title}
                  </h4>
                  <p className="text-xs text-muted-foreground font-sans line-clamp-2">
                    {activeAd.description}
                  </p>
                </div>
              </div>

              {/* Quick Ad Selector Carousel */}
              <div className="w-full space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block text-center">
                  Quick Select Commercial Pod:
                </span>
                <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5 w-full">
                  {videoAds.map((ad, idx) => (
                    <button
                      key={ad.id}
                      onClick={() => selectAd(ad.id)}
                      className={`relative aspect-[9/16] rounded-md border transition-all overflow-hidden ${
                        ad.id === selectedAdId
                          ? "border-accent ring-2 ring-accent scale-105"
                          : "border-white/20 opacity-60 hover:opacity-100 hover:border-white"
                      }`}
                      title={ad.title}
                    >
                      <video
                        src={ad.videoUrl}
                        muted
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center font-mono text-[9px] text-white font-bold">
                        {(idx + 1).toString().padStart(2, "0")}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
