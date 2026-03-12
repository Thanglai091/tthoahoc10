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

// Re-organize members since Star is Minh Toàn. There are 13 members in MEMBERS.
// To make it symmetric (6 left, 6 right), we'll assume one member needs to be removed from the regular list,
// or we make it 7 and 6. For optimal symmetry, let's just split the 13 members.
// Wait, actually there are 13 members + 1 Star.
// Left Side: 6 or 7.
// Let's do 6 left, 7 right or just split evenly.
const leftMembers = MEMBERS.slice(0, 6);
const rightMembers = MEMBERS.slice(6, 13); // 7 members on the right

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
        className="relative flex flex-col items-center justify-center pt-8 pb-7 px-8 rounded-[2.5rem] w-[260px] md:w-[320px] shadow-2xl"
      >
        {/* Animated Border */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-[2.5rem]"
          style={{
            background: "linear-gradient(270deg, #fbbf24, #f97316, #ef4444, #a855f7, #3b82f6, #fbbf24)",
            backgroundSize: "400% 400%",
          }}
        />
        
        {/* Inner Card */}
        <div className="absolute inset-[3px] rounded-[calc(2.5rem-3px)] bg-gradient-to-b from-[#11051f] to-[#04000b] backdrop-blur-3xl" />
        
        {/* Interactive Inner Glow */}
        <motion.div 
            className="absolute inset-[3px] rounded-[calc(2.5rem-3px)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
            style={{
                background: useTransform(
                    [glowX, glowY],
                    ([gx, gy]: any) => `radial-gradient(circle at ${gx} ${gy}, rgba(251,191,36,0.3) 0%, transparent 60%)`
                ) as any
            }}
        />

        <div className="relative flex flex-col items-center gap-2 w-full z-10" style={{ transform: "translateZ(50px)" }}>
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="text-[4rem] md:text-[5.5rem] drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]"
           >
             {STAR.emoji}
           </motion.div>
           <div className="font-black text-[28px] md:text-[38px] text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 drop-shadow-md text-center mt-2 leading-tight">
             {STAR.name}
           </div>
           <div className="flex flex-col xl:flex-row items-center justify-center gap-2 xl:gap-3 w-full mt-3">
             {STAR.tags.map((tag, i) => (
               <span 
                 key={tag} 
                 className="text-[10px] md:text-[12px] px-3 py-1.5 rounded-full border tracking-widest uppercase font-extrabold whitespace-nowrap"
                 style={{
                   borderColor: i === 0 ? "rgba(251,191,36, 0.4)" : "rgba(168,85,247, 0.4)",
                   color: i === 0 ? "#fef3c7" : "#f3e8ff",
                   backgroundColor: i === 0 ? "rgba(251,191,36, 0.15)" : "rgba(168,85,247, 0.15)",
                   boxShadow: i === 0 ? "0 0 12px rgba(251,191,36,0.2)" : "0 0 12px rgba(168,85,247,0.2)"
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
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1 + index * 0.05, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.12, y: -12, zIndex: 30 }}
      className="relative flex flex-col items-center justify-center px-2 py-4 md:py-5 w-[110px] sm:w-[130px] md:w-[150px] rounded-[1.25rem] group cursor-default shadow-xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-[1.25rem] bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 rounded-[1.25rem] border border-white/0 group-hover:border-white/40 transition-colors duration-300 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]" />
      
      <span className="text-[36px] sm:text-[42px] md:text-[52px] mb-1.5 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" style={{ transformOrigin: "center bottom" }}>
        {member.emoji}
      </span>
      <span className="text-[14px] md:text-[18px] font-extrabold text-[#fdfcff] group-hover:text-white transition-colors duration-300 text-center leading-tight whitespace-nowrap drop-shadow-md">
        {member.name}
      </span>
    </motion.div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function SlideTeam() {
  const title = "TỔ 3".split("");

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans" style={{ backgroundColor: "#020008" }}>
      <Starfield />
      <AmbientOrbs />
      
      {/* Heavy vignette for cinematic look */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse 120% 120% at 50% 40%, transparent 30%, #000000 100%)" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 max-w-[1600px]">
        {/* Title Group - Kept at the top */}
        <div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex items-center gap-4 mb-2 lg:mt-4"
            >
              <motion.div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-yellow-500" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} style={{ originX: 1 }} />
              <span className="text-[10px] md:text-[12px] font-mono tracking-[0.4em] uppercase px-5 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-200 shadow-[0_0_20px_rgba(234,179,8,0.15)] backdrop-blur-md">
                ✦ Nhóm Thuyết Trình — Hóa Học 10 ✦
              </span>
              <motion.div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-yellow-500" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} style={{ originX: 0 }} />
            </motion.div>

            <div className="flex justify-center items-center text-[clamp(3.5rem,6vw,5.5rem)] font-black tracking-tighter leading-none z-10" aria-label="TỔ 3">
              {title.map((ch, i) => (
                <motion.div key={i} className="relative inline-block">
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
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 1 }}
                    className="absolute left-0 top-0 text-purple-600 blur-[30px] z-0 pointer-events-none"
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                </motion.div>
              ))}
            </div>
        </div>

        {/* 3-Column Layout: Left Members | Center Star | Right Members */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-[40px] lg:gap-[60px] relative z-20">
           
           {/* Left Members Group (2x3 Grid) */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-[16px]">
               {leftMembers.map((m, i) => <MemberCard key={m.name} member={m} index={i} />)}
           </div>

           {/* Star/Lead */}
           <div className="flex-shrink-0 z-30 order-first lg:order-none scale-90 lg:scale-110 xl:scale-125 mb-4 lg:mb-0 lg:-mt-10">
             <StarCard />
           </div>

           {/* Right Members Group (2x3 or 2x4 Grid) */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-[16px]">
               {rightMembers.map((m, i) => <MemberCard key={m.name} member={m} index={i + 6} />)}
           </div>
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-8 lg:mt-12 text-white/30 font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase"
        >
          {MEMBERS.length + 1} Thành Viên · Tổ 3 · Hóa Học 10
        </motion.p>
      </div>
    </div>
  );
}
