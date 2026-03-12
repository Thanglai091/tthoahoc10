"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { BlockMath } from "react-katex";
import { useState, useEffect } from "react";
import { useSoundEffect } from "../useSoundEffect";

// Orbiting Particle Component
const OrbitingParticle = ({ 
  symbol, 
  radius, 
  duration, 
  delay, 
  reverse,
  phase
}: { 
  symbol: string, 
  radius: number, 
  duration: number, 
  delay: number,
  reverse: boolean,
  phase: number
}) => {
  const size = symbol === "H₂" ? 40 : 60;
  
  // Phase 0: Normal orbit. Phase 1: Compress to center. Phase 2: Exploded (hidden)
  const currentRadius = phase === 1 ? 20 : phase === 2 ? 0 : radius;
  const currentDuration = phase === 1 ? 0.3 : duration;
  const opacity = phase === 2 ? 0 : 1;

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2"
      animate={{ 
        rotate: reverse ? -360 : 360,
      }}
      transition={{ 
        rotate: { duration: currentDuration, repeat: Infinity, ease: "linear", delay } 
      }}
      style={{ x: "-50%", y: "-50%" }}
    >
      <motion.div 
        className="absolute rounded-full border border-white/40 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(255,255,255,0.8)] backdrop-blur-sm"
        style={{ 
          width: size, 
          height: size, 
          top: -size / 2, 
          backgroundColor: symbol === "H₂" ? "rgba(6,182,212,0.4)" : "rgba(239,68,68,0.4)",
          color: symbol === "H₂" ? "#cffafe" : "#fee2e2",
          boxShadow: symbol === "H₂" ? "0 0 20px rgba(6,182,212,0.6)" : "0 0 20px rgba(239,68,68,0.6)"
        }}
        // Counter-rotate so text stays upright, and animate radius/opacity
        animate={{ 
          rotate: reverse ? 360 : -360,
          left: currentRadius - size / 2,
          opacity: opacity,
          scale: phase === 1 ? 0.5 : 1
        }}
        transition={{ 
          rotate: { duration: currentDuration, repeat: Infinity, ease: "linear", delay },
          left: { duration: phase === 1 ? 0.8 : 0, ease: "anticipate" },
          opacity: { duration: 0.2 },
          scale: { duration: 0.8 }
        }}
      >
        {symbol}
      </motion.div>
    </motion.div>
  );
};

