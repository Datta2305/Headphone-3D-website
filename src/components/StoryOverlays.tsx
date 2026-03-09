"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function StoryOverlays() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this entire container (which is 500vh tall)
  // We use the page scroll since it's the main scroll container
  const { scrollYProgress } = useScroll();

  // 1. HERO / INTRO (0 - 15% scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12, 0.15], [1, 1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -50]);

  // 2. ENGINEERING REVEAL (15 - 40% scroll)
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const engY = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [50, 0, 0, -50]);

  // 3. NOISE CANCELLING (40 - 65% scroll)
  const ncOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const ncY = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [50, 0, 0, -50]);

  // 4. SOUND & UPSCALING (65 - 85% scroll)
  const soundOpacity = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const soundY = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [50, 0, 0, -50]);

  // 5. REASSEMBLY & CTA (85 - 100% scroll)
  const ctaOpacity = useTransform(scrollYProgress, [0.8, 0.85, 1, 1], [0, 1, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.8, 0.85, 1], [50, 0, 0]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none" style={{ zIndex: 10 }}>
      {/* 
        We use fixed positioning for the text containers so they stay in view, 
        but their opacity and Y transforms are driven by the overall scroll progress of the page.
      */}

      {/* 1. HERO */}
      <motion.div 
        id="overview"
        style={{ opacity: heroOpacity, y: heroY }}
        initial={{ opacity: 1, y: 0 }}
        className="fixed inset-x-0 top-[15%] md:top-[15%] flex flex-col items-center text-center px-4 md:px-6"
      >
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 md:mb-4">
          Sony WH-1000XM6
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-white/90 mb-4 md:mb-6 drop-shadow-md">
          Silence, perfected.
        </p>
        <p className="max-w-xl text-brand-cyan/80 font-medium text-sm md:text-lg">
          Flagship wireless noise cancelling, re-engineered for a world that never stops.
        </p>
      </motion.div>

      {/* 2. ENGINEERING REVEAL */}
      <motion.div 
        id="technology"
        style={{ opacity: engOpacity, y: engY }}
        initial={{ opacity: 0, y: 50 }}
        className="fixed inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-end md:justify-center px-6 pb-24 md:pb-0 md:px-20"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6">
          Precision-engineered <br className="hidden md:block"/><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">for silence.</span>
        </h2>
        <div className="space-y-3 md:space-y-4 max-w-md">
          <p className="text-sm md:text-lg text-white/60">
            Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
          </p>
          <p className="text-sm md:text-lg text-white/60">
            Every component is tuned for balance, power, and comfort—hour after hour.
          </p>
        </div>
      </motion.div>

      {/* 3. NOISE CANCELLING */}
      <motion.div 
        id="noise-cancelling"
        style={{ opacity: ncOpacity, y: ncY }}
        initial={{ opacity: 0, y: 50 }}
        className="fixed inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-end md:justify-center px-6 pb-24 md:pb-0 md:px-20 items-start md:items-end text-left md:text-right"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 md:mb-6">
          Adaptive noise <br className="hidden md:block"/>cancelling, <span className="text-brand-cyan">redefined.</span>
        </h2>
        <div className="space-y-3 md:space-y-4 max-w-md text-left md:text-right flex flex-col items-start md:items-end w-full">
          <div className="bg-brand-darker/80 md:bg-brand-darker/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/5 inline-block w-full md:w-auto">
            <p className="text-sm md:text-lg text-white/80 font-medium">Multi-microphone array listens in every direction.</p>
          </div>
          <div className="bg-brand-darker/80 md:bg-brand-darker/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/5 inline-block w-full md:w-auto">
            <p className="text-sm md:text-lg text-white/80 font-medium">Real-time noise analysis adjusts to your environment.</p>
          </div>
          <div className="bg-brand-darker/80 md:bg-brand-darker/50 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/5 inline-block w-full md:w-auto">
            <p className="text-sm md:text-lg text-brand-blue font-medium">Your music stays pure—planes, trains, and crowds fade away.</p>
          </div>
        </div>
      </motion.div>

      {/* 4. SOUND & UPSCALING */}
      <motion.div 
        id="specs"
        style={{ opacity: soundOpacity, y: soundY }}
        initial={{ opacity: 0, y: 50 }}
        className="fixed inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-end md:justify-center px-6 pb-24 md:pb-0 md:px-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent -z-10 opacity-90 md:opacity-80" />
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white mb-4 md:mb-6">
          Immersive,<br/>lifelike sound.
        </h2>
        <div className="space-y-4 md:space-y-6 max-w-sm">
          <p className="text-base md:text-xl text-white/70 leading-relaxed font-light">
            High-performance drivers unlock detail, depth, and texture in every track.
          </p>
          <div className="h-px w-12 bg-brand-cyan/50" />
          <p className="text-sm md:text-lg text-white/50">
            AI-enhanced upscaling restores clarity to compressed audio, so every note feels alive.
          </p>
        </div>
      </motion.div>

      {/* 5. REASSEMBLY & CTA */}
      <motion.div 
        id="buy"
        style={{ opacity: ctaOpacity, y: ctaY }}
        initial={{ opacity: 0, y: 50 }}
        className="fixed inset-x-0 bottom-8 md:bottom-24 flex flex-col items-center text-center px-4 md:px-6 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/20 via-brand-dark/0 to-transparent -z-10 scale-[2.0] md:scale-[2.0] opacity-50 blur-2xl pointer-events-none" />
        
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white mb-2 md:mb-4">
          Hear everything.<br className="md:hidden"/>
          <span className="text-brand-blue drop-shadow-[0_0_15px_rgba(0,80,255,0.4)] md:ml-2">Feel nothing else.</span>
        </h2>
        <p className="text-base md:text-2xl text-white/70 font-medium mb-8 md:mb-10">
          WH-1000XM6. Designed for focus, crafted for comfort.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <button className="relative group px-6 py-3 md:px-8 md:py-4 rounded-full text-xs md:text-sm font-semibold text-white overflow-hidden transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-opacity duration-300" />
            <span className="relative z-10">Experience WH-1000XM6</span>
          </button>
          
          <button className="text-xs md:text-sm font-medium text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline">
            See full specs
          </button>
        </div>
        
        <p className="mt-6 md:mt-8 text-[10px] md:text-xs text-white/40 tracking-widest uppercase">
          Engineered for airports, offices, and everything in between.
        </p>
      </motion.div>
    </div>
  );
}
