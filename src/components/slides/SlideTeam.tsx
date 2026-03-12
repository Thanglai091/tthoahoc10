"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

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

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * 0.02 + 0.005,
      maxAlpha: Math.random() * 0.5 + 0.3
    }));

    let animationId: number;
    
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y += p.dy;
        if (p.y < -10) p.y = h + 10;
        
        p.alpha += p.pulse;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) p.pulse *= -1;
        
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${Math.max(0, p.alpha)})`;
        ctx!.fill();
      });
      animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0" />;
}

function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[100px]"
      />
    </div>
  );
}

function StarCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -90, z: -200 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
      transition={{ type: "spring", damping: 18, stiffness: 80, delay: 0.8 }}
      className="relative z-20 cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center justify-center pt-6 pb-5 px-8 rounded-[2rem] w-[260px]"
      >
        {/* Animated Border */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-[2rem]"
          style={{
            background: "linear-gradient(270deg, #fbbf24, #f97316, #ef4444, #a855f7, #3b82f6, #fbbf24)",
            backgroundSize: "400% 400%",
          }}
        />
        
        {/* Inner Card */}
        <div className="absolute inset-[2px] rounded-[calc(2rem-2px)] bg-gradient-to-b from-[#11051f] to-[#04000b] backdrop-blur-3xl" />
        
        {/* Interactive Inner Glow */}
        <motion.div 
            className="absolute inset-[2px] rounded-[calc(2rem-2px)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
            style={{
                background: useTransform(
                    [glowX, glowY],
                    ([gx, gy]: any) => `radial-gradient(circle at ${gx} ${gy}, rgba(251,191,36,0.3) 0%, transparent 60%)`
                ) as any
            }}
        />

        <div className="relative flex flex-col items-center gap-2 w-full z-10" style={{ transform: "translateZ(40px)" }}>
           <motion.div 
             animate={{ y: [0, -8, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="text-[4rem] drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]"
           >
             {STAR.emoji}
           </motion.div>
           <div className="font-black text-[28px] text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 drop-shadow-md text-center mt-1">
             {STAR.name}
           </div>
           <div className="flex flex-col items-center gap-2 w-full mt-2">
             {STAR.tags.map((tag, i) => (
               <span 
                 key={tag} 
                 className="text-[11px] w-full text-center py-1.5 rounded-full border tracking-widest uppercase font-bold"
                 style={{
                   borderColor: i === 0 ? "rgba(251,191,36, 0.3)" : "rgba(168,85,247, 0.3)",
                   color: i === 0 ? "#fde68a" : "#e9d5ff",
                   backgroundColor: i === 0 ? "rgba(251,191,36, 0.1)" : "rgba(168,85,247, 0.1)",
                   boxShadow: i === 0 ? "0 0 10px rgba(251,191,36,0.15)" : "0 0 10px rgba(168,85,247,0.15)"
                 }}
               >
                 {i === 0 ? "✦ " : "⚡ "}{tag}
               </span>
             ))}
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MemberCard({ member, index }: { member: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1 + index * 0.05, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.1, y: -8, zIndex: 30 }}
      className="relative flex flex-col items-center justify-center px-2 py-4 w-[112px] rounded-2xl group cursor-default shadow-xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-2xl bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/30 transition-colors duration-300 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
      
      <span className="text-[36px] mb-1.5 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" style={{ transformOrigin: "center bottom" }}>
        {member.emoji}
      </span>
      <span className="text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors duration-300 text-center leading-tight whitespace-nowrap">
        {member.name}
      </span>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SlideTeam() {
  const row1 = MEMBERS.slice(0, 4);
  const row2 = MEMBERS.slice(4, 9);
  const row3 = MEMBERS.slice(9, 13);
  const title = "TỔ 3".split("");

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans" style={{ backgroundColor: "#020008" }}>
      <Starfield />
      <AmbientOrbs />
      
      {/* Heavy vignette for cinematic look */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse 120% 120% at 50% 40%, transparent 30%, #000000 100%)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 w-max-[1200px]">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-4 mb-2"
        >
          <motion.div className="h-px w-20 bg-gradient-to-r from-transparent to-yellow-500" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} style={{ originX: 1 }} />
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.15)] backdrop-blur-md">
            ✦ Nhóm Thuyết Trình — Hóa Học 10 ✦
          </span>
          <motion.div className="h-px w-20 bg-gradient-to-l from-transparent to-yellow-500" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} style={{ originX: 0 }} />
        </motion.div>

        {/* Title */}
        <div className="flex justify-center items-center text-[clamp(4.5rem,10vw,7rem)] font-black tracking-tighter leading-none mb-4 z-10" aria-label="TỔ 3">
          {title.map((ch, i) => (
            <motion.div key={i} className="relative inline-block">
              {/* Main text */}
              <motion.span
                initial={{ opacity: 0, y: 60, filter: "blur(20px)", scale: 0.8, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", damping: 14, stiffness: 120 }}
                className="inline-block text-transparent bg-clip-text relative z-10"
                style={{
                  backgroundImage: "linear-gradient(180deg, #ffffff 0%, #d8b4fe 50%, #9333ea 100%)",
                  paddingRight: ch === " " ? "1.5rem" : "0.1rem",
                  transformStyle: "preserve-3d"
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
              {/* Glow Behind Text */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                className="absolute left-0 top-0 text-purple-600 blur-[20px] z-0 pointer-events-none"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Members Layout */}
        <div className="flex flex-col items-center w-full relative">
           
           {/* Star/Lead */}
           <div className="mb-4 z-20">
             <StarCard />
           </div>

           {/* Honeycomb Member Rows */}
           <div className="flex flex-col items-center z-10 w-full relative">
             <div className="flex justify-center gap-[18px]">
               {row1.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
             </div>
             {/* Negative margin tucks the rows perfectly into a honeycomb nesting */}
             <div className="flex justify-center gap-[18px] -mt-3">
               {row2.map((m, i) => <MemberCard key={m.name} member={m} index={i + 4} />)}
             </div>
             <div className="flex justify-center gap-[18px] -mt-3">
               {row3.map((m, i) => <MemberCard key={m.name} member={m} index={i + 9} />)}
             </div>
           </div>
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-6 text-white/20 font-mono text-[9px] tracking-[0.4em] uppercase"
        >
          {MEMBERS.length + 1} Thành Viên · Tổ 3 · Hóa Học 10
        </motion.p>
      </div>
    </div>
  );
}
