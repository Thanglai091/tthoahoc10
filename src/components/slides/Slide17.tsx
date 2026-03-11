"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { MousePointerClick } from "lucide-react";

export default function Slide17() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; vx: number; vy: number; size: number }[]>([]);
  const [isExploded, setIsExploded] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  
  const interactAreaRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    // Initialize 100 dust particles
    const newParticles = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 8 + 3,
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isExploded) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Simple avoidance
    setParticles(prev => prev.map(p => {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        return {
          ...p,
          x: p.x + (dx / dist) * 15,
          y: p.y + (dy / dist) * 15
        };
      }
      return {
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy
      };
    }));
  };

  const handleIgnite = (e: React.MouseEvent) => {
    if (isExploded) return;
    setIsExploded(true);
    setClickPos({ x: e.clientX, y: e.clientY });

    // Blast particles outward from click position
    setParticles(prev => prev.map(p => {
      const dx = p.x - e.clientX;
      const dy = p.y - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      
      return {
        ...p,
        // Huge velocity burst
        vx: (dx / dist) * (Math.random() * 50 + 20),
        vy: (dy / dist) * (Math.random() * 50 + 20)
      };
    }));

    // Trigger shockwave animation
    controls.start({
      scale: [0, 50],
      opacity: [1, 0],
      transition: { duration: 1.5, ease: "easeOut" }
    });
  };

  return (
    <div 
      className="relative w-full h-[100vh] flex items-center justify-center bg-[#1c120c] overflow-hidden text-[#FFE5B4] cursor-crosshair"
      ref={interactAreaRef}
      onMouseMove={handleMouseMove}
      onClick={handleIgnite}
    >
      {/* Background Room Image */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-screen"
        style={{ backgroundImage: "url('/img/no_bui/IMG_20260311_082546.jpg')" }}
        animate={isExploded ? { filter: "brightness(3) contrast(1.5) sepia(1)", scale: 1.1 } : { filter: "brightness(0.3) contrast(1.2)", scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

      {/* Explosive Ignition Flash */}
      {isExploded && (
        <motion.div 
          className="absolute z-10 rounded-full bg-white mix-blend-screen pointer-events-none"
          style={{ left: clickPos.x, top: clickPos.y, width: 20, height: 20, transform: "translate(-50%, -50%)" }}
          animate={controls}
        />
      )}

      {/* Floating Dust Particles becoming Fire */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ 
            width: p.size, height: p.size,
            backgroundColor: isExploded ? "#ef4444" : "#D2691E", // Red vs Brownish
            boxShadow: isExploded ? "0 0 20px 5px rgba(239, 68, 68, 0.8)" : "none"
          }}
          animate={isExploded ? { 
            x: p.x + p.vx * 10, 
            y: p.y + p.vy * 10,
            opacity: [1, 0]
          } : { x: p.x, y: p.y }}
          transition={isExploded ? { duration: 1.5, ease: "easeOut" } : { type: "tween", duration: 0 }}
        />
      ))}

      {/* Main Content */}
      <motion.div 
        className="relative z-20 p-12 bg-black/60 backdrop-blur-2xl rounded-[40px] border-2 border-[#8B4513]/50 max-w-5xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-none flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
      >
        <h2 className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[#F4A460] to-[#D2691E] drop-shadow-[0_2px_10px_rgba(0,0,0,1)] uppercase tracking-tighter">
          Nổ Bụi Là Gì?
        </h2>
        
        <div className="bg-[#8B4513]/20 p-8 rounded-3xl border border-[#D2691E]/30 mb-8 w-full">
           <p className="text-2xl leading-relaxed text-[#FFE5B4] font-light">
             <strong className="text-white text-3xl block mb-4">Định nghĩa:</strong>
             Bụi dễ cháy lơ lửng trong không khí đạt nồng độ cao tạo thành các <strong className="text-orange-400">đám mây bụi</strong>.
           </p>
        </div>

        <p className="text-2xl leading-relaxed text-zinc-300 font-light max-w-3xl">
          Chỉ cần chạm một tia lửa nhỏ, phản ứng oxy hóa dây chuyền sẽ lan truyền cực nhanh từ hạt này sang hạt khác, tốc độ gia tăng theo cấp số nhân tạo nên một <strong className="text-red-400">cầu lửa khổng lồ</strong> tàn phá mọi thứ.
        </p>
        
        {!isExploded ? (
          <motion.div 
            className="mt-12 flex items-center justify-center gap-4 text-orange-400 font-mono font-bold tracking-widest text-xl bg-orange-900/30 px-8 py-4 rounded-full border border-orange-500/50"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px rgba(249,115,22,0)", "0 0 20px rgba(249,115,22,0.5)", "0 0 0px rgba(249,115,22,0)"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <MousePointerClick size={28} />
            HÃY CLICK CHUỘT ĐỂ KHỞI TẠO TIA LỬA NGAY BÂY GIỜ!
          </motion.div>
        ) : (
          <motion.div 
            className="mt-12 flex items-center justify-center text-red-500 font-mono font-black tracking-widest text-3xl uppercase"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            PHẢN ỨNG DÂY CHUYỀN ĐÃ KÍCH HOẠT!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
