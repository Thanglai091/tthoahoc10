"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BlockMath } from "react-katex";
import React, { useState } from "react";
import { AlertTriangle, Fingerprint } from "lucide-react";

export default function Slide14() {
  const [detonated, setDetonated] = useState(false);

  const handleDetonate = () => {
    if (detonated) return;
    setDetonated(true);
  };

  return (
    <div className="relative w-full h-[100vh] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Screen Shake Container */}
      <motion.div 
        className="w-full h-full flex flex-col items-center justify-center relative p-8"
        animate={
          detonated ? { 
            x: [0, -20, 20, -15, 15, -10, 10, -5, 5, 0],
            y: [0, 20, -20, 15, -15, 10, -10, 5, -5, 0],
            scale: [1, 1.05, 1],
            filter: ["blur(0px)", "blur(10px)", "blur(0px)"]
          } : {}
        }
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        
        {/* Ambient Dark Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#f00 1px, transparent 1px), linear-gradient(90deg, #f00 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(10,10,10,1)_80%)] border-4 border-red-900/30" />

        {/* Top Header */}
        <div className="absolute top-8 w-full flex justify-between px-12 z-20 pointer-events-none">
          <div className="text-red-600/70 font-mono text-sm tracking-widest flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            CLASS 1 EXPLOSIVE
          </div>
          <div className="text-red-600/70 font-mono text-sm tracking-widest">
            TRINITROTOLUENE (TNT)
          </div>
        </div>

        {/* Central Detonator UI (Pre-Detonation) */}
        <AnimatePresence>
          {!detonated && (
            <motion.div 
              className="relative z-30 flex flex-col items-center cursor-pointer group"
              onClick={handleDetonate}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-40 h-40 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 rounded-full border-4 border-dashed border-red-600/50 bg-red-950/30 backdrop-blur-md group-hover:bg-red-900/50 group-hover:border-red-500 transition-colors shadow-[0_0_50px_rgba(220,38,38,0.2)] group-hover:shadow-[0_0_80px_rgba(220,38,38,0.6)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                  <Fingerprint className="w-16 h-16 text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-red-500 font-black tracking-widest uppercase text-[10px]">DETONATE</span>
                </div>
              </div>
              
              <h2 className="mt-12 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                SỰ NỔ CỦA TNT
              </h2>
              <p className="mt-4 text-red-400/60 font-mono text-lg tracking-widest uppercase animate-pulse">
                Click to bypass safety protocol
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Massive Flash (Detonation Moment) */}
        <motion.div 
           className="absolute inset-0 bg-red-500 mix-blend-screen pointer-events-none z-50"
           initial={{ opacity: 0 }}
           animate={detonated ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
           transition={{ duration: 1.5, ease: "easeOut", times: [0, 0.1, 0.3, 1] }}
        />
        <motion.div 
           className="absolute inset-0 bg-white mix-blend-screen pointer-events-none z-50"
           initial={{ opacity: 0 }}
           animate={detonated ? { opacity: [0, 1, 0] } : { opacity: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Post-Detonation Content */}
        {detonated && (
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 pointer-events-none"
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 1.5, delay: 0.2 }}
          >
            {/* The Equation Stamped */}
            <div className="text-3xl md:text-[3.5rem] font-black text-yellow-400 drop-shadow-[0_0_40px_rgba(250,204,21,1)] bg-red-950/40 px-12 py-8 rounded-3xl border border-yellow-500/50 backdrop-blur-sm">
              <BlockMath math={"C_7H_5N_3O_6(s) \\rightarrow 6CO(g) + \\frac{5}{2}H_2(g) + \\frac{3}{2}N_2(g) + C(s)"} />
            </div>

            {/* Glowing Definition Card */}
            <motion.div 
              className="mt-16 max-w-4xl text-center bg-red-950/30 backdrop-blur-xl p-8 rounded-2xl border-l-[6px] border-orange-500 shadow-[0_20px_50px_rgba(234,88,12,0.3)] relative overflow-hidden"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-orange-500 to-transparent" />
              <p className="text-2xl lg:text-3xl font-light leading-relaxed text-orange-100">
                <strong className="text-orange-400 font-bold mx-2 block text-4xl mb-4 uppercase">Phân hủy tức thời</strong>
                Khối lượng rắn giải phóng <strong className="text-yellow-400 font-bold">năng lượng khổng lồ</strong> cùng lượng khí sinh ra rất lớn làm nứt phá hoàn toàn mọi vật cản.
              </p>
            </motion.div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
