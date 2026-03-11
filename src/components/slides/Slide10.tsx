"use client";

import { motion } from "framer-motion";
import { VideoPlayer } from "../VideoPlayer";
import { useEffect, useState } from "react";

export default function Slide10() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2800); // Wait for the neon trace to finish a couple rounds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 bg-[#020810] text-white overflow-hidden">
      
      {/* Sci-Fi Grid Background for Slide 11 */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen z-0"
        style={{ 
          backgroundImage: "linear-gradient(rgba(6,182,212,0.2) 2px, transparent 2px), linear-gradient(90deg, rgba(6,182,212,0.2) 2px, transparent 2px)", 
          backgroundSize: "60px 60px", 
          transform: "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(-200px)" 
        }}
      />
      <motion.div 
         className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0 pointer-events-none"
      />
      
      {/* Sweeping Scanner Line */}
      <motion.div 
        className="absolute left-0 w-full h-[2px] bg-cyan-400 z-0 pointer-events-none shadow-[0_0_20px_4px_rgba(6,182,212,0.8)] opacity-40"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <motion.h2 
        className="relative z-10 text-4xl md:text-5xl font-semibold mb-12 text-center text-cyan-400 font-mono drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        [ MÔ PHỎNG SỨC ÉP VẬT LÝ ]
      </motion.h2>

      <div className="relative w-full aspect-video max-w-5xl rounded-2xl flex items-center justify-center">
        {/* Neon Border SVG Trace */}
        <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none" preserveAspectRatio="none">
          <motion.rect
            x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="16" ry="16"
            fill="none"
            stroke="#06b6d4" // Cyan-500
            strokeWidth="4"
            className="drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: showVideo ? 0.2 : 1 }}
            transition={{ duration: 2, ease: "easeInOut", opacity: { delay: 2.5, duration: 1 } }}
          />
        </svg>

        {/* Video Player appearing */}
        <motion.div 
          className="w-full h-full absolute inset-0 z-10"
          initial={{ opacity: 0, filter: "brightness(0)" }}
          animate={showVideo ? { opacity: 1, filter: "brightness(1)" } : {}}
          transition={{ duration: 1 }}
        >
          <div className="bg-black w-full h-full rounded-2xl overflow-hidden border border-cyan-900 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            {/* Same VideoPlayer component used previously */}
            <VideoPlayer 
              videoId="El40ZpRA9wc" 
              title="Sức ép nổ vật lý" 
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
