"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useState } from "react";
import { Maximize, Flame } from "lucide-react";
import { useSoundEffect } from "../useSoundEffect";

const HolographicCard = ({ 
  panel, 
  isHovered, 
  onHover,
  playHover
}: { 
  panel: any, 
  isHovered: boolean, 
  onHover: (id: string | null) => void,
  playHover: () => void
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(null);
  };

  const rotateX = useTransform(y, [-200, 200], [15, -15]);
  const rotateY = useTransform(x, [-200, 200], [-15, 15]);

  return (
    <motion.div
      className={`relative w-full lg:w-[45%] h-[600px] perspective-[1500px] cursor-crosshair transition-all duration-700 ease-out`}
      style={{ zIndex: isHovered ? 20 : 10 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        onHover(panel.id);
        playHover();
      }}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        scale: isHovered ? 1.05 : 0.95,
        opacity: isHovered ? 1 : 0.6,
        filter: isHovered ? "blur(0px) brightness(1)" : "blur(4px) brightness(0.5)"
      }}
    >
      <motion.div
        className={`w-full h-full relative rounded-3xl overflow-hidden border-2 bg-black shadow-2xl`}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          borderColor: panel.color === 'blue' ? 'rgba(6,182,212,0.5)' : 'rgba(249,115,22,0.5)',
          boxShadow: isHovered 
            ? `0 30px 60px ${panel.color === 'blue' ? 'rgba(6,182,212,0.3)' : 'rgba(234,88,12,0.3)'}` 
            : '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
          style={{ backgroundImage: `url('${panel.image}')` }}
        />
        
        {/* Scanning Glitch Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay" />
        
        <motion.div 
           className="absolute top-0 left-0 w-full h-[2px] z-20 pointer-events-none"
           style={{ backgroundColor: panel.color === 'blue' ? '#22d3ee' : '#fb923c' }}
           animate={{ top: isHovered ? ["0%", "100%", "0%"] : "0%" }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Content Container (Pushed forward in 3D) */}
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ transform: "translateZ(60px)" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <div 
              className={`px-4 py-1 rounded border backdrop-blur-md text-xs font-bold tracking-widest uppercase ${panel.color === 'blue' ? 'border-cyan-500/50 bg-cyan-950/50 text-cyan-400' : 'border-orange-500/50 bg-orange-950/50 text-orange-400'}`}
            >
              {panel.type}
            </div>
            {panel.color === 'blue' ? <Maximize className="w-8 h-8 text-cyan-400 opacity-50" /> : <Flame className="w-8 h-8 text-orange-400 opacity-50" />}
          </div>

          /* Title & Description */
          <div>
             <h2 className="text-4xl font-black text-white mb-4 drop-shadow-md">
               {panel.title}
             </h2>
             <p className="text-lg font-light text-gray-300 leading-relaxed max-w-sm">
               {panel.content}
             </p>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default function Slide9() {
  const { play } = useSoundEffect();
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  const panels = [
    {
      id: 'a',
      type: "Nổ Vật Lý",
      title: "Nồi Áp Suất",
      image: "/img/no_vat_ly/IMG_20260311_082317.jpg",
      color: "blue",
      content: "Khi đun nấu với nhiệt độ cao liên tục mà van xả khí bị tắc, áp suất hơi nước trong nồi tăng lên quá lớn vượt qua giới hạn chịu đựng của vỏ. Dẫn đến hiện tượng nổ vật lý giải phóng năng lượng cực mạnh."
    },
    {
      id: 'b',
      type: "Nổ Hóa Học",
      title: "Khoang Tàu Dầu",
      image: "/img/no_hoa_hoc/IMG_20260311_082436.jpg",
      color: "orange",
      content: "Hơi dầu tích tụ trong không gian kín của khoang tàu khuất gió. Khi tiếp xúc với một tia lửa nhỏ kích phát phản ứng oxy hóa khử mãnh liệt, tạo ra sức ép khổng lồ và ngọn lửa tàn phá."
    }
  ];

  return (
    <div className="w-[100vw] h-[100vh] bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans relative">
      
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)", backgroundSize: "40px 40px", transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,1)_80%)] border-t border-zinc-800" />

      {/* Slide Title */}
      <motion.div 
        className="absolute top-12 text-center w-full z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-zinc-500 tracking-[0.3em] text-sm md:text-base font-bold uppercase">Hệ Thống Phân Tích</p>
        <h2 className="text-3xl md:text-5xl text-white font-light tracking-widest mt-2 uppercase">So Sánh Hình Thái Nổ</h2>
      </motion.div>

      {/* Dual Cards Container */}
      <div className="relative z-10 w-full max-w-7xl px-8 mt-20 flex flex-col lg:flex-row items-center justify-center gap-12">
        {panels.map((panel) => (
          <HolographicCard 
            key={panel.id} 
            panel={panel} 
            isHovered={hoveredPanel === panel.id || hoveredPanel === null} // Default to both semi-focused if none hovered
            onHover={setHoveredPanel} 
            playHover={() => play("hover")}
          />
        ))}
      </div>

    </div>
  );
}
