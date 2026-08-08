"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useInView } from "framer-motion";
import { Cpu, Zap, Code2, Database, Layout, Smartphone, Trophy, Lock } from "lucide-react";
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
  ...FALLING_FRAMES
];

const techData = [
  { 
    name: "HTML", 
    icon: <Code2 />, 
    desc: "Blueprint of the web. Semantic structure for modern applications.", 
    details: "The standard markup language used to create and structure websites. Think of it as the skeletal blueprint or scaffolding of a web page, defining where text, images, buttons, and links are positioned.",
    color: "#e34c26", 
    x: 600 
  },
  { 
    name: "CSS", 
    icon: <Layout />, 
    desc: "The artistry of layout. Crafting responsive & dynamic interfaces.", 
    details: "The design stylesheet of the web. It controls how a website looks—defining the layout, color schemes, modern spacing, fonts, animations, and visual presentation across mobile, tablet, and desktop screens.",
    color: "#264de4", 
    x: 1000 
  },
  { 
    name: "JavaScript", 
    icon: <Zap />, 
    desc: "The engine of interaction. Bringing pages to life with logic.", 
    details: "The programming language that makes web pages interactive and alive. It handles the dynamic features of a website, such as animations, interactive forms, calculators, search boxes, and instant page updates.",
    color: "#f7df1e", 
    x: 1400 
  },
  { 
    name: "React", 
    icon: <Cpu />, 
    desc: "Component architecture. Building scalable high-performance UIs.", 
    details: "A widely-used tool for building user interfaces out of reusable building blocks. It allows websites to load and update information instantly on the screen without needing to reload the entire web page.",
    color: "#61dafb", 
    x: 1800 
  },
  { 
    name: "PHP", 
    icon: <Database />, 
    desc: "Backend heavy-lifter. Powering robust server-side workflows.", 
    details: "A server-side programming language used to handle the behind-the-scenes logic of websites. It communicates with the database to run features like user registration, accounts, logins, and online checkouts.",
    color: "#777bb4", 
    x: 2200 
  },
  { 
    name: "Python", 
    icon: <Code2 />, 
    desc: "Versatile intelligence. Scripting, data, and ML automation.", 
    details: "A clean and easy-to-read programming language. It is highly popular for data science, artificial intelligence, automation scripts, and server-side web application logic.",
    color: "#3776ab", 
    x: 2600 
  },
  { 
    name: "Java", 
    icon: <Cpu />, 
    desc: "Enterprise backbone. Scalable multi-threaded architectures.", 
    details: "A highly secure and reliable programming language used to build large-scale systems. It is the enterprise standard for banking software, database connections, and Android mobile applications.",
    color: "#007396", 
    x: 3000 
  },
  { 
    name: "MS SQL", 
    icon: <Database />, 
    desc: "Data foundation. Organizing complex relational ecosystems.", 
    details: "A database management system built by Microsoft. It acts as an organized digital filing cabinet that securely stores, searches, and organizes large amounts of company information for apps to access.",
    color: "#cc2927", 
    x: 3400 
  },
  { 
    name: "Flutter", 
    icon: <Smartphone />, 
    desc: "Cross-platform fluidity. Cinematic mobile experiences.", 
    details: "An app development kit created by Google. It allows developers to build beautiful, fast mobile applications for both Apple iOS and Google Android using a single shared codebase.",
    color: "#02569b", 
    x: 3800 
  },
  { 
    name: "Dart", 
    icon: <Code2 />, 
    desc: "Optimized for speed. Powering the Flutter UI framework.", 
    details: "The programming language created by Google that powers Flutter. It is designed to run apps fast, ensuring very smooth animations, quick response times, and a fluid mobile user experience.",
    color: "#0175c2", 
    x: 4200 
  },
  { 
    name: "Next.js", 
    icon: <Zap />, 
    desc: "The React Framework. Optimized for production and SEO.", 
    details: "An advanced framework built on top of React that speeds up websites and optimizes them for Google searches. It pre-renders pages on the server so that websites load instantly for users.",
    color: "#ffffff", 
    x: 4600 
  }
];

