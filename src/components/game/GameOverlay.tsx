"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameIntro from "./GameIntro";
import GameMenu from "./GameMenu";
import GameResult from "./GameResult";
import Game1_TamGiacLua from "./games/Game1_TamGiacLua";
import Game2_PhanLoaiNo from "./games/Game2_PhanLoaiNo";
import Game3_60Giay from "./games/Game3_60Giay";
import Game4_NhietDo from "./games/Game4_NhietDo";
import Game5_TrueFalse from "./games/Game5_TrueFalse";
import { X } from "lucide-react";

export type GameScreen =
  | "intro"
  | "menu"
  | "playing:1"
  | "playing:2"
  | "playing:3"
  | "playing:4"
  | "playing:5"
  | "result:1"
  | "result:2"
  | "result:3"
  | "result:4"
  | "result:5";

export interface GameScores {
  [gameId: number]: number;
}

interface GameOverlayProps {
  onClose: () => void;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

export default function GameOverlay({ onClose }: GameOverlayProps) {
  const [screen, setScreen] = useState<GameScreen>("intro");
  const [scores, setScores] = useState<GameScores>({});

  const goToGame = (id: number) => {
    setScreen(`playing:${id}` as GameScreen);
  };

  const handleGameComplete = (gameId: number, score: number) => {
    setScores((prev) => ({ ...prev, [gameId]: score }));
    setScreen(`result:${gameId}` as GameScreen);
  };

  const parseGameId = (): number => {
    const parts = screen.split(":");
    return parts.length > 1 ? parseInt(parts[1]) : 0;
  };

  const renderContent = () => {
    if (screen === "intro")
      return <GameIntro onStart={() => setScreen("menu")} />;

    if (screen === "menu")
      return <GameMenu scores={scores} onSelectGame={goToGame} />;

    const gameId = parseGameId();
    const gameProps = {
      onComplete: (score: number) => handleGameComplete(gameId, score),
    };

    if (screen === "playing:1") return <Game1_TamGiacLua {...gameProps} />;
    if (screen === "playing:2") return <Game2_PhanLoaiNo {...gameProps} />;
    if (screen === "playing:3") return <Game3_60Giay {...gameProps} />;
    if (screen === "playing:4") return <Game4_NhietDo {...gameProps} />;
    if (screen === "playing:5") return <Game5_TrueFalse {...gameProps} />;

    if (screen.startsWith("result:"))
      return (
        <GameResult
          gameId={gameId}
          score={scores[gameId] ?? 0}
          onPlayAgain={() => goToGame(gameId)}
          onBackToMenu={() => setScreen("menu")}
        />
      );

    return null;
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] overflow-hidden"
      style={{ background: "#040404" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(239,68,68,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(249,115,22,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Close Button */}
      {screen !== "intro" && (
        <motion.button
          className="absolute top-5 right-5 z-[1001] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={18} />
        </motion.button>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="w-full h-full"
          {...pageTransition}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
