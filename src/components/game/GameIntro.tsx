"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Flame, ShieldCheck } from "lucide-react";
import { useSoundEffect } from "../useSoundEffect";

interface GameIntroProps {
  onStart: () => void;
}

export default function GameIntro({ onStart }: GameIntroProps) {
  const { play } = useSoundEffect();
  const [embers, setEmbers] = useState<
    { id: number; x: number; size: number; delay: number; dur: number }[]
  >([]);

  useEffect(() => {
    setEmbers(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 4,
        dur: Math.random() * 4 + 5,
      }))
    );
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fire glow at bottom */}
      <motion.div
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[160vw] h-[60vh] rounded-[100%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(234,88,12,0.25) 0%, rgba(153,27,27,0.15) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Embers */}
      {embers.map((e) => (
        <motion.div
          key={e.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${e.x}%`,
            width: e.size,
            height: e.size,
            background: "#f97316",
            boxShadow: `0 0 ${e.size * 3}px rgba(249,115,22,0.8)`,
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
          transition={{
            duration: e.dur,
            delay: e.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.2 }}
        >
          <div className="relative w-28 h-28 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <ShieldCheck className="w-16 h-16 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.p
          className="text-orange-400 font-mono tracking-[0.4em] text-sm uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          ⚠ Khóa Huấn Luyện Thực Tế ⚠
        </motion.p>

        {/* Main Title */}
        <motion.h1
          className="font-black uppercase tracking-tighter leading-none mb-2"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
        >
          <span
            className="text-transparent bg-clip-text"
            style={{
              background:
                "linear-gradient(135deg, #fbbf24 0%, #f97316 40%, #ef4444 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(239,68,68,0.5))",
            }}
          >
            CHUYÊN GIA
          </span>
          <br />
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            PCCC
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/50 text-xl md:text-2xl font-light tracking-widest uppercase mt-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Phòng Cháy &amp; Chữa Cháy
        </motion.p>

        {/* Story */}
        <motion.div
          className="max-w-xl mb-12 p-5 rounded-2xl border border-white/10"
          style={{ background: "rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <p className="text-white/70 leading-relaxed text-base md:text-lg">
            Bạn là học viên vừa hoàn thành lý thuyết về{" "}
            <span className="text-orange-400 font-semibold">
              Phản Ứng Cháy Nổ
            </span>
            . Đã đến lúc chứng minh năng lực thực chiến! Vượt qua{" "}
            <span className="text-red-400 font-bold">5 thách thức</span>, thu
            thập điểm cao nhất để nhận{" "}
            <span className="text-yellow-400 font-bold">
              Chứng Chỉ Chuyên Gia
            </span>
            .
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          className="relative group px-12 py-5 rounded-full font-bold text-xl tracking-widest uppercase overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(249,115,22,0.9))",
            boxShadow: "0 0 30px rgba(239,68,68,0.4)",
          }}
          onClick={() => { play("start"); onStart(); }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 50px rgba(239,68,68,0.6)",
          }}
          onMouseEnter={() => play("hover")}
          whileTap={{ scale: 0.97 }}
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
          <span className="relative flex items-center gap-3 text-white">
            <Flame className="w-5 h-5" />
            Bắt Đầu Huấn Luyện
            <Flame className="w-5 h-5" />
          </span>
        </motion.button>

        {/* Hint */}
        <motion.p
          className="mt-6 text-white/25 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          5 mini-games · thi đua điểm · chứng chỉ chuyên gia
        </motion.p>
      </motion.div>
    </div>
  );
}
