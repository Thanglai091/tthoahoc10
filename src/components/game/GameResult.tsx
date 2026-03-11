"use client";

import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, Star } from "lucide-react";

interface GameResultProps {
  gameId: number;
  score: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const GAME_META: Record<
  number,
  { name: string; icon: string; maxScore: number; color: string }
> = {
  1: { name: "Tam Giác Lửa", icon: "🔺", maxScore: 750, color: "#ef4444" },
  2: { name: "Phân Loại Nổ", icon: "💥", maxScore: 900, color: "#f97316" },
  3: { name: "60 Giây Sinh Tử", icon: "⏱️", maxScore: 1500, color: "#eab308" },
  4: { name: "Nhiệt Độ Bốc Cháy", icon: "🌡️", maxScore: 1000, color: "#22c55e" },
  5: { name: "Đúng Hay Sai", icon: "✅", maxScore: 1000, color: "#a855f7" },
};

function getRank(pct: number) {
  if (pct >= 90)
    return {
      label: "LEGEND",
      emoji: "👑",
      color: "#fbbf24",
      glow: "rgba(251,191,36,0.4)",
      desc: "Xuất sắc! Bạn là chuyên gia thực sự!",
    };
  if (pct >= 70)
    return {
      label: "EXPERT",
      emoji: "🏆",
      color: "#22c55e",
      glow: "rgba(34,197,94,0.4)",
      desc: "Rất tốt! Kiến thức vững chắc!",
    };
  if (pct >= 50)
    return {
      label: "STUDENT",
      emoji: "📚",
      color: "#3b82f6",
      glow: "rgba(59,130,246,0.4)",
      desc: "Khá tốt! Hãy ôn lại để cải thiện nhé!",
    };
  return {
    label: "TRAINEE",
    emoji: "🎓",
    color: "#6b7280",
    glow: "rgba(107,114,128,0.3)",
    desc: "Cần ôn tập thêm! Thử lại để tốt hơn!",
  };
}

export default function GameResult({
  gameId,
  score,
  onPlayAgain,
  onBackToMenu,
}: GameResultProps) {
  const meta = GAME_META[gameId] ?? GAME_META[1];
  const pct = Math.min(100, Math.round((score / meta.maxScore) * 100));
  const rank = getRank(pct);
  const stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6">
      {/* Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${rank.glow} 0%, transparent 60%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        {/* Game Badge */}
        <motion.div
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-xl">{meta.icon}</span>
          <span className="text-white/60 text-base font-medium">{meta.name}</span>
        </motion.div>

        {/* Rank Emoji */}
        <motion.div
          className="text-8xl mb-5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
        >
          {rank.emoji}
        </motion.div>

        {/* Stars */}
        <motion.div
          className="flex gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: i < stars ? 1 : 0.7, rotate: 0 }}
              transition={{ delay: 0.6 + i * 0.15, type: "spring", bounce: 0.5 }}
            >
              <Star
                className={`w-8 h-8 ${i < stars ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" : "text-white/15"}`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Rank Label */}
        <motion.div
          className="font-black text-6xl tracking-widest mb-2"
          style={{ color: rank.color, textShadow: `0 0 30px ${rank.glow}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {rank.label}
        </motion.div>
        <motion.p
          className="text-white/50 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {rank.desc}
        </motion.p>

        {/* Score Card */}
        <motion.div
          className="w-full rounded-2xl p-6 mb-8 border border-white/10"
          style={{ background: "rgba(255,255,255,0.04)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white/50 text-base">
              <Trophy className="w-4 h-4" />
              <span>Điểm số</span>
            </div>
            <span className="text-white/40 text-base">
              Tối đa: {meta.maxScore.toLocaleString()}
            </span>
          </div>

          {/* Score */}
          <motion.div
            className="text-center mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
          >
            <span
              className="font-black"
              style={{
                fontSize: "clamp(3rem, 10vw, 5rem)",
                color: rank.color,
                textShadow: `0 0 40px ${rank.glow}`,
              }}
            >
              {score.toLocaleString()}
            </span>
          </motion.div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${meta.color}, ${rank.color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-white/30 text-sm">0</span>
            <span style={{ color: rank.color }} className="text-sm font-bold">
              {pct}%
            </span>
            <span className="text-white/30 text-sm">{meta.maxScore.toLocaleString()}</span>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-bold text-base"
            onClick={onBackToMenu}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home className="w-4 h-4" />
            Chọn Game Khác
          </motion.button>

          <motion.button
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-base text-white transition-all"
            style={{
              background: `linear-gradient(135deg, ${meta.color}cc, ${rank.color}cc)`,
              boxShadow: `0 0 20px ${rank.glow}`,
            }}
            onClick={onPlayAgain}
            whileHover={{ scale: 1.04, boxShadow: `0 0 35px ${rank.glow}` }}
            whileTap={{ scale: 0.97 }}
          >
            <RotateCcw className="w-4 h-4" />
            Chơi lại
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
