"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { game4Items, TempItem } from "../data/questions";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CORRECT_ORDER = [...game4Items]
  .sort((a, b) => a.tempValue - b.tempValue)
  .map((i) => i.id);

export default function Game4_NhietDo({ onComplete }: Props) {
  const [items] = useState<TempItem[]>(() => shuffle(game4Items));
  const [order, setOrder] = useState<number[]>([]); // ids in click order
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [attempt, setAttempt] = useState(1);

  const toggleItem = (id: number) => {
    if (submitted) return;
    setOrder((prev) => {
      if (prev.includes(id)) {
        // deselect: remove this and everything after
        const idx = prev.indexOf(id);
        return prev.slice(0, idx);
      }
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    const res = order.map((id, i) => id === CORRECT_ORDER[i]);
    setResults(res);
    setSubmitted(true);
    const correctCount = res.filter(Boolean).length;
    let score = correctCount * 250;
    if (correctCount === 4) score += 200;
    if (attempt > 1) score = Math.floor(score * 0.6);
    setTimeout(() => onComplete(Math.min(score, 1000)), 4000);
  };

  const handleReset = () => {
    setOrder([]);
    setSubmitted(false);
    setResults([]);
    setAttempt((a) => a + 1);
  };

  const rankLabel = ["❄️ Thấp nhất", "🔵 Thứ hai", "🟠 Thứ ba", "🔥 Cao nhất"];

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ padding: "2rem 3rem", gap: "1.5rem" }}
    >
      {/* ─── HEADER ─── */}
      <div style={{ textAlign: "center", flexShrink: 0 }}>
        <p style={{ color: "#4ade80", fontFamily: "monospace", letterSpacing: "0.25em", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>
          🌡️ Nhiệt Độ Bốc Cháy
        </p>
        <h2 style={{ color: "#ffffff", fontWeight: 900, fontSize: "2.2rem", margin: 0 }}>
          Sắp xếp theo Điểm Chớp Nháy
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", marginTop: "0.3rem" }}>
          Click từ{" "}
          <strong style={{ color: "#60a5fa" }}>lạnh nhất ❄️</strong>{" "}
          đến{" "}
          <strong style={{ color: "#f87171" }}>🔥 nóng nhất</strong>
          {attempt > 1 && (
            <span style={{ color: "#facc15", marginLeft: "1rem" }}>· Lần {attempt} (×0.6)</span>
          )}
        </p>
      </div>

      {/* ─── ANSWER SLOTS ─── */}
      <div style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
        {[0, 1, 2, 3].map((i) => {
          const id = order[i];
          const item = id !== undefined ? items.find((x) => x.id === id) : undefined;
          const hasResult = submitted && results[i] !== undefined;
          const correct = hasResult && results[i];

          return (
            <div
              key={i}
              style={{
                flex: 1,
                background: item
                  ? hasResult
                    ? correct ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"
                    : item.color + "18"
                  : "rgba(255,255,255,0.03)",
                border: `2px dashed ${item
                  ? hasResult
                    ? correct ? "#22c55e" : "#ef4444"
                    : item.color + "99"
                  : "rgba(255,255,255,0.15)"}`,
                borderRadius: "1rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                minHeight: "120px",
                transition: "all 0.3s",
              }}
            >
              <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {rankLabel[i]}
              </span>
              <AnimatePresence mode="wait">
                {item ? (
                  <motion.div
                    key={id}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", textAlign: "center", lineHeight: 1.2 }}>
                      {item.name}
                    </span>
                    {submitted && (
                      <span style={{ color: correct ? "#22c55e" : "#ef4444", fontWeight: 900, fontSize: "0.85rem" }}>
                        {correct ? "✓ " : "✗ "}{item.temp}
                      </span>
                    )}
                  </motion.div>
                ) : (
                  <motion.span
                    key="empty"
                    style={{ color: "rgba(255,255,255,0.18)", fontSize: "1.5rem", fontFamily: "monospace" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    #{i + 1}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ─── TEMPERATURE SCALE ─── */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <span style={{ fontSize: "1.5rem" }}>❄️</span>
        <div style={{
          flex: 1, height: "8px", borderRadius: "9999px",
          background: "linear-gradient(90deg, #93c5fd, #34d399, #fbbf24, #f87171, #dc2626)",
        }} />
        <span style={{ fontSize: "1.5rem" }}>🔥</span>
      </div>

      {/* ─── SUBSTANCE CARDS (flex row — always 4 in a line) ─── */}
      <div style={{ display: "flex", gap: "1rem", flex: 1 }}>
        {items.map((it) => {
          const rank = order.indexOf(it.id); // -1 if not selected
          const isSelected = rank !== -1;
          const hasResult = submitted && isSelected && results[rank] !== undefined;
          const correct = hasResult && results[rank];

          return (
            <motion.button
              key={it.id}
              onClick={() => toggleItem(it.id)}
              disabled={submitted}
              whileHover={!submitted ? { y: -6, scale: 1.03 } : {}}
              whileTap={!submitted ? { scale: 0.96 } : {}}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                borderRadius: "1.25rem",
                padding: "1.5rem 1rem",
                cursor: submitted ? "default" : "pointer",
                position: "relative",
                transition: "background 0.2s, border-color 0.2s",
                background: isSelected
                  ? submitted
                    ? correct ? "rgba(34,197,94,0.18)" : "rgba(239,68,68,0.18)"
                    : it.color + "20"
                  : "rgba(255,255,255,0.05)",
                border: `2px solid ${isSelected
                  ? submitted
                    ? correct ? "#22c55e80" : "#ef444480"
                    : it.color + "99"
                  : "rgba(255,255,255,0.1)"}`,
                opacity: isSelected && !submitted ? 0.72 : 1,
              }}
            >
              {/* Rank badge */}
              <AnimatePresence>
                {isSelected && !submitted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "-12px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "9999px",
                      background: it.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "1rem",
                      boxShadow: `0 0 14px ${it.color}80`,
                    }}
                  >
                    {rank + 1}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result icon overlay */}
              {submitted && isSelected && (
                <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
                  {correct
                    ? <CheckCircle size={22} color="#22c55e" />
                    : <XCircle size={22} color="#ef4444" />
                  }
                </div>
              )}

              <span style={{ fontSize: "3.5rem" }}>{it.icon}</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", textAlign: "center", lineHeight: 1.3 }}>
                {it.name}
              </span>

              {/* Show temp after submit */}
              {submitted && (
                <motion.span
                  style={{ fontWeight: 900, fontSize: "1rem", color: it.color }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {it.temp}
                </motion.span>
              )}

              {/* Unselected hint */}
              {!isSelected && !submitted && (
                <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.8rem" }}>
                  Click để chọn
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ─── BOTTOM ACTIONS ─── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        {!submitted && order.length < 4 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}>
            {order.length === 0
              ? "Hãy click chọn lần lượt từ chất có nhiệt độ thấp nhất"
              : `Đã chọn ${order.length}/4 — chọn thêm ${4 - order.length} chất nữa`}
          </p>
        )}

        {!submitted && order.length === 4 && (
          <motion.button
            onClick={handleSubmit}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(34,197,94,0.5)" }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "0.9rem 3rem",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              border: "none",
              color: "#fff",
              fontWeight: 900,
              fontSize: "1.3rem",
              cursor: "pointer",
              boxShadow: "0 0 25px rgba(34,197,94,0.35)",
              letterSpacing: "0.05em",
            }}
          >
            ✅ Xác Nhận Thứ Tự
          </motion.button>
        )}

        {submitted && (
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {(() => {
              const c = results.filter(Boolean).length;
              const s = Math.min(
                Math.floor((c * 250 + (c === 4 ? 200 : 0)) * (attempt > 1 ? 0.6 : 1)),
                1000
              );
              return (
                <>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ color: "#fff", fontWeight: 900, fontSize: "2.5rem" }}>{c}/4 đúng</div>
                    <div style={{ color: "#22c55e", fontWeight: 900, fontSize: "2rem" }}>+{s} điểm</div>
                  </div>
                  {c < 4 && (
                    <button
                      onClick={handleReset}
                      style={{
                        padding: "0.6rem 1.5rem",
                        borderRadius: "9999px",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.2)",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                    >
                      Thử lại
                    </button>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
