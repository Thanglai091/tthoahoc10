"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { game1Questions } from "../data/questions";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
}

const TIME_PER_QUESTION = 15;
const BASE_SCORE = 100;
const TIME_BONUS = 10;

export default function Game1_TamGiacLua({ onComplete }: Props) {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [shake, setShake] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = game1Questions[qIdx];
  const isAnswered = selected !== null;

  useEffect(() => {
    if (isAnswered || done) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setSelected(-1);
          setTimeout(() => advance(0), 2000);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [qIdx, isAnswered, done]);

  const advance = (addScore: number) => {
    setTotalScore((s) => {
      const newTotal = s + addScore;
      if (qIdx >= game1Questions.length - 1) {
        setTimeout(() => onComplete(newTotal), 500);
        setDone(true);
      }
      return newTotal;
    });
    setSelected(null);
    setTimeLeft(TIME_PER_QUESTION);
    setScore(addScore);
    if (qIdx < game1Questions.length - 1) setQIdx((i) => i + 1);
  };

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    clearInterval(timerRef.current!);
    setSelected(idx);
    const correct = q.options[idx].correct;
    if (correct) {
      const earned = BASE_SCORE + timeLeft * TIME_BONUS;
      setScore(earned);
      setTimeout(() => advance(earned), 2500);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => advance(0), 2500);
    }
  };

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor = timerPct > 60 ? "#22c55e" : timerPct > 30 ? "#eab308" : "#ef4444";

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-10 py-6">
      {/* Top bar */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-red-400 font-mono tracking-widest text-base uppercase">🔺 Tam Giác Lửa</span>
          <span className="text-white/40 text-lg">Câu {qIdx + 1} / {game1Questions.length}</span>
        </div>
        <div className="flex items-center gap-6">
          {/* Big countdown */}
          <motion.div
            className="flex items-center gap-2"
            animate={timerPct < 30 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          >
            <span className="font-black text-5xl tabular-nums" style={{ color: timerColor }}>
              {timeLeft}
            </span>
            <span className="text-xl" style={{ color: timerColor }}>s</span>
          </motion.div>
          <div className="text-right">
            <div className="text-white/40 text-sm">Điểm</div>
            <div className="text-yellow-400 font-black text-3xl">{totalScore}</div>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${timerPct}%`, background: timerColor }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          className="w-full flex flex-col items-center gap-5 flex-1 justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : { opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          {/* Scenario card */}
          <div
            className="w-full rounded-2xl px-8 py-6 border border-red-500/20 text-center"
            style={{ background: "rgba(239,68,68,0.07)" }}
          >
            <div className="text-5xl mb-2">{q.icon}</div>
            <p className="text-red-400 font-bold text-sm tracking-widest uppercase mb-2">
              Kịch Bản: {q.scenario}
            </p>
            <p className="text-white font-semibold text-2xl leading-snug">
              {q.question}
            </p>
          </div>

          {/* Options 2x2 */}
          <div className="w-full grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = opt.correct;
              let bg = "rgba(255,255,255,0.05)";
              let border = "rgba(255,255,255,0.10)";
              let textColor = "rgba(255,255,255,0.85)";

              if (isAnswered) {
                if (isCorrect) { bg = "rgba(34,197,94,0.18)"; border = "#22c55e80"; textColor = "#22c55e"; }
                else if (isSelected) { bg = "rgba(239,68,68,0.18)"; border = "#ef444480"; textColor = "#ef4444"; }
                else { bg = "rgba(255,255,255,0.02)"; textColor = "rgba(255,255,255,0.2)"; }
              }

              return (
                <motion.button
                  key={i}
                  className="rounded-xl p-5 text-left flex items-center gap-4 cursor-pointer transition-all"
                  style={{ background: bg, border: `2px solid ${border}`, color: textColor }}
                  whileHover={!isAnswered ? { scale: 1.02 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                >
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.12)", minWidth: "2.75rem" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-lg leading-snug">{opt.text}</span>
                    {isAnswered && (isSelected || isCorrect) && (
                      <p className="text-sm mt-1 opacity-75">{opt.explanation}</p>
                    )}
                  </div>
                  {isAnswered && isCorrect && <CheckCircle className="w-7 h-7 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-7 h-7 flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Score pop */}
          <AnimatePresence>
            {isAnswered && score > 0 && (
              <motion.div
                className="font-black text-4xl text-green-400 text-center"
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ textShadow: "0 0 20px rgba(34,197,94,0.8)" }}
              >
                +{score} điểm! 🎉
              </motion.div>
            )}
            {isAnswered && selected === -1 && (
              <motion.div
                className="font-bold text-2xl text-white/40 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⏰ Hết giờ!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
