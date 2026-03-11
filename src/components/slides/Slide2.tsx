"use client";

import { motion } from "framer-motion";

export default function Slide2() {
  const titleText = "1. Phản ứng cháy".split(" ");

  return (
    <div className="w-full h-full flex items-center justify-center p-12 bg-[#0B0C10] text-gray-200 font-sans overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-700/20 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl w-full h-[80vh] flex flex-col md:flex-row gap-16 items-center">
        
        {/* Left Column: Text Content with Glassmorphism Layering */}
        <div className="flex-1 relative w-full flex flex-col justify-center">
          
          {/* 3D Kinetic Typography */}
          <div className="mb-10 flex flex-wrap gap-4 z-20">
            {titleText.map((word, i) => (
              <div key={i} className="overflow-visible" style={{ perspective: 1000 }}>
                <motion.div
                  className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                  initial={{ rotateX: 90, opacity: 0, y: 50 }}
                  animate={{ rotateX: 0, opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.2 + 0.5, 
                    type: "spring", 
                    stiffness: 100,
                    damping: 10
                  }}
                  style={{ transformOrigin: "bottom" }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Glassmorphism Cards Stacked */}
          <div className="relative w-full max-w-xl">
            {/* Back Card */}
            <motion.div 
              className="absolute top-4 left-4 w-full h-full bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm z-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
            />
            
            {/* Front Card */}
            <motion.div 
              className="relative z-10 bg-white/10 border border-white/20 p-8 md:p-10 rounded-3xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl tracking-widest text-orange-400 font-bold uppercase mb-4 opacity-80">Khái niệm</h3>
                  <p className="text-2xl text-gray-100 leading-relaxed font-light">
                    Là những phản ứng oxi hóa - khử mà chất oxi hóa thường là oxygen trong không khí, tỏa ra nhiều nhiệt và phát ra ánh sáng.
                  </p>
                </div>
                
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div>
                  <h3 className="text-xl tracking-widest text-yellow-400 font-bold uppercase mb-4 opacity-80">Ứng dụng</h3>
                  <ul className="text-xl text-gray-200 leading-relaxed list-none space-y-3 font-light tracking-wide">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]" />
                      Đốt củi lấy nhiệt/ánh sáng (xa xưa).
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)]" />
                      Đốt xăng dầu trong động cơ ô tô (ngày nay).
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Fluid Shape Fire Image */}
        <div className="flex-1 h-[600px] flex items-center justify-center relative z-10 w-full">
          <motion.div
            className="w-[90%] h-[90%] relative overflow-hidden shadow-[0_0_50px_rgba(234,88,12,0.4)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              borderRadius: [
                "40% 60% 70% 30% / 40% 50% 60% 50%",
                "50% 50% 30% 70% / 50% 60% 40% 40%",
                "40% 60% 70% 30% / 40% 50% 60% 50%"
              ],
              y: [0, -15, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.5 },
              scale: { duration: 1, delay: 0.5, type: "spring" },
              borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ 
              border: "1px solid rgba(255,165,0,0.3)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))"
            }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-90 mix-blend-screen scale-110"
              style={{ backgroundImage: "url('/img/chay/IMG_20260311_082647.jpg')" }}
            />
            {/* Interior glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(234,88,12,0.8)] pointer-events-none rounded-inherit" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