export default function TechStack() {
  const [isEnteringTunnel, setIsEnteringTunnel] = useState(false);
  const lenis = useLenis();

  const sectionContainerRef = useRef<HTMLElement>(null);
  const isTechInView = useInView(sectionContainerRef, { amount: 0.1 });
  const isTechInViewRef = useRef(isTechInView);
  isTechInViewRef.current = isTechInView;

  const motionX = useMotionValue(200);
  const motionY = useMotionValue(0);
  const motionCameraX = useMotionValue(0);
  const bgTransform = useTransform(motionCameraX, x => `translateX(-${x * 0.08}px) scale(1.8)`);
  const levelTransform = useTransform(motionCameraX, x => `translateX(-${x}px)`);
  const playerBottom = useTransform(motionY, y => y + 45);
  const mapMarkerLeft = useTransform(motionX, x => `${(Math.max(0, x) / 5500) * 100}%`);

  // Refs for high-performance physics (no React state lag)
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
  const [isJumping, setIsJumping] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isCrouching, setIsCrouching] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const [fireballs, setFireballs] = useState<{ id: number; x: number; y: number; vx: number }[]>([]);
  const [frame, setFrame] = useState(0);
  const [activeTech, setActiveTech] = useState<{ tech: typeof techData[0], id: number } | null>(null);
  const [blocksHit, setBlocksHit] = useState<string[]>([]);
  const [hasMoved, setHasMoved] = useState(false);
  const [selectedTech, setSelectedTech] = useState<typeof techData[0] | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const [isMarioVisible, setIsMarioVisible] = useState(true);

  // Constants
  const GRAVITY = -0.6; // Negative pulls down
  const JUMP_FORCE = 14; // Positive pushes up
  const MOVE_SPEED = 13;
  const BLOCK_Y = 240;
  const PLAYER_SIZE = 128;
  const LEVEL_WIDTH = 5500; // Increased to ensure space for all blocks and parallax

  // Preload assets
  useEffect(() => {
    ALL_ASSETS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Animation frame loop for sprite
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

  const handleFire = useCallback(() => {
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
  }, [facing]);

  const handleControlStart = useCallback((action: "left" | "right" | "jump" | "fire", e?: React.SyntheticEvent) => {
    if (e && e.cancelable) e.preventDefault();
    setHasMoved(true);
    if (action === "left") {
      keysPressed.current.add("touch-left");
      setFacing("left");
    } else if (action === "right") {
      keysPressed.current.add("touch-right");
      setFacing("right");
    } else if (action === "jump") {
      keysPressed.current.add("touch-jump");
    } else if (action === "fire") {
      handleFire();
    }
  }, [handleFire]);

  const handleControlEnd = useCallback((action: "left" | "right" | "jump", e?: React.SyntheticEvent) => {
    if (e && e.cancelable) e.preventDefault();
    if (action === "left") keysPressed.current.delete("touch-left");
    if (action === "right") keysPressed.current.delete("touch-right");
    if (action === "jump") keysPressed.current.delete("touch-jump");
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    keysPressed.current.add(key);
    
    // Track player input to hide starting tutorials
    setHasMoved(true);

    // Directional facing updates immediately for visuals
    if (key === "arrowleft" || key === "a") setFacing("left");
    if (key === "arrowright" || key === "d") setFacing("right");
    if (key === "s" || key === "arrowdown") setIsCrouching(true);
    if (key === "f" || key === "control") handleFire();
  }, [facing, handleFire]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    keysPressed.current.delete(key);
    if (key === "s" || key === "arrowdown") setIsCrouching(false);
  }, []);

  const update = useCallback((time: number) => {
    const p = physicsRef.current;

    // Calculate Delta Time (Normalized to 60fps)
    if (!p.lastTime) p.lastTime = time;
    const deltaTime = (time - p.lastTime) / 16.666; // 16.666ms is 60fps
    p.lastTime = time;

    // Cap deltaTime to avoid huge jumps on tab switch or lag spikes
    const dt = Math.min(deltaTime, 3);

    const keys = keysPressed.current;

    // Horizontal Movement
    let targetVx = 0;
    if (keys.has("a") || keys.has("arrowleft") || keys.has("touch-left")) targetVx = -MOVE_SPEED;
    if (keys.has("d") || keys.has("arrowright") || keys.has("touch-right")) targetVx = MOVE_SPEED;
    
    // Disable horizontal movement when crouching on ground
    if (isCrouching && p.y <= 0) targetVx = 0;
    
    p.vx = targetVx;

    // Jump Logic (Instant response)
    if ((keys.has("w") || keys.has("arrowup") || keys.has(" ") || keys.has("touch-jump")) && !p.isJumping) {
      p.vy = JUMP_FORCE;
      p.isJumping = true;
      setIsJumping(true);
    }

    // Apply Physics scaled by Delta Time
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += GRAVITY * dt;

    // Ground collision
    if (p.y <= 0 && p.vy <= 0) {
      p.y = 0;
      if (!p.hasBounced && p.vy < -15) {
        p.vy = 12; // Little bounce
        p.hasBounced = true;
      } else {
        p.vy = 0;
        if (p.isJumping) {
          p.isJumping = false;
          setIsJumping(false);
        }
      }
    }

    // Bounds
    if (p.x < 0) p.x = 0;
    if (p.x > LEVEL_WIDTH - PLAYER_SIZE) p.x = LEVEL_WIDTH - PLAYER_SIZE;

    // Movement animation state - only update if changed
    const isNowWalking = Math.abs(p.vx) > 0;
    if (isNowWalking !== p.isWalking) {
      p.isWalking = isNowWalking;
      setIsWalking(isNowWalking);
    }


    // Block collision (Headbutt)
    if (p.vy > 0) {
      const playerTop = p.y + 155;
      const playerCenterX = p.x + PLAYER_SIZE / 2;

      techData.forEach((tech) => {
        if (
          playerCenterX > tech.x - 30 &&
          playerCenterX < tech.x + 110 &&
          playerTop >= BLOCK_Y &&
          playerTop <= BLOCK_Y + 50
        ) {
          setBlocksHit(prevHits => {
            if (!prevHits.includes(tech.name)) return [...prevHits, tech.name];
            return prevHits;
          });
          setActiveTech({ tech, id: Date.now() });
          p.vy = -3; // Bounce down harder
          p.y = BLOCK_Y - 156; // Position just below the block
        }
      });
    }

    // Camera Calculation
    const screenWidth = window.innerWidth;

    let currentTargetScreenX = screenWidth / 2 - PLAYER_SIZE / 2;
    if (p.targetScreenX !== undefined && p.targetScreenX !== -1) {
      if (Math.abs(p.vx) > 0 && p.y <= 0) { // Only re-center when walking on ground
        p.targetScreenX += (currentTargetScreenX - p.targetScreenX) * 0.05 * dt;
        if (Math.abs(p.targetScreenX - currentTargetScreenX) < 5) {
          p.targetScreenX = -1; // Snap back to center behavior
        }
      }
      currentTargetScreenX = p.targetScreenX !== -1 ? p.targetScreenX : currentTargetScreenX;
    }

    const targetCameraX = Math.max(0, Math.min(p.x - currentTargetScreenX, LEVEL_WIDTH - screenWidth));
    p.cameraX += (targetCameraX - p.cameraX) * 0.1 * dt; // Smooth camera follow

    (window as any).marioTechStackScreenX = p.x - p.cameraX;

    // Sync to Motion Values once per frame
    motionX.set(p.x);
    motionY.set(p.y);
    motionCameraX.set(p.cameraX);

    // Move fireballs
    setFireballs(prev => {
      const nextFireballs = prev
        .map(f => ({ ...f, x: f.x + f.vx * dt }))
        .filter(f => {
          const screenX = f.x - p.cameraX;
          return screenX > -300 && screenX < window.innerWidth + 300;
        });
      return nextFireballs;
    });

    requestRef.current = requestAnimationFrame(update);
  }, [motionX, motionY, motionCameraX, isCrouching]);

  useEffect(() => {
    if (activeTech) {
      const timer = setTimeout(() => {
        setActiveTech(null);
      }, 5000); // Bubble disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [activeTech]);

  useEffect(() => {
    if (isEnteringTunnel && lenis) {
      const timer = setTimeout(() => {
        lenis.scrollTo('#contact', { duration: 2, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) });
      }, 500); // Wait for Mario to fall deep enough
      return () => clearTimeout(timer);
    }
  }, [isEnteringTunnel, lenis]);

  useEffect(() => {
    const handleReturn = (e: any) => {
      const returnX = e.detail?.marioX ?? 200;
      setIsEnteringTunnel(false);
      setIsMarioVisible(true);
      physicsRef.current.isEntering = false;
      physicsRef.current.hasBounced = false; // Reset bounce flag

      let newX = physicsRef.current.cameraX + returnX;
      if (newX < 0) newX = 0;
      if (newX > 5500 - 128) newX = 5500 - 128; // LEVEL_WIDTH - PLAYER_SIZE

      physicsRef.current.x = newX;
      physicsRef.current.y = -1000; // Shoot from below ground to simulate jumping UP from Contacts
      physicsRef.current.vy = 35; // Fine-tune upward velocity
      physicsRef.current.vx = 0;
      physicsRef.current.targetScreenX = returnX; // Freeze camera centering to this exact screen offset
      // Do not snap cameraX, allow smooth follow to pick him up from his exact screen position

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
  }, [handleKeyDown, handleKeyUp, update]);

  // Pixel offsets from 1024x1024 sheet (legacy but kept for logic if needed)
  const isJumpingVal = isJumping;
  const isWalkingVal = isWalking;

  return (
    <section ref={sectionContainerRef} id="tech-stack" className="relative h-screen bg-transparent overflow-hidden border-y border-white/5">
      {/* City Background Layer */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url(${BACKGROUND_ASSET})`,
          transform: bgTransform
        }}
      />
      <div className="absolute inset-0 bg-background/40 z-0" />

      <div className="relative h-full flex flex-col pt-16 sm:pt-24 z-10 overscroll-none overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col items-center mb-6 sm:mb-12">
          {/* Tactical Holographic HUD (Integrated into Header) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl mb-4 sm:mb-8 group px-2 sm:px-0"
          >
            <div className="bg-background/20 backdrop-blur-md border-x border-white/5 px-4 sm:px-6 py-3 rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border-b border-white/5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00f0ff]" />
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.3em] sm:tracking-[0.4em]">Sector_Sync_Protocol</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-accent font-mono uppercase font-bold tracking-widest">
                    [{blocksHit.length}/{techData.length}] SYNCED
                  </span>
                </div>
              </div>

              {/* Main Progress Band */}
              <div className="relative h-10 flex items-center px-2">
                <div className="absolute inset-x-0 h-[1px] bg-white/5 rounded-full" />
                
                <motion.div 
                  animate={{ left: ["-10%", "110%"], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent z-10"
                />

                <motion.div style={{ left: mapMarkerLeft }} className="absolute z-20 top-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-5 bg-accent/80 shadow-[0_0_15px_#00f0ff]" />

                {techData.map((t) => {
                  const isSynced = blocksHit.includes(t.name);
                  return (
                    <div key={t.name} className="absolute -translate-x-1/2 animate-fade-in" style={{ left: `${(t.x / LEVEL_WIDTH) * 100}%` }}>
                      <button
                        onClick={() => setSelectedTech(t)}
                        className="relative p-1 rounded-md bg-background/60 border border-white/10 hover:border-accent/40 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
                        style={{ color: isSynced ? t.color : "rgba(255,255,255,0.2)" }}
                      >
                        <div className="scale-[0.6] origin-center">
                          {t.icon}
                        </div>
                        {!isSynced && (
                          <div className="absolute -top-1 -right-1 bg-background border border-white/20 rounded-full p-0.5 scale-[0.5] text-white/30 group-hover:text-accent group-hover:border-accent/30 transition-all">
                            <Lock size={10} />
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/20 rounded-tl-xl" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/20 rounded-br-xl" />
            </div>
          </motion.div>

          <motion.h2 className="text-3xl sm:text-6xl md:text-8xl font-display uppercase tracking-tighter text-glow text-center">
            Tech<span className="text-accent">Stacks</span>
          </motion.h2>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 sm:mt-4 justify-center items-center px-2">
            <motion.div 
              animate={{ 
                boxShadow: [
                  "0 0 10px rgba(0, 240, 255, 0.15)",
                  "0 0 25px rgba(0, 240, 255, 0.4)",
                  "0 0 10px rgba(0, 240, 255, 0.15)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="px-4 sm:px-6 py-1.5 bg-accent/15 border border-accent/40 text-accent font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] flex items-center gap-2 rounded-md shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="font-bold">
                {blocksHit.length > 0 ? "Data Sync Active! Keep Exploring" : "Headbutt blocks to reveal"}
              </span>
            </motion.div>
            <div className="px-4 sm:px-6 py-1.5 bg-accent text-background font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] rounded-md font-bold">
              MODULES: {blocksHit.length}/{techData.length}
            </div>
          </div>
        </div>

        {/* Tech Archive / Achievement Hub (Visible on XL screens to avoid overlaying game on mobile) */}
        <div
          className="hidden xl:block absolute left-6 top-32 z-50 w-64"
          onWheel={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-background/80 backdrop-blur-md border-2 border-white/5 rounded-2xl shadow-[20px_0_50px_rgba(0,0,0,0.5)] overscroll-contain"
          >
            <div className="flex flex-col gap-1 mb-4 border-b border-white/10 pb-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-bold">Protocol_Archive</span>
                <Trophy size={12} className="text-accent animate-pulse" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(blocksHit.length / techData.length) * 100}%` }}
                    className="h-full bg-accent shadow-[0_0_10px_#00f0ff]"
                  />
                </div>
                <span className="text-[9px] font-mono text-white/40">{blocksHit.length}/{techData.length}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-h-[30vh] lg:max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {techData.filter(t => blocksHit.includes(t.name)).map((tech) => (
                  <motion.div
                    key={tech.name}
                    initial={{ scale: 0.8, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-accent/30 transition-all group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg bg-background flex items-center justify-center shadow-inner border border-white/5"
                      style={{ color: tech.color }}
                    >
                      {React.cloneElement(tech.icon as React.ReactElement<any>, { size: 16 })}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-display uppercase tracking-wider text-white group-hover:text-accent transition-colors">{tech.name}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[7px] font-mono text-white/40 uppercase tracking-tighter">Achievement_Unlocked</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {blocksHit.length === 0 && (
                <div className="py-8 flex flex-col items-center justify-center gap-3 opacity-20">
                  <Lock size={20} className="text-white" />
                  <span className="text-[9px] font-mono text-white uppercase tracking-widest text-center leading-tight">
                    Headbutt blocks <br /> to sync data
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Game Viewport */}
        <div ref={gameRef} className="flex-1 relative overflow-hidden mt-6">
          <motion.div
            className="absolute top-0 bottom-0"
            style={{ transform: levelTransform, width: LEVEL_WIDTH }}
          >
            {/* Controls Tutorial Hologram above Mario's starting spot */}
            {!hasMoved && blocksHit.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute z-[60] w-64 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-accent/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] pointer-events-none"
                style={{
                  left: 118, // Center over Mario (starts at 200, width 100, center is 250 => 250 - 128 = 122)
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
                  
                  {/* Downward pointer caret */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/95 border-r border-b border-accent/40 rotate-45" />
                </div>
              </motion.div>
            )}

            {/* Glowing Pointer above the first block */}
            {blocksHit.length === 0 && (
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
                  left: techData[0].x - 40, // Centered over the 80px block
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

            {/* Ground Bricks */}
            {[...Array(Math.floor(LEVEL_WIDTH / 85))].map((_, i) => (
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
            ))}

            {/* Tech Blocks */}
            {techData.map((tech, i) => (
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
                  {activeTech?.tech.name === tech.name && (
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
                      <div className="p-2 rounded-full bg-accent/20 backdrop-blur-md border border-accent shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                        <div style={{ color: tech.color }}>{tech.icon}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${activeTech?.tech.name === tech.name
                      ? BLOCK_HIT[0]
                      : BLOCK_IDLE[0]
                      })`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                  animate={activeTech?.tech.name === tech.name ? {
                    y: [0, -15, 0],
                    transition: { duration: 0.2 }
                  } : {
                    y: [0, -8, 0],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }
                  }}
                  className={`relative z-10 transition-all duration-300 ${activeTech?.tech.name === tech.name ? "brightness-125" : ""}`}
                />
              </div>
            ))}

            {/* PIPES */}
            {[...Array(Math.floor(LEVEL_WIDTH / 800))].map((_, i) => (
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
              <AnimatePresence>
                {activeTech && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: -100, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    key={activeTech.id}
                    className="absolute left-1/2 -translate-x-1/2 w-64 p-4 rounded-2xl bg-background/90 backdrop-blur-xl border-2 border-accent shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                  >
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-1">
                        <div style={{ color: activeTech.tech.color }}>{activeTech.tech.icon}</div>
                        <span className="font-display text-lg uppercase tracking-wider" style={{ color: activeTech.tech.color }}>
                          {activeTech.tech.name}
                        </span>
                      </div>
                      <p className="text-[13px] leading-snug text-muted-foreground font-sans">
                        {activeTech.tech.desc}
                      </p>
                      {/* Bubble Point */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-background/90 border-r-2 border-b-2 border-accent rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <img
                src={
                  isJumping ? (physicsRef.current.vy < 0 ? FALLING_FRAMES[2] : JUMP_FRAMES[physicsRef.current.vy < 10 ? 1 : 0]) : 
                  isFiring ? FIRE_FRAMES[0] :
                  isCrouching ? CROUCH_FRAMES[0] :
                  isWalking ? WALK_FRAMES[frame % 8] : 
                  IDLE_FRAMES[Math.floor(frame / 2) % 4]
                }
                alt="Mario"
                className="pixelated block"
                style={{
                  width: isJumping && physicsRef.current.vy < 0 ? '180px' : '120px',
                  height: 'auto',
                  objectPosition: 'bottom',
                  transform: `scaleX(${facing === "right" ? 1 : -1})`,
                  transformOrigin: 'bottom center',
                  imageRendering: 'pixelated'
                }}
              />
            </motion.div>

            {/* TechStack Fireballs */}
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

      {/* Arcade Mobile Controls (Supports all touch devices: Phones, iPads, Tablets) */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-12 flex justify-between px-3 sm:px-8 pointer-events-none z-[150] touch-none select-none flex">
        {/* D-Pad */}
        <div className="flex gap-2 sm:gap-4 pointer-events-auto items-end">
          <button
            onTouchStart={(e) => handleControlStart("left", e)}
            onTouchEnd={(e) => handleControlEnd("left", e)}
            onTouchCancel={(e) => handleControlEnd("left", e)}
            onPointerDown={(e) => {
              try { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } catch {}
              handleControlStart("left", e);
            }}
            onPointerUp={(e) => {
              try { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); } catch {}
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
              try { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } catch {}
              handleControlStart("right", e);
            }}
            onPointerUp={(e) => {
              try { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); } catch {}
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
              try { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } catch {}
              handleControlStart("jump", e);
            }}
            onPointerUp={(e) => {
              try { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); } catch {}
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

      {/* 3D Holographic Detail Modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-background/60 backdrop-blur-md"
          >
            {/* Click outside to close */}
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
              {/* Scanline & Grid Background Effects */}
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="scanline opacity-10 pointer-events-none" />

              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent/30 rounded-br-3xl" />

              <div className="flex flex-col items-center text-center relative z-10">
                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-4 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <span className={`w-2 h-2 rounded-full ${blocksHit.includes(selectedTech.name) ? "bg-green-500 animate-pulse shadow-[0_0_8px_#10b981]" : "bg-yellow-500 animate-pulse shadow-[0_0_8px_#eab308]"}`} />
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest font-bold">
                    {blocksHit.includes(selectedTech.name) ? "Status: Synced" : "Status: Encrypted"}
                  </span>
                </div>

                {/* Animated Logo Container */}
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

                {/* Title */}
                <h3 className="text-3xl font-display uppercase tracking-wider text-glow mb-1" style={{ textShadow: `0 0 20px ${selectedTech.color}88` }}>
                  {selectedTech.name}
                </h3>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mb-4">
                  Sector_Coord: {selectedTech.x}m
                </span>

                {/* Info Card Body */}
                <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/5 text-left mb-6">
                  {blocksHit.includes(selectedTech.name) ? (
                    <>
                      <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">Module Decrypted Data:</h4>
                      <p className="text-sm text-white/80 leading-relaxed font-sans mb-3">
                        {selectedTech.desc}
                      </p>
                      <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1 mt-3">Extended Decrypt Details:</h4>
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

                {/* Actions */}
                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="flex-1 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all font-mono text-xs uppercase tracking-wider cursor-pointer font-bold"
                  >
                    Close
                  </button>
                  {!blocksHit.includes(selectedTech.name) && (
                    <button
                      onClick={() => {
                        const targetX = selectedTech.x - 200; // Place Mario 200px before the block
                        physicsRef.current.x = Math.max(0, targetX);
                        physicsRef.current.y = 300; // Drop Mario from the sky for a satisfying entry!
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
    </section>
  );
}
