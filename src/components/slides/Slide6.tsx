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
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 bg-black text-white overflow-hidden font-sans">
      
      {/* Immersive Fire/Heat Background */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(153,27,27,0.15)_0%,rgba(0,0,0,1)_80%)] z-0 pointer-events-none"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-[30%] -left-[10%] w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.1)_0%,transparent_70%)] blur-[60px] z-0 pointer-events-none"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Background ambient noise for texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

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
        
        {/* SVG Triangle Paths */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 100 86.6">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Base dull triangle */}
          <polygon points="50,0 0,86.6 100,86.6" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          
          {/* Glowing animated triangle depending on hover state */}
          <motion.polygon 
            points="50,0 0,86.6 100,86.6" 
            fill="none" 
            stroke="url(#glowGradient)" 
            strokeWidth="2"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: hoveredNode !== null ? 1 : 0.3,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* LED moving dot along the triangle */}
          <motion.polygon 
            points="50,0 0,86.6 100,86.6" 
            fill="none" 
            stroke="white" 
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray="20 280"
            animate={{ strokeDashoffset: [300, 0] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />

          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={nodes[1].color} />
            <stop offset="50%" stopColor={nodes[0].color} />
            <stop offset="100%" stopColor={nodes[2].color} />
          </linearGradient>
        </svg>

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
