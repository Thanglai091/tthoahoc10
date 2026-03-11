"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AlertCircle, Target, Database } from "lucide-react";

export default function Slide12() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [scanLines, setScanLines] = useState<number[]>([]);

  useEffect(() => {
    // Generate random scan lines for the background
    setScanLines(Array.from({ length: 5 }).map(() => Math.random() * 100));
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="relative w-full h-[100vh] bg-zinc-950 text-white overflow-hidden flex items-center justify-center font-sans cursor-crosshair"
      onMouseMove={handleMouseMove}
    >
      
      {/* Base Layer: Blueprint / Dark structure of the ship */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 grayscale blur-[2px]"
        style={{ backgroundImage: "url('/img/no_hoa_hoc/IMG_20260311_082432.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-[#050505]/90 mix-blend-multiply" />

      {/* Dynamic Background Scan Lines */}
      {scanLines.map((top, i) => (
        <motion.div
           key={i}
           className="absolute left-0 w-full h-[1px] bg-red-900/30 z-0"
           initial={{ top: `${top}%`, opacity: 0 }}
           animate={{ top: ["0%", "100%"], opacity: [0, 0.5, 0] }}
           transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
        />
      ))}

      {/* Hidden Thermal Layer revealed by mouse mask */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-10 filter sepia brightness-[1.8] contrast-[1.2]"
        style={{ 
          backgroundImage: "url('/img/no_hoa_hoc/IMG_20260311_082432.jpg')",
          WebkitMaskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
          maskImage: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`,
        }}
      >
        {/* Simulate toxic gas clouds intensely bubbling in thermal view */}
        <div className="absolute inset-0 bg-red-600/70 mix-blend-color" />
        
        {/* Animated Heat Spots */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-300/40 via-orange-500/20 to-transparent pointer-events-none mix-blend-screen"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Scanning reticle tracking mouse on this layer */}
        <motion.div 
           className="absolute w-[350px] h-[350px] border-[2px] border-dashed border-red-500/40 rounded-full pointer-events-none"
           style={{ left: mouseX, top: mouseY, translateX: "-50%", translateY: "-50%" }}
           animate={{ rotate: 360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {/* Inner Crosshair targeting */}
          <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-red-500/40" />
        </motion.div>
      </motion.div>

      {/* High-Tech Grid Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-20" 
        style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} 
      />

      {/* Main Content Interface */}
      <div className="relative z-30 w-full max-w-7xl px-8 flex flex-col md:flex-row h-full items-center gap-16 pointer-events-none">
        
        {/* Left Side: Title */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center gap-4 text-red-500 mb-6 font-mono font-bold tracking-widest text-sm bg-red-950/40 w-max px-4 py-2 border border-red-900 rounded-sm">
              <AlertCircle size={20} className="animate-pulse" />
              <span>THERMAL SCAN V.12 ENHANCED</span>
            </div>
            
            <h2 className="text-5xl md:text-[5.5rem] font-bold mb-4 text-white leading-none drop-shadow-[0_10px_30px_rgba(220,38,38,0.4)]">
              VÍ DỤ<br/>THỰC TẾ
            </h2>
            <h3 className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 font-black uppercase tracking-widest mt-2 border-b border-red-500/30 pb-4 inline-block">
              Khoang Tàu Dầu
            </h3>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-col gap-4 text-zinc-500 font-mono text-sm max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center gap-3 border border-red-900/50 p-3 rounded bg-black/60 backdrop-blur-md">
               <Database className="w-5 h-5 text-red-500 animate-pulse" />
               <span>DỮ LIỆU CẢM BIẾN BẤT THƯỜNG</span>
            </div>
            <p className="border border-zinc-800/50 p-3 rounded bg-black/40">
              &gt; RÊ CHUỘT VÀO VÙNG KHÔNG GIAN ĐỂ HIỂN THỊ MỨC ĐỘ NGUY HIỂM ẨN DẤU_
            </p>
          </motion.div>
        </div>

        {/* Right Side: Morphing Warning Block */}
        <div className="flex-1 pointer-events-auto">
          <motion.div 
            className="bg-[#0a0202]/95 backdrop-blur-2xl border-[1px] border-red-900/40 p-10 md:p-14 rounded-3xl shadow-[0_30px_80px_rgba(220,38,38,0.2)] relative overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, type: "spring", bounce: 0.3 }}
          >
            {/* Holographic Glowing Edge */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
            <motion.div 
              className="absolute left-0 top-0 w-[4px] h-[50%]"
              style={{ background: "linear-gradient(to bottom, transparent, #ef4444, transparent)" }}
              animate={{ top: ["-50%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <h3 className="text-3xl font-black mb-8 text-white uppercase tracking-wider flex items-center gap-4">
              <span className="flex h-4 w-4 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
              Rủi Ro Trực Chờ
            </h3>
            
            <p className="text-2xl leading-relaxed text-zinc-300 font-light mb-8">
              Ngay cả khi khoang tàu đã được <strong className="text-red-400 border-b-2 border-red-500/50 pb-1">hút cạn</strong>, một lượng hơi dầu bám dính vẫn còn tích tụ lẩn khuất bên trong cực kỳ nguy hiểm.
            </p>
            
            <div className="bg-red-950/30 border border-red-900/50 p-6 rounded-2xl relative">
              <div className="absolute -left-3 -top-3 w-6 h-6 border-t-2 border-l-2 border-red-500" />
              <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-2 border-r-2 border-red-500" />
              
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-300 font-light">
                Lượng hơi này trộn lẫn với Oxygen tạo thành <strong className="text-white font-bold bg-red-600 px-3 py-1 rounded mx-1 align-middle shadow-[0_0_15px_rgba(220,38,38,0.6)]">hỗn hợp dễ nổ</strong>. <br/>
                <span className="text-orange-300 mt-2 block">Chỉ cần chạm một nguồn nhiệt (sửa chữa/hàn cắt), sẽ kích hoạt phản ứng hóa học cực mạnh, gây nổ tung buồng kín.</span>
              </p>
            </div>
            
          </motion.div>
        </div>

      </div>
      
    </div>
  );
}
