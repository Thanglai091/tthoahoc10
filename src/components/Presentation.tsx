"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Volume2, VolumeX, Volume1 } from "lucide-react";
import { useSoundEffect } from "./useSoundEffect";
import { useAudioState } from "./AudioProvider";

// Thay the import that we will build later
// import Slide1 from "./slides/Slide1";
// import Slide2 from "./slides/Slide2";
// ...

const TOTAL_SLIDES = 20;

export function Presentation({ children, slides }: { children?: React.ReactNode, slides: React.FC[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { play } = useSoundEffect();
  const { sfxVolume, setSfxVolume } = useAudioState();

  const handleVolumeToggle = () => {
    if (sfxVolume >= 10) setSfxVolume(5);
    else if (sfxVolume >= 5) setSfxVolume(0);
    else setSfxVolume(15);
    play("click"); // Audible feedback
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const nextIdx = Math.min(prev + 1, TOTAL_SLIDES - 1);
      if (nextIdx !== prev) play("slide");
      return nextIdx;
    });
  }, [play]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const prevIdx = Math.max(prev - 1, 0);
      if (prevIdx !== prev) play("slide");
      return prevIdx;
    });
  }, [play]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="relative w-[100vw] h-[100vh] overflow-hidden bg-background text-foreground transition-colors duration-300">
      
      {/* Slide Content */}
      <div className="w-full h-full flex items-center justify-center">
        {CurrentSlideComponent ? <CurrentSlideComponent /> : children}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center gap-6 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md border border-white/10 hover:bg-black/40 dark:hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <span className="font-mono text-sm tracking-wider opacity-60">
          {currentSlide + 1} / {TOTAL_SLIDES}
        </span>

        <button
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          className="p-3 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md border border-white/10 hover:bg-black/40 dark:hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Global Slide SFX Volume Toggle with Slider */}
        <div className="absolute right-6 flex items-center bg-black/20 dark:bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-2 h-12 transition-all hover:bg-black/40 dark:hover:bg-white/20 group cursor-pointer">
          <button
            onClick={handleVolumeToggle}
            className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-white transition-all outline-none flex-shrink-0"
            aria-label="Toggle Volume"
            title="Điều chỉnh SFX Slider"
          >
            {sfxVolume >= 10 ? <Volume2 className="w-5 h-5 text-green-400" /> : 
             sfxVolume > 0 ? <Volume1 className="w-5 h-5 text-yellow-400" /> : 
             <VolumeX className="w-5 h-5 text-red-500 opacity-50" />}
          </button>
          
          <div className="w-0 overflow-hidden group-hover:w-28 transition-[width] duration-300 ease-in-out flex items-center">
            <input 
              type="range" 
              min="0" 
              max="15" 
              step="1"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(parseInt(e.target.value))}
              onMouseUp={() => play("click")}
              className="w-24 ml-2 max-w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 w-full bg-black/10 dark:bg-white/10 z-50">
        <div 
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
        />
      </div>
    </div>
  );
}
