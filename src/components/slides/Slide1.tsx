"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Slide1() {
  const [embers, setEmbers] = useState<{ id: string; x: number; y: number; size: number; delay: number; duration: number; opacity: number }[]>([]);
  const [sparks, setSparks] = useState<{ id: string; x: number; y: number; size: number; delay: number; duration: number; angle: number }[]>([]);

  useEffect(() => {
    // Generate slow rising, glowing embers
    const newEmbers = Array.from({ length: 100 }).map((_, i) => ({
      id: `ember-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 20 + 80, // Start near the bottom
      size: Math.random() * 6 + 3,
      delay: Math.random() * 3,
      duration: Math.random() * 5 + 4,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setEmbers(newEmbers);

    // Generate fast, erratic sparks that shoot up
    const newSparks = Array.from({ length: 80 }).map((_, i) => ({
      id: `spark-${i}`,
      x: Math.random() * 100,
      y: 110, // Start below screen
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1.5,
      angle: (Math.random() - 0.5) * 60 // -30 to 30 degrees spread
    }));
    setSparks(newSparks);
  }, []);

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-[#020000] text-white font-sans">
      
      {/* Pure CSS Cinematic Fire Background */}
      
      {/* Massive Bottom Fire Core */}
      <motion.div 
        className="absolute -bottom-[50vh] left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] rounded-[100%] opacity-80 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #ea580c 0%, #991b1b 40%, transparent 80%)"
        }}
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Deep Red Ambient Glow */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(153,27,27,0.3)_0%,transparent_70%)] pointer-events-none"
      />

      {/* Abstract Smoke/Heat Haze Layers */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-t from-orange-950/40 via-red-950/10 to-transparent mix-blend-color-dodge pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <motion.div 
         className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
      />

      {/* Floating Glowing Embers */}
      {embers.map((p) => (
        <motion.div
           key={p.id}
           className="absolute z-10 rounded-full bg-orange-500 pointer-events-none mix-blend-screen"
           style={{
             left: `${p.x}%`,
             width: `${p.size}px`,
             height: `${p.size}px`,
             boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(249, 115, 22, 0.8)`,
           }}
           initial={{ y: `${p.y}vh`, opacity: 0 }}
           animate={{
             y: "-20vh",
             opacity: [0, p.opacity, p.opacity, 0],
             scale: [0.5, 1.5, 0.5],
             x: `calc(${p.x}% + ${Math.sin(p.size) * 30}px)` // Drift left/right
           }}
           transition={{
             duration: p.duration,
             delay: p.delay,
             repeat: Infinity,
             ease: "easeIn",
             times: [0, 0.2, 0.8, 1]
           }}
        />
      ))}

      {/* Shooting Sparks */}
      {sparks.map((s) => (
        <motion.div
           key={s.id}
           className="absolute z-10 rounded-full bg-yellow-200 pointer-events-none mix-blend-screen"
           style={{
             left: `${s.x}%`,
             width: '2px',
             height: `${s.size * 5}px`, // make them look like streaks
             boxShadow: `0 0 10px 2px rgba(253, 224, 71, 1)`,
             rotate: `${s.angle}deg`
           }}
           initial={{ y: "110vh", opacity: 0 }}
           animate={{
             y: "-30vh",
             x: `calc(${s.x}% + ${s.angle * 5}px)`, // Follow the angle spread
             opacity: [0, 1, 0],
           }}
           transition={{
             duration: s.duration,
             delay: s.delay,
             repeat: Infinity,
             ease: "easeOut",
             times: [0, 0.1, 1]
           }}
        />
      ))}

      {/* Light Flare Burst in the center on load */}
      <motion.div 
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-20"
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] }}
         transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
      />

      {/* Main Content Reveal */}
      <motion.div 
        className="relative z-30 text-center px-6 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <motion.div 
          className="mb-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-orange-500" />
          <p className="text-orange-400 font-mono tracking-[0.4em] text-sm md:text-base uppercase drop-shadow-[0_0_10px_rgba(234,88,12,0.8)]">
            Chuyên Đề Hóa Học
          </p>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-orange-500" />
        </motion.div>

        <h1 className="text-[5rem] md:text-[8rem] lg:text-[10rem] font-sans font-black leading-none mb-8 tracking-tighter">
          <motion.span 
            className="inline-block text-orange-50 px-4"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            animate={{ 
              opacity: [0, 1, 1, 0.4, 1, 0.8, 1],
              scale: [1.1, 1, 1, 1, 1, 1, 1],
              filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(0px)", "blur(2px)", "blur(0px)"],
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 5px #fff, 0 0 15px #fb923c, 0 0 30px #f97316, 0 0 60px #ea580c",
                "0 0 5px #fff, 0 0 15px #fb923c, 0 0 30px #f97316, 0 0 60px #ea580c",
                "0 0 2px #fff, 0 0 5px #fb923c, 0 0 10px #ea580c",
                "0 0 5px #fff, 0 0 15px #fb923c, 0 0 30px #f97316, 0 0 60px #ea580c",
                "0 0 2px #fff, 0 0 5px #fb923c, 0 0 10px #ea580c",
                "0 0 5px #fff, 0 0 20px #fb923c, 0 0 40px #f97316, 0 0 80px #ea580c, 0 0 120px #c2410c"
              ]
            }}
            transition={{ duration: 3, delay: 1.5, times: [0, 0.6, 0.7, 0.75, 0.8, 0.85, 1] }}
          >PHẢN ỨNG</motion.span>
          <br/>
          <motion.span 
            className="inline-block text-red-50 px-4 mt-2"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            animate={{ 
              opacity: [0, 1, 1, 0.4, 1, 0.8, 1],
              scale: [1.1, 1, 1, 1, 1, 1, 1],
              filter: ["blur(20px)", "blur(0px)", "blur(0px)", "blur(4px)", "blur(0px)", "blur(2px)", "blur(0px)"],
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 5px #fff, 0 0 15px #f87171, 0 0 30px #ef4444, 0 0 60px #dc2626",
                "0 0 5px #fff, 0 0 15px #f87171, 0 0 30px #ef4444, 0 0 60px #dc2626",
                "0 0 2px #fff, 0 0 5px #f87171, 0 0 10px #dc2626",
                "0 0 5px #fff, 0 0 15px #f87171, 0 0 30px #ef4444, 0 0 60px #dc2626",
                "0 0 2px #fff, 0 0 5px #f87171, 0 0 10px #dc2626",
                "0 0 5px #fff, 0 0 20px #f87171, 0 0 40px #ef4444, 0 0 80px #dc2626, 0 0 120px #991b1b"
              ]
            }}
            transition={{ duration: 3, delay: 1.8, times: [0, 0.6, 0.7, 0.75, 0.8, 0.85, 1] }}
          >CHÁY NỔ</motion.span>
        </h1>
        
        <motion.div 
           className="relative mt-4"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 3 }}
        >
          <div className="absolute inset-0 bg-red-900/30 blur-2xl pointer-events-none" />
          <p className="relative text-xl md:text-3xl text-orange-50/80 font-light max-w-4xl mx-auto leading-relaxed border-l-4 border-orange-500 pl-6 text-left">
            Khám phá bản chất của sự hủy diệt: Điều kiện hình thành, cơ chế phát triển và những hậu quả thảm khốc không lường trước.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
