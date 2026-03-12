"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { game5Questions } from "../data/questions";
import { CheckCircle, XCircle } from "lucide-react";
import { useSoundEffect } from "../../useSoundEffect";

interface Props {
  onComplete: (score: number) => void;
}

const TIME_PER_QUESTION = 10;

export default function Game5_TrueFalse({ onComplete }: Props) {
  const { play } = useSoundEffect();
  const [qIdx, setQIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState<"true" | "false" | "timeout" | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = game5Questions[qIdx];
  const isLast = qIdx >= game5Questions.length - 1;

  const goNext = useCallback(() => {
    setAnswered(null);
    setTimeLeft(TIME_PER_QUESTION);
    if (isLast) { setDone(true); setTimeout(() => onComplete(score), 2000); }
    else setQIdx((i) => i + 1);
  }, [isLast, score, onComplete]);

  useEffect(() => {
    if (answered !== null || done) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(timerRef.current!); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [qIdx, answered, done]);

  useEffect(() => {
    if (timeLeft === 0 && answered === null && !done) {
      clearInterval(timerRef.current!);
      play("wrong");
      setAnswered("timeout");
      setStreak(0);
      setFeedbackMsg("⏰ Hết giờ!");
      setHistory((h) => [...h, false]);
      setTimeout(() => goNext(), 2200);
    }
  }, [timeLeft, answered, done, goNext]);

  const handleAnswer = (answer: boolean) => {
    if (answered !== null || done) return;
    clearInterval(timerRef.current!);
    const correct = answer === q.isTrue;
    
    if (correct) play("correct");
    else play("wrong");
    
    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    const bonus = newStreak >= 3 ? Math.min((newStreak - 2) * 20, 60) : 0;
    const pts = correct ? 100 + bonus : 0;
    if (correct) {
      setScore((s) => s + pts);
      setFeedbackMsg(newStreak >= 3 ? `🔥 Streak ×${newStreak}! +${pts}` : `✅ Đúng! +${pts}`);
    } else {
      setFeedbackMsg(`❌ Sai rồi!`);
    }
    setHistory((h) => [...h, correct]);
    setAnswered(answer ? "true" : "false");
    setTimeout(() => goNext(), 2200);
  };

  const timerPct = (timeLeft / TIME_PER_QUESTION) * 100;
  const timerColor = timerPct > 60 ? "#a855f7" : timerPct > 30 ? "#eab308" : "#ef4444";
  const isCorrectAnswer = answered !== null && answered !== "timeout" && (answered === "true") === q.isTrue;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-10 py-6">
      {/* Top: progress dots + score */}
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {game5Questions.map((_, i) => {
            const h = history[i];
            return (
              <motion.div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: i === qIdx ? "1.5rem" : "0.9rem",
                  height: "0.9rem",
                  background: h === undefined
                    ? i === qIdx ? "#a855f7" : "rgba(255,255,255,0.15)"
                    : h ? "#22c55e" : "#ef4444",
                }}
                animate={i === qIdx ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            );
          })}
          <span className="text-white/40 text-base ml-2">
            {qIdx + 1} / {game5Questions.length}
          </span>
        </div>
        <div className="flex items-center gap-5">
          {streak >= 3 && (
            <motion.span
              className="text-orange-400 font-black text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              🔥 ×{streak}
            </motion.span>
          )}
          <div className="text-right">
            <div className="text-white/40 text-sm">Điểm</div>
            <div className="text-yellow-400 font-black text-3xl">{score}</div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="w-full flex items-center gap-4">
        <span className="font-black text-5xl tabular-nums" style={{ color: timerColor }}>
          {timeLeft}s
        </span>
        <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>
      </div>

      {/* Statement Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          className="w-full flex-1 flex flex-col justify-center gap-5"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="w-full rounded-2xl px-10 py-8 text-center border-2 transition-all duration-300"
            style={{
              background: answered === null ? "rgba(168,85,247,0.08)"
                : isCorrectAnswer ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
              borderColor: answered === null ? "rgba(168,85,247,0.3)"
                : isCorrectAnswer ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)",
            }}
          >
            <div className="text-6xl mb-4">{q.icon}</div>
            <p className="text-white font-bold text-2xl leading-relaxed">
              &ldquo;{q.statement}&rdquo;
            </p>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {answered !== null && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <p
                  className="font-black text-2xl"
                  style={{ color: isCorrectAnswer ? "#22c55e" : "#ef4444" }}
                >
                  {feedbackMsg}
                </p>
                {!isCorrectAnswer && answered !== "timeout" && (
                  <p className="text-white/55 text-lg mt-1">{q.explanation}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* ĐÚNG / SAI Buttons */}
      {!done && (
        <div className="flex gap-6 w-full">
          <motion.button
            className="flex-1 rounded-2xl py-8 flex flex-col items-center gap-4 font-black transition-all border-2"
            style={{
              background: answered !== null && q.isTrue ? "rgba(34,197,94,0.35)" : "rgba(34,197,94,0.1)",
              borderColor: answered !== null && q.isTrue ? "#22c55e" : "rgba(34,197,94,0.3)",
              color: answered !== null && q.isTrue ? "#22c55e" : "rgba(34,197,94,0.7)",
            }}
            onClick={() => handleAnswer(true)}
            disabled={answered !== null}
            onMouseEnter={() => answered === null && play("hover")}
            whileHover={answered === null ? { scale: 1.03, background: "rgba(34,197,94,0.2)" } : {}}
            whileTap={answered === null ? { scale: 0.97 } : {}}
          >
            <CheckCircle className="w-14 h-14" />
            <span className="text-3xl tracking-widest">ĐÚNG</span>
          </motion.button>

          <motion.button
            className="flex-1 rounded-2xl py-8 flex flex-col items-center gap-4 font-black transition-all border-2"
            style={{
              background: answered !== null && !q.isTrue ? "rgba(239,68,68,0.35)" : "rgba(239,68,68,0.1)",
              borderColor: answered !== null && !q.isTrue ? "#ef4444" : "rgba(239,68,68,0.3)",
              color: answered !== null && !q.isTrue ? "#ef4444" : "rgba(239,68,68,0.7)",
            }}
            onClick={() => handleAnswer(false)}
            disabled={answered !== null}
            onMouseEnter={() => answered === null && play("hover")}
            whileHover={answered === null ? { scale: 1.03, background: "rgba(239,68,68,0.2)" } : {}}
            whileTap={answered === null ? { scale: 0.97 } : {}}
          >
            <XCircle className="w-14 h-14" />
            <span className="text-3xl tracking-widest">SAI</span>
          </motion.button>
        </div>
      )}

      {done && (
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="text-white font-black text-4xl">
            {history.filter(Boolean).length} / {game5Questions.length} đúng
          </div>
          <div className="text-purple-400 font-black text-5xl">+{score} điểm</div>
        </motion.div>
      )}
    </div>
  );
}
