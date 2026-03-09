"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll(); // Overall page scroll
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const FRAME_COUNT = 240;

  // Render a specific frame
  const renderFrame = (index: number, imgs: HTMLImageElement[] = images) => {
    if (!imgs[index] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha false for performance
    if (!ctx) return;

    const img = imgs[index];
    
    // Scale canvas to device pixel ratio for maximum sharpness
    const dpr = window.devicePixelRatio || 1;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    
    // Resize canvas ONLY if dimensions changed to avoid unnecessary repaints
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear canvas
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cw, ch);
    
    // Calculate Cover/Contain ratio
    const hRatio = cw / img.width;
    const vRatio = ch / img.height;
    const ratio = Math.max(hRatio, vRatio); // Use max for 'cover' equivalent
    
    const centerShift_x = (cw - img.width * ratio) / 2;
    const centerShift_y = (ch - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`; // Public folder path
      
      img.onload = () => {
        loadedCount++;
        // If this is the very first frame, render it immediately so the screen isn't blank
        if (i === 1) {
          renderFrame(0, loadedImages);
        }
        
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Initial render immediately once fully loaded
          renderFrame(0, loadedImages);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setImages(loadedImages);
      };
      
      // We must push into the array at the correct index to keep frames sequential 
      // even if they load out of order
      loadedImages[i - 1] = img;
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // We allow scrubbing even if not ALL images are loaded, using the ones that are
    if (images.length === 0) return;
    
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0) {
         const latest = scrollYProgress.get();
         const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
         requestAnimationFrame(() => renderFrame(frameIndex));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  return (
    // Make it fixed so it never scrolls away and acts as a true background
    <div className="fixed top-0 left-0 w-full h-screen bg-brand-dark overscroll-none overflow-hidden" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
