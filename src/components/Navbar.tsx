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
      
      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-white/60">
        {["Overview", "Technology", "Noise Cancelling", "Specs", "Buy"].map((item) => (
          <a key={item} href="#" className="hover:text-white/90 transition-colors">
            {item}
          </a>
        ))}
      </div>

      <div>
        <button className="relative group px-5 py-1.5 rounded-full text-xs font-semibold text-white overflow-hidden transition-transform active:scale-95">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-[1px] bg-brand-dark rounded-full" />
          <span className="relative z-10 transition-shadow duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,214,255,0.6)]">
            Experience WH-1000XM6
          </span>
        </button>
      </div>
    </motion.nav>
  );
}
