"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSoundEffect } from "../useSoundEffect";

export default function Slide4() {
  const { play } = useSoundEffect();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [ashes, setAshes] = useState<{ id: string; x: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    // Generate falling ash particles
    const newAshes = Array.from({ length: 40 }).map((_, i) => ({
      id: `ash-${i}`,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      size: Math.random() * 4 + 1
    }));
    setAshes(newAshes);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 20); // Sensitivity
    y.set((e.clientY - centerY) / 20);
  };

  // Parallax layers (different depths)
  const layer1X = useTransform(x, (val) => val * 0.5);
  const layer1Y = useTransform(y, (val) => val * 0.5);
  
  const layer2X = useTransform(x, (val) => val * -1.5);
  const layer2Y = useTransform(y, (val) => val * -1.5);

  const textFloatY = useTransform(y, [ -50, 50 ], [ -10, 10 ]);

  return (
    <div 
      className="relative w-full h-[100vh] bg-[#0A1108] overflow-hidden font-sans perspective-[1500px]"
      onMouseMove={handleMouseMove}
    >
      
      {/* Background Deep Layer (Far blur) */}
      <motion.div 
        className="absolute inset-[-10%] bg-cover bg-center opacity-40 blur-md grayscale"
        style={{ backgroundImage: "url('/img/chay/IMG_20260311_082649.jpg')", x: layer1X, y: layer1Y }}
      />
      
      {/* Mid Layer (Amazon Forest Focus) */}
      <motion.div 
        className="absolute inset-[-5%] bg-cover bg-center brightness-75 contrast-125 mix-blend-screen"
        style={{ backgroundImage: "url('/img/chay/IMG_20260311_082650.jpg')", x: layer2X, y: layer2Y }}
      >
        {/* Burning Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.9)_100%)] pointer-events-none" />
        
        {/* Animated pulsating ambient heat glow */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(234,88,12,0.3)_0%,transparent_60%)] mix-blend-color-dodge pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3f1900] via-transparent to-[#132c14] opacity-80 mix-blend-multiply flex-none pointer-events-none" />
      </motion.div>

      {/* Falling Ash Particles */}
      {ashes.map((ash) => (
        <motion.div
           key={ash.id}
           className="absolute z-10 rounded-full bg-zinc-400 pointer-events-none filter blur-[1px]"
           style={{
             left: `${ash.x}%`,
             width: `${ash.size}px`,
             height: `${ash.size}px`,
             opacity: 0.6
           }}
           initial={{ y: "-10vh", x: 0 }}
           animate={{
             y: "110vh",
             x: [0, Math.random() * 40 - 20, 0], // Drifting side to side
             rotate: [0, 360]
           }}
           transition={{
             y: { duration: ash.duration, repeat: Infinity, delay: ash.delay, ease: "linear" },
             x: { duration: ash.duration, repeat: Infinity, delay: ash.delay, ease: "easeInOut", yoyo: Infinity },
             rotate: { duration: ash.duration / 2, repeat: Infinity, ease: "linear" }
           }}
        />
      ))}

      {/* Floating UI Elements Container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 pointer-events-none">
        
        {/* Title */}
        <motion.div
           style={{ y: textFloatY, translateZ: 100 }}
           className="text-center mb-16 transform-style-3d relative"
        >
          {/* Backing flame glow for text */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-orange-600/30 blur-[80px] -z-10 rounded-full mix-blend-screen"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.h2 
            className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-orange-500 drop-shadow-[0_20px_40px_rgba(234,88,12,0.8)]"
            initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          >
            Lá Phổi Xanh
          </motion.h2>
          <motion.p 
            className="text-3xl font-light text-orange-200 tracking-[0.3em] mt-4 uppercase drop-shadow-[0_0_10px_rgba(249,115,22,1)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Rừng Amazon Bốc Cháy
          </motion.p>
        </motion.div>

        {/* Info Cards (Glassmorphism + Interactive Hover) */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mt-8 pointer-events-auto">
          
          <motion.div 
            className="flex-1 bg-gradient-to-br from-green-950/60 to-black/80 backdrop-blur-xl border border-green-500/30 p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group cursor-default"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            onMouseEnter={() => play("hover")}
            whileHover={{ scale: 1.05, borderColor: "rgba(74,222,128,0.8)", boxShadow: "0 0 50px rgba(74,222,128,0.4)", y: -10 }}
            transition={{ opacity: { delay: 0.5 }, x: { delay: 0.5 }, default: { type: "spring", stiffness: 300, damping: 20 } }}
            style={{ translateZ: 50 }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-green-400/50 transition-colors duration-500" />
            
            {/* Ambient scanline over card */}
            <motion.div 
              className="absolute left-0 w-full h-1 bg-green-400/50 shadow-[0_0_10px_rgba(74,222,128,0.8)] opacity-0 group-hover:opacity-100"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <p className="text-2xl text-green-50 font-light leading-relaxed relative z-10 transition-colors group-hover:text-white">
              Mỗi năm lưu giữ tới <strong className="text-green-400 text-4xl block my-3 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] filter group-hover:brightness-150 transition-all">2 TỶ TẤN CO₂</strong>
              Hàng tỷ cây giải phóng hơi nước tạo mây, ảnh hưởng sâu sắc tới thời tiết và sinh thái toàn cầu.
            </p>
          </motion.div>

          <motion.div 
            className="flex-1 bg-gradient-to-br from-orange-950/60 to-black/80 backdrop-blur-xl border border-orange-500/30 p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group cursor-default"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            onMouseEnter={() => play("hover")}
            whileHover={{ scale: 1.05, borderColor: "rgba(249,115,22,0.8)", boxShadow: "0 0 50px rgba(249,115,22,0.4)", y: -10 }}
            transition={{ opacity: { delay: 0.7 }, x: { delay: 0.7 }, default: { type: "spring", stiffness: 300, damping: 20 } }}
            style={{ translateZ: 80 }}
          >
             <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/50 transition-colors duration-500" />
            
            {/* Ambient scanline over card */}
            <motion.div 
              className="absolute left-0 w-full h-1 bg-orange-400/50 shadow-[0_0_10px_rgba(249,115,22,0.8)] opacity-0 group-hover:opacity-100"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <p className="text-2xl text-orange-50 font-light leading-relaxed relative z-10 transition-colors group-hover:text-white">
              Nơi sinh sống của <strong className="text-orange-400 text-4xl block my-3 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] filter group-hover:brightness-150 transition-all">20% LOÀI THỰC VẬT</strong>
              trên Trái Đất. Việc cháy rừng phá vỡ toàn bộ hệ thống sinh thái mong manh này, giải phóng khí thải nhà kính khổng lồ.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
