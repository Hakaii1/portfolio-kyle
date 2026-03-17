"use client";

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

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
const IDLE_FRAMES = [
  "/assets/game/idle-1.png",
  "/assets/game/idle-2.png",
  "/assets/game/idle-3.png",
  "/assets/game/idle-4.png",
];
const FALLING_FRAMES = [
  "/assets/game/falling-1.png",
  "/assets/game/falling-2.png",
  "/assets/game/falling-3.png"
];

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0.3, 1]);
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const [frame, setFrame] = React.useState(0);
  const [isFalling, setIsFalling] = React.useState(true);
  const [isJumpingBack, setIsJumpingBack] = React.useState(false);

  const marioX = useMotionValue(100);
  const marioFacing = useMotionValue(1);
  const lenis = useLenis();

  // High performance physics for Mario walking in footer
  const physicsRef = React.useRef({ vx: 4, lastTime: 0 });
  const footerRef = React.useRef<HTMLElement>(null);
  const isFooterInView = useInView(footerRef, { amount: 0.8 });
  const hasEntered = React.useRef(false);

  React.useEffect(() => {
    if (isJumpingBack) return;

    if (isFooterInView) {
      if (!hasEntered.current) {
        hasEntered.current = true;

        // Grab the screen X position tracked from TechStack for consistent falling
        let sx = (window as any).marioTechStackScreenX;
        if (sx === undefined || sx < 0) sx = 100;
        marioX.set(sx);

        setIsFalling(true);
        window.dispatchEvent(new CustomEvent("mario-hide"));
      }
    } else {
      // User scrolled up or removed chunk
      if (hasEntered.current) {
        hasEntered.current = false;

        // Auto jump back to TechStack!
        window.dispatchEvent(new CustomEvent("mario-return", { detail: { marioX: marioX.get() } }));
        setIsFalling(true);
      }
    }
  }, [isFooterInView, isJumpingBack, marioX]);

  React.useEffect(() => {
    if (isFalling || isJumpingBack || !isFooterInView) return;

    // Animate frames
    const frameInterval = setInterval(() => {
      setFrame(f => (f + 1) % 8);
    }, 80);

    let req: number;
    const update = (time: number) => {
      const p = physicsRef.current;
      if (!p.lastTime) p.lastTime = time;
      const deltaTime = (time - p.lastTime) / 16.666;
      p.lastTime = time;
      const dt = Math.min(deltaTime, 3);

      let currentX = marioX.get();
      currentX += p.vx * dt;

      const maxX = window.innerWidth - 128;
      if (currentX > maxX) {
        currentX = maxX;
        p.vx = -Math.abs(p.vx);
        marioFacing.set(-1);
      } else if (currentX < 0) {
        currentX = 0;
        p.vx = Math.abs(p.vx);
        marioFacing.set(1);
      }

      marioX.set(currentX);
      req = requestAnimationFrame(update);
    };

    req = requestAnimationFrame(update);

    return () => {
      clearInterval(frameInterval);
      cancelAnimationFrame(req);
    };
  }, [isFalling, isJumpingBack, isFooterInView, marioX, marioFacing]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kylegulapa06@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer ref={footerRef} id="contact" className="relative h-screen flex flex-col items-center justify-center bg-transparent px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="scanline top-0" />

      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <h2 className="text-[30vw] font-display uppercase leading-none tracking-tighter">
          ARCHIVE
        </h2>
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(20px)" }}
          whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col items-center mb-12 uppercase">
            <h2 className="text-6xl md:text-[10vw] font-display leading-none tracking-tighter text-accent text-glow">
              CONTACTS <br className="md:hidden" />
            </h2>

            {/* Resume-Focused Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 font-mono text-xs uppercase tracking-[0.3em] pb-8 border-b border-white/10 w-full max-w-xl">
              <div className="flex flex-col gap-2">
                <span className="opacity-40">Experience</span>
                <span className="text-xl text-accent text-glow">3+ YEARS</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-40">Knowledge</span>
                <span className="text-xl text-white">10+ TECHS</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="opacity-40">Status</span>
                <span className="text-xl text-[#00ff41] brightness-125">HIRING_READY</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-16 items-center justify-center">
          <div className="flex flex-col md:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsResumeOpen(true)}
              className="group relative px-12 py-5 bg-foreground text-background border-2 border-foreground font-display text-2xl uppercase tracking-widest hover:bg-transparent hover:text-foreground transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">VIEW_RESUME.exe</span>
              <div className="absolute -inset-1 bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          {/* Contact Directory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 items-start w-full max-w-4xl border-t border-white/5 pt-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.4em]">COMMS_CHANNEL</span>
              <div className="flex flex-col items-center md:items-start gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="text-sm font-mono text-white/80 hover:text-accent transition-colors flex items-center gap-3 group/email leading-none"
                >
                  kylegulapa06@gmail.com
                  <div className="relative w-24 h-5 flex items-center">
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute left-0 text-[10px] text-accent px-2 py-0.5 border border-accent/30 bg-accent/10 whitespace-nowrap"
                        >
                          COPIED!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0 }}
                          whileHover={{ opacity: 0.4 }}
                          className="absolute left-0 text-[10px] whitespace-nowrap"
                        >
                          [ CLICK_TO_COPY ]
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
                <span className="text-sm font-mono opacity-40">+63 960 323 7942</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.4em]">LOC_COORDINATES</span>
              <div className="flex flex-col items-center md:items-start gap-2 text-sm font-mono text-white/80">
                <span>Pampanga, Philippines</span>
                <span className="opacity-40">UTC+8:00 // GMT</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-[10px] font-mono text-accent/40 uppercase tracking-[0.4em]">NEURAL_SOCIALS</span>
              <div className="flex gap-6">
                <motion.a
                  whileHover={{ y: -5, color: "#00f0ff" }}
                  href="https://github.com/Hakaii1"
                  target="_blank"
                  className="text-lg font-display uppercase tracking-tighter"
                >
                  GitHub //
                </motion.a>
                <motion.a
                  whileHover={{ y: -5, color: "#00f0ff" }}
                  href="https://www.linkedin.com/in/kyle-eurie-gulapa/"
                  target="_blank"
                  className="text-lg font-display uppercase tracking-tighter"
                >
                  LinkedIn //
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 border-2 border-white/10 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-[0.4em]">DATA_RECORD: RESUME_V3.01</span>
                </div>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="group flex items-center gap-2 font-mono text-[10px] uppercase hover:text-accent transition-colors"
                >
                  [ CLOSE_X ]
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 bg-zinc-800/50">
                <iframe
                  src="/assets/Resume/KyleGulapa_Resume.pdf"
                  className="w-full h-full border-none"
                  title="Resume"
                />
              </div>

              {/* Modal Footer Decorative */}
              <div className="px-6 py-2 bg-accent/5 border-t border-white/5">
                <div className="flex justify-between items-center text-[8px] font-mono opacity-30 uppercase">
                  <span>SYSTEM_ENCRYPTION: ACTIVE</span>
                  <span>BUFFER_STATUS: 100%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 w-full px-10 flex justify-between items-end border-t border-white/5 pt-10">
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-mono text-muted-foreground uppercase">
            V3.NEURAL_CONDUIT // 2026
          </div>
          <div className="text-[10px] font-mono text-accent uppercase animate-pulse">
            INSERT COINT [01] // FREE PLAY
          </div>
        </div>

        {/* Walking/Falling Mario - Global at Footer */}
        <motion.div
          className="absolute bottom-6 pointer-events-none z-50"
          initial={{ y: -1000, opacity: 1 }}
          animate={{ y: isJumpingBack || !isFooterInView ? -1000 : 0, opacity: 1 }}
          transition={{
            y: {
              type: "spring",
              stiffness: isJumpingBack ? 40 : 40,
              damping: isJumpingBack ? 12 : 15,
              mass: 1.5 // Added mass and lowered stiffness for a slower, floaty fall
            }
          }}
          onAnimationComplete={() => {
            if (!isJumpingBack && isFooterInView) {
              setIsFalling(false);
            }
          }}
          style={{ x: marioX, scaleX: marioFacing }}
        >
          <img
            src={isJumpingBack ? JUMP_FRAMES[0] : (!isFooterInView || isFalling) ? FALLING_FRAMES[frame % 3] : WALK_FRAMES[frame]}
            className="pixelated block"
            alt="Mario"
            style={{
              width: !isJumpingBack && (!isFooterInView || isFalling) ? '180px' : '120px',
              height: 'auto',
              imageRendering: 'pixelated',
              objectPosition: 'bottom',
              transformOrigin: 'bottom center'
            }}
          />
        </motion.div>

        {/* Back to Game Arrow */}
        <div className="absolute right-10 -top-12 flex flex-col items-center gap-2 group z-50 pointer-events-auto">
          <button
            onClick={() => {
              setIsJumpingBack(true);
              window.dispatchEvent(new CustomEvent("mario-return", { detail: { marioX: marioX.get() } }));
              hasEntered.current = false; // Prevent auto trigger

              setTimeout(() => {
                lenis?.scrollTo('#tech-stack', { duration: 1.5, easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) });

                setTimeout(() => {
                  setIsJumpingBack(false);
                  setIsFalling(true);
                  marioX.set(100);
                  marioFacing.set(1);
                  physicsRef.current.vx = Math.abs(physicsRef.current.vx);
                }, 2000);
              }, 100);
            }}
            className="w-12 h-12 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-background transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] animate-bounce"
          >
            <ArrowUp size={24} />
          </button>
          <span className="text-[8px] font-mono text-accent uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">Return_to_Sys</span>
        </div>

        <div className="text-[10px] font-mono text-muted-foreground uppercase text-right">
          LATENCY: 24MS <br />
          STATUS: OPERATIONAL
        </div>
      </div>
    </footer>
  );
}
