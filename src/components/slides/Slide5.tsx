"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { VideoPlayer } from "../VideoPlayer";
import React from "react";

export default function Slide5() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 20);
    y.set((e.clientY - centerY) / 20);
  };

  const shadowX = useTransform(x, (val) => val * -2);
  const shadowY = useTransform(y, (val) => val * -2);

  return (
    <div 
      className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 bg-[#050505] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* Background Ambient Glow (Tracks mouse inversely to create rim light logic) */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 blur-[150px] pointer-events-none mix-blend-screen bg-gradient-to-br from-orange-600 via-red-800 to-purple-900"
        style={{ x: shadowX, y: shadowY, scale: 1.5 }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

      {/* Dynamic Cinematic Sparks/Embers Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute bg-orange-500 rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              boxShadow: "0 0 10px 2px rgba(249, 115, 22, 0.8)",
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, Math.random() * 0.8 + 0.2, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5
            }}
          />
        ))}
        {/* Pulsing deep warning red overlay */}
        <motion.div 
          className="absolute inset-0 bg-red-900/10 mix-blend-overlay"
           animate={{ opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        
        <motion.h2 
          className="text-3xl md:text-5xl font-black mb-12 text-center uppercase tracking-[0.3em] font-sans text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Thảm Họa Thực Tế
        </motion.h2>

        {/* The Frame Container */}
        <motion.div 
          className="relative w-full max-w-5xl rounded-[24px] p-[4px]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, type: "spring", bounce: 0.4 }}
        >
          {/* Animated Glowing Border using a moving gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-[28px] blur-md opacity-70 animate-[gradient_4s_ease_infinite] bg-[length:200%_200%]" />
          
          <div className="relative w-full aspect-video bg-black rounded-[20px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10">
            {/* Glossy Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-[20px] z-20" />
            
            <div className="w-full h-full isolate z-10 relative">
              <VideoPlayer 
                videoId="-jSy_p7iAcc" 
                title="Video Thực Tế Thảm Họa Cháy" 
              />
            </div>
          </div>
        </motion.div>
        
        {/* Subtle ground reflection */}
        <motion.div 
           className="w-3/4 max-w-4xl h-8 mt-4 bg-orange-500/20 blur-2xl rounded-[100%]"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5, duration: 1 }}
        />

      </div>
    </div>
  );
}
