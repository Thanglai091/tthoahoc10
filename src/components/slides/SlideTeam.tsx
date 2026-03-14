"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAudioState } from "../AudioProvider";

const MEMBERS = [
  { name: "Minh Toàn", emoji: "👑" },
  { name: "Quốc Anh", emoji: "🦁" },
  { name: "Trần Thịnh", emoji: "⚡" },
  { name: "Anh Thư", emoji: "🌸" },
  { name: "Tú Uyên", emoji: "🦋" },
  { name: "Bảo Trâm", emoji: "🌺" },
  { name: "Thùy Dương", emoji: "🌊" },
  { name: "Thùy Trinh", emoji: "🌙" },
  { name: "Hà Linh", emoji: "🌟" },
  { name: "Khởi My", emoji: "🎵" },
  { name: "Kim Ngân", emoji: "💎" },
  { name: "Minh Tâm", emoji: "🔮" },
  { name: "Thiện Nhân", emoji: "🛡️" },
  { name: "Thanh Thùy", emoji: "🎯" },
];

const RING_SPLIT_INDEX = Math.ceil(MEMBERS.length / 2);
const INNER_RING = MEMBERS.slice(0, RING_SPLIT_INDEX);
const OUTER_RING = MEMBERS.slice(RING_SPLIT_INDEX);

const TIMING = {
  titleDuration: 3.2,
  leadDelay: 2.2,
  memberDelay: 3.4,
  orbitDelay: 5.0,
};

const MEMBER_STAGGER = 0.12;
const MEMBER_REVEAL_DURATION = 1.1;
const MAX_RING_MEMBERS = Math.max(INNER_RING.length, OUTER_RING.length);
const BONG_START_MS = TIMING.memberDelay * 1000;
const BONG_END_MS =
  (TIMING.memberDelay + (MAX_RING_MEMBERS - 1) * MEMBER_STAGGER + MEMBER_REVEAL_DURATION) * 1000;

const INNER_RADIUS = 240;
const OUTER_RADIUS = 380;

function polar(angleDeg: number, radius: number) {
  const rad = (Math.PI / 180) * angleDeg;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function CinematicBackdrop() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0" style={{ backgroundColor: "#05070f" }} />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.2), transparent 45%), radial-gradient(circle at 80% 25%, rgba(251,191,36,0.2), transparent 40%), radial-gradient(circle at 60% 85%, rgba(16,185,129,0.2), transparent 45%)",
        }}
        animate={{ opacity: [0.6, 1, 0.8] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "140px 140px"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[-40%]"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(56,189,248,0.2) 50%, transparent 70%)",
        }}
        animate={{ x: ["-10%", "10%", "-10%"], rotate: [8, 12, 8] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 110% at 50% 45%, rgba(255,255,255,0.08), rgba(5,7,16,0.4) 55%, #02030a 100%)",
        }}
      />
      <div className="absolute top-6 left-6 h-24 w-24 rounded-full bg-cyan-300/20 blur-[80px]" />
      <div className="absolute bottom-8 right-8 h-28 w-28 rounded-full bg-amber-300/20 blur-[90px]" />
    </div>
  );
}

function TitleSequence() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center text-center pointer-events-none"
      initial={{ opacity: 0, scale: 1.2, filter: "blur(18px)" }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [1.2, 1, 1, 0.6],
        filter: ["blur(18px)", "blur(0px)", "blur(0px)", "blur(12px)"],
      }}
      transition={{
        duration: TIMING.titleDuration,
        times: [0, 0.25, 0.6, 1],
        ease: ["easeOut", "linear", "easeIn"],
      }}
    >
      <div className="relative flex flex-col items-center gap-2">
        <div className="text-[clamp(2.2rem,6.2vw,4.1rem)] font-black tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-emerald-200 uppercase">
          Nhóm
        </div>
        <div className="text-[clamp(2.8rem,8vw,5.4rem)] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-emerald-200 to-amber-300 uppercase">
          Thuyết Trình
        </div>
        <div className="absolute inset-0 flex flex-col items-center gap-2 pointer-events-none">
          <div className="text-[clamp(2.2rem,6.2vw,4.1rem)] font-black tracking-[0.22em] text-cyan-300/40 blur-[24px] uppercase">
            Nhóm
          </div>
          <div className="text-[clamp(2.8rem,8vw,5.4rem)] font-black tracking-[0.2em] text-cyan-300/45 blur-[28px] uppercase">
            Thuyết Trình
          </div>
        </div>
        <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 text-[10px] md:text-[12px] uppercase tracking-[0.45em] text-white/60">
          Hóa Học 10
        </div>
      </div>
    </motion.div>
  );
}

