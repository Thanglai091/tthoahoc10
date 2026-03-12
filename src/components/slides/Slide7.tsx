"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, Flame, ThermometerSun } from "lucide-react";
import { useSoundEffect } from "../useSoundEffect";

// The flying shards from the initial "NỔ"
const Shard = ({ index }: { index: number }) => {
  const [randX, setRandX] = useState(0);
  const [randY, setRandY] = useState(0);
  const [randScale, setRandScale] = useState(1);
  const [randRotate, setRandRotate] = useState(0);

  useEffect(() => {
    setRandX((Math.random() - 0.5) * 2000);
    setRandY((Math.random() - 0.5) * 2000);
    setRandScale(Math.random() * 5 + 2);
    setRandRotate(Math.random() * 360);
  }, []);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 text-red-600 font-black text-6xl"
      initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
      animate={{ 
        x: randX, 
        y: randY, 
        scale: randScale,
        opacity: 0,
        rotate: randRotate
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ filter: "blur(2px)", pointerEvents: "none" }}
    >
      NỔ
    </motion.div>
  );
};

export default function Slide7() {
  const { play } = useSoundEffect();
  const [exploded, setExploded] = useState(false);
  const [hoveredOrb, setHoveredOrb] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      play("explosion");
      setExploded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [play]);

  const shards = Array.from({ length: 40 });

  const orbs = [
    {
      id: 0,
      title: "Điểm chớp nháy",
      icon: <Zap className="w-8 h-8 text-yellow-300" />,
      color: "from-yellow-400 to-yellow-600",
      shadow: "rgba(250, 204, 21, 0.6)",
      desc: "Nhiệt độ THẤP NHẤT mà hơi chất bốc cháy khi tiếp xúc nguồn lửa. (VD: Xăng -43°C, Cồn 13°C)",
    },
    {
      id: 1,
      title: "Nhiệt độ tự bốc cháy",
      icon: <ThermometerSun className="w-8 h-8 text-orange-300" />,
      color: "from-orange-400 to-orange-600",
      shadow: "rgba(249, 115, 22, 0.6)",
      desc: "Nhiệt độ THẤP NHẤT chất tự cháy mà CẦN KHÔNG tiếp xúc nguồn lửa trực tiếp. (VD: Xăng 247-280°C)",
    },
    {
      id: 2,
      title: "Nhiệt độ ngọn lửa",
      icon: <Flame className="w-8 h-8 text-red-300" />,
      color: "from-red-400 to-red-600",
      shadow: "rgba(239, 68, 68, 0.6)",
      desc: "Nhiệt độ CAO NHẤT tạo ra bởi ngọn lửa chất cháy đó. (VD: Methane ~1963°C, Acetylene ~2334°C)",
    }
  ];

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center bg-[#0a0505] overflow-hidden font-sans">
      
      {/* Expanding Shockwave Background Ring */}
      <AnimatePresence>
        {exploded && (
          <motion.div 
             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-red-500/30 blur-md pointer-events-none"
             initial={{ width: 0, height: 0, opacity: 1 }}
             animate={{ width: "200vw", height: "200vw", opacity: 0 }}
             transition={{ duration: 2, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center">
        {!exploded ? (
          <motion.div
            className="text-[15rem] md:text-[25rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 100px rgba(220, 38, 38, 1))" }}
          >
            NỔ
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Shards flying towards camera */}
            {shards.map((_, i) => (
              <Shard key={i} index={i} />
            ))}

            {/* Revealed Concept Text */}
            <motion.div 
              className="text-center mb-16"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
            >
              <h2 className="text-5xl md:text-7xl text-white font-black uppercase tracking-widest mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Khái niệm Nổ</h2>
              <div className="bg-red-950/40 backdrop-blur-md p-6 rounded-2xl border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)] inline-block">
                <p className="text-2xl text-red-100 leading-relaxed font-light">
                  Giãn nở thể tích đột ngột trong <strong className="text-red-400 text-3xl mx-2 font-black">TÍCH TẮC</strong> gây áp suất hủy diệt.
                </p>
              </div>
            </motion.div>

            {/* The 3 Heat Threshold Orbs */}
            <div className="flex flex-col md:flex-row gap-12 w-full justify-center mt-8">
              {orbs.map((orb, idx) => (
                <div key={orb.id} className="relative flex flex-col items-center group">
                  
                  {/* Orb Core */}
                  <motion.div 
                    className={`w-32 h-32 rounded-full cursor-pointer flex items-center justify-center bg-gradient-to-br ${orb.color} relative z-20`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + idx * 0.2, type: "spring", stiffness: 200 }}
                    onMouseEnter={() => {
                      setHoveredOrb(orb.id);
                      play("hover");
                    }}
                    whileHover={{ scale: 1.15 }}
                    onMouseLeave={() => setHoveredOrb(null)}
                    style={{
                      boxShadow: `0 0 40px ${orb.shadow}, inset 0 0 20px rgba(255,255,255,0.5)`
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white mix-blend-overlay opacity-30 blur-[2px]" />
                    {orb.icon}
                  </motion.div>

                  <motion.h3 
                    className="text-2xl font-bold text-white mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + idx * 0.2 }}
                  >
                    {orb.title}
                  </motion.h3>

                  {/* Definition Tooltip expanding downwards */}
                  <AnimatePresence>
                    {hoveredOrb === orb.id && (
                      <motion.div 
                        className="absolute top-full mt-6 w-80 bg-black/90 backdrop-blur-xl border-t-4 p-6 rounded-b-2xl shadow-2xl z-30 pointer-events-none"
                        style={{ borderTopColor: orb.shadow }}
                        initial={{ opacity: 0, y: -20, scaleY: 0.8, transformOrigin: "top" }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                        transition={{ type: "spring", damping: 20 }}
                      >
                         <p className="text-lg text-zinc-300 font-light leading-relaxed">
                           {orb.desc}
                         </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
