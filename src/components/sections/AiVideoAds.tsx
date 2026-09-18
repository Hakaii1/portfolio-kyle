"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Film,
  Clapperboard,
  Tv,
  ExternalLink,
  FolderOpen
} from "lucide-react";
import { useLenis } from "lenis/react";

export interface VideoAd {
  id: string;
  title: string;
  category: "UGC" | "Pixar";
  categoryLabel: "UGC" | "Pixar Animated";
  videoUrl: string;
  description: string;
  brand: string;
  aspect: string;
  tags: string[];
  color: string;
  accentBadge: string;
  creativePipeline: string;
}

export const videoAds: VideoAd[] = [
  // Pixar Animated Series
  {
    id: "pixar-bedfoam",
    title: "CloudRest Bed Foam Ad",
    category: "Pixar",
    categoryLabel: "Pixar Animated",
    videoUrl: "/assets/Videos/Pixar/Bed%20foam%20Ad%20(Music).mp4",
    description:
      "3D stylized character animation demonstrating adaptive memory foam contouring and weightless sleep dynamics with whimsical musical pacing.",
    brand: "CloudRest Sleep Systems",
    aspect: "9:16 Vertical HD",
    tags: ["Pixar 3D Aesthetic", "Character Cinema", "Commercial Storytelling", "AI Motion"],
    color: "#00f0ff",
    accentBadge: "bg-cyan-500/10 text-cyan-400 border-cyan-400/40",
    creativePipeline: "Stylized 3D character consistency, procedural lighting & whimsical scene pacing."
  },
  {
    id: "pixar-nivea",
    title: "Nivea Deep Moisture Ad",
    category: "Pixar",
    categoryLabel: "Pixar Animated",
    videoUrl: "/assets/Videos/Pixar/Nivea%20Ad.mp4",
    description:
      "Animated brand commercial illustrating dermal hydration barriers, macro cellular moisturization, and playful character skincare routines.",
    brand: "Nivea Skincare",
    aspect: "9:16 Vertical HD",
    tags: ["Pixar Animated", "Skincare Commercial", "Cellular VFX", "Brand Aesthetic"],
    color: "#3b82f6",
    accentBadge: "bg-blue-500/10 text-blue-400 border-blue-400/40",
    creativePipeline: "Micro-fluid particle dynamics, soft skin subsurface scattering, and brand fidelity."
  },
  // UGC Series
  {
    id: "ugc-sneaker",
    title: "HyperStride Sneaker Ad",
    category: "UGC",
    categoryLabel: "UGC",
    videoUrl: "/assets/Videos/UGC/Sneaker-Ad.mp4",
    description:
      "High-energy streetwear UGC video ad emphasizing athletic flexibility, sole traction, and modern urban lifestyle styling.",
    brand: "HyperStride Footwear",
    aspect: "9:16 Vertical HD",
    tags: ["UGC Streetwear", "Social E-Commerce", "Kinetic Hook", "Viral Format"],
    color: "#ff007f",
    accentBadge: "bg-pink-500/10 text-pink-400 border-pink-400/40",
    creativePipeline: "Photorealistic shoe fabrication, camera track velocity, and TikTok retention hooks."
  },
  {
    id: "ugc-headphone",
    title: "Sony Xm5 ANC Headphone Ad",
    category: "UGC",
    categoryLabel: "UGC",
    videoUrl: "/assets/Videos/UGC/Headphone%20Ad.mp4",
    description:
      "Dynamic consumer tech UGC creative demonstrating active noise cancellation, deep soundstage isolation, and daily commuting versatility.",
    brand: "Sony XM5 Audio",
    aspect: "9:16 Vertical HD",
    tags: ["UGC Tech", "Sound Engineering", "Product Demo", "Direct Response"],
    color: "#f59e0b",
    accentBadge: "bg-amber-500/10 text-amber-400 border-amber-400/40",
    creativePipeline: "Acoustic visualization, photoreal metallic finishes, and creator-style pacing."
  },
  {
    id: "ugc-tights",
    title: "Thermal Fleece Tights Ad",
    category: "UGC",
    categoryLabel: "UGC",
    videoUrl: "/assets/Videos/UGC/Fleece%20Lined%20Tights%20Ad.mp4",
    description:
      "Direct-response apparel UGC showing cold-weather comfort, stretch resilience, and sleek silhouette transitions for lifestyle social campaigns.",
    brand: "CozyFit Apparel",
    aspect: "9:16 Vertical HD",
    tags: ["UGC Fashion", "Apparel Conversion", "Macro Fabric", "Lifestyle Hook"],
    color: "#ec4899",
    accentBadge: "bg-pink-500/10 text-pink-400 border-pink-400/40",
    creativePipeline: "Fabric stretch physics, organic lighting, and rapid social media hook structure."
  },
  {
    id: "ugc-moisturizer",
    title: "HydraGlow Moisture Crème",
    category: "UGC",
    categoryLabel: "UGC",
    videoUrl: "/assets/Videos/UGC/Moisturizer%20Ad.mp4",
    description:
      "D2C beauty UGC highlighting velvety texture spread, non-greasy absorption, and organic morning routine skin illumination.",
    brand: "DermaGlow Skincare",
    aspect: "9:16 Vertical HD",
    tags: ["UGC Beauty", "Skincare Routine", "Macro Texture", "Ad Creative"],
    color: "#10b981",
    accentBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-400/40",
    creativePipeline: "Emulsion texture simulation, dewy light specular highlights, and UGC authenticity."
  },
  {
    id: "ugc-serum",
    title: "Cellular Renewal Serum",
    category: "UGC",
    categoryLabel: "UGC",
    videoUrl: "/assets/Videos/UGC/Serum-Ad.mp4",
    description:
      "User-testimonial style UGC showcasing targeted dropper application, rapid epidermal penetration, and luminous complexion glow.",
    brand: "Aura Botanics",
    aspect: "9:16 Vertical HD",
    tags: ["UGC Serum", "Anti-Aging Glow", "Liquid Droplet", "Social Creative"],
    color: "#a855f7",
    accentBadge: "bg-purple-500/10 text-purple-400 border-purple-400/40",
    creativePipeline: "Viscous fluid physics, glass refractive realism, and high-CTR marketing angles."
  },
  {
    id: "ugc-keyla",
    title: "Keyla Perfume Body Butter",
    category: "UGC",
    categoryLabel: "UGC",
    videoUrl: "/assets/Videos/UGC/Keyla%20Ad.mp4",
    description:
      "Conversational podcast-style UGC ad showcasing Keyla luxury perfume body butter — highlighting 12-hour scent longevity, Baccarat Rouge dupe angle, and high-retention direct-response framing.",
    brand: "Keyla Fragrances",
    aspect: "9:16 Vertical HD",
    tags: ["Podcast UGC", "Perfume Body Butter", "Conversational Hook", "D2C Viral"],
    color: "#f43f5e",
    accentBadge: "bg-rose-500/10 text-rose-400 border-rose-400/40",
    creativePipeline: "Podcast conversational hook framing, organic dialogue pacing, and high-converting luxury fragrance dupe positioning."
  }
];

