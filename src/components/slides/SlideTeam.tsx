"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const MEMBERS = [
  { name: "Quốc Anh",   emoji: "🦁" },
  { name: "Trần Thịnh", emoji: "⚡" },
  { name: "Anh Thư",    emoji: "🌸" },
  { name: "Tú Uyên",    emoji: "🦋" },
  { name: "Bảo Trâm",   emoji: "🌺" },
  { name: "Thùy Dương", emoji: "🌊" },
  { name: "Thùy Trinh", emoji: "🌙" },
  { name: "Hà Linh",    emoji: "🌟" },
  { name: "Khởi My",    emoji: "🎵" },
  { name: "Kim Ngân",   emoji: "💎" },
  { name: "Minh Tâm",   emoji: "🔮" },
  { name: "Thiện Nhân", emoji: "🛡️" },
  { name: "Thanh Thùy", emoji: "🎯" },
];

const STAR = {
  name: "Minh Toàn",
  emoji: "👑",
  tags: ["Làm Dự Án", "Thuyết Trình"],
};

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Morphing gradient orb */
function Orb({
  x, y, color, size, delay,
}: { x: string; y: string; color: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        filter: `blur(${size * 0.55}px)`,
        transform: "translate(-50%,-50%)",
      }}
      animate={{
        scale:   [1, 1.25, 0.9, 1.15, 1],
        opacity: [0.35, 0.6, 0.4, 0.65, 0.35],
        x:       [0, 20, -15, 10, 0],
        y:       [0, -15, 20, -10, 0],
      }}
      transition={{ duration: 9 + delay * 2, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/** Floating star dot */
function StarDot({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ opacity: [0.05, 0.7, 0.05], scale: [0.8, 1.3, 0.8] }}
      transition={{ duration: 2.5 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/** Animated letter for title */
function Letter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 60, rotateX: -90, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.65, type: "spring", bounce: 0.5 }}
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/** Member card with 3-D tilt on hover */
function MemberCard({ name, emoji, index }: { name: string; emoji: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 25 });
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 25 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 600,
        background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
      }}
      variants={{
        hidden: { opacity: 0, scale: 0.6, y: 30, filter: "blur(8px)" },
        visible: {
          opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
          transition: { delay: index * 0.06, type: "spring", bounce: 0.4, duration: 0.7 },
        },
      }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      className="relative flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl cursor-default overflow-hidden"
    >
      {/* shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 + index * 0.15, ease: "easeInOut" }}
      />
      <span className="text-2xl relative z-10" style={{ transform: "translateZ(8px)" }}>{emoji}</span>
      <span
        className="text-xs md:text-sm font-semibold text-center leading-tight relative z-10 text-white/90"
        style={{ transform: "translateZ(6px)" }}
      >
        {name}
      </span>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SlideTeam() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [stars, setStars] = useState<{ x: number; y: number; delay: number; size: number }[]>([]);
  const [showMembers, setShowMembers] = useState(false);

  // mouse parallax for bg
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(smx, [0, 1], ["-4%", "4%"]);
  const parallaxY = useTransform(smy, [0, 1], ["-4%", "4%"]);

  useEffect(() => {
    setStars(Array.from({ length: 200 }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      delay: Math.random() * 5, size: Math.random() * 2 + 0.5,
    })));
    const t0 = setTimeout(() => setPhase(1), 100);
    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 2400);
    const t3 = setTimeout(() => setShowMembers(true), 2900);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    mx.set(e.clientX / window.innerWidth);
    my.set(e.clientY / window.innerHeight);
  };

  const title = "TỔ 3".split("");

  return (
    <div
      onMouseMove={handleMouse}
      className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#03000f" }}
    >
      {/* ═══ BG Layer: parallax starfield + orbs ═══ */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: parallaxX, y: parallaxY }}>
        {/* Stars */}
        {stars.map((s, i) => <StarDot key={i} {...s} />)}

        {/* Morphing orbs */}
        <Orb x="20%"  y="30%"  color="rgba(168,85,247,0.5)"  size={400} delay={0} />
        <Orb x="80%"  y="25%"  color="rgba(59,130,246,0.45)" size={350} delay={1.5} />
        <Orb x="50%"  y="80%"  color="rgba(239,68,68,0.35)"  size={500} delay={2.5} />
        <Orb x="12%"  y="70%"  color="rgba(251,191,36,0.25)" size={280} delay={0.8} />
        <Orb x="88%"  y="75%"  color="rgba(34,197,94,0.2)"   size={260} delay={3.5} />
      </motion.div>

      {/* ═══ Vignette ═══ */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,0,15,0.85) 100%)" }} />

      {/* ═══ Scanline film grain ═══ */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,1) 2px,rgba(255,255,255,1) 3px)" }} />

      {/* ═══ Content ═══ */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">

        {/* ── Badge ── */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              key="badge"
              className="mb-4 flex items-center gap-3"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="h-px w-12 md:w-20"
                style={{ background: "linear-gradient(to right, transparent, #fbbf24)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              />
              <span
                className="text-[10px] md:text-xs font-mono tracking-[0.45em] uppercase px-4 py-1.5 rounded-full border"
                style={{
                  color: "#fde68a", borderColor: "rgba(251,191,36,0.35)",
                  background: "rgba(251,191,36,0.07)",
                  boxShadow: "0 0 18px rgba(251,191,36,0.12)",
                }}
              >
                ✦ Nhóm Thuyết Trình — Hóa Học 10 · Tổ 3 ✦
              </span>
              <motion.div
                className="h-px w-12 md:w-20"
                style={{ background: "linear-gradient(to left, transparent, #fbbf24)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Big title ── */}
        <div
          className="font-black uppercase tracking-tighter leading-none mb-1 perspective-[800px]"
          style={{ fontSize: "clamp(5.5rem, 20vw, 13rem)" }}
          aria-label="TỔ 3"
        >
          {phase >= 1 && title.map((ch, i) => (
            <Letter key={i} char={ch} delay={0.12 + i * 0.11} />
          ))}
        </div>

        {/* color sweep under title */}
        {phase >= 2 && (
          <motion.div
            className="w-full max-w-xs md:max-w-sm h-0.5 rounded-full mb-5"
            style={{ background: "linear-gradient(90deg,#a855f7,#3b82f6,#fbbf24,#ef4444,#22c55e)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* ── Star card — Minh Toàn ── */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              key="star"
              className="mb-5 w-full max-w-xs"
              initial={{ opacity: 0, scale: 0.75, y: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* animated border gradient */}
              <motion.div
                className="rounded-[22px] p-[2px] relative"
                style={{
                  background: "linear-gradient(135deg,#fbbf24,#f97316,#ef4444,#a855f7,#3b82f6,#fbbf24)",
                  backgroundSize: "300% 300%",
                }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="rounded-[20px] px-6 py-5 flex flex-col items-center gap-3 relative overflow-hidden"
                  style={{ background: "linear-gradient(160deg,#120520 0%,#0a0018 100%)" }}
                >
                  {/* inner glow */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none rounded-[20px]"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,191,36,0.12) 0%, transparent 70%)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* shimmer pass */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.10) 50%,transparent 70%)", backgroundSize: "200% 100%" }}
                    animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                  />

                  {/* emoji pulse */}
                  <motion.span
                    className="text-5xl relative z-10"
                    animate={{ scale: [1, 1.18, 1], rotate: [-4, 4, -4] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {STAR.emoji}
                  </motion.span>

                  {/* name */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <motion.span
                      className="font-black text-2xl md:text-3xl tracking-wide"
                      style={{
                        backgroundImage: "linear-gradient(90deg,#fde68a 0%,#fbbf24 40%,#f97316 80%,#fb923c 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        textShadow: "none", filter: "drop-shadow(0 0 12px rgba(251,191,36,0.5))",
                      }}
                      animate={{ filter: ["drop-shadow(0 0 8px rgba(251,191,36,0.4))", "drop-shadow(0 0 22px rgba(251,191,36,0.9))", "drop-shadow(0 0 8px rgba(251,191,36,0.4))"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {STAR.name}
                    </motion.span>

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      {STAR.tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border"
                          style={{
                            color:        i === 0 ? "#fde68a" : "#c4b5fd",
                            borderColor:  i === 0 ? "rgba(251,191,36,0.4)" : "rgba(167,139,250,0.4)",
                            background:   i === 0 ? "rgba(217,119,6,0.15)" : "rgba(147,51,234,0.15)",
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                        >
                          {i === 0 ? "⌨ " : "🎤 "}{tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Members grid ── */}
        <AnimatePresence>
          {showMembers && (
            <motion.div
              key="grid"
              className="w-full max-w-3xl grid gap-2"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(108px, 1fr))" }}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.055 } } }}
            >
              {MEMBERS.map((m, i) => (
                <MemberCard key={m.name} name={m.name} emoji={m.emoji} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footnote ── */}
        <AnimatePresence>
          {showMembers && (
            <motion.p
              key="foot"
              className="mt-4 text-white/20 font-mono text-[10px] tracking-[0.45em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              {MEMBERS.length + 1} Thành Viên · Tổ 3 · Hóa Học 10
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ Bottom fade ═══ */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(3,0,15,0.9), transparent)" }} />
    </div>
  );
}
