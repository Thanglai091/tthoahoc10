"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Activity, Beaker } from "lucide-react";

export default function Slide8() {
  const [exploded, setExploded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };
  
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExploded(true);
    }, 1500); // Explode after 1.5s
    return () => clearTimeout(timer);
  }, []);

  const shards = [
    { clipPath: "polygon(0 0, 60% 0, 30% 60%, 0 40%)", init: { x: -300, y: -300, rotate: -45 } },
    { clipPath: "polygon(60% 0, 100% 0, 100% 50%, 70% 50%, 30% 60%)", init: { x: 300, y: -200, rotate: 60 } },
    { clipPath: "polygon(0 40%, 30% 60%, 40% 100%, 0 100%)", init: { x: -200, y: 300, rotate: 30 } },
    { clipPath: "polygon(30% 60%, 70% 50%, 100% 50%, 100% 100%, 40% 100%)", init: { x: 400, y: 400, rotate: -45 } }
  ];

  return (
    <div 
      className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#020617] text-white overflow-hidden perspective-[2000px] p-8"
      onMouseMove={handleMouseMove}
    >
      
      {/* Dynamic Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)", backgroundSize: "60px 60px", transform: "rotateX(60deg) translateY(-200px) translateZ(-200px)" }}
      />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Container 3D Tracking */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        
        {/* Left Side: Text and Screen */}
        <motion.div 
          className="flex-1 w-full relative"
          style={{ transform: "translateZ(80px)" }}
        >
          <motion.h1 
            className="text-[12vw] lg:text-[7vw] font-black leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-600 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            NỔ VẬT LÝ
          </motion.h1>

          <motion.div 
            className="relative bg-cyan-950/30 backdrop-blur-xl border border-cyan-500/30 p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,145,178,0.3)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none" />
            <motion.div 
               className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] z-20 pointer-events-none"
               animate={{ top: ["0%", "100%", "0%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="flex items-center gap-4 mb-6 relative z-10">
               <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
               <span className="text-cyan-400 font-mono tracking-widest text-sm font-bold">PHYSICAL_ANOMALY DETECTED</span>
            </div>

            <p className="text-2xl lg:text-3xl font-light text-zinc-300 leading-relaxed relative z-10">
              Sự giãn nở thể tích cực nhanh <br/>(tăng áp suất đột ngột) mà
              <strong className="text-white font-bold mx-2 bg-cyan-600/30 px-3 py-1 rounded-md border border-cyan-400/50 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">KHÔNG KÈM THEO</strong> 
              sự tạo thành chất mới.
            </p>

            <div className="mt-8 flex items-center gap-3 relative z-10 opacity-70">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 font-mono text-sm">(Không có phản ứng hóa học)</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Boiler Simulation Image */}
        <motion.div 
          className="flex-1 w-full h-[500px] max-w-[500px] flex items-center justify-center relative perspective-[1000px] mx-auto"
          style={{ transform: "translateZ(120px)" }}
        >
           {/* Broken Boiler Image Container */}
           <div className="relative w-full h-full">
              {!exploded ? (
                /* Pre-explosion glowing cylinder representation */
                <motion.div 
                  className="w-full h-full rounded-2xl bg-zinc-800 border-4 border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center justify-center relative overflow-hidden"
                  animate={{ 
                    scale: [1, 1.05, 1, 1.02, 1.1, 1.05],
                    borderColor: ["rgba(34,211,238,0.5)", "rgba(239,68,68,0.8)", "rgba(249,115,22,1)"],
                    boxShadow: ["0 0 50px rgba(34,211,238,0.5)", "0 0 100px rgba(239,68,68,0.9)", "0 0 120px rgba(249,115,22,1)"]
                  }}
                  transition={{ duration: 1.5, ease: "easeIn" }}
                >
                   <div className="text-center font-mono text-3xl font-bold text-white z-20 mix-blend-difference">
                     PRESSURE CRITICAL <br/> 9999 PSI
                   </div>
                   {/* Internal Red Hot Glow */}
                   <motion.div 
                      className="absolute inset-0 bg-red-600 z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                   />
                </motion.div>
              ) : (
                /* Post-Explosion Result */
                <>
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-cover bg-center border border-cyan-800 shadow-[0_0_30px_rgba(8,145,178,0.2)]"
                    style={{ backgroundImage: "url('/img/no_vat_ly/IMG_20260311_082316.jpg')" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                     <div className="absolute inset-0 bg-black/20" />
                     {/* Overlay scanning UI on image */}
                     <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 border border-cyan-500/30 rounded font-mono text-xs text-cyan-400">
                        TARGET: BOILER RUPTURE<br/>
                        REASON: OVERPRESSURE
                     </div>
                  </motion.div>

                  {/* Shards flying outwards on explode */}
                  {shards.map((shard, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 bg-zinc-800 border border-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      style={{ clipPath: shard.clipPath }}
                      initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                      animate={{ opacity: 0, x: shard.init.x, y: shard.init.y, rotate: shard.init.rotate }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  ))}
                  
                  {/* Explode Flash Screen */}
                  <motion.div 
                    className="absolute inset-[-50%] bg-white rounded-full pointer-events-none z-50 mix-blend-screen"
                    initial={{ opacity: 1, scale: 0.2 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-[-50%] bg-cyan-400 rounded-full pointer-events-none z-40 mix-blend-screen mix-blend-screen filter blur-[100px]"
                    initial={{ opacity: 1, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 3 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </>
              )}
           </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
