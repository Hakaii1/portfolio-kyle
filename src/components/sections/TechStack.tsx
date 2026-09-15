"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useInView } from "framer-motion";
import {
  Cpu,
  Zap,
  Code2,
  Database,
  Layout,
  Smartphone,
  Trophy,
  Lock,
  Sparkles,
  Gamepad2,
  Volume2,
  VolumeX,
  Film,
  ArrowRightLeft,
  Play,
  Maximize2,
  ExternalLink,
  Bot,
  Terminal,
  Video,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLenis } from "lenis/react";

// Asset paths
const ASSETS_PATH = "/assets/game/sprites.png";
const IDLE_FRAMES = [
  "/assets/game/idle-1.png",
  "/assets/game/idle-2.png",
  "/assets/game/idle-3.png",
  "/assets/game/idle-4.png",
];
const WALK_FRAMES = [
  "/assets/game/walk-1.png",
  "/assets/game/walk-2.png",
  "/assets/game/walk-3.png",
  "/assets/game/walk-4.png",
  "/assets/game/walk-5.png",
  "/assets/game/walk-6.png",
  "/assets/game/walk-7.png",
  "/assets/game/walk-8.png",
];
const JUMP_FRAMES = [
  "/assets/game/jump-1.png",
  "/assets/game/jump-2.png",
  "/assets/game/jump-3.png",
  "/assets/game/jump-4.png",
];
const FALLING_FRAMES = [
  "/assets/game/falling-1.png",
  "/assets/game/falling-2.png",
  "/assets/game/falling-3.png"
];
const CROUCH_FRAMES = [
  "/assets/game/crouch-1.png",
  "/assets/game/crouch-2.png",
];
const BACKGROUND_ASSET = "/assets/game/background.png";
const AI_BACKGROUND_ASSET = "/assets/game/ai-world-background.jpg";
const CYBER_GROUND_ASSET = "/assets/game/cyber-ground.png";
const CYBER_BLOCK_ASSET = "/assets/game/cyber-block.png";
const CYBER_ARCADE_ASSET = "/assets/game/cyber-arcade.png";
const PORTAL_GATE_ASSET = "/assets/game/portal-gate.png";

const PIPE_FRAMES = [
  "/assets/game/pipe-1.png",
  "/assets/game/pipe-2.png",
  "/assets/game/pipe-3.png",
  "/assets/game/pipe-4.png",
];
const BLOCK_IDLE = [
  "/assets/game/block-1.png",
  "/assets/game/block-2.png",
  "/assets/game/block-3.png",
  "/assets/game/block-4.png",
];
const BLOCK_HIT = [
  "/assets/game/block-5.png",
  "/assets/game/block-6.png",
  "/assets/game/block-7.png",
];
const FIRE_FRAMES = [
  "/assets/game/fire-1.png",
  "/assets/game/fire-2.png",
];

// Preload images to prevent flickering
const ALL_ASSETS = [
  ...IDLE_FRAMES,
  ...WALK_FRAMES,
  ...JUMP_FRAMES,
  ...PIPE_FRAMES,
  ...BLOCK_IDLE,
  ...BLOCK_HIT,
  BACKGROUND_ASSET,
  AI_BACKGROUND_ASSET,
  CYBER_GROUND_ASSET,
  CYBER_BLOCK_ASSET,
  CYBER_ARCADE_ASSET,
  PORTAL_GATE_ASSET,
  ...FALLING_FRAMES
];

export interface TechModule {
  name: string;
  category?: string;
  tag?: string;
  icon: React.ReactNode;
  desc: string;
  details: string;
  color: string;
  x: number;
  videoUrl?: string;
}

// World 1-1: Fullstack Dimension Data
const techData: TechModule[] = [
  {
    name: "HTML",
    category: "Web Foundation",
    tag: "Semantic Architecture",
    icon: <Code2 />,
    desc: "Blueprint of the web. Semantic structure for modern applications.",
    details: "The standard markup language used to create and structure websites. Think of it as the skeletal blueprint or scaffolding of a web page, defining where text, images, buttons, and links are positioned.",
    color: "#e34c26",
    x: 600
  },
  {
    name: "CSS",
    category: "Styling & Motion",
    tag: "Responsive Design",
    icon: <Layout />,
    desc: "The artistry of layout. Crafting responsive & dynamic interfaces.",
    details: "The design stylesheet of the web. It controls how a website looks—defining the layout, color schemes, modern spacing, fonts, animations, and visual presentation across mobile, tablet, and desktop screens.",
    color: "#264de4",
    x: 1000
  },
  {
    name: "JavaScript",
    category: "Scripting Engine",
    tag: "Browser Runtime",
    icon: <Zap />,
    desc: "The engine of interaction. Bringing pages to life with logic.",
    details: "The programming language that makes web pages interactive and alive. It handles the dynamic features of a website, such as animations, interactive forms, calculators, search boxes, and instant page updates.",
    color: "#f7df1e",
    x: 1400
  },
  {
    name: "React",
    category: "Frontend UI",
    tag: "Component System",
    icon: <Cpu />,
    desc: "Component architecture. Building scalable high-performance UIs.",
    details: "A widely-used tool for building user interfaces out of reusable building blocks. It allows websites to load and update information instantly on the screen without needing to reload the entire web page.",
    color: "#61dafb",
    x: 1800
  },
  {
    name: "PHP",
    category: "Server Backend",
    tag: "API & Workflows",
    icon: <Database />,
    desc: "Backend heavy-lifter. Powering robust server-side workflows.",
    details: "A server-side programming language used to handle the behind-the-scenes logic of websites. It communicates with the database to run features like user registration, accounts, logins, and online checkouts.",
    color: "#777bb4",
    x: 2200
  },
  {
    name: "Python",
    category: "Automation & AI",
    tag: "Scripting & Data",
    icon: <Code2 />,
    desc: "Versatile intelligence. Scripting, data, and ML automation.",
    details: "A clean and easy-to-read programming language. It is highly popular for data science, artificial intelligence, automation scripts, and server-side web application logic.",
    color: "#3776ab",
    x: 2600
  },
  {
    name: "Java",
    category: "Enterprise Systems",
    tag: "Multi-threaded Architecture",
    icon: <Cpu />,
    desc: "Enterprise backbone. Scalable multi-threaded architectures.",
    details: "A highly secure and reliable programming language used to build large-scale systems. It is the enterprise standard for banking software, database connections, and Android mobile applications.",
    color: "#007396",
    x: 3000
  },
  {
    name: "MS SQL",
    category: "Relational Data",
    tag: "Database Management",
    icon: <Database />,
    desc: "Data foundation. Organizing complex relational ecosystems.",
    details: "A database management system built by Microsoft. It acts as an organized digital filing cabinet that securely stores, searches, and organizes large amounts of company information for apps to access.",
    color: "#cc2927",
    x: 3400
  },
  {
    name: "Flutter",
    category: "Cross-Platform Mobile",
    tag: "iOS & Android",
    icon: <Smartphone />,
    desc: "Cross-platform fluidity. Cinematic mobile experiences.",
    details: "An app development kit created by Google. It allows developers to build beautiful, fast mobile applications for both Apple iOS and Google Android using a single shared codebase.",
    color: "#02569b",
    x: 3800
  },
  {
    name: "Dart",
    category: "Mobile Engine",
    tag: "Ahead-of-Time Compiled",
    icon: <Code2 />,
    desc: "Optimized for speed. Powering the Flutter UI framework.",
    details: "The programming language created by Google that powers Flutter. It is designed to run apps fast, ensuring very smooth animations, quick response times, and a fluid mobile user experience.",
    color: "#0175c2",
    x: 4200
  },
  {
    name: "Next.js",
    category: "Fullstack React",
    tag: "SSR & SEO Optimization",
    icon: <Zap />,
    desc: "The React Framework. Optimized for production and SEO.",
    details: "An advanced framework built on top of React that speeds up websites and optimizes them for Google searches. It pre-renders pages on the server so that websites load instantly for users.",
    color: "#ffffff",
    x: 4600
  }
];

