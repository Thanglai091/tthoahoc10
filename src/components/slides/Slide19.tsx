"use client";

import { motion } from "framer-motion";
import { Coffee, Wheat, Drill, Factory } from "lucide-react";
import { useState } from "react";
import { useSoundEffect } from "../useSoundEffect";

export default function Slide19() {
  const { play } = useSoundEffect();
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const categories = [
    {
      id: 0,
      title: "Công Nghiệp Thực Phẩm",
      icon: <Wheat className="w-10 h-10" />,
      items: ["Bột mì", "Đường", "Sữa bột", "Bột cacao", "Tinh bột nghệ"],
      color: "from-orange-400 to-orange-600",
      glow: "rgba(249,115,22,0.8)"
    },
    {
      id: 1,
      title: "Chế Biến Gỗ & Nông Dược",
      icon: <Coffee className="w-10 h-10" />,
      items: ["Mùn cưa", "Bột giấy", "Phân bón khô", "Thuốc trừ sâu dạng bột"],
      color: "from-amber-500 to-amber-700",
      glow: "rgba(245,158,11,0.8)"
    },
    {
      id: 2,
      title: "Gia Công Kim Loại",
      icon: <Drill className="w-10 h-10" />,
      items: ["Bột Nhôm (Al)", "Bột Magie (Mg)", "Bột Titan", "Mạt sắt/thép siêu mịn"],
      color: "from-zinc-400 to-zinc-600",
      glow: "rgba(161,161,170,0.8)"
    },
    {
      id: 3,
      title: "Sản Xuất Khác",
      icon: <Factory className="w-10 h-10" />,
      items: ["Bụi than", "Bụi nhựa", "Bụi dược phẩm", "Bảo quản hóa chất bột"],
      color: "from-red-500 to-red-800",
      glow: "rgba(239,68,68,0.8)"
    }
  ];

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 bg-[#020617] font-sans overflow-hidden perspective-[2000px]">

      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/img/no_bui/IMG_20260311_082548.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-[#020617]/90 pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)", backgroundSize: "100px 100px", transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)" }} />

      <motion.div
        className="relative z-10 w-full max-w-7xl flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] tracking-wider uppercase text-center">
          Điểm Danh "Sát Thủ" Bụi
        </h2>
        <p className="text-xl text-zinc-400 font-light mb-16 tracking-wide">PHÂN LOẠI CÁC NGÀNH CÔNG NGHIỆP CÓ RỦI RO NỔ BỤI CAO</p>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            className="relative h-[450px] cursor-pointer group"
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: idx * 0.2, type: "spring", bounce: 0.4 }}
            onHoverStart={() => {
              play("hover");
              setActiveTab(cat.id);
            }}
            onHoverEnd={() => setActiveTab(null)}
          >
            {/* Outline Glow container */}
            <div
              className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${activeTab === cat.id ? 'opacity-100' : 'opacity-0'}`}
              style={{ boxShadow: `0 0 50px ${cat.glow}, inset 0 0 20px ${cat.glow}` }}
            />

            {/* Main Card Body */}
            <motion.div
              className={`w-full h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col relative z-10 transition-transform duration-500`}
              animate={{
                y: activeTab === cat.id ? -20 : 0,
                scale: activeTab === cat.id ? 1.05 : 1,
              }}
            >
              <div className={`h-32 bg-gradient-to-br ${cat.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
                {/* Stripe pattern layer */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)" }} />
                <motion.div
                  className="relative z-10 text-white drop-shadow-lg"
                  animate={{ scale: activeTab === cat.id ? 1.2 : 1 }}
                  transition={{ type: "spring" }}
                >
                  {cat.icon}
                </motion.div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-6 leading-tight">{cat.title}</h3>

                <ul className="space-y-4 flex-1">
                  {cat.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="text-zinc-300 font-light flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.2 + i * 0.1 }}
                    >
                      <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_${cat.glow}] bg-gradient-to-r ${cat.color}`} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Scanning laser line on active */}
              {activeTab === cat.id && (
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,1)] z-20 pointer-events-none"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 mt-16 flex items-center justify-center p-4 bg-red-950/40 border border-red-500/30 rounded-full backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="text-xl text-red-200 font-light px-6">
          <strong className="text-white mx-2 uppercase tracking-widest">Đặc biệt lưu ý:</strong> Bụi kim loại (Nhôm, Magie) khi nổ sẽ tạo ra nhiệt lượng và áp suất <strong className="text-red-500 font-bold mx-1">khủng khiếp nhất</strong>.
        </p>
      </motion.div>

    </div>
  );
}
