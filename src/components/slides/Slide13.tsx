"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSoundEffect } from "../useSoundEffect";

export default function Slide13() {
  const { play } = useSoundEffect();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence control
    const t1 = setTimeout(() => setStep(1), 500); // Start collision
    const t2 = setTimeout(() => {
      play("explosion");
      setStep(2);
    }, 2000); // Boom! Flash & swap to full equation
    const t3 = setTimeout(() => setStep(3), 3500); // Show Enthalpy

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [play]);

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#050B14] overflow-hidden font-sans">
      
      {/* Deep Blue/Cyan ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.15)_0%,rgba(5,11,20,1)_70%)] pointer-events-none" />

      <h2 className="absolute top-12 text-2xl md:text-3xl text-cyan-500/50 font-light tracking-[0.5em] uppercase text-center w-full">
        Phản ứng cháy Methane
      </h2>

      {/* Main Reaction Stage */}
      <div className="relative z-10 w-full flex items-center justify-center h-64 mt-12">
        
        {/* Intense Yellow-White Flash Effect at center */}
        <motion.div
          className="absolute w-64 h-64 bg-yellow-200 rounded-full mix-blend-screen pointer-events-none z-50 filter blur-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={step === 2 ? { opacity: [0, 1, 0.8, 0], scale: [0.5, 5, 6, 0] } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Additional Red Fire Flash */}
        <motion.div
          className="absolute w-96 h-96 bg-red-500 rounded-full mix-blend-screen pointer-events-none z-40 filter blur-[80px]"
          initial={{ opacity: 0, scale: 0 }}
          animate={step === 2 ? { opacity: [0, 0.8, 0], scale: [0.2, 3, 0] } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        />

        {/* Reactants (CH4 and 2O2 Colliding) */}
        <AnimatePresence>
          {step < 2 && (
            <motion.div 
              className="absolute flex items-center justify-center gap-12 text-7xl md:text-[140px] font-black tracking-wider z-20"
              exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
              transition={{ duration: 0.2 }}
            >
              {/* CH4 moving right */}
              <motion.div
                className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                initial={{ x: -800, opacity: 0 }}
                animate={step >= 1 ? { x: 100, opacity: 1 } : { x: -800, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeIn" }}
              >
                CH₄
              </motion.div>
              
              {/* 2O2 moving left */}
              <motion.div
                className="text-cyan-300 drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]"
                initial={{ x: 800, opacity: 0 }}
                animate={step >= 1 ? { x: -100, opacity: 1 } : { x: 800, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeIn" }}
              >
                2O₂
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Formula (Post-Collision Explosion) */}
        {step >= 2 && (
          <motion.div 
            className="absolute flex items-center justify-center gap-4 md:gap-6 text-4xl md:text-[80px] font-black tracking-widest z-30 whitespace-nowrap"
            initial={{ scale: 0, opacity: 0, filter: "blur(30px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", bounce: 0.4, duration: 1.5 }}
          >
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">CH₄</span>
            <span className="text-white/30 text-3xl md:text-5xl mx-2">+</span>
            <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">2O₂</span>
            
            <motion.span 
              className="text-orange-500 mx-4 text-5xl md:text-7xl drop-shadow-[0_0_20px_rgba(249,115,22,1)]"
              initial={{ width: 0, opacity: 0, scale: 0 }}
              animate={{ width: "auto", opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
            >
              ⟶
            </motion.span>

            <span className="text-cyan-100 drop-shadow-[0_0_30px_rgba(207,250,254,1)]">CO₂</span>
            <span className="text-white/30 text-3xl md:text-5xl mx-2">+</span>
            <span className="text-cyan-200 drop-shadow-[0_0_30px_rgba(165,243,252,1)]">2H₂O</span>
          </motion.div>
        )}
      </div>

      {/* Thermodynamic Data */}
      <motion.div
        className="mt-40 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.2, type: "spring" }}
      >
        <div className="px-8 py-4 bg-orange-950/40 border border-orange-500/30 rounded-3xl backdrop-blur-md mb-8 shadow-[0_10px_30px_rgba(234,88,12,0.2)]">
          <div className="text-4xl md:text-6xl font-bold text-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] font-mono tracking-tight">
            ΔH°₂₉₈ = -802.5 <span className="text-3xl ml-2 text-orange-300/80">kJ</span>
          </div>
        </div>
        
        <p className="text-xl md:text-2xl text-cyan-100/70 font-light max-w-3xl text-center leading-relaxed px-6">
          Sự đứt gãy liên kết cũ và hình thành liên kết mới giải tỏa năng lượng khổng lồ.
        </p>
      </motion.div>

    </div>
  );
}