// World 1-AI: Creative Dimension Data
const aiTechData: TechModule[] = [
  {
    name: "Midjourney v6",
    category: "AI Visual Synthesis",
    tag: "Aesthetic Staging & Prompting",
    icon: <Sparkles />,
    desc: "Photorealistic concept art, cinematic lighting, and precision commercial product staging.",
    details: "Mastery of high-parameter prompt engineering to generate ultra-consistent product photography, hero angles, and surreal visual compositions for viral commercial ads.",
    color: "#00f0ff",
    x: 500,
    videoUrl: "/assets/Videos/Pixar/Nivea Ad.mp4"
  },
  {
    name: "Runway Gen-3",
    category: "Video Diffusion & Camera",
    tag: "3D Camera Pan & Motion",
    icon: <Zap />,
    desc: "Cinematic camera trajectories, dynamic slow-motion physics, and ultra-smooth fluid video synthesis.",
    details: "Utilizing Gen-3 Alpha's motion brush and camera control parameters to produce high-velocity commercial action sequences and seamless macro product transitions.",
    color: "#ff007f",
    x: 900,
    videoUrl: "/assets/Videos/UGC/Headphone Ad.mp4"
  },
  {
    name: "Kling AI",
    category: "Physical Coherence Engine",
    tag: "Realistic Physics & Motion",
    icon: <Cpu />,
    desc: "Hyper-realistic real-world gravity simulation, anatomical continuity, and dynamic human action.",
    details: "Industry-leading motion consistency for human gestures, athletic movements, and footwear/apparel physics without digital warping or temporal jitter.",
    color: "#a855f7",
    x: 1300,
    videoUrl: "/assets/Videos/UGC/Sneaker-Ad.mp4"
  },
  {
    name: "Higgsfield",
    category: "Generative Video Dynamics",
    tag: "Cinematic Motion & Control",
    icon: <Film />,
    desc: "Advanced cinematic video generation, realistic human motion, and fine-tuned camera physics.",
    details: "Cutting-edge text-to-video and image-to-video foundation models engineered for realistic motion dynamics, complex human character performance, and cinematic camera movement for next-gen commercial video ads.",
    color: "#f43f5e",
    x: 1700
  },
  {
    name: "Seedance",
    category: "Visual & Motion Synthesis",
    tag: "ByteDance Video AI",
    icon: <Video />,
    desc: "High-resolution video synthesis, fluid motion coherence, and expressive character acting.",
    details: "Advanced multimodal video generation engine delivering high-frame-rate fluidity, temporal stability, dynamic lighting transformations, and viral short-form creative production.",
    color: "#06b6d4",
    x: 2100
  },
  {
    name: "ElevenLabs",
    category: "AI Voice & Sound Design",
    tag: "Neural Voice Acting & SFX",
    icon: <Volume2 />,
    desc: "Hyper-expressive commercial voiceovers, localized regional accents, and sound design.",
    details: "Custom-trained neural voice models that convey authentic human emotions, pacing, and comedic or dramatic inflection tailored to specific advertising buyer personas.",
    color: "#38bdf8",
    x: 2500,
    videoUrl: "/assets/Videos/UGC/Serum-Ad.mp4"
  },
  {
    name: "Pixar 3D Ads",
    category: "Prompt-to-CGI Animation",
    tag: "Disney/Pixar Stylized 3D Ads",
    icon: <Gamepad2 />,
    desc: "Whimsical Pixar-style 3D animated character commercials with expressive narrative arcs.",
    details: "End-to-end generation of stylized 3D mascot commercials, combining Pixar aesthetics with heartwarming character stories that drive emotional connection and brand recall.",
    color: "#f59e0b",
    x: 2900,
    videoUrl: "/assets/Videos/Pixar/Bed foam Ad (Music).mp4"
  },
  {
    name: "UGC Viral Ads",
    category: "E-Commerce Performance",
    tag: "High-Converting 3s Hooks",
    icon: <Film />,
    desc: "Viral hook strategy, problem-solution storytelling, and organic-looking conversion creative.",
    details: "Data-backed TikTok and Instagram Reels ad strategy designed to break banner blindness within the first 3 seconds, driving record CTR and e-commerce ROAS.",
    color: "#10b981",
    x: 3300,
    videoUrl: "/assets/Videos/UGC/Moisturizer Ad.mp4"
  },
  {
    name: "CapCut",
    category: "Commercial Post-Production",
    tag: "Kinetic Captions & Sound FX",
    icon: <Code2 />,
    desc: "Frame-accurate beat sync, punch-in cuts, motion graphics overlays, and commercial audio mastering.",
    details: "Professional non-linear video editing with kinetic typography, riser sound effects, whooshes, and color grading optimized for mobile feed retention.",
    color: "#ec4899",
    x: 3700,
    videoUrl: "/assets/Videos/UGC/Fleece Lined Tights Ad.mp4"
  },
  {
    name: "Claude Code",
    category: "Agentic Software Engineering",
    tag: "Anthropic Frontier Agent",
    icon: <Terminal />,
    desc: "Autonomous terminal agent for complex codebase navigation, multi-file refactoring, and automated workflows.",
    details: "Deep integration with Anthropic's frontier coding agent to automate high-velocity engineering workflows, multi-file architecture refactoring, and automated testing suites.",
    color: "#d97706",
    x: 4100
  },
  {
    name: "Gemini",
    category: "Multimodal AI & Long Context",
    tag: "Google DeepMind Frontier Model",
    icon: <Sparkles />,
    desc: "Million-token context windows, multimodal visual understanding, and deep technical synthesis.",
    details: "Harnessing Google's frontier multimodal models for massive context codebases, complex video/audio analysis, high-speed API integrations, and intelligent automation systems.",
    color: "#3b82f6",
    x: 4500
  },
  {
    name: "OpenAI",
    category: "Frontier LLM & Generative AI",
    tag: "GPT-4o & Reasoning Architecture",
    icon: <Bot />,
    desc: "High-precision reasoning, prompt engineering architectures, and multimodal content pipelines.",
    details: "Enterprise prompt architecture and API integration across GPT-4o and reasoning models (o1/o3-mini) for automated content ideation, scriptwriting, and intelligent conversational agents.",
    color: "#10a37f",
    x: 4900
  }
];

// Live In-World Cyber Arcade Stations for World 1-AI
const AI_ARCADE_KIOSKS = [
  {
    id: "kiosk-pixar",
    x: 1500,
    title: "PIXAR 3D REEL",
    sub: "Stylized CGI Commercial",
    videoSrc: "/assets/Videos/Pixar/Bed foam Ad (Music).mp4",
    accentColor: "#f59e0b"
  },
  {
    id: "kiosk-ugc-sneaker",
    x: 3100,
    title: "VIRAL SNEAKER UGC",
    sub: "Performance Ad Creative",
    videoSrc: "/assets/Videos/UGC/Sneaker-Ad.mp4",
    accentColor: "#00f0ff"
  },
  {
    id: "kiosk-ugc-skincare",
    x: 4700,
    title: "SKINCARE UGC REEL",
    sub: "Viral Hook Creative",
    videoSrc: "/assets/Videos/UGC/Moisturizer Ad.mp4",
    accentColor: "#10b981"
  }
];