function TeamCore() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: TIMING.leadDelay }}
      className="relative flex flex-col items-center justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute -inset-16 rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-24 rounded-full"
        style={{ border: "1px dashed rgba(255,255,255,0.18)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="text-[2.8rem] sm:text-[3.2rem] md:text-[3.8rem] font-black tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-emerald-200 to-amber-300 uppercase drop-shadow-[0_0_28px_rgba(56,189,248,0.35)]">
          Tổ 3
        </div>
      </motion.div>
    </motion.div>
  );
}

function MemberBadge({
  member,
  tone,
}: {
  member: (typeof MEMBERS)[number];
  tone: "inner" | "outer";
}) {
  const borderClass = tone === "inner" ? "border-cyan-300/35" : "border-amber-300/35";
  const glow =
    tone === "inner"
      ? "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.22), transparent 60%)"
      : "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.25), transparent 60%)";

  return (
    <motion.div
      className={`group relative flex items-center gap-3 rounded-2xl border ${borderClass} bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-900/70 px-4 sm:px-5 py-3 sm:py-3.5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] min-w-[150px] sm:min-w-[170px] md:min-w-[210px]`}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-xl bg-white/10 text-[28px] sm:text-[32px]">
        {member.emoji}
      </div>
      <div className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-white/90 whitespace-nowrap">
        {member.name}
      </div>
    </motion.div>
  );
}

function OrbitRing({
  members,
  radius,
  duration,
  delay,
  tone,
}: {
  members: typeof MEMBERS;
  radius: number;
  duration: number;
  delay: number;
  tone: "inner" | "outer";
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      {members.map((member, index) => {
        const angle = (360 / members.length) * index - 90;
        const { x, y } = polar(angle, radius);
        return (
          <motion.div
            key={member.name}
            className="absolute"
            initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{
              delay: TIMING.memberDelay + index * MEMBER_STAGGER,
              duration: MEMBER_REVEAL_DURATION,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear", delay }}
            >
              <MemberBadge member={member} tone={tone} />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function SlideTeam() {
  const introAudioRef = useRef<HTMLAudioElement>(null);
  const bongAudioRef = useRef<HTMLAudioElement>(null);
  const { bgmVolume } = useAudioState();

  useEffect(() => {
    const introAudio = introAudioRef.current;
    const bongAudio = bongAudioRef.current;

    if (introAudio) {
      introAudio.currentTime = 0;
      const introPlay = introAudio.play();
      if (introPlay) introPlay.catch(() => {});
    }

    const startBongTimeout = window.setTimeout(() => {
      if (!bongAudio) return;
      bongAudio.currentTime = 0;
      bongAudio.loop = true;
      const bongPlay = bongAudio.play();
      if (bongPlay) bongPlay.catch(() => {});
    }, BONG_START_MS);

    const stopBongTimeout = window.setTimeout(() => {
      if (!bongAudio) return;
      bongAudio.pause();
      bongAudio.currentTime = 0;
      bongAudio.loop = false;
    }, BONG_END_MS);

    return () => {
      window.clearTimeout(startBongTimeout);
      window.clearTimeout(stopBongTimeout);
      if (introAudio) {
        introAudio.pause();
        introAudio.currentTime = 0;
      }
      if (bongAudio) {
        bongAudio.pause();
        bongAudio.currentTime = 0;
        bongAudio.loop = false;
      }
    };
  }, []);

  useEffect(() => {
    const introAudio = introAudioRef.current;
    const bongAudio = bongAudioRef.current;
    if (introAudio) {
      introAudio.volume = Math.min((bgmVolume / 15) * 1.15, 1);
    }
    if (bongAudio) {
      bongAudio.volume = Math.min((bgmVolume / 15) * 1.65, 1);
    }
  }, [bgmVolume]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <audio ref={introAudioRef} src="/audio/intro.mp3" preload="auto" loop />
      <audio ref={bongAudioRef} src="/audio/bongbong.mp3" preload="auto" />

      <CinematicBackdrop />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-8">
        <div className="relative flex flex-col items-center gap-10">
          <div
            className="relative flex items-center justify-center"
            style={{ width: "min(96vw, 980px)", height: "min(96vw, 980px)" }}
          >
            <TitleSequence />
            <OrbitRing
              members={INNER_RING}
              radius={INNER_RADIUS}
              duration={32}
              delay={TIMING.orbitDelay}
              tone="inner"
            />
            <OrbitRing
              members={OUTER_RING}
              radius={OUTER_RADIUS}
              duration={44}
              delay={TIMING.orbitDelay}
              tone="outer"
            />
            <TeamCore />
          </div>
        </div>
      </div>
    </div>
  );
}
