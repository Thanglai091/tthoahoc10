"use client";

import { motion } from "framer-motion";
import React from "react";
import { AlertTriangle, Ghost } from "lucide-react";

export default function Slide3() {
  return (
    <div 
      className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 bg-[#020617] overflow-hidden font-sans perspective-[2000px]"
    >
      {/* Background Holographic Grid */}
      <div 
        className="absolute inset-0 z-0 bg-repeat opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#4ADE80 1px, transparent 1px), linear-gradient(90deg, #4ADE80 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      
      {/* Glow from the "floor" */}
      <div className="absolute bottom-[-20%] w-[120%] h-[50%] bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center transform-style-3d"
      >
        
        <motion.div
           initial={{ opacity: 0, translateZ: -200 }}
           animate={{ opacity: 1, translateZ: 50 }}
           transition={{ duration: 1, type: "spring" }}
           className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-red-500/10 border border-red-500/30 px-6 py-2 rounded-full backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <AlertTriangle className="text-red-500 animate-pulse" />
            <span className="text-red-400 font-mono tracking-widest uppercase font-bold text-sm">Cảnh Báo Độ Độc Hại</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-red-500 drop-shadow-[0_10px_30px_rgba(239,68,68,0.5)] uppercase tracking-tighter">
            Hậu Quả Ngoài Ý Muốn
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          
          <motion.div 
            className="flex-1 bg-[#0f172a]/80 backdrop-blur-xl border border-red-500/30 rounded-3xl p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, x: -100, rotateY: 30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            style={{ translateZ: 80 }}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent h-[10px] w-full animate-[scanline_2s_linear_infinite]" />
            
            <Ghost className="w-16 h-16 text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
            <h3 className="text-3xl font-bold text-red-100 mb-4 font-mono">/ Khí độc ẩn chứa</h3>
            <p className="text-xl text-zinc-300 leading-relaxed font-light">
              Sinh ra các luồng khí độc như <strong className="text-red-400">CO, HCN, HCl, SO₂...</strong> lan tỏa vô hình. Chúng ngấm vào không khí, gây nghẹt thở và tổn thương trực tiếp cho sinh vật trong khu vực.
            </p>
          </motion.div>

          <motion.div 
            className="flex-1 bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.7, duration: 1, type: "spring" }}
            style={{ translateZ: 120 }}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent h-[10px] w-full animate-[scanline_2s_linear_infinite]" />
            
            <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-500/50 mb-6 flex items-center justify-center animate-[spin_10s_linear_infinite] drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">
               <div className="w-6 h-6 bg-blue-400 rounded-full" />
            </div>
            
            <h3 className="text-3xl font-bold text-blue-100 mb-4 font-mono">/ Khí hậu toàn cầu</h3>
            <p className="text-xl text-zinc-300 leading-relaxed font-light">
              Tác nhân khổng lồ thầm lặng gây ra <strong className="text-blue-400">hiệu ứng nhà kính</strong> và <strong className="text-blue-400">biến đổi khí hậu</strong> toàn cầu, phá vỡ hệ thống sinh thái tự nhiên dài hạn.
            </p>
          </motion.div>
          
        </div>
      </motion.div>
    </div>
  );
}
