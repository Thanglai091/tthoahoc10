"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSoundEffect } from "../useSoundEffect";

const WarningCard = ({ text, idx, play }: { text: string; idx: number; play: (type: any) => void }) => {
  const [randomRotate, setRandomRotate] = useState(0);
  
  useEffect(() => {
    setRandomRotate(Math.random() * 20 - 10);
  }, []);

  return (
    <motion.div
      className="relative bg-white text-black p-8 rounded-[40px] rounded-br-sm shadow-2xl w-64 text-center border-4 border-black origin-bottom transform-gpu"
      initial={{ y: "100vh", opacity: 0, rotate: randomRotate }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 + idx * 0.2, type: "spring", damping: 12 }}
      whileHover={{ 
        scale: 1.1, 
        backgroundColor: "#ef4444", 
        color: "#fff", 
      }}
      onHoverStart={(e) => {
        play("hover");
      }}
    >
      <p className="text-xl font-bold leading-relaxed">{text}</p>
      {/* Balloon string */}
      <svg className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-4 h-20 overflow-visible">
        <path d="M 2 0 Q -5 10, 2 20 T 2 40 T 2 60 T 2 80" fill="none" stroke="black" strokeWidth="2" />
      </svg>
    </motion.div>
  );
};

export default function Slide16() {
  const { play } = useSoundEffect();
  const balloons = Array.from({ length: 6 });

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-yellow-400 overflow-hidden font-sans">
      
      {/* Warning Stripes Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(45deg, #000, #000 40px, transparent 40px, transparent 80px)"
        }}
      />
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-multiply"
        style={{ backgroundImage: "url('/img/no_hoa_hoc/IMG_20260311_082437.jpg')" }}
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        
        <motion.div 
          className="flex items-center gap-6 mb-12 bg-black px-12 py-6 rounded-2xl shadow-[0_20px_0_rgba(0,0,0,0.3)] border-4 border-yellow-500"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], color: ["#eab308", "#ef4444", "#eab308"] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <AlertTriangle className="w-16 h-16" />
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-yellow-500 uppercase tracking-tighter">
            CẢNH BÁO NGUY HIỂM
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1], color: ["#eab308", "#ef4444", "#eab308"] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <AlertTriangle className="w-16 h-16" />
          </motion.div>
        </motion.div>

        {/* Floating Balloons replacing text */}
        <div className="flex gap-8 justify-center w-full mt-10">
          {[
            "Khí Hydrogen (H₂) siêu nhẹ được dùng bơm bóng bay.",
            "Cực kỳ nguy hiểm nếu tiếp xúc nguồn nhiệt (tàn thuốc, bật lửa...).",
            "Gây ra vụ nổ hóa học lớn, tỏa nhiệt mạnh làm bỏng nặng diện rộng.",
            "KHUYẾN CÁO: Thay thế hoàn toàn bằng khí hiếm Helium (He) an toàn."
          ].map((text, idx) => (
            <WarningCard key={idx} text={text} idx={idx} play={play} />
          ))}
        </div>

      </div>
    </div>
  );
}
