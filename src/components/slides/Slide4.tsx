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
             x: { duration: ash.duration, repeat: Infinity, delay: ash.delay, ease: "easeInOut", repeatType: "mirror" },
             rotate: { duration: ash.duration / 2, repeat: Infinity, ease: "linear" }
           }}
        />
      ))}

      {/* Floating UI Elements Container */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 md:px-10 py-10 pointer-events-none">
        <motion.div
          style={{ y: textFloatY, translateZ: 90 }}
          className="w-full max-w-6xl mb-10 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-orange-400/35 bg-black/35 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)]" />
            <span className="text-[11px] md:text-xs tracking-[0.22em] font-semibold uppercase text-orange-200/90">
              Tình Huống Thực Tế
            </span>
          </div>

          <motion.h2
            className="mt-5 text-5xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-[-0.02em] text-transparent bg-clip-text bg-gradient-to-b from-zinc-50 via-emerald-100 to-cyan-200 drop-shadow-[0_12px_30px_rgba(16,185,129,0.38)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15 }}
          >
            Lá Phổi Xanh
          </motion.h2>

          <p className="mt-3 text-lg md:text-2xl text-orange-100/90 font-medium tracking-[0.12em] uppercase">
            Rừng Amazon Bốc Cháy
          </p>

          <p className="mt-4 max-w-4xl text-base md:text-lg text-zinc-200/85 leading-relaxed">
            Cháy rừng không chỉ là mất cây xanh, mà còn làm suy yếu khả năng điều hòa khí hậu toàn cầu và đẩy nhanh phát thải khí nhà kính.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl pointer-events-auto">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-zinc-950/70 backdrop-blur-lg p-7 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            onMouseEnter={() => play("hover")}
            whileHover={{ y: -5, scale: 1.015, borderColor: "rgba(16,185,129,0.65)" }}
            style={{ translateZ: 45 }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-300/90 font-semibold">Vai Trò Khí Hậu</div>
            <div className="mt-4 text-4xl md:text-5xl font-black text-emerald-300 leading-none">2 TỶ TẤN CO₂</div>
            <div className="mt-1 text-sm text-emerald-100/70 uppercase tracking-[0.14em]">Lượng hấp thụ mỗi năm</div>

            <p className="mt-5 text-[1.05rem] text-zinc-100/90 leading-relaxed">
              Hệ sinh thái Amazon lưu trữ carbon quy mô lớn và giải phóng hơi nước tạo mây, góp phần ổn định chu trình mưa của Nam Mỹ.
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-orange-400/30 bg-zinc-950/70 backdrop-blur-lg p-7 md:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onMouseEnter={() => play("hover")}
            whileHover={{ y: -5, scale: 1.015, borderColor: "rgba(251,146,60,0.65)" }}
            style={{ translateZ: 65 }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
            <div className="text-xs uppercase tracking-[0.2em] text-orange-300/90 font-semibold">Đa Dạng Sinh Học</div>
            <div className="mt-4 text-4xl md:text-5xl font-black text-orange-300 leading-none">20% LOÀI THỰC VẬT</div>
            <div className="mt-1 text-sm text-orange-100/70 uppercase tracking-[0.14em]">Tập trung tại Amazon</div>

            <p className="mt-5 text-[1.05rem] text-zinc-100/90 leading-relaxed">
              Cháy rừng phá hủy nơi cư trú, làm đứt gãy chuỗi thức ăn và giải phóng lượng lớn khí nhà kính, gia tăng rủi ro thời tiết cực đoan.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
