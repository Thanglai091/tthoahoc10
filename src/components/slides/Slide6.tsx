"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Flame, Wind, ThermometerSun } from "lucide-react";
import { useState } from "react";
import { useSoundEffect } from "../useSoundEffect";

export default function Slide6() {
  const { play } = useSoundEffect();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 0,
      title: "Chất Cháy",
      icon: <Flame className="w-10 h-10 text-orange-500" />,
      desc: "Nhiên liệu bắt lửa (gỗ, xăng, khí gas...)",
      position: { top: "0%", left: "50%", transform: "translate(-50%, -50%)" },
      color: "rgba(249, 115, 22, 1)",
    },
    {
      id: 1,
      title: "Oxygen",
      icon: <Wind className="w-10 h-10 text-blue-400" />,
      desc: "Chất oxi hóa duy trì sự cháy (O₂ ≥ 14%)",
      position: { bottom: "0%", left: "0%", transform: "translate(-50%, 50%)" },
      color: "rgba(96, 165, 250, 1)",
    },
    {
      id: 2,
      title: "Nguồn Nhiệt",
      icon: <ThermometerSun className="w-10 h-10 text-red-500" />,
      desc: "Mồi lửa kích hoạt ban đầu",
      position: { bottom: "0%", right: "0%", transform: "translate(50%, 50%)" },
      color: "rgba(239, 68, 68, 1)",
    }
  ];

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 text-white overflow-hidden font-sans bg-gradient-to-b from-[#080d1a] via-[#12070a] to-[#090305]">
      
      {/* Cinematic Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 88%, rgba(239,68,68,0.28) 0%, rgba(20,8,12,0.75) 48%, rgba(8,11,24,0.9) 100%)",
        }}
        animate={{ opacity: [0.72, 1, 0.78] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-32 left-1/2 h-[46vh] w-[64vw] -translate-x-1/2 rounded-full bg-red-500/20 blur-[110px] z-0 pointer-events-none"
        animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 left-1/2 h-[42vh] w-[72vw] -translate-x-1/2 rounded-full bg-orange-500/20 blur-[100px] z-0 pointer-events-none"
        animate={{ opacity: [0.35, 0.62, 0.35], scale: [1.02, 1, 1.02] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background ambient noise for texture */}
      <div className="absolute inset-0 z-0 opacity-[0.028] pointer-events-none mix-blend-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_78%,rgba(0,0,0,0.84)_100%)]" />

      <motion.h2 
        className="relative z-10 text-4xl md:text-6xl font-black mb-20 text-center uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Tam Giác Cháy
      </motion.h2>

      {/* Interactive Triangle Container */}
      <div className="relative z-10 w-[400px] h-[346px] md:w-[600px] md:h-[520px] mx-auto mt-10">
        {/* Warning sign animated borders */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          <motion.polygon
            points="50,0 0,100 100,100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="20 20"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [40, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 1))" }}
          />
        </svg>

        {[{ left: "50%", top: "0%" }, { left: "0%", top: "100%" }, { left: "100%", top: "100%" }].map((vertex) => (
          <motion.div
            key={`${vertex.left}-${vertex.top}`}
            className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-400/90 pointer-events-none"
            style={{ left: vertex.left, top: vertex.top, boxShadow: "0 0 18px rgba(248,113,113,0.9)" }}
            animate={{ opacity: [0.45, 1, 0.45], scale: [0.92, 1.12, 0.92] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <div 
            key={node.id}
            className="absolute z-20 cursor-pointer"
            style={node.position}
            onMouseEnter={() => {
              setHoveredNode(node.id);
              play("hover");
            }}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <motion.div 
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center bg-zinc-950 border-2 shadow-[0_0_30px_rgba(0,0,0,1)] relative group`}
              style={{ borderColor: node.color }}
              onMouseEnter={() => play("hover")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Inner ambient glow */}
              <div 
                 className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                 style={{ backgroundColor: node.color, filter: 'blur(10px)' }}
              />
              
              <div className="relative z-10 flex flex-col items-center pointer-events-none">
                 {node.icon}
                 <span className="mt-2 font-bold text-sm md:text-base text-zinc-300 group-hover:text-white transition-colors">{node.title}</span>
              </div>
            </motion.div>

            {/* Expanded Detail Panel on Hover */}
            <AnimatePresence>
              {hoveredNode === node.id && (
                <motion.div
                  className="absolute p-6 bg-black/80 backdrop-blur-xl border rounded-2xl w-64 md:w-80 shadow-2xl pointer-events-none"
                  style={{ 
                    borderColor: node.color,
                    boxShadow: `0 0 40px -10px ${node.color}`,
                    // Positioning the popups outside the triangle
                    bottom: node.id !== 0 ? "120%" : "auto", 
                    top: node.id === 0 ? "-120%" : "auto",
                    left: node.id === 1 ? "-50%" : node.id === 2 ? "50%" : "50%",
                    transform: "translateX(-50%)",
                    zIndex: 30
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: node.id === 0 ? 20 : node.id !== 0 ? 20 : -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                   <p className="text-lg md:text-xl text-zinc-100 font-light leading-relaxed">
                     {node.desc}
                   </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
             className="text-center mt-16"
             animate={{ opacity: hoveredNode === null ? 1 : 0.1 }}
             transition={{ duration: 0.3 }}
          >
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Tương tác</p>
            <p className="text-zinc-300 font-light text-xl">Rọi chuột vào các đỉnh điểm</p>
          </motion.div>
        </div>
      </div>

      <motion.p 
        className="relative z-10 mt-24 text-2xl text-red-400 font-light italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        * Phản ứng cháy chỉ xảy ra khi hội tụ ĐỒNG THỜI 3 yếu tố.
      </motion.p>
    </div>
  );
}
