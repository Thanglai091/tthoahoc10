"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameIntro from "./GameIntro";
import GameMenu from "./GameMenu";
import GameResult from "./GameResult";
import Game1_TamGiacLua from "./games/Game1_TamGiacLua";
import Game2_PhanLoaiNo from "./games/Game2_PhanLoaiNo";
import Game3_60Giay from "./games/Game3_60Giay";
import Game4_NhietDo from "./games/Game4_NhietDo";
import Game5_TrueFalse from "./games/Game5_TrueFalse";
import FarewellScreen from "./FarewellScreen";
import { X, Volume2, VolumeX, Volume1, Music, Music2 } from "lucide-react";
import { useSoundEffect } from "../useSoundEffect";
import { useAudioState } from "../AudioProvider";

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
  transition: { duration: 0.4, ease: "easeInOut" as const },
};

export default function GameOverlay({ onClose }: GameOverlayProps) {
  const { play } = useSoundEffect();
  const { sfxVolume, setSfxVolume, bgmVolume, setBgmVolume } = useAudioState();
  const [screen, setScreen] = useState<GameScreen>("intro");
  const [scores, setScores] = useState<GameScores>({});
  const [showFarewell, setShowFarewell] = useState(false);
  
  const bgmRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = Math.min((bgmVolume / 15) * 1.5, 1);
    }
  }, [bgmVolume]);

  // Shift+E: toggle farewell screen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "E") {
        setShowFarewell((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const toggleSfx = () => {
    if (sfxVolume >= 10) setSfxVolume(5);
    else if (sfxVolume >= 5) setSfxVolume(0);
    else setSfxVolume(15);
    play("click");
  };

  const toggleBgm = () => {
    if (bgmVolume >= 10) setBgmVolume(5);
    else if (bgmVolume >= 5) setBgmVolume(0);
    else setBgmVolume(15);
    play("click");
  };

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
      style={{ background: "#0b1220" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Close Button */}
      {screen !== "intro" && (
        <motion.button
          className="absolute top-5 right-5 z-[1001] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          onClick={onClose}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onMouseEnter={() => play("hover")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={18} />
        </motion.button>
      )}

      {/* Audio Controls */}
      <div className="absolute top-5 left-5 z-[1001] flex flex-col items-start gap-3">
        {/* SFX Slider */}
        <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 h-12 shadow-lg hover:bg-black/60 transition-colors group cursor-pointer">
          <motion.button
            className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-white transition-all outline-none flex-shrink-0"
            onClick={toggleSfx}
            onMouseEnter={() => play("hover")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Điều chỉnh SFX"
          >
            {sfxVolume >= 10 ? <Volume2 size={18} className="text-blue-400" /> : 
             sfxVolume > 0 ? <Volume1 size={18} className="text-blue-200" /> : 
             <VolumeX size={18} className="text-red-500 opacity-50" />}
          </motion.button>
          
          <div className="w-0 overflow-hidden group-hover:w-28 transition-[width] duration-300 ease-in-out flex items-center">
            <input 
              type="range" min="0" max="15" step="1" value={sfxVolume}
              onChange={(e) => setSfxVolume(parseInt(e.target.value))}
              onMouseUp={() => play("click")}
              title="Âm lượng hiệu ứng"
              className="w-24 ml-2 max-w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* BGM Slider */}
        <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 h-12 shadow-lg hover:bg-black/60 transition-colors group cursor-pointer">
          <motion.button
            className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-white transition-all outline-none flex-shrink-0"
            onClick={toggleBgm}
            onMouseEnter={() => play("hover")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Điều chỉnh Nhạc Nền"
          >
            {bgmVolume >= 10 ? <Music size={18} className="text-purple-400" /> : 
             bgmVolume > 0 ? <Music2 size={18} className="text-purple-200" /> : 
             <Music size={18} className="text-red-500 opacity-50" />}
          </motion.button>
          
          <div className="w-0 overflow-hidden group-hover:w-28 transition-[width] duration-300 ease-in-out flex items-center">
            <input 
              type="range" min="0" max="15" step="1" value={bgmVolume}
              onChange={(e) => setBgmVolume(parseInt(e.target.value))}
              title="Âm lượng nhạc nền"
              className="w-24 ml-2 max-w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Background Music */}
      <audio 
        ref={bgmRef}
        src="/audio/bgm.mp3" 
        autoPlay 
        loop 
        style={{ display: "none" }}
      />

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

      {/* Farewell Screen – hidden by default, toggle with Shift+E */}
      <FarewellScreen visible={showFarewell} />
    </motion.div>
  );
}
