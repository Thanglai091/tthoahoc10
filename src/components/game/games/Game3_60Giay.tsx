"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { game3Questions, Game3Question } from "../data/questions";
import { CheckCircle, XCircle, Zap } from "lucide-react";
import { useSoundEffect } from "../../useSoundEffect";

interface Props {
  onComplete: (score: number) => void;
}

const TOTAL_TIME = 60;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Game3_60Giay({ onComplete }: Props) {
  const { play } = useSoundEffect();
  const [questions] = useState<Game3Question[]>(() => shuffleArray(game3Questions));
  const [qIdx, setQIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(null);
  const [scorePops, setScorePops] = useState<{ id: number }[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const popId = useRef(0);

  const endGame = useCallback(() => {
    setDone(true);
    clearInterval(timerRef.current!);
    setTimeout(() => onComplete(score), 1500);
  }, [score, onComplete]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current!); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  useEffect(() => { if (timeLeft === 0 && !done) endGame(); }, [timeLeft, done, endGame]);

  const handleAnswer = (i: number) => {
    if (selected !== null || done) return;
    setSelected(i);
    const q = questions[qIdx];
    const isCorrect = q.options[i].correct;
    
    if (isCorrect) play("correct");
    else play("wrong");
    
    setLastResult(isCorrect ? "correct" : "wrong");
    setAnswered((a) => a + 1);
    if (isCorrect) {
      setScore((s) => s + 100);
      setCorrect((c) => c + 1);
      const pid = ++popId.current;
      setScorePops((p) => [...p, { id: pid }]);
      setTimeout(() => setScorePops((p) => p.filter((x) => x.id !== pid)), 1000);
    }
    setTimeout(() => {
      setSelected(null);
      setLastResult(null);
      if (qIdx < questions.length - 1) setQIdx((q) => q + 1);
      else endGame();
    }, 450);
  };

  const q = questions[qIdx];
  const timerPct = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timerPct > 50 ? "#22c55e" : timerPct > 25 ? "#eab308" : "#ef4444";
  const urgent = timeLeft <= 15;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-10 py-6 relative">
      {/* Floating score pops */}
      <AnimatePresence>
        {scorePops.map((pop) => (
          <motion.div
            key={pop.id}
            className="absolute pointer-events-none z-50 font-black text-green-400 text-4xl top-24 right-16"
            style={{ textShadow: "0 0 25px rgba(34,197,94,1)" }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -80 }}
            transition={{ duration: 1 }}
          >
            +100
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header: stats + big timer */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-7 h-7 text-yellow-400" />
          <div>
            <div className="text-yellow-400 font-bold text-xl">60 Giây Sinh Tử</div>
            <div className="text-white/40 text-base">
              ✅ {correct} đúng &nbsp;·&nbsp; {answered} câu
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <motion.div
            className="font-black text-6xl tabular-nums"
            style={{ color: timerColor }}
            animate={urgent ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.5, repeat: urgent ? Infinity : 0 }}
          >
            {timeLeft}s
          </motion.div>
          <div className="text-right">
            <div className="text-white/40 text-sm">Điểm</div>
            <div className="text-yellow-400 font-black text-3xl">{score}</div>
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${timerPct}%`, background: timerColor }}
        />
      </div>

      {/* Question + Options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          className="w-full flex flex-col gap-4 flex-1 justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
        >
          {/* Result flash overlay */}
          <AnimatePresence>
            {lastResult && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
                style={{ background: lastResult === "correct" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Question */}
          <div
            className="rounded-2xl px-8 py-5 border border-yellow-500/15"
            style={{ background: "rgba(234,179,8,0.06)" }}
          >
            <p className="text-yellow-600 font-mono text-sm mb-1">
              Câu {qIdx + 1} / {questions.length}
            </p>
            <p className="text-white font-semibold text-2xl leading-snug">
              {q.question}
            </p>
          </div>

          {/* Options 2x2 */}
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = opt.correct;
              let style: React.CSSProperties = {
                background: "rgba(255,255,255,0.06)",
                border: "2px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
              };
              if (selected !== null) {
                if (isCorrect) style = { background: "rgba(34,197,94,0.18)", border: "2px solid #22c55e70", color: "#22c55e" };
                else if (isSelected) style = { background: "rgba(239,68,68,0.18)", border: "2px solid #ef444470", color: "#ef4444" };
                else style = { background: "rgba(255,255,255,0.02)", border: "2px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.2)" };
              }
              return (
                <motion.button
                  key={i}
                  className="rounded-xl p-5 text-left flex items-center gap-4 font-medium transition-colors"
                  style={style}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null || done}
                  onMouseEnter={() => selected === null && play("hover")}
                  whileHover={selected === null ? { scale: 1.02 } : {}}
                  whileTap={selected === null ? { scale: 0.97 } : {}}
                >
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center font-black text-lg flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)", minWidth: "2.75rem" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-lg leading-snug">{opt.text}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Done overlay */}
      {done && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm z-30 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-8xl">⏱️</div>
          <div className="text-white font-black text-5xl">HẾT GIỜ!</div>
          <div className="text-yellow-400 font-black text-6xl">{score} điểm</div>
          <div className="text-white/50 text-2xl">{correct}/{answered} câu đúng</div>
        </motion.div>
      )}
    </div>
  );
}