export default function TechStack() {
  const [currentWorld, setCurrentWorld] = useState<"code" | "ai">("code");
  const [warpPhase, setWarpPhase] = useState<"idle" | "in" | "flash" | "out">("idle");
  const [warpDirection, setWarpDirection] = useState<"to-ai" | "to-code">("to-ai");
  const [isEnteringTunnel, setIsEnteringTunnel] = useState(false);
  const [unmutedKioskId, setUnmutedKioskId] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<{ url: string; title: string } | null>(null);
  const [isArchiveMinimized, setIsArchiveMinimized] = useState(false);

  const lenis = useLenis();
  const sectionContainerRef = useRef<HTMLElement>(null);
  const isTechInView = useInView(sectionContainerRef, { amount: 0.1 });
  const isTechInViewRef = useRef(isTechInView);
  isTechInViewRef.current = isTechInView;

  // Level dimensions
  const CODE_LEVEL_WIDTH = 5500;
  const AI_LEVEL_WIDTH = 5600;
  const currentLevelWidth = currentWorld === "code" ? CODE_LEVEL_WIDTH : AI_LEVEL_WIDTH;
  const activeList = currentWorld === "code" ? techData : aiTechData;

  const motionX = useMotionValue(200);
  const motionY = useMotionValue(0);
  const motionCameraX = useMotionValue(0);
  const bgTransform = useTransform(motionCameraX, x => `translateX(-${x * 0.08}px) scale(1.8)`);
  const levelTransform = useTransform(motionCameraX, x => `translateX(-${x}px)`);
  const playerBottom = useTransform(motionY, y => y + 45);
  const mapMarkerLeft = useTransform(motionX, x => `${(Math.max(0, x) / currentLevelWidth) * 100}%`);

  // Physics Ref
  const physicsRef = useRef({
    x: 200,
    y: 0,
    vx: 0,
    vy: 0,
    cameraX: 0,
    lastTime: 0,
    isEntering: false,
    hasBounced: true,
    targetScreenX: -1,
    isJumping: false,
    isWalking: false
  });

  const keysPressed = useRef<Set<string>>(new Set());
  const [facing, setFacing] = useState<"left" | "right">("right");
  const facingRef = useRef<"left" | "right">("right");

  const updateFacing = useCallback((newFacing: "left" | "right") => {
    if (facingRef.current !== newFacing) {
      facingRef.current = newFacing;
      setFacing(newFacing);
    }
  }, []);
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const [fireballs, setFireballs] = useState<{ id: number; x: number; y: number; vx: number }[]>([]);
  const [frame, setFrame] = useState(0);

  // Separate hit tracking for both worlds
  const [codeBlocksHit, setCodeBlocksHit] = useState<string[]>([]);
  const [aiBlocksHit, setAiBlocksHit] = useState<string[]>([]);
  const activeBlocksHit = currentWorld === "code" ? codeBlocksHit : aiBlocksHit;

  const [activeTech, setActiveTech] = useState<{ tech: TechModule; id: number } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [selectedTech, setSelectedTech] = useState<TechModule | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [isMarioVisible, setIsMarioVisible] = useState(true);

  // Constants
  const GRAVITY = -0.6;
  const JUMP_FORCE = 14;
  const MOVE_SPEED = 13;
  const BLOCK_Y = 240;
  const PLAYER_SIZE = 128;

  // Preload assets
  useEffect(() => {
    ALL_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Sprite animation loop
  useEffect(() => {
    const animInterval = setInterval(() => {
      setFrame(f => (f + 1) % 8);
    }, 100);
    return () => clearInterval(animInterval);
  }, []);

  // Broadcast listeners to toggle mario duplicate state
  useEffect(() => {
    const handleHide = () => setIsMarioVisible(false);
    const handleShow = () => setIsMarioVisible(true);
    window.addEventListener("mario-hide", handleHide);
    window.addEventListener("mario-show", handleShow);
    return () => {
      window.removeEventListener("mario-hide", handleHide);
      window.removeEventListener("mario-show", handleShow);
    };
  }, []);

  // Warp trigger with cinematic in and out animations
  const triggerWarp = useCallback((destination: "code" | "ai") => {
    if (warpPhase !== "idle") return;

    setWarpDirection(destination === "ai" ? "to-ai" : "to-code");
    setWarpPhase("in");

    // Freeze inputs during warp sequence
    keysPressed.current.clear();
    const p = physicsRef.current;
    p.vx = 0;
    p.vy = 0;

    // Step 1: Mario spirals into vortex (400ms)
    setTimeout(() => {
      // Step 2: Screen flash and interdimensional warp tunnel (250ms)
      setWarpPhase("flash");
      setCurrentWorld(destination);

      // Reposition Mario at destination portal entrance
      if (destination === "ai") {
        p.x = 220;
        p.y = 110;
        p.vx = 0;
        p.vy = 12;
        p.cameraX = 0;
        updateFacing("right");
      } else {
        p.x = 4920;
        p.y = 110;
        p.vx = 0;
        p.vy = 12;
        p.cameraX = Math.max(0, 5050 - window.innerWidth / 2);
        updateFacing("left");
      }

      motionX.set(p.x);
      motionY.set(p.y);
      motionCameraX.set(p.cameraX);

      // Step 3: Burst out of destination portal gate with shockwave
      setTimeout(() => {
        setWarpPhase("out");
        p.isJumping = true;
        setIsJumping(true);

        // Step 4: Resume normal gameplay
        setTimeout(() => {
          setWarpPhase("idle");
        }, 550);
      }, 250);
    }, 450);
  }, [warpPhase, motionX, motionY, motionCameraX]);

  const handleFire = useCallback(() => {
    if (warpPhase !== "idle") return;
    if (isCrouching) return;
    setIsFiring(true);
    setHasMoved(true);
    const p = physicsRef.current;
    const direction = facing === "right" ? 1 : -1;

    setFireballs(prev => [...prev, {
      id: Date.now(),
      x: p.x + (direction === 1 ? 95 : 0),
      y: p.y + 0,
      vx: direction * 15
    }]);

    setTimeout(() => setIsFiring(false), 300);
  }, [facing, warpPhase, isCrouching]);

  const handleControlStart = useCallback((action: "left" | "right" | "jump" | "fire", e?: React.SyntheticEvent) => {
    if (e && e.cancelable) e.preventDefault();
    if (warpPhase !== "idle") return;
    setHasMoved(true);
    if (action === "left") {
      keysPressed.current.add("touch-left");
      updateFacing("left");
    } else if (action === "right") {
      keysPressed.current.add("touch-right");
      updateFacing("right");
    } else if (action === "jump") {
      keysPressed.current.add("touch-jump");
    } else if (action === "fire") {
      handleFire();
    }
  }, [handleFire, warpPhase, updateFacing]);

  const handleControlEnd = useCallback((action: "left" | "right" | "jump", e?: React.SyntheticEvent) => {
    if (e && e.cancelable) e.preventDefault();
    if (action === "left") keysPressed.current.delete("touch-left");
    if (action === "right") keysPressed.current.delete("touch-right");
    if (action === "jump") keysPressed.current.delete("touch-jump");
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (warpPhase === "in" || warpPhase === "flash") return;
    const key = e.key.toLowerCase();
    keysPressed.current.add(key);

    setHasMoved(true);

    if (key === "arrowleft" || key === "a") updateFacing("left");
    if (key === "arrowright" || key === "d") updateFacing("right");
    if (key === "s" || key === "arrowdown" || key === "c") setIsCrouching(true);
    if (key === "f") handleFire();

    // Portal entry with E or Enter
    if (key === "e" || key === "enter") {
      const p = physicsRef.current;
      const playerCenterX = p.x + PLAYER_SIZE / 2;
      if (currentWorld === "code" && playerCenterX > 4920 && playerCenterX < 5200 && p.y <= 90) {
        triggerWarp("ai");
      } else if (currentWorld === "ai") {
        if ((playerCenterX > 5250 && playerCenterX < 5480 && p.y <= 90) || (playerCenterX < 250 && p.y <= 90)) {
          triggerWarp("code");
        }
      }
    }
  }, [handleFire, warpPhase, currentWorld, triggerWarp, updateFacing]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    keysPressed.current.delete(key);
    if (key === "s" || key === "arrowdown" || key === "c") setIsCrouching(false);
  }, []);

  const update = useCallback((time: number) => {
    const p = physicsRef.current;

    if (!p.lastTime) p.lastTime = time;
    const deltaTime = (time - p.lastTime) / 16.666;
    p.lastTime = time;

    const dt = Math.min(deltaTime, 3);
    const keys = keysPressed.current;

    // Movement allowed when not in deep warp suction/flash
    if (warpPhase === "idle" || warpPhase === "out") {
      let targetVx = 0;
      const isMovingLeft = keys.has("a") || keys.has("arrowleft") || keys.has("touch-left");
      const isMovingRight = keys.has("d") || keys.has("arrowright") || keys.has("touch-right");

      if (isMovingLeft && !isMovingRight) {
        targetVx = -MOVE_SPEED;
        updateFacing("left");
      } else if (isMovingRight && !isMovingLeft) {
        targetVx = MOVE_SPEED;
        updateFacing("right");
      }

      if (isCrouching && p.y <= 0) targetVx = 0;
      p.vx = targetVx;

      if ((keys.has("w") || keys.has("arrowup") || keys.has(" ") || keys.has("touch-jump")) && !p.isJumping) {
        p.vy = JUMP_FORCE;
        p.isJumping = true;
        setIsJumping(true);
      }
    }

    // Apply physics
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += GRAVITY * dt;

    // Ground collision
    if (p.y <= 0 && p.vy <= 0) {
      p.y = 0;
      if (!p.hasBounced && p.vy < -15) {
        p.vy = 12;
        p.hasBounced = true;
      } else {
        p.vy = 0;
        if (p.isJumping) {
          p.isJumping = false;
          setIsJumping(false);
        }
      }
    }

    // World 2 Platform Collision: Mario can jump and stand on top of arcade cabinets!
    if (currentWorld === "ai") {
      const playerCenterX = p.x + PLAYER_SIZE / 2;
      AI_ARCADE_KIOSKS.forEach(kiosk => {
        const kioskLeft = kiosk.x - 10;
        const kioskRight = kiosk.x + 190;
        const kioskPlatformY = 190; // Top platform height
        if (playerCenterX > kioskLeft && playerCenterX < kioskRight) {
          if (p.y >= kioskPlatformY - 15 && p.y <= kioskPlatformY + 25 && p.vy <= 0) {
            p.y = kioskPlatformY;
            p.vy = 0;
            if (p.isJumping) {
              p.isJumping = false;
              setIsJumping(false);
            }
          }
        }
      });
    }

    // Level horizontal bounds
    const maxLevelX = currentWorld === "code" ? CODE_LEVEL_WIDTH : AI_LEVEL_WIDTH;
    if (p.x < 0) p.x = 0;
    if (p.x > maxLevelX - PLAYER_SIZE) p.x = maxLevelX - PLAYER_SIZE;

    // Walking animation state
    const isNowWalking = Math.abs(p.vx) > 0;
    if (isNowWalking !== p.isWalking) {
      p.isWalking = isNowWalking;
      setIsWalking(isNowWalking);
    }

    // Block Collision (Headbutt)
    if (p.vy > 0 && warpPhase === "idle") {
      const playerTop = p.y + 155;
      const playerCenterX = p.x + PLAYER_SIZE / 2;
      const currentList = currentWorld === "code" ? techData : aiTechData;

      currentList.forEach((tech) => {
        if (
          playerCenterX > tech.x - 30 &&
          playerCenterX < tech.x + 110 &&
          playerTop >= BLOCK_Y &&
          playerTop <= BLOCK_Y + 50
        ) {
          if (currentWorld === "code") {
            setCodeBlocksHit(prev => prev.includes(tech.name) ? prev : [...prev, tech.name]);
          } else {
            setAiBlocksHit(prev => prev.includes(tech.name) ? prev : [...prev, tech.name]);
          }
          setActiveTech({ tech, id: Date.now() });
          p.vy = -3;
          p.y = BLOCK_Y - 156;
        }
      });
    }

    // Proximity trigger for Warp Portals
    if (warpPhase === "idle") {
      const playerCenterX = p.x + PLAYER_SIZE / 2;

      // In World 1-1: Warp Gate at x = 5050
      if (currentWorld === "code" && playerCenterX > 4970 && playerCenterX < 5150 && p.y <= 60) {
        if (keys.has("w") || keys.has("arrowup") || keys.has("enter") || keys.has("e")) {
          triggerWarp("ai");
        }
      }

      // In World 1-AI: Return Gate at x = 5350
      if (currentWorld === "ai") {
        if (playerCenterX > 5270 && playerCenterX < 5450 && p.y <= 60) {
          if (keys.has("w") || keys.has("arrowup") || keys.has("enter") || keys.has("e")) {
            triggerWarp("code");
          }
        }
      }
    }

    // Camera follow calculation
    const screenWidth = window.innerWidth;
    let currentTargetScreenX = screenWidth / 2 - PLAYER_SIZE / 2;
    if (p.targetScreenX !== undefined && p.targetScreenX !== -1) {
      if (Math.abs(p.vx) > 0 && p.y <= 0) {
        p.targetScreenX += (currentTargetScreenX - p.targetScreenX) * 0.05 * dt;
        if (Math.abs(p.targetScreenX - currentTargetScreenX) < 5) {
          p.targetScreenX = -1;
        }
      }
      currentTargetScreenX = p.targetScreenX !== -1 ? p.targetScreenX : currentTargetScreenX;
    }

    const targetCameraX = Math.max(0, Math.min(p.x - currentTargetScreenX, maxLevelX - screenWidth));
    p.cameraX += (targetCameraX - p.cameraX) * 0.1 * dt;

    (window as any).marioTechStackScreenX = p.x - p.cameraX;

    // Sync Motion Values
    motionX.set(p.x);
    motionY.set(p.y);
    motionCameraX.set(p.cameraX);

    // Fireball movement
    setFireballs(prev => {
      return prev
        .map(f => ({ ...f, x: f.x + f.vx * dt }))
        .filter(f => {
          const screenX = f.x - p.cameraX;
          return screenX > -300 && screenX < window.innerWidth + 300;
        });
    });

    requestRef.current = requestAnimationFrame(update);
  }, [motionX, motionY, motionCameraX, isCrouching, warpPhase, currentWorld, triggerWarp]);

  // Active tech card auto-dismiss
  useEffect(() => {
    if (activeTech) {
      const timer = setTimeout(() => {
        setActiveTech(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeTech]);

  // Tunnel navigation to contacts
  useEffect(() => {
    if (isEnteringTunnel && lenis) {
      const timer = setTimeout(() => {
        lenis.scrollTo('#contact', { duration: 2, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isEnteringTunnel, lenis]);

  // Listeners
  useEffect(() => {
    const handleReturn = (e: any) => {
      const returnX = e.detail?.marioX ?? 200;
      setIsEnteringTunnel(false);
      setIsMarioVisible(true);
      physicsRef.current.isEntering = false;
      physicsRef.current.hasBounced = false;

      let newX = physicsRef.current.cameraX + returnX;
      if (newX < 0) newX = 0;
      if (newX > 5500 - 128) newX = 5500 - 128;

      physicsRef.current.x = newX;
      physicsRef.current.y = -1000;
      physicsRef.current.vy = 35;
      physicsRef.current.vx = 0;
      physicsRef.current.targetScreenX = returnX;

      physicsRef.current.isJumping = true;
      setIsJumping(true);
      motionX.set(physicsRef.current.x);
      motionY.set(physicsRef.current.y);
      motionCameraX.set(physicsRef.current.cameraX);
    };

    window.addEventListener("mario-return", handleReturn);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    requestRef.current = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("mario-return", handleReturn);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [handleKeyDown, handleKeyUp, update, motionX, motionY, motionCameraX]);

  return (
    <section ref={sectionContainerRef} id="tech-stack" className="relative h-screen bg-transparent overflow-hidden border-y border-white/5">
      {/* City Background Layer (World 1: Code) */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${BACKGROUND_ASSET})`,
          opacity: currentWorld === "code" ? 0.75 : 0,
          transform: bgTransform
        }}
      />

      {/* Cyberpunk Futuristic Background Layer (World 1-AI: Creative Dimension) */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${AI_BACKGROUND_ASSET})`,
          opacity: currentWorld === "ai" ? 0.85 : 0,
          transform: bgTransform
        }}
      />
      <div className={`absolute inset-0 z-0 transition-colors duration-700 ${currentWorld === "code" ? "bg-background/40" : "bg-black/50"}`} />

      {/* INTERDIMENSIONAL WARP FULL-SCREEN OVERLAY & VFX */}
      <AnimatePresence>
        {warpPhase !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Hyperspace Radial Streaks */}
            <motion.div
              animate={{
                scale: [1, 3],
                rotate: [0, warpDirection === "to-ai" ? 180 : -180],
                opacity: [0.6, 1, 0]
              }}
              transition={{ duration: 0.6, ease: "easeIn" }}
              className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.7),_rgba(255,0,128,0.5),_transparent_70%)] blur-md"
            />

            {/* Dimensional Hyperspace Tunnel Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ width: 4, height: 10, opacity: 0 }}
                  animate={{
                    width: [10, 800],
                    height: [4, 12],
                    opacity: [0, 1, 0],
                    x: [0, (Math.cos((i / 16) * Math.PI * 2) * 900)],
                    y: [0, (Math.sin((i / 16) * Math.PI * 2) * 900)]
                  }}
                  transition={{ duration: 0.7, delay: i * 0.02, ease: "easeInOut" }}
                  className="absolute bg-gradient-to-r from-accent via-accent-secondary to-white shadow-[0_0_20px_#00f0ff]"
                />
              ))}
            </div>

            {/* Dimensional Flash */}
            {warpPhase === "flash" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-white z-50"
              />
            )}

            {/* Warp HUD Notification */}
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="relative z-40 px-6 py-3 rounded-2xl bg-black/90 border-2 border-accent shadow-[0_0_50px_rgba(0,240,255,0.8)] text-center"
            >
              <div className="flex items-center gap-2 justify-center mb-1">
                <Sparkles size={16} className="text-accent animate-spin" />
                <span className="font-mono text-xs text-accent uppercase tracking-[0.3em] font-bold">
                  {warpDirection === "to-ai" ? "INTERDIMENSIONAL_WARP // SECTOR_AI" : "DIMENSIONAL_WARP // SECTOR_CODE"}
                </span>
              </div>
              <p className="font-display text-2xl uppercase tracking-wider text-white">
                {warpDirection === "to-ai" ? "ENTERING WORLD 1-AI" : "RETURNING TO WORLD 1-1"}
              </p>
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest mt-1 block">
                {warpDirection === "to-ai" ? "Creative AI Ad Suite Initialized" : "Fullstack Architecture Sync Loaded"}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full flex flex-col pt-14 sm:pt-20 z-10 overscroll-none overflow-hidden">
        {/* Prominent Top-Right Interdimensional Warp Action Button */}
        <div className="absolute top-16 sm:top-20 right-4 sm:right-8 z-[70] pointer-events-auto">
          <motion.button
            onClick={() => triggerWarp(currentWorld === "code" ? "ai" : "code")}
            disabled={warpPhase !== "idle"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: currentWorld === "code"
                ? [
                    "0 0 15px rgba(0, 240, 255, 0.4)",
                    "0 0 35px rgba(0, 240, 255, 0.85)",
                    "0 0 15px rgba(0, 240, 255, 0.4)"
                  ]
                : [
                    "0 0 15px rgba(217, 70, 239, 0.4)",
                    "0 0 35px rgba(217, 70, 239, 0.85)",
                    "0 0 15px rgba(217, 70, 239, 0.4)"
                  ]
            }}
            transition={{
              boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className={`relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl border-2 font-mono text-xs uppercase tracking-wider flex items-center gap-3 cursor-pointer transition-all duration-300 backdrop-blur-xl ${
              currentWorld === "code"
                ? "bg-gradient-to-r from-cyan-950/90 via-zinc-950/95 to-cyan-950/90 border-accent text-accent hover:text-white"
                : "bg-gradient-to-r from-purple-950/90 via-zinc-950/95 to-fuchsia-950/90 border-fuchsia-400 text-fuchsia-300 hover:text-white"
            }`}
          >
            {/* Ambient Shimmer Sweep */}
            <motion.div
              animate={{ x: ["-150%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Glowing Action Icon with Ping Radar */}
            <div className="relative flex items-center justify-center shrink-0">
              {currentWorld === "code" ? (
                <>
                  <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                    <Sparkles className="w-4 h-4 text-accent animate-spin" style={{ animationDuration: "8s" }} />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                  </span>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                    <ArrowRightLeft className="w-4 h-4 text-fuchsia-300 animate-pulse" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-400"></span>
                  </span>
                </>
              )}
            </div>

            {/* Label Block */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider drop-shadow-[0_0_10px_currentColor]">
                  {currentWorld === "code" ? "WARP TO WORLD 1-AI" : "RETURN TO WORLD 1-1"}
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-white/60 font-semibold">
                {currentWorld === "code" ? "✦ AI VIDEO CREATIVE LAB" : "✦ FULLSTACK DEV SECTOR"}
              </span>
            </div>
          </motion.button>
        </div>

        <div className="container mx-auto px-4 flex flex-col items-center mb-4 sm:mb-8">

          {/* Tactical Holographic HUD */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-3xl mb-3 sm:mb-6 group px-2 sm:px-0"
          >
            <div className={`backdrop-blur-md border px-4 sm:px-6 py-2.5 rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.4)] transition-all duration-500 ${currentWorld === "code"
                ? "bg-background/25 border-white/10"
                : "bg-purple-950/20 border-accent/30 shadow-[0_0_40px_rgba(0,240,255,0.15)]"
              }`}>
              {/* World Switcher Header */}
              <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${currentWorld === "code" ? "bg-accent shadow-[0_0_8px_#00f0ff]" : "bg-purple-400 shadow-[0_0_8px_#c084fc]"
                    }`} />
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] font-bold text-white/80">
                    {currentWorld === "code" ? "WORLD 1-1 // FULLSTACK" : "WORLD 1-AI // CREATIVE LAB"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-accent">
                    [{activeBlocksHit.length}/{activeList.length}] SYNCED
                  </span>
                </div>
              </div>

              {/* Progress Band with Minimap Dots */}
              <div className="relative h-9 flex items-center px-2">
                <div className="absolute inset-x-0 h-[1px] bg-white/10 rounded-full" />

                <motion.div
                  animate={{ left: ["-10%", "110%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent z-10"
                />

                <motion.div
                  style={{ left: mapMarkerLeft }}
                  className="absolute z-20 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1 h-5 bg-accent shadow-[0_0_15px_#00f0ff] rounded-full"
                />

                {activeList.map((t) => {
                  const isSynced = activeBlocksHit.includes(t.name);
                  return (
                    <div key={t.name} className="absolute -translate-x-1/2" style={{ left: `${(t.x / currentLevelWidth) * 100}%` }}>
                      <button
                        onClick={() => setSelectedTech(t)}
                        className="relative p-1 rounded-md bg-background/80 border border-white/10 hover:border-accent/40 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
                        style={{ color: isSynced ? t.color : "rgba(255,255,255,0.25)" }}
                        title={t.name}
                      >
                        <div className="scale-[0.55] origin-center">
                          {t.icon}
                        </div>
                        {!isSynced && (
                          <div className="absolute -top-1 -right-1 bg-background border border-white/20 rounded-full p-0.5 scale-[0.5] text-white/30 group-hover:text-accent group-hover:border-accent/30 transition-all">
                            <Lock size={8} />
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40 rounded-br-xl" />
            </div>
          </motion.div>

          <motion.h2 className="text-3xl sm:text-5xl md:text-7xl font-display uppercase tracking-tighter text-glow text-center">
            {currentWorld === "code" ? (
              <>Tech<span className="text-accent">Stacks</span></>
            ) : (
              <>Creative<span className="text-accent">Dimension</span></>
            )}
          </motion.h2>

          <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 justify-center items-center px-2">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0, 240, 255, 0.15)",
                  "0 0 25px rgba(0, 240, 255, 0.4)",
                  "0 0 10px rgba(0, 240, 255, 0.15)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="px-4 py-1 bg-accent/15 border border-accent/40 text-accent font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 rounded-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="font-bold">
                {currentWorld === "code"
                  ? (activeBlocksHit.length > 0 ? "Fullstack Data Synced! Enter Portal for World 1-AI" : "Headbutt blocks to discover skills")
                  : (activeBlocksHit.length > 0 ? "AI Creative Assets Unlocked! Headbutt blocks to decrypt" : "Hit cyber blocks to reveal AI skills")}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Side Protocol Archive Drawer (Minimizable) */}
        <div
          className="hidden xl:block absolute left-6 top-32 z-50 pointer-events-auto"
          onWheel={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            {isArchiveMinimized ? (
              <motion.button
                key="minimized-pill"
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsArchiveMinimized(false)}
                className="flex items-center gap-2.5 px-3 py-2 bg-background/90 backdrop-blur-md border border-white/15 hover:border-accent/60 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] group cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                title="Expand Unlocked Skills Archive"
              >
                <div className="w-7 h-7 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Trophy size={14} className="animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white group-hover:text-accent transition-colors">
                    {currentWorld === "code" ? "Protocol Archive" : "Creative Vault"}
                  </span>
                  <span className="text-[8px] font-mono text-accent font-bold">
                    [{activeBlocksHit.length}/{activeList.length}] Unlocked
                  </span>
                </div>
                <div className="w-5 h-5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:text-accent group-hover:bg-accent/20 transition-all ml-1">
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            ) : (
              <motion.div
                key="expanded-drawer"
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-64 p-4 bg-background/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-[20px_0_50px_rgba(0,0,0,0.5)] overscroll-contain"
              >
                <div className="flex flex-col gap-1 mb-3 border-b border-white/10 pb-2.5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Trophy size={13} className="text-accent animate-pulse" />
                      <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-bold">
                        {currentWorld === "code" ? "Protocol_Archive" : "Creative_Vault"}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsArchiveMinimized(true)}
                      className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/50 hover:text-white flex items-center justify-center transition-all cursor-pointer group"
                      title="Minimize Archive"
                      aria-label="Minimize Archive"
                    >
                      <ChevronLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeBlocksHit.length / activeList.length) * 100}%` }}
                        className="h-full bg-accent shadow-[0_0_10px_#00f0ff]"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-white/40">{activeBlocksHit.length}/{activeList.length}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 max-h-[30vh] overflow-y-auto pr-1 custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {activeList.filter(t => activeBlocksHit.includes(t.name)).map((tech) => (
                      <motion.div
                        key={tech.name}
                        initial={{ scale: 0.8, opacity: 0, x: -20 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        onClick={() => setSelectedTech(tech)}
                        className="flex items-center gap-2.5 p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-accent/30 transition-all group cursor-pointer"
                      >
                        <div
                          className="w-7 h-7 rounded-lg bg-background flex items-center justify-center shadow-inner border border-white/5 shrink-0"
                          style={{ color: tech.color }}
                        >
                          {React.cloneElement(tech.icon as React.ReactElement<any>, { size: 14 })}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-display uppercase tracking-wider text-white group-hover:text-accent transition-colors truncate">
                            {tech.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-[7px] font-mono text-white/40 uppercase tracking-tighter truncate">
                              {tech.tag || "Decrypted"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {activeBlocksHit.length === 0 && (
                    <div className="py-6 flex flex-col items-center justify-center gap-2 opacity-30">
                      <Lock size={18} className="text-white" />
                      <span className="text-[9px] font-mono text-white uppercase tracking-widest text-center leading-tight">
                        Headbutt blocks <br /> to sync data
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Game Viewport */}
        <div ref={gameRef} className="flex-1 relative overflow-hidden mt-4">
          <motion.div
            className="absolute top-0 bottom-0"
            style={{ transform: levelTransform, width: currentLevelWidth }}
          >
            {/* Controls Tutorial Hologram above Mario's starting spot */}
            {!hasMoved && activeBlocksHit.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute z-[60] w-64 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-accent/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] pointer-events-none"
                style={{
                  left: 118,
                  bottom: 230,
                }}
              >
                <div className="relative text-center">
                  <div className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-2 font-bold flex justify-center items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    System Boot: Controls
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-white/70 mb-3 border-y border-white/10 py-2.5">
                    <div className="flex flex-col items-center">
                      <span className="text-accent text-[11px] font-bold bg-white/5 px-2 py-0.5 rounded border border-white/15">A / D</span>
                      <span className="mt-1 text-[8px] text-white/50 uppercase tracking-wider">Walk Left/Right</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-accent text-[11px] font-bold bg-white/5 px-2 py-0.5 rounded border border-white/15">W / Space</span>
                      <span className="mt-1 text-[8px] text-white/50 uppercase tracking-wider">Jump Up</span>
                    </div>
                  </div>

                  <p className="text-[9px] leading-snug font-mono text-white/80 uppercase tracking-wider animate-pulse">
                    Headbutt blocks to reveal knowledge base
                  </p>

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 border-r border-b border-accent/40 rotate-45" />
                </div>
              </motion.div>
            )}

            {/* Glowing Pointer above the first block */}
            {activeBlocksHit.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                  y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                className="absolute flex flex-col items-center gap-1.5 pointer-events-none"
                style={{
                  left: activeList[0].x - 40,
                  bottom: BLOCK_Y + 95,
                  width: 160,
                  zIndex: 30
                }}
              >
                <div className="px-3 py-1.5 rounded-xl bg-accent/20 backdrop-blur-md border border-accent text-accent font-mono text-[10px] font-bold uppercase tracking-wider text-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  Headbutt here!
                </div>
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-accent filter drop-shadow-[0_2px_4px_rgba(0,240,255,0.4)]" />
              </motion.div>
            )}

            {/* Ground Bricks Layer */}
            {currentWorld === "code" ? (
              // World 1 Ground Bricks
              [...Array(Math.floor(CODE_LEVEL_WIDTH / 85))].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-[-40px] w-[85px] h-[85px]"
                  style={{
                    left: i * 85,
                    backgroundImage: `url(${BLOCK_IDLE[0]})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                />
              ))
            ) : (
              // World 1-AI Cyber Floor Bricks
              [...Array(Math.floor(AI_LEVEL_WIDTH / 85))].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-[-40px] w-[85px] h-[85px]"
                  style={{
                    left: i * 85,
                    backgroundImage: `url(${CYBER_GROUND_ASSET})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated',
                    boxShadow: '0 0 15px rgba(0,240,255,0.1)'
                  }}
                />
              ))
            )}

            {/* Question Blocks Layer */}
            {activeList.map((tech, i) => {
              const isHit = activeBlocksHit.includes(tech.name);
              const isCurrentActive = activeTech?.tech.name === tech.name;

              return (
                <div
                  key={tech.name}
                  className="absolute"
                  style={{
                    left: tech.x,
                    bottom: BLOCK_Y,
                    width: 80,
                    height: 80,
                  }}
                >
                  <AnimatePresence>
                    {isCurrentActive && (
                      <motion.div
                        initial={{ y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ y: -60, opacity: 1, scale: 1.2 }}
                        exit={{ y: 0, opacity: 0, scale: 0.5 }}
                        key={activeTech.id}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 flex items-center justify-center z-0"
                      >
                        <div className="p-2.5 rounded-full bg-accent/20 backdrop-blur-md border border-accent shadow-[0_0_25px_rgba(0,240,255,0.6)]">
                          <div style={{ color: tech.color }}>{tech.icon}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Block sprite */}
                  <motion.div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${currentWorld === "code"
                          ? (isCurrentActive ? BLOCK_HIT[0] : BLOCK_IDLE[0])
                          : CYBER_BLOCK_ASSET
                        })`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      imageRendering: 'pixelated'
                    }}
                    animate={isCurrentActive ? {
                      y: [0, -15, 0],
                      transition: { duration: 0.2 }
                    } : {
                      y: [0, -8, 0],
                      transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                    }}
                    className={`relative z-10 transition-all duration-300 ${currentWorld === "ai"
                        ? (isHit ? "filter drop-shadow-[0_0_12px_#00f0ff] brightness-125" : "filter drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]")
                        : (isCurrentActive ? "brightness-125" : "")
                      }`}
                  >
                    {/* World 2: Holographic Icon Badge Overlay on Cyber Block */}
                    {currentWorld === "ai" && (
                      <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80"
                        style={{ color: tech.color }}
                      >
                        <div className="scale-75 animate-pulse">
                          {tech.icon}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}

            {/* WORLD 1: PIPES */}
            {currentWorld === "code" && [...Array(Math.floor(CODE_LEVEL_WIDTH / 800))].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-[45px] w-32 h-64"
                style={{
                  left: i * 800 + 400,
                  backgroundImage: `url(${PIPE_FRAMES[i % 4]})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'bottom',
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated'
                }}
              />
            ))}

            {/* WORLD 1-AI: IN-GAME CYBER ARCADE VIDEO KIOSKS */}
            {currentWorld === "ai" && AI_ARCADE_KIOSKS.map((kiosk) => {
              const isUnmuted = unmutedKioskId === kiosk.id;

              return (
                <div
                  key={kiosk.id}
                  className="absolute bottom-[45px] z-20 flex flex-col items-center select-none"
                  style={{ left: kiosk.x, width: 180 }}
                >
                  {/* Floating Marquee */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-2 flex flex-col items-center text-center"
                  >
                    <div className="px-2.5 py-0.5 rounded-full bg-black/90 border border-accent/60 shadow-[0_0_15px_rgba(0,240,255,0.4)] text-[8px] font-mono uppercase tracking-widest text-accent font-bold">
                      {kiosk.title}
                    </div>
                    <span className="text-[7px] font-mono text-white/60 uppercase tracking-tight mt-0.5">
                      {kiosk.sub}
                    </span>
                  </motion.div>

                  {/* Physical Arcade Unit Frame */}
                  <div className="relative w-44 h-72 rounded-2xl border-2 border-accent/50 bg-black/90 shadow-[0_0_30px_rgba(0,240,255,0.4)] overflow-hidden flex flex-col items-center p-2">
                    {/* Screen Bezel */}
                    <div className="relative w-full h-52 rounded-xl overflow-hidden bg-zinc-950 border border-white/20">
                      <video
                        src={kiosk.videoSrc}
                        autoPlay
                        loop
                        muted={!isUnmuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />

                      {/* Scanline overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

                      {/* Sound Toggle Overlay Button */}
                      <button
                        onClick={() => setUnmutedKioskId(isUnmuted ? null : kiosk.id)}
                        className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/80 border border-white/20 hover:border-accent text-white hover:text-accent transition-all cursor-pointer shadow-lg z-10"
                        title={isUnmuted ? "Mute sound" : "Listen with sound"}
                      >
                        {isUnmuted ? <Volume2 size={12} className="text-accent" /> : <VolumeX size={12} />}
                      </button>

                      {/* Expand Preview Button */}
                      <button
                        onClick={() => setPreviewVideo({ url: kiosk.videoSrc, title: kiosk.title })}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 border border-white/20 hover:border-accent text-white hover:text-accent transition-all cursor-pointer shadow-lg z-10"
                        title="Expand commercial"
                      >
                        <Maximize2 size={11} />
                      </button>
                    </div>

                    {/* Arcade Cabinet Lower Controls Panel */}
                    <div className="w-full flex-1 flex items-center justify-between px-3 pt-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_6px_#eab308]" />
                      </div>
                      <span className="text-[7px] font-mono text-accent uppercase font-bold tracking-widest">
                        INSERT_COIN
                      </span>
                    </div>

                    {/* Platform landing area hint */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-accent/30 border-b border-accent/40" />
                  </div>
                </div>
              );
            })}

            {/* WORLD 1-1: WARP PORTAL GATE TO WORLD 1-AI (x = 5050) */}
            {currentWorld === "code" && (
              <div
                className="absolute bottom-[45px] z-20 flex flex-col items-center select-none"
                style={{ left: 5050, width: 140 }}
              >
                {/* Floating Hologram Label */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-2 flex flex-col items-center cursor-pointer pointer-events-auto"
                  onClick={() => triggerWarp("ai")}
                >
                  <div className="px-3 py-1 bg-background/90 border border-accent rounded-full shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-accent font-bold">
                    <Sparkles size={11} className="text-accent-secondary animate-pulse" />
                    <span>WARP // AI_DIMENSION</span>
                  </div>
                  <span className="text-[8px] font-mono text-white/70 uppercase tracking-wider mt-1 bg-black/60 px-2 py-0.5 rounded border border-white/10 animate-pulse">
                    [ PRESS ENTER / STEP INSIDE ]
                  </span>
                </motion.div>

                {/* Swirling Neon Portal Gate */}
                <div
                  onClick={() => triggerWarp("ai")}
                  className="relative w-28 h-48 rounded-t-full border-4 border-accent shadow-[0_0_40px_rgba(0,240,255,0.6),inset_0_0_30px_rgba(255,0,255,0.4)] bg-gradient-to-t from-black via-purple-950/70 to-cyan-950/60 overflow-hidden cursor-pointer group pointer-events-auto"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-secondary/50 via-accent/30 to-transparent blur-xs"
                  />
                  <div className="absolute inset-2 rounded-t-full border-2 border-dashed border-accent-secondary/60 animate-pulse" />
                  <div className="absolute inset-5 rounded-t-full border border-white/40 animate-ping" style={{ animationDuration: "3s" }} />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10">
                    <Gamepad2 size={24} className="text-accent group-hover:scale-125 transition-transform" />
                    <span className="text-[9px] font-mono font-bold uppercase text-white mt-1 tracking-widest leading-tight">
                      WORLD<br /><span className="text-accent">1-AI</span>
                    </span>
                    <span className="text-[7px] font-mono text-white/60 uppercase mt-0.5">
                      VIDEO LAB
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-accent/40 blur-xs" />
                </div>
              </div>
            )}

            {/* WORLD 1-AI: RETURN WARP PORTAL GATE TO WORLD 1-1 (x = 3650 and x = 100) */}
            {currentWorld === "ai" && (
              <>
                {/* Return Portal at End of Level (x = 5350) */}
                <div
                  className="absolute bottom-[45px] z-20 flex flex-col items-center select-none"
                  style={{ left: 5350, width: 140 }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-2 flex flex-col items-center cursor-pointer pointer-events-auto"
                    onClick={() => triggerWarp("code")}
                  >
                    <div className="px-3 py-1 bg-black/90 border border-purple-400 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-purple-300 font-bold">
                      <ArrowRightLeft size={11} className="text-cyan-400 animate-pulse" />
                      <span>WARP // WORLD 1-1</span>
                    </div>
                    <span className="text-[8px] font-mono text-white/70 uppercase tracking-wider mt-1 bg-black/60 px-2 py-0.5 rounded border border-white/10 animate-pulse">
                      [ RETURN TO CODE WORLD ]
                    </span>
                  </motion.div>

                  <div
                    onClick={() => triggerWarp("code")}
                    className="relative w-28 h-48 rounded-t-full border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.7),inset_0_0_30px_rgba(0,240,255,0.4)] bg-gradient-to-t from-black via-blue-950/70 to-purple-950/60 overflow-hidden cursor-pointer group pointer-events-auto"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/50 via-cyan-400/30 to-transparent blur-xs"
                    />
                    <div className="absolute inset-2 rounded-t-full border-2 border-dashed border-cyan-400/60 animate-pulse" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10">
                      <Code2 size={24} className="text-purple-300 group-hover:scale-125 transition-transform" />
                      <span className="text-[9px] font-mono font-bold uppercase text-white mt-1 tracking-widest leading-tight">
                        WORLD<br /><span className="text-purple-300">1-1</span>
                      </span>
                      <span className="text-[7px] font-mono text-white/60 uppercase mt-0.5">
                        CODE SECTOR
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-purple-500/40 blur-xs" />
                  </div>
                </div>

                {/* Return Portal at Start of Level (x = 80) for instant backtrack */}
                <div
                  className="absolute bottom-[45px] z-20 flex flex-col items-center select-none"
                  style={{ left: 80, width: 120 }}
                >
                  <div
                    onClick={() => triggerWarp("code")}
                    className="relative w-20 h-40 rounded-t-full border-2 border-purple-500/70 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-gradient-to-t from-black via-blue-950/60 to-purple-950/50 overflow-hidden cursor-pointer group pointer-events-auto flex flex-col items-center justify-center"
                    title="Return to World 1-1"
                  >
                    <ArrowRightLeft size={16} className="text-purple-300 group-hover:scale-125 transition-transform" />
                    <span className="text-[8px] font-mono font-bold uppercase text-white mt-1 tracking-wider">
                      EXIT
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* MARIO SPRITE CONTAINER */}
            <motion.div
              className={`absolute z-[55] ${!isMarioVisible ? "opacity-0 transition-opacity duration-100" : "opacity-100 transition-opacity duration-200"}`}
              style={{
                left: motionX,
                bottom: playerBottom,
                width: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}
            >
              {/* Dynamic In-World Speech Bubble when Hitting Block */}
              <AnimatePresence>
                {activeTech && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: -100, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={activeTech.id}
                    className="absolute left-1/2 -translate-x-1/2 w-72 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border-2 border-accent shadow-[0_0_30px_rgba(0,240,255,0.3)] z-50 pointer-events-auto"
                  >
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div style={{ color: activeTech.tech.color }}>{activeTech.tech.icon}</div>
                          <span className="font-display text-base uppercase tracking-wider" style={{ color: activeTech.tech.color }}>
                            {activeTech.tech.name}
                          </span>
                        </div>
                      </div>

                      <p className="text-[12px] leading-snug text-white/80 font-sans mb-1">
                        {activeTech.tech.desc}
                      </p>

                      <div className="text-[9px] font-mono text-accent/80 uppercase tracking-widest mt-1">
                        {activeTech.tech.tag || "Module Synced"}
                      </div>

                      {/* Bubble Pointer Arrow */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 border-r-2 border-b-2 border-accent rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mario Horizontal Flip Wrapper - immune to Framer Motion transform clobbering */}
              <div
                style={{
                  transform: facing === "right" ? "scaleX(1)" : "scaleX(-1)",
                  transformOrigin: "bottom center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <motion.img
                  src={
                    isJumping ? (physicsRef.current.vy < 0 ? FALLING_FRAMES[2] : JUMP_FRAMES[physicsRef.current.vy < 10 ? 1 : 0]) :
                      isFiring ? FIRE_FRAMES[0] :
                        isCrouching ? CROUCH_FRAMES[0] :
                          isWalking ? WALK_FRAMES[frame % 8] :
                            IDLE_FRAMES[Math.floor(frame / 2) % 4]
                  }
                  alt="Mario"
                  animate={
                    warpPhase === "in" ? {
                      scale: [1, 0.05],
                      rotate: [0, 720],
                      filter: ["blur(0px) brightness(1)", "blur(6px) brightness(3)"],
                      transition: { duration: 0.45, ease: "easeIn" }
                    } : warpPhase === "out" ? {
                      scale: [0.1, 1.3, 1],
                      rotate: [-360, 0],
                      filter: ["blur(4px) brightness(2)", "blur(0px) brightness(1)"],
                      transition: { duration: 0.5, ease: "easeOut" }
                    } : {}
                  }
                  className="pixelated block"
                  style={{
                    width: isJumping && physicsRef.current.vy < 0 ? '180px' : '120px',
                    height: 'auto',
                    objectPosition: 'bottom',
                    imageRendering: 'pixelated'
                  }}
                />
              </div>
            </motion.div>

            {/* Fireballs */}
            {fireballs.map(f => (
              <motion.div
                key={f.id}
                className="absolute w-24 h-24 z-[54]"
                style={{ left: f.x, bottom: f.y + 45 }}
              >
                <img
                  src={FIRE_FRAMES[1]}
                  className="w-full h-full pixelated"
                  style={{ transform: `scaleX(${f.vx > 0 ? 1 : -1})` }}
                  alt="Fireball"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Arcade Mobile Controls */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-10 flex justify-between px-3 sm:px-8 pointer-events-none z-[150] touch-none select-none">
        {/* D-Pad */}
        <div className="flex gap-2 sm:gap-4 pointer-events-auto items-end">
          <button
            onTouchStart={(e) => handleControlStart("left", e)}
            onTouchEnd={(e) => handleControlEnd("left", e)}
            onTouchCancel={(e) => handleControlEnd("left", e)}
            onPointerDown={(e) => {
              try { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } catch { }
              handleControlStart("left", e);
            }}
            onPointerUp={(e) => {
              try { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); } catch { }
              handleControlEnd("left", e);
            }}
            onPointerCancel={(e) => handleControlEnd("left", e)}
            className="w-12 h-12 sm:w-16 sm:h-16 bg-background/80 backdrop-blur-md rounded-2xl border-2 border-white/30 flex items-center justify-center active:bg-accent active:border-accent group transition-all touch-none select-none shadow-lg"
          >
            <div className="w-0 h-0 border-t-[8px] sm:border-t-[10px] border-t-transparent border-b-[8px] sm:border-b-[10px] border-b-transparent border-r-[16px] sm:border-r-[20px] border-r-white group-active:border-r-background" />
          </button>
          <button
            onTouchStart={(e) => handleControlStart("right", e)}
            onTouchEnd={(e) => handleControlEnd("right", e)}
            onTouchCancel={(e) => handleControlEnd("right", e)}
            onPointerDown={(e) => {
              try { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } catch { }
              handleControlStart("right", e);
            }}
            onPointerUp={(e) => {
              try { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); } catch { }
              handleControlEnd("right", e);
            }}
            onPointerCancel={(e) => handleControlEnd("right", e)}
            className="w-12 h-12 sm:w-16 sm:h-16 bg-background/80 backdrop-blur-md rounded-2xl border-2 border-white/30 flex items-center justify-center active:bg-accent active:border-accent group transition-all touch-none select-none shadow-lg"
          >
            <div className="w-0 h-0 border-t-[8px] sm:border-t-[10px] border-t-transparent border-b-[8px] sm:border-b-[10px] border-b-transparent border-l-[16px] sm:border-l-[20px] border-l-white group-active:border-l-background" />
          </button>
        </div>

        {/* Jump & Fire Buttons */}
        <div className="pointer-events-auto flex items-end gap-2 sm:gap-4">
          <button
            onTouchStart={(e) => handleControlStart("fire", e)}
            onPointerDown={(e) => handleControlStart("fire", e)}
            className="w-14 h-14 sm:w-20 sm:h-20 bg-orange-500/40 backdrop-blur-md rounded-full border-2 sm:border-4 border-orange-500 flex flex-col items-center justify-center active:bg-orange-500 active:scale-95 group transition-all shadow-[0_0_30px_rgba(255,69,0,0.4)] touch-none select-none"
          >
            <span className="text-[9px] sm:text-[10px] font-mono text-white uppercase font-bold">Fire</span>
            <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white/60 rounded-full mt-0.5 sm:mt-1 group-active:border-background bg-orange-500" />
          </button>
          <button
            onTouchStart={(e) => handleControlStart("jump", e)}
            onTouchEnd={(e) => handleControlEnd("jump", e)}
            onTouchCancel={(e) => handleControlEnd("jump", e)}
            onPointerDown={(e) => {
              try { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } catch { }
              handleControlStart("jump", e);
            }}
            onPointerUp={(e) => {
              try { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); } catch { }
              handleControlEnd("jump", e);
            }}
            onPointerCancel={(e) => handleControlEnd("jump", e)}
            className="w-14 h-14 sm:w-20 sm:h-20 bg-accent/40 backdrop-blur-md rounded-full border-2 sm:border-4 border-accent flex flex-col items-center justify-center active:bg-accent active:scale-95 group transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] touch-none select-none"
          >
            <span className="text-[9px] sm:text-[10px] font-mono text-accent uppercase font-bold group-active:text-background">Jump</span>
            <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white/60 rounded-full mt-0.5 sm:mt-1 group-active:border-background" />
          </button>
        </div>
      </div>

      {/* 3D Holographic Detail Modal for Clicked Blocks */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-background/60 backdrop-blur-md"
          >
            <div
              className="absolute inset-0 cursor-default"
              onClick={() => setSelectedTech(null)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-md bg-zinc-950/90 border border-white/10 p-6 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden border-b border-white/10"
            >
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="scanline opacity-10 pointer-events-none" />

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="flex items-center gap-2 mb-4 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <span className={`w-2 h-2 rounded-full ${activeBlocksHit.includes(selectedTech.name) ? "bg-green-500 animate-pulse shadow-[0_0_8px_#10b981]" : "bg-yellow-500 animate-pulse shadow-[0_0_8px_#eab308]"}`} />
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">
                    {activeBlocksHit.includes(selectedTech.name) ? "Status: Decrypted" : "Status: Encrypted"}
                  </span>
                </div>

                <motion.div
                  animate={{
                    rotateY: 360,
                    boxShadow: [
                      `0 0 20px ${selectedTech.color}33`,
                      `0 0 40px ${selectedTech.color}66`,
                      `0 0 20px ${selectedTech.color}33`
                    ]
                  }}
                  transition={{
                    rotateY: { repeat: Infinity, duration: 6, ease: "linear" },
                    boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                  }}
                  className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center mb-4 text-4xl shadow-inner"
                  style={{ color: selectedTech.color }}
                >
                  {selectedTech.icon}
                </motion.div>

                <h3 className="text-3xl font-display uppercase tracking-wider text-glow mb-1" style={{ textShadow: `0 0 20px ${selectedTech.color}88` }}>
                  {selectedTech.name}
                </h3>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">
                  Sector_Coord: {selectedTech.x}m
                </span>

                <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/5 text-left mb-6">
                  {activeBlocksHit.includes(selectedTech.name) ? (
                    <>
                      <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">Module Overview:</h4>
                      <p className="text-sm text-white/80 leading-relaxed font-sans mb-3">
                        {selectedTech.desc}
                      </p>
                      <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1 mt-3">Technical Breakdown:</h4>
                      <p className="text-[12px] text-white/70 leading-relaxed font-mono">
                        {selectedTech.details}
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center py-2 text-center">
                      <Lock className="text-yellow-500 mb-2" size={24} />
                      <h4 className="text-xs font-mono text-yellow-500 uppercase tracking-wider mb-1">Data Stream Locked</h4>
                      <p className="text-[11px] text-white/60 font-mono leading-relaxed max-w-[280px]">
                        Find this block at coordinate <span className="text-accent font-bold">{selectedTech.x}m</span> in the level and headbutt it to decrypt its sync file.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="flex-1 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all font-mono text-xs uppercase tracking-wider cursor-pointer font-bold"
                  >
                    Close
                  </button>
                  {!activeBlocksHit.includes(selectedTech.name) && (
                    <button
                      onClick={() => {
                        const targetX = selectedTech.x - 200;
                        physicsRef.current.x = Math.max(0, targetX);
                        physicsRef.current.y = 300;
                        physicsRef.current.vy = 0;
                        physicsRef.current.vx = 0;
                        setHasMoved(true);
                        setSelectedTech(null);
                      }}
                      className="flex-1 py-2 px-4 rounded-xl bg-accent text-background font-bold hover:bg-accent/80 active:scale-95 transition-all font-mono text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Locate Block
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Commercial Ad Reel Player Modal */}
      <AnimatePresence>
        {previewVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          >
            <div className="absolute inset-0" onClick={() => setPreviewVideo(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-sm bg-zinc-950 border border-accent/40 rounded-3xl p-4 shadow-[0_0_50px_rgba(0,240,255,0.4)] flex flex-col items-center"
            >
              <div className="w-full flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold truncate">
                  {previewVideo.title} // AD CREATIVE
                </span>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-mono text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10">
                <video
                  src={previewVideo.url}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full mt-3 flex justify-between items-center">
                <span className="text-[8px] font-mono text-white/50 uppercase">
                  Generative AI Commercial Showcase
                </span>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="px-3 py-1 rounded-lg bg-accent text-black font-mono text-[9px] uppercase font-bold tracking-wider hover:bg-accent/80 transition-all cursor-pointer"
                >
                  Back to Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
