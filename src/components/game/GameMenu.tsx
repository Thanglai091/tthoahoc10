"use client";

import { motion } from "framer-motion";
import { GameScores } from "./GameOverlay";
import { Star, Play, Trophy } from "lucide-react";
import { useSoundEffect } from "../useSoundEffect";

interface GameMenuProps {
  scores: GameScores;
  onSelectGame: (id: number) => void;
}

const GAMES = [
  { id: 1, name: "Tam Giác Lửa", subtitle: "Dập lửa đúng cách", icon: "🔺", description: "5 kịch bản cháy thực tế — chọn phương án dập lửa đúng", maxScore: 750, difficulty: 2, color: "#ef4444", glow: "rgba(239,68,68,0.3)", tag: "Quiz" },
  { id: 2, name: "Phân Loại Nổ", subtitle: "Vật lý · Hóa học · Bụi", icon: "💥", description: "Phân loại 9 tình huống nổ vào nhóm đúng", maxScore: 900, difficulty: 3, color: "#f97316", glow: "rgba(249,115,22,0.3)", tag: "Phân loại" },
  { id: 3, name: "60 Giây Sinh Tử", subtitle: "Nhanh tay hơn lửa", icon: "⏱️", description: "Quiz tốc độ 60 giây — trả lời nhiều nhất có thể", maxScore: 1500, difficulty: 4, color: "#eab308", glow: "rgba(234,179,8,0.3)", tag: "Tốc độ" },
  { id: 4, name: "Nhiệt Độ Bốc Cháy", subtitle: "Xếp đúng thứ tự", icon: "🌡️", description: "Sắp xếp 4 chất lỏng theo điểm chớp nháy", maxScore: 1000, difficulty: 2, color: "#22c55e", glow: "rgba(34,197,94,0.3)", tag: "Sắp xếp" },
  { id: 5, name: "Đúng Hay Sai", subtitle: "Phản xạ chuẩn xác", icon: "✅", description: "10 mệnh đề — phán đoán Đúng hoặc Sai trong 10 giây", maxScore: 1000, difficulty: 3, color: "#a855f7", glow: "rgba(168,85,247,0.3)", tag: "True/False" },
];

export default function GameMenu({ scores, onSelectGame }: GameMenuProps) {
  const { play } = useSoundEffect();
  const totalMax = GAMES.reduce((a, g) => a + g.maxScore, 0);
  const totalScore = Object.values(scores).reduce((a, s) => a + s, 0);
  const completedCount = Object.keys(scores).length;

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col items-center py-6 px-8">
      {/* Header */}
      <motion.div className="text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-orange-400 font-mono tracking-[0.3em] text-base uppercase mb-2">
          Chọn Thách Thức
        </p>
        <h2 className="font-black uppercase tracking-tight text-white" style={{ fontSize: "clamp(3rem,8vw,6rem)" }}>
          Mini-Games
        </h2>
        {completedCount > 0 && (
          <div className="mt-3 flex items-center justify-center gap-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 font-black text-4xl">{totalScore.toLocaleString()}</span>
            <span className="text-white/40 text-2xl">/ {totalMax.toLocaleString()} điểm</span>
            <span className="text-white/40 text-xl">· {completedCount}/{GAMES.length} đã chơi</span>
          </div>
        )}
      </motion.div>

      {/* Game Cards */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-3 gap-5 mb-5">
          {GAMES.slice(0, 3).map((game, idx) => (
            <GameCard key={game.id} game={game} score={scores[game.id]} onPlay={() => { play("click"); onSelectGame(game.id); }} delay={idx * 0.08} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 max-w-4xl mx-auto">
          {GAMES.slice(3).map((game, idx) => (
            <GameCard key={game.id} game={game} score={scores[game.id]} onPlay={() => { play("click"); onSelectGame(game.id); }} delay={(idx + 3) * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GameCard({ game, score, onPlay, delay }: { game: typeof GAMES[0]; score?: number; onPlay: () => void; delay: number }) {
  const { play } = useSoundEffect();
  const played = score !== undefined;
  const pct = played ? Math.round((score / game.maxScore) * 100) : 0;

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ background: "rgba(255,255,255,0.1)", border: `2px solid ${played ? game.color + "75" : "rgba(255,255,255,0.18)"}` }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.03, borderColor: game.color + "90" }}
      onMouseEnter={() => play("hover")}
      onClick={onPlay}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${game.glow} 0%, transparent 65%)` }} />

      {/* Score bar */}
      {played && (
        <div className="h-2 w-full bg-white/10">
          <motion.div className="h-full" style={{ background: game.color }}
            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: delay + 0.3, duration: 0.8 }} />
        </div>
      )}

      <div className="p-7">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span style={{ fontSize: "3.5rem" }}>{game.icon}</span>
            <span className="text-base font-bold px-3 py-1.5 rounded-full"
              style={{ background: game.color + "22", color: game.color, border: `1px solid ${game.color}45` }}>
              {game.tag}
            </span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < game.difficulty ? "fill-yellow-400 text-yellow-400" : "text-white/15"}`} />
            ))}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-white font-black leading-tight mb-1" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
          {game.name}
        </h3>
        <p className="text-white/50 text-base mb-3">{game.subtitle}</p>
        <p className="text-white/65 text-base leading-relaxed mb-5">{game.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            {played ? (
              <div>
                <span className="font-black text-2xl" style={{ color: game.color }}>{score?.toLocaleString()}</span>
                <span className="text-white/35 text-base"> / {game.maxScore.toLocaleString()}</span>
                <span className="text-white/35 text-base ml-2">({pct}%)</span>
              </div>
            ) : (
              <span className="text-white/30 text-base">Chưa chơi</span>
            )}
          </div>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 rounded-full text-base font-black text-white"
            style={{ background: game.color + "40", border: `2px solid ${game.color}65` }}
            whileHover={{ background: game.color + "70" }}
            onMouseEnter={() => play("hover")}
            onClick={onPlay}
          >
            <Play className="w-5 h-5 fill-white" />
            {played ? "Chơi lại" : "Vào chơi"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
