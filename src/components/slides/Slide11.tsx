"use client";

import { motion } from "framer-motion";
import { Atom, Zap, Maximize } from "lucide-react";
import React from "react";

export default function Slide11() {
  const particles = Array.from({ length: 30 });

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#050000] text-gray-200 overflow-hidden font-sans border-t-8 border-orange-600">
      
      {/* Deep Core Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15)_0%,rgba(0,0,0,1)_80%)] pointer-events-none" />
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between gap-12 p-12">
        
        {/* Left Text: Scanning Report */}
        <div className="flex-1 w-full flex flex-col justify-center">
          
          <motion.div
             className="flex items-center gap-3 mb-4 text-orange-500 font-mono tracking-widest text-sm"
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
          >
             <Atom className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
             <span>CHEMICAL_REACTION_SIMULATION_V2</span>
          </motion.div>

          <motion.h2 
            className="text-[12vw] lg:text-[7vw] font-black leading-none mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] uppercase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 0.2 }}
          >
            NỔ HÓA HỌC
          </motion.h2>

          <motion.div 
            className="relative p-8 rounded-3xl bg-red-950/20 backdrop-blur-md border border-orange-500/20 shadow-[0_10px_40px_rgba(239,68,68,0.15)] group hover:border-orange-500/40 transition-colors"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
             <p className="text-2xl lg:text-3xl leading-relaxed text-gray-300 font-light">
               Sự nổ gây ra do phản ứng hóa học diễn ra với <strong className="text-orange-400 font-normal">tốc độ cực nhanh</strong>, tỏa nhiều nhiệt, sinh ra lượng khí lớn làm <strong className="text-red-400 font-normal border-b border-red-500 border-dashed">tăng áp suất đột ngột</strong>.
             </p>
             
             <div className="mt-8 pt-8 border-t border-orange-500/20 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                   <Zap className="w-8 h-8 text-yellow-500 shrink-0 mt-1 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                   <div>
                     <h3 className="text-xl font-bold font-mono tracking-widest text-yellow-400 mb-1">BẮT BUỘC</h3>
                     <p className="text-xl text-gray-400 font-light">Có chất mới tạo thành (biến đổi hóa học hoàn toàn).</p>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>

        {/* Right Graphic: Molecular Detonation Core */}
        <div className="flex-1 w-full h-[600px] flex items-center justify-center relative perspective-[1500px]">
          <div className="relative w-[500px] h-[500px] flex items-center justify-center transform-style-preserve-3d cursor-crosshair group">
            
            {/* Pulsing Aura */}
            <motion.div 
              className="absolute inset-0 bg-orange-600/30 blur-[80px] rounded-full z-0"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Central Heat Core */}
            <motion.div 
              className="w-48 h-48 bg-[radial-gradient(circle_at_center,#fef08a_0%,#ef4444_50%,#7f1d1d_100%)] rounded-full shadow-[0_0_100px_rgba(239,68,68,0.8)] z-20 flex items-center justify-center overflow-hidden border-2 border-orange-400/50"
              animate={{ 
                 scale: [1, 1.05, 1, 1.2, 0.9, 1],
                 rotateZ: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
               <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
               <Maximize className="w-16 h-16 text-white/50 animate-ping" />
            </motion.div>

            {/* Floating Atom Nodes & Lines imitating molecular breakdown */}
            <div className="absolute inset-0 z-30 pointer-events-none group-hover:pointer-events-auto">
               {particles.map((_, i) => {
                 // Randomize spawn positions in a sphere around center
                 const angle = (Math.PI * 2 * i) / particles.length;
                 const distance = 150 + Math.random() * 100;
                 const finalX = Math.cos(angle) * distance;
                 const finalY = Math.sin(angle) * distance;

                 return (
                   <motion.div
                     key={i}
                     className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-orange-400 shadow-[0_0_15px_rgba(249,115,22,1)]"
                     initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                     animate={{ 
                       x: [0, finalX, finalX * 1.5, finalX * 2], 
                       y: [0, finalY, finalY * 1.5, finalY * 2], 
                       scale: [0, 1, 0.5, 0],
                       opacity: [0, 1, 0.8, 0] 
                     }}
                     transition={{ 
                       duration: 2 + Math.random(), 
                       repeat: Infinity, 
                       delay: Math.random() * 2,
                       ease: "easeOut"
                     }}
                   />
                 );
               })}
            </div>

            {/* Connection Web (Drawn statically to represent bounds before breakage) */}
            <motion.div 
               className="absolute inset-[-20%] border-[1px] border-dashed border-red-500/20 rounded-full z-10"
               animate={{ rotate: 360, scale: [1, 1.1, 1] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
               className="absolute inset-[10%] border-[2px] border-dotted border-orange-500/30 rounded-full z-10"
               animate={{ rotate: -360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

          </div>
        </div>

      </div>

    </div>
  );
}