export default function Slide15() {
  const { play } = useSoundEffect();
  const [phase, setPhase] = useState(0); // 0: Idle, 1: Gathering, 2: Exploded

  useEffect(() => {
    if (phase === 1) {
      // Wait for particles to rush to center, then explode
      const timer = setTimeout(() => {
        setPhase(2);
        play("explosion");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, play]);

  const handleIgnite = () => {
    if (phase === 0) { play("click"); setPhase(1); }
    // Double click to reset
    if (phase === 2) { play("click"); setPhase(0); }
  };

  // Generate a fixed set of particles
  const particles = [
    ...Array.from({ length: 12 }).map((_, i) => ({ id: `h2-${i}`, symbol: "H₂", radius: 150 + Math.random() * 300, duration: 5 + Math.random() * 5, delay: -Math.random() * 10, reverse: Math.random() > 0.5 })),
    ...Array.from({ length: 6 }).map((_, i) => ({ id: `o2-${i}`, symbol: "O₂", radius: 100 + Math.random() * 250, duration: 7 + Math.random() * 5, delay: -Math.random() * 10, reverse: Math.random() > 0.5 })),
  ];

  return (
    <div className="relative w-full h-[100vh] flex items-center justify-center bg-[#010a12] overflow-hidden font-sans">
      
      {/* Deep Space / Reactor Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1)_0%,rgba(1,10,18,1)_70%)] pointer-events-none z-0" />
      
      {/* Grid tracking */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0"
        style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)", backgroundSize: "50px 50px", transform: "perspective(1000px) rotateX(70deg) translateY(-20%) translateZ(-300px)" }}
      />

      {/* Title */}
      <motion.div 
        className="absolute top-12 text-center w-full z-20 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          Hỗn Hợp Nổ
        </h2>
        <p className="text-cyan-200/60 font-mono tracking-[0.3em] uppercase mt-2">Hydrogen & Oxygen</p>
      </motion.div>

      {/* The Reactor Core Interactive Area */}
      <div className="relative w-[800px] h-[800px] flex items-center justify-center z-10">
        
        {/* Core Click Trigger Area */}
        <div 
          className="absolute w-64 h-64 rounded-full z-50 cursor-pointer"
          onClick={handleIgnite}
        />

        {/* The Central Fusion Core (Visual) */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full border-2 border-cyan-400/50 flex flex-col items-center justify-center pointer-events-none z-20 shadow-[0_0_40px_rgba(6,182,212,0.3)] bg-cyan-950/30 backdrop-blur-md"
          animate={{ 
            scale: phase === 0 ? 1 : phase === 1 ? 0 : 0,
            borderColor: phase === 0 ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,1)",
            boxShadow: phase === 0 ? "0 0 40px rgba(6,182,212,0.3)" : "0 0 200px rgba(255,255,255,1)",
            backgroundColor: phase === 0 ? "rgba(8,145,178,0.3)" : "rgba(255,255,255,1)",
            opacity: phase === 2 ? 0 : 1
          }}
          transition={{ duration: phase === 1 ? 0.8 : 0.5, ease: "anticipate" }}
        >
          <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase text-center mt-2 animate-pulse">
            CLICK TO IGNITE
          </div>
        </motion.div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {particles.map(p => (
            <OrbitingParticle key={p.id} {...p} phase={phase} />
          ))}
        </div>

        {/* The Flash Explosion */}
        <motion.div 
          className="absolute inset-[-100%] bg-white rounded-full mix-blend-screen pointer-events-none z-30 filter blur-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: phase === 2 ? [0, 1, 0] : 0,
            scale: phase === 2 ? [0.5, 3, 4] : 0
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Information Panel that appears beautifully after explosion */}
        <motion.div 
          className="absolute mt-24 flex flex-col items-center justify-center z-40 pointer-events-none"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ 
            opacity: phase === 2 ? 1 : 0, 
            y: phase === 2 ? 0 : 50,
            scale: phase === 2 ? 1 : 0.8
          }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: phase === 2 ? 0.2 : 0 }}
        >
          <div className="bg-cyan-950/80 backdrop-blur-xl px-12 py-8 rounded-3xl border border-cyan-400/50 shadow-[0_20px_50px_rgba(6,182,212,0.4)] text-center relative overflow-hidden">
             
             {/* Scanning Line */}
             <motion.div 
               className="absolute left-0 w-full h-1 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]"
               animate={{ top: ["0%", "100%", "0%"] }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />

             <div className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] mb-6">
               <BlockMath math={"2H_2(g) + O_2(g) \\rightarrow 2H_2O(l)"} />
             </div>
             
             <div className="inline-block px-8 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full">
               <div className="text-3xl md:text-4xl text-cyan-300 font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                 <BlockMath math={"\\Delta H_{298}^\\circ = -571,6 \\text{ kJ}"} />
               </div>
             </div>
             <p className="mt-4 text-cyan-400/50 font-mono text-xs">(Click to reset)</p>
          </div>
        </motion.div>

      </div>

      {/* Information Footer */}
      <motion.div 
        className="absolute bottom-12 z-20 w-full max-w-4xl px-8 text-center pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl md:text-2xl text-cyan-100/80 font-light leading-relaxed border-t border-cyan-900/50 pt-6">
          Hỗn hợp <strong className="text-cyan-400 font-bold mx-2">H₂</strong> và <strong className="text-red-400 font-bold mx-2">O₂</strong> theo tỉ lệ thể tích <strong className="text-white font-bold bg-cyan-900/50 px-3 py-1 rounded">2:1</strong> là hỗn hợp nổ mạnh nhất! Phản ứng tỏa lượng nhiệt cực lớn làm nhiên liệu cho tên lửa không gian.
        </p>
      </motion.div>

    </div>
  );
}