function VideoCard({
  ad,
  onOpenModal
}: {
  ad: VideoAd;
  onOpenModal: (ad: VideoAd) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isHovered) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay was prevented
        });
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, [isHovered]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-background/60 border border-white/10 hover:border-accent/80 transition-all duration-500 overflow-hidden brutalist-border shadow-lg hover:shadow-[0_0_35px_rgba(0,240,255,0.2)] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(ad)}
    >
      {/* 9:16 Video Player Container */}
      <div className="relative aspect-[9/16] w-full bg-zinc-950 overflow-hidden">
        <video
          ref={videoRef}
          src={ad.videoUrl}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Top & Bottom Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/60 pointer-events-none" />

        {/* Top Header Overlay */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          {/* Category Tag */}
          <div
            className={`px-2.5 py-1 border text-[10px] font-mono tracking-widest uppercase backdrop-blur-md font-semibold flex items-center gap-1.5 shadow-md ${ad.accentBadge}`}
          >
            {ad.category === "Pixar" ? (
              <Sparkles size={11} className="animate-spin" style={{ animationDuration: "4s" }} />
            ) : (
              <Clapperboard size={11} />
            )}
            <span>{ad.categoryLabel}</span>
          </div>

          {/* Reel Format Pill */}
          <div className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono text-white/80 uppercase tracking-wider">
            9:16 HD
          </div>
        </div>

        {/* Floating Quick Action Controls */}
        <div className="absolute top-12 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-white/20 hover:border-accent flex items-center justify-center text-white hover:text-accent transition-colors shadow-lg"
            title={isMuted ? "Unmute sound" : "Mute sound"}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-accent" />}
          </button>

          {/* Expand Fullscreen Reel */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(ad);
            }}
            className="w-9 h-9 rounded-full bg-background/80 backdrop-blur-md border border-white/20 hover:border-accent flex items-center justify-center text-white hover:text-accent transition-colors shadow-lg"
            title="Expand Full Reel"
            aria-label="Expand Reel"
          >
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Center Play Overlay Icon (if paused on hover) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-background/70 backdrop-blur-md border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-transform group-hover:scale-110">
              <Play size={22} className="ml-1 fill-accent" />
            </div>
          </div>
        )}

        {/* Bottom Playback Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-accent transition-all duration-100 shadow-[0_0_8px_#00f0ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Info Card Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3 bg-zinc-950/80 border-t border-white/5">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
            <span>{ad.brand}</span>
            <span className="text-accent font-semibold flex items-center gap-1">
              <Film size={10} /> AI_AD
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-display uppercase tracking-tight text-white group-hover:text-accent transition-colors line-clamp-1">
            {ad.title}
          </h4>

          <p className="text-xs text-muted-foreground font-sans line-clamp-2 mt-1.5 leading-relaxed">
            {ad.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
          {ad.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-mono uppercase px-2 py-0.5 bg-white/5 border border-white/10 text-white/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Fullscreen Cinema / Reel Lightbox Modal Player
function VideoLightboxModal({
  ad,
  onClose,
  onSelectAd,
  allAds
}: {
  ad: VideoAd;
  onClose: () => void;
  onSelectAd: (ad: VideoAd) => void;
  allAds: VideoAd[];
}) {
  const lenis = useLenis();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [durationStr, setDurationStr] = useState("00:00");

  const currentIndex = allAds.findIndex((a) => a.id === ad.id);

  const goToPrev = () => {
    const prevIdx = (currentIndex - 1 + allAds.length) % allAds.length;
    onSelectAd(allAds[prevIdx]);
  };

  const goToNext = () => {
    const nextIdx = (currentIndex + 1) % allAds.length;
    onSelectAd(allAds[nextIdx]);
  };

  useEffect(() => {
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === " ") {
        e.preventDefault();
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
          v.play();
          setIsPlaying(true);
        } else {
          v.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lenis, onClose, currentIndex]);

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

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    v.currentTime = pos * v.duration;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-background/95 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl h-[92vh] max-h-[92vh] bg-background border border-accent/40 shadow-[0_0_80px_rgba(0,240,255,0.2)] overflow-hidden brutalist-border flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        {/* Top Control Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-accent/20 bg-muted/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              REEL_PLAYER // [0{currentIndex + 1}/0{allAds.length}] :: {ad.categoryLabel.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              className="p-1.5 border border-white/20 hover:border-accent hover:text-accent transition-colors text-white/80"
              title="Previous Video (Left Arrow)"
              aria-label="Previous video"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goToNext}
              className="p-1.5 border border-white/20 hover:border-accent hover:text-accent transition-colors text-white/80"
              title="Next Video (Right Arrow)"
              aria-label="Next video"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 border border-accent/40 hover:bg-accent hover:text-background transition-colors text-accent ml-2"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto lg:overflow-hidden font-sans">
          {/* Left / Center 9:16 Video Stage */}
          <div className="lg:col-span-6 xl:col-span-7 bg-zinc-950 flex flex-col items-center justify-center relative p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="relative w-full max-w-[340px] md:max-w-[380px] aspect-[9/16] bg-black border border-white/20 shadow-2xl overflow-hidden group">
              <video
                ref={videoRef}
                src={ad.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Center Play/Pause button on click */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/90 text-background flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                    <Play size={28} className="ml-1 fill-background" />
                  </div>
                </div>
              )}

              {/* Bottom In-Video Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
                {/* Scrub line */}
                <div
                  onClick={handleSeek}
                  className="w-full h-1.5 bg-white/20 hover:h-2 transition-all cursor-pointer rounded-full overflow-hidden"
                >
                  <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/90">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="hover:text-accent transition-colors">
                      {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-white" />}
                    </button>
                    <button onClick={toggleMute} className="hover:text-accent transition-colors">
                      {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-accent" />}
                    </button>
                    <span>
                      {currentTimeStr} / {durationStr}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase text-accent font-semibold">
                    {ad.aspect}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Info Details Panel */}
          <div className="lg:col-span-6 xl:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto bg-background/50">
            <div className="space-y-6">
              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 border text-xs font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5 ${ad.accentBadge}`}
                >
                  {ad.category === "Pixar" ? <Sparkles size={12} /> : <Clapperboard size={12} />}
                  {ad.categoryLabel}
                </span>

                <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 font-mono text-[10px] tracking-wider uppercase">
                  AI VIDEO AD
                </span>

                <span className="px-2.5 py-1 bg-accent/10 border border-accent/30 text-accent font-mono text-[10px] tracking-wider uppercase">
                  AI COMMERCIAL AD
                </span>
              </div>

              {/* Title & Brand */}
              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                  Brand // {ad.brand}
                </span>
                <h3 className="text-2xl sm:text-4xl font-display uppercase tracking-tight text-white leading-tight">
                  {ad.title}
                </h3>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider block">
                  Creative Direction & Overview:
                </span>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {ad.description}
                </p>
              </div>

              {/* Creative Direction & Production Pipeline */}
              <div className="p-4 bg-muted/20 border border-accent/20 space-y-1.5">
                <span className="text-[11px] font-mono text-accent uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                  <Tv size={13} /> Creative Pipeline // Production Workflow:
                </span>
                <p className="text-xs text-white/80 font-mono leading-relaxed">
                  {ad.creativePipeline}
                </p>
              </div>

              {/* Production Tags */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                  Production Tags & Taxonomy:
                </span>
                <div className="flex flex-wrap gap-2">
                  {ad.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white/5 border border-white/15 text-white/80 font-mono text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Google Drive Vault Link */}
              <a
                href="https://drive.google.com/drive/folders/1e0LE6UgU2SmIJZ46MR8I3XfoZtyC2_9b?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent text-accent hover:text-background font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <FolderOpen size={14} className="group-hover:scale-110 transition-transform" />
                <span>Open Google Drive Video Vault</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Bottom Quick Reel Selector */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block">
                Quick Browse All Reels:
              </span>
              <div className="grid grid-cols-7 gap-2">
                {allAds.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectAd(item)}
                    className={`relative aspect-[9/16] border transition-all overflow-hidden brutalist-border ${item.id === ad.id
                        ? "border-accent ring-1 ring-accent"
                        : "border-white/20 opacity-60 hover:opacity-100 hover:border-white"
                      }`}
                    title={item.title}
                  >
                    <video
                      src={item.videoUrl}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center font-mono text-[9px] text-white font-bold">
                      0{idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main AI Video Ads Section Component
export default function AiVideoAds() {
  const [activeCategory, setActiveCategory] = useState<"all" | "UGC" | "Pixar">("all");
  const [activeModalAd, setActiveModalAd] = useState<VideoAd | null>(null);

  const filteredAds = videoAds.filter((ad) => {
    if (activeCategory === "all") return true;
    return ad.category === activeCategory;
  });

  return (
    <div id="ai-video-ads" className="w-full mt-24 pt-20 border-t border-border">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              CREATIVE_STUDIO // AI_VIDEO_PRODUCTIONS
            </span>
          </div>

          <h3 className="text-3xl sm:text-5xl md:text-7xl font-display uppercase tracking-tight text-white">
            AI Video <span className="text-accent">ADS</span>
          </h3>

          <p className="text-muted-foreground font-sans max-w-xl text-sm sm:text-base">
            Generative AI commercial video productions engineered for high-conversion marketing.
            Spanning stylized <span className="text-white font-semibold">Pixar 3D Animation</span> and high-retention <span className="text-white font-semibold">UGC (User Generated Content)</span> ads.
          </p>
        </motion.div>

        {/* Actions & Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Segmented Category Filter Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-muted/40 backdrop-blur-md border border-white/10 rounded-xl">
            {[
              { id: "all", label: "All Commercials", count: videoAds.length },
              { id: "UGC", label: "UGC Ads", count: videoAds.filter((a) => a.category === "UGC").length },
              { id: "Pixar", label: "Pixar Animated", count: videoAds.filter((a) => a.category === "Pixar").length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as "all" | "UGC" | "Pixar")}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 uppercase font-mono text-xs tracking-wider transition-all duration-300 rounded-lg flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-accent text-background font-semibold shadow-[0_0_20px_rgba(0,240,255,0.35)]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-sm font-bold ${
                    activeCategory === cat.id
                      ? "bg-black/25 text-black"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  0{cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Google Drive Link Button */}
          <a
            href="https://drive.google.com/drive/folders/1e0LE6UgU2SmIJZ46MR8I3XfoZtyC2_9b?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2.5 border border-white/15 hover:border-accent/60 bg-muted/40 hover:bg-accent/10 text-white/80 hover:text-accent font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] group"
            title="Open Google Drive Video Vault"
          >
            <FolderOpen size={14} className="group-hover:scale-110 transition-transform text-accent" />
            <span>Google Drive</span>
            <ExternalLink size={13} className="opacity-60 group-hover:opacity-100" />
          </a>
        </div>
      </div>

      {/* Grid of 9:16 Vertical Video Reel Cards */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredAds.map((ad) => (
            <VideoCard
              key={ad.id}
              ad={ad}
              onOpenModal={(selectedAd) => setActiveModalAd(selectedAd)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Reel Lightbox Modal */}
      <AnimatePresence>
        {activeModalAd && (
          <VideoLightboxModal
            ad={activeModalAd}
            onClose={() => setActiveModalAd(null)}
            onSelectAd={(selected) => setActiveModalAd(selected)}
            allAds={filteredAds}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
