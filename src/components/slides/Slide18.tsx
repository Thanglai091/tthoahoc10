"use client";

import { motion } from "framer-motion";

export default function Slide18() {
  const conditions = [
    { title: "Bụi Mịn", size: "scale-90" },
    { title: "Lơ Lửng Nồng Độ Cao", size: "scale-100" },
    { title: "Có Oxygen", size: "scale-95" },
    { title: "Nguồn Nhiệt", size: "scale-105" },
    { title: "Không Gian Kín", size: "scale-100" },
  ];

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center p-12 bg-[#020617] font-sans overflow-hidden perspective-[1500px]">
      
      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)", backgroundSize: "60px 60px", transform: "rotateX(60deg) translateY(-200px) translateZ(-200px)" }}
      />
      
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.1)_0%,transparent_60%)] pointer-events-none" />

      <motion.h2 
        className="relative z-10 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-20 drop-shadow-[0_10px_20px_rgba(239,68,68,0.4)] tracking-wider"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        5 Yếu Tố Cốt Lõi Của Nổ Bụi
      </motion.h2>

      <div className="relative z-10 w-full max-w-7xl flex justify-center items-center h-[400px] gap-6 flex-wrap md:flex-nowrap">
        {conditions.map((item, idx) => (
            <motion.div
              key={idx}
              className={`relative flex-1 min-w-[180px] h-[350px] flex flex-col items-center justify-center p-6 text-center text-white font-bold group ${item.size}`}
              initial={{ rotateY: -90, z: -200, opacity: 0 }}
              animate={{ rotateY: 0, z: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: idx * 0.2, // Sequential deal
                type: "spring", stiffness: 60
              }}
              whileHover={{ scale: 1.1, translateY: -20, rotateY: 10, transition: { duration: 0.3 } }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Holographic Background */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-2xl border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.15)] overflow-hidden">
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                
                {/* Sweep Shine Effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-[1.5s]" />
              </div>

              {/* Holographic Glowing Lines inside */}
              <div className="absolute inset-2 border border-orange-500/20 rounded-xl group-hover:border-orange-400 transition-colors pointer-events-none" style={{ transform: "translateZ(30px)" }} />

              <span className="text-5xl mb-6 text-orange-600/50 group-hover:text-orange-400 font-black" style={{ transform: "translateZ(50px)" }}>0{idx + 1}</span>
              <span className="text-2xl leading-snug group-hover:text-white text-zinc-300" style={{ transform: "translateZ(60px)" }}>{item.title}</span>
            </motion.div>
          )
        )}
      </div>

      <motion.div
        className="relative z-10 mt-20 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="bg-red-950/50 backdrop-blur-md border border-red-500/50 px-8 py-4 rounded-full shadow-[0_0_40px_rgba(239,68,68,0.4)]">
           <p className="text-2xl text-red-100 font-light tracking-widest uppercase">
             Thiếu <strong className="text-white font-bold mx-2">1</strong> trong 5 yếu tố, <strong className="text-red-500 font-black">NỔ BỤI</strong> sẽ KHÔNG xảy ra!
           </p>
        </div>
      </motion.div>
    </div>
  );
}
