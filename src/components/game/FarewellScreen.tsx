"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FarewellScreenProps {
  visible: boolean;
}

const CONFETTI_COUNT = 80;

function useConfetti(active: boolean) {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      color: string;
      size: number;
      delay: number;
      dur: number;
      rotate: number;
    }[]
  >([]);

  const COLORS = [
    "#f97316", "#ef4444", "#fbbf24", "#22c55e", "#3b82f6",
    "#a855f7", "#ec4899", "#06b6d4", "#ffffff",
  ];

  useEffect(() => {
    if (active) {
      setParticles(
        Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 4,
          delay: Math.random() * 2,
          dur: Math.random() * 3 + 3,
          rotate: Math.random() * 720,
        }))
      );
    } else {
      setParticles([]);
    }
  }, [active]);

  return particles;
}

const NAMES = [
  "Trần Minh Toàn",
];

export default function FarewellScreen({ visible }: FarewellScreenProps) {
  const confetti = useConfetti(visible);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play applause / cheer sound when visible
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (visible) {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [visible]);

  return (
    <>
      <audio ref={audioRef} src="/audio/votay.mp3" preload="auto" />
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at center, #0f0a1e 0%, #000000 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
          {/* ── Starfield ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 120 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.1,
                }}
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}
          </div>

          {/* ── Confetti ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-sm"
                style={{
                  left: `${p.x}%`,
                  width: p.size,
                  height: p.size * 0.5,
                  background: p.color,
                  top: -20,
                }}
                animate={{
                  y: "110vh",
                  rotate: p.rotate,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: p.dur,
                  delay: p.delay,
                  ease: "easeIn",
                }}
              />
            ))}
          </div>

          {/* ── Aurora glow ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 30% 60%, rgba(168,85,247,0.18) 0%, transparent 55%), radial-gradient(ellipse at 75% 40%, rgba(59,130,246,0.15) 0%, transparent 50%)",
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8">
            {/* Decorative line */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-400 to-purple-600" />
              <span className="text-purple-300 font-mono tracking-[0.4em] text-xs uppercase">
                END OF PRESENTATION
              </span>
              <div className="h-px w-24 bg-gradient-to-l from-transparent via-purple-400 to-purple-600" />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="font-black leading-none tracking-tighter"
              style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, type: "spring", bounce: 0.4 }}
            >
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #c084fc 0%, #818cf8 40%, #38bdf8 80%, #a5f3fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 40px rgba(168,85,247,0.6))",
                }}
              >
                Cảm Ơn
              </span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(251,191,36,0.5))",
                }}
              >
                Đã Lắng Nghe!
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-white/60 text-xl md:text-2xl font-light tracking-widest max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Phòng Cháy · Chữa Cháy · An Toàn Cho Mọi Nhà
            </motion.p>

            {/* Divider */}
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />

            {/* Presenter card */}
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
            >
              <p className="text-white/30 font-mono text-sm tracking-[0.3em] uppercase">
                Người Thuyết Trình
              </p>
              <div className="flex flex-col items-center gap-2">
                {NAMES.map((name, i) => (
                  <motion.div
                    key={name}
                    className="px-8 py-3 rounded-2xl border border-white/10 backdrop-blur-sm"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + i * 0.15 }}
                  >
                    <span className="text-white font-semibold text-xl tracking-wide">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pulsing heart / flame */}
            <motion.div
              className="text-5xl mt-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              🔥
            </motion.div>

            {/* Hint to close */}
            <motion.p
              className="text-white/20 font-mono text-xs tracking-widest mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              Nhấn Shift + E để ẩn màn hình này
            </motion.p>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
