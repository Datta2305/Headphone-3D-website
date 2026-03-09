"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import clsx from "clsx";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;
    
    // Calculate an approximate scroll position based on the story beats
    // We know the container is 500vh tall.
    // Hero ~0vh, Tech ~100vh, Noise ~200vh, Specs ~300vh, Buy ~450vh
    const vh = window.innerHeight;
    let targetScroll = 0;
    
    switch(id) {
      case 'overview': targetScroll = 0; break;
      case 'technology': targetScroll = vh * 1.0; break;
      case 'noise-cancelling': targetScroll = vh * 2.2; break;
      case 'specs': targetScroll = vh * 3.3; break;
      case 'buy': targetScroll = vh * 4.5; break;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const navItems = [
    { label: "Overview", id: "overview" },
    { label: "Technology", id: "technology" },
    { label: "Noise Cancelling", id: "noise-cancelling" },
    { label: "Specs", id: "specs" },
    { label: "Buy", id: "buy" }
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-14 transition-all duration-500",
        isScrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="text-white/90 font-medium tracking-tight text-sm">
        WH-1000XM6
      </div>
      
      {/* Horizontal scrolling on small devices, flex on md+ */}
      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/60">
        {navItems.map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={(e) => scrollTo(e, item.id)}
            className="hover:text-white/90 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile-only collapsed menu button placeholder. 
            For this cinematic experience, usually we just let users scroll on mobile, 
            but showing the CTA is critical. */}
        <button 
          onClick={(e) => scrollTo(e as any, 'buy')}
          className="relative group px-4 py-1.5 md:px-5 rounded-full text-[10px] md:text-xs font-semibold text-white overflow-hidden transition-transform active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-[1px] bg-brand-dark rounded-full" />
          <span className="relative z-10 transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.6)]">
            Experience XM6
          </span>
        </button>
      </div>
    </motion.nav>
  );
}
