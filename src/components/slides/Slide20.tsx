"use client";

import { motion } from "framer-motion";
import { Play, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GameOverlay from "@/components/game/GameOverlay";
import { useSoundEffect } from "../useSoundEffect";

export default function Slide20() {
  const { play } = useSoundEffect();
  const [clicked, setClicked] = useState(false);
  const [showGame, setShowGame] = useState(false);
  
  const handleStart = () => {
    play("start");
    setClicked(true);
    setTimeout(() => {
      setShowGame(true);
    }, 1500); // Wait 1.5s for explosion effect before showing game
  };

  return (
    <div id="slide-20-finale" className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-black overflow-hidden font-sans">
      
      {/* Cinematic Deep Space / Warning Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,#000000_80%)] pointer-events-none"
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Background Warning Stripes */}
      <div 
         className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
         style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 20px, #ef4444 20px, #ef4444 40px)" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {Array.from({ length: 40 }).map((_, i) => (
           <motion.div
             key={`end-particle-${i}`}
             className="absolute bg-orange-500 rounded-full"
             style={{
               width: Math.random() * 3 + 1 + "px",
               height: Math.random() * 3 + 1 + "px",
               left: Math.random() * 100 + "%",
               top: Math.random() * 100 + "%",
               boxShadow: "0 0 10px rgba(249, 115, 22, 0.8)"
             }}
             animate={{
               y: [0, -100 - Math.random() * 200],
               opacity: [0, 1, 0],
             }}
             transition={{
               duration: Math.random() * 4 + 4,
               repeat: Infinity,
               delay: Math.random() * 5
             }}
           />
         ))}
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center text-center mt-[-5%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
      >
        <motion.div
           className="mb-8"
           animate={{ rotate: [0, 5, -5, 0] }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShieldAlert className="w-24 h-24 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-widest uppercase mb-4 drop-shadow-2xl">
          Nhiệm Vụ Hoàn Tất
        </h2>
        <p className="text-xl md:text-2xl text-red-400 font-light tracking-[0.2em] uppercase max-w-2xl leading-relaxed">
          Bạn đã nắm vững bản chất của sự hủy diệt.
          <br /> Hãy áp dụng để bảo vệ chính mình.
        </p>
      </motion.div>

      {/* The Big Red Button */}
      <motion.div 
        className="relative z-20 mt-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1, type: "spring", bounce: 0.5 }}
      >
        <motion.button
          className="relative group px-12 py-6 bg-red-950/80 backdrop-blur-md border border-red-500/50 rounded-full flex items-center gap-4 cursor-pointer overflow-hidden outline-none"
          onMouseEnter={() => play("hover")}
          whileHover={{ scale: 1.05, borderColor: "rgba(239,68,68,1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
        >
          {/* Button Glow / Radar sweep */}
          <div className="absolute inset-0 bg-red-600/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 blur-xl" />
          
          <Play className="w-8 h-8 text-red-500 fill-red-500 group-hover:text-white group-hover:fill-white transition-colors" />
          <span className="text-2xl font-bold text-red-100 group-hover:text-white tracking-widest uppercase transition-colors">
            Khóa Huấn Luyện Thực Tế
          </span>

          {/* Magnetic edge glowing particles */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-red-400/0 group-hover:border-red-400/100 shadow-[0_0_0px_rgba(239,68,68,0)] group-hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] transition-all duration-300 pointer-events-none"
          />
        </motion.button>
      </motion.div>

      {/* Explosion/Transition Effect on Click */}
      <AnimatePresence>
        {clicked && !showGame && (
          <motion.div 
            className="absolute inset-0 bg-black pointer-events-none z-50 flex flex-col items-center justify-center p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
             {/* Tech Grid Background for loading screen */}
             <div 
               className="absolute inset-0 opacity-20"
               style={{ 
                 backgroundImage: "linear-gradient(rgba(239,68,68,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.2) 1px, transparent 1px)",
                 backgroundSize: "40px 40px"
               }}
             />

             {/* Glowing Core */}
             <motion.div
               className="absolute inset-0"
               style={{ background: "radial-gradient(circle at center, rgba(239,68,68,0.15) 0%, transparent 60%)" }}
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
             />

             <motion.h1 
               className="relative z-10 text-4xl md:text-6xl font-black text-white uppercase tracking-[0.2em] drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               transition={{ duration: 0.5 }}
             >
               GAMIFICATION SYSTEM
             </motion.h1>
             
             <motion.div 
               className="relative z-10 mt-8 flex items-center gap-4"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
             >
               <span className="text-xl text-red-500 font-bold uppercase tracking-widest">ĐANG KHỞI ĐỘNG</span>
               <div className="flex gap-2">
                 {[0, 1, 2].map((i) => (
                   <motion.div
                     key={i}
                     className="w-2 h-2 rounded-full bg-red-500"
                     animate={{ opacity: [0.3, 1, 0.3] }}
                     transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                   />
                 ))}
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Game */}
      <AnimatePresence>
        {showGame && (
          <GameOverlay onClose={() => {
            setShowGame(false);
            setClicked(false);
          }} />
        )}
      </AnimatePresence>

    </div>
  );
}
