"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { game2Items, game2Categories } from "../data/questions";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  onComplete: (score: number) => void;
}

type CategoryKey = "vatLy" | "hoaHoc" | "bui";

export default function Game2_PhanLoaiNo({ onComplete }: Props) {
  const [placements, setPlacements] = useState<Record<number, CategoryKey>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackMap, setFeedbackMap] = useState<Record<number, boolean>>({});

  const unplaced = game2Items.filter((it) => !(it.id in placements));
  const totalPlaced = Object.keys(placements).length;

  const handleItemClick = (id: number) => {
    if (submitted) return;
    setSelected((prev) => (prev === id ? null : id));
  };

  const handleCategoryClick = (cat: CategoryKey) => {
    if (submitted || selected === null) return;
    setPlacements((prev) => ({ ...prev, [selected]: cat }));
    setSelected(null);
  };

  const handleRemove = (id: number) => {
    if (submitted) return;
    setPlacements((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleSubmit = () => {
    const feedback: Record<number, boolean> = {};
    let correct = 0;
    game2Items.forEach((it) => {
      const ok = placements[it.id] === it.type;
      feedback[it.id] = ok;
      if (ok) correct++;
    });
    setFeedbackMap(feedback);
    setSubmitted(true);
    setTimeout(() => onComplete(correct * 100), 3500);
  };

  const itemById = (id: number) => game2Items.find((it) => it.id === id)!;

  return (
    <div className="w-full h-full flex flex-col px-8 py-5 gap-4">
      {/* Header */}
      <div className="text-center flex-shrink-0">
        <p className="text-orange-400 font-mono tracking-[0.3em] text-sm uppercase mb-1">
          💥 Phân Loại Nổ
        </p>
        <p className="text-white font-bold text-xl">
          {submitted
            ? `Kết quả: ${Object.values(feedbackMap).filter(Boolean).length}/${game2Items.length} đúng`
            : selected !== null
            ? "👆 Click vào nhóm bên dưới để phân loại"
            : "Click chọn tình huống → Click vào nhóm phù hợp"
          }
        </p>
        {!submitted && (
          <p className="text-white/40 text-base mt-1">
            {totalPlaced}/{game2Items.length} đã phân loại
          </p>
        )}
      </div>

      {/* Category Zones */}
      <div className="grid grid-cols-3 gap-4 flex-shrink-0" style={{ minHeight: "200px" }}>
        {(Object.keys(game2Categories) as CategoryKey[]).map((cat) => {
          const meta = game2Categories[cat];
          const itemsInCat = Object.entries(placements)
            .filter(([, v]) => v === cat)
            .map(([k]) => itemById(parseInt(k)));
          const isTarget = selected !== null && !submitted;

          return (
            <motion.div
              key={cat}
              className="rounded-2xl p-4 flex flex-col cursor-pointer transition-all duration-200"
              style={{
                background: meta.bg,
                border: `2px solid ${isTarget ? meta.color + "cc" : meta.color + "40"}`,
                boxShadow: isTarget ? `0 0 20px ${meta.color}40` : "none",
              }}
              onClick={() => handleCategoryClick(cat)}
              whileHover={isTarget ? { scale: 1.02 } : {}}
            >
              <h4 className="font-black text-xl text-center mb-1" style={{ color: meta.color }}>
                {meta.label}
              </h4>
              <p className="text-white/40 text-sm text-center mb-2">{meta.description}</p>

              <div className="flex flex-col gap-1.5 flex-1">
                <AnimatePresence>
                  {itemsInCat.map((it) => (
                    <motion.button
                      key={it.id}
                      className="flex items-center gap-2 w-full rounded-xl px-3 py-2 text-left font-semibold text-sm"
                      style={{
                        background: submitted
                          ? feedbackMap[it.id] ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"
                          : "rgba(255,255,255,0.09)",
                        color: submitted
                          ? feedbackMap[it.id] ? "#22c55e" : "#ef4444"
                          : "rgba(255,255,255,0.88)",
                      }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      onClick={(e) => { e.stopPropagation(); handleRemove(it.id); }}
                      disabled={submitted}
                    >
                      <span className="text-xl flex-shrink-0">{it.icon}</span>
                      <span className="flex-1 leading-tight">{it.text}</span>
                      {submitted && (feedbackMap[it.id]
                        ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
                        : <XCircle className="w-4 h-4 flex-shrink-0" />
                      )}
                    </motion.button>
                  ))}
                </AnimatePresence>

                {isTarget && itemsInCat.length === 0 && (
                  <div
                    className="flex-1 border-2 border-dashed rounded-xl flex items-center justify-center text-sm font-semibold min-h-[50px]"
                    style={{ borderColor: meta.color + "55", color: meta.color + "88" }}
                  >
                    Thả vào đây
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Item Pool */}
      {!submitted && (
        <div className="flex-1 flex flex-col">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-2 text-center">
            Tình huống chưa phân loại ({unplaced.length})
          </p>
          <div className="flex flex-wrap gap-2 justify-center content-start">
            {unplaced.map((it) => (
              <motion.button
                key={it.id}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-base transition-all"
                style={{
                  background: selected === it.id ? "rgba(249,115,22,0.25)" : "rgba(255,255,255,0.07)",
                  border: `2px solid ${selected === it.id ? "rgba(249,115,22,0.75)" : "rgba(255,255,255,0.12)"}`,
                  color: selected === it.id ? "#fb923c" : "rgba(255,255,255,0.85)",
                  boxShadow: selected === it.id ? "0 0 16px rgba(249,115,22,0.3)" : "none",
                }}
                onClick={() => handleItemClick(it.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                layout
              >
                <span className="text-2xl">{it.icon}</span>
                <span>{it.text}</span>
              </motion.button>
            ))}
            {unplaced.length === 0 && !submitted && (
              <p className="text-green-400 font-bold text-xl">✅ Tất cả đã phân loại!</p>
            )}
          </div>
        </div>
      )}

      {/* Submit + Result */}
      <div className="flex items-center justify-center gap-6 flex-shrink-0">
        {!submitted && totalPlaced === game2Items.length && (
          <motion.button
            className="px-12 py-4 rounded-full font-black text-white text-xl"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.9), rgba(239,68,68,0.9))", boxShadow: "0 0 25px rgba(239,68,68,0.4)" }}
            onClick={handleSubmit}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            🔥 Nộp Kết Quả
          </motion.button>
        )}
        {submitted && (
          <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            {(() => {
              const correct = Object.values(feedbackMap).filter(Boolean).length;
              return (
                <>
                  <div className="text-white font-black text-4xl">{correct}/{game2Items.length} đúng</div>
                  <div className="text-green-400 font-black text-4xl">+{correct * 100} điểm</div>
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
