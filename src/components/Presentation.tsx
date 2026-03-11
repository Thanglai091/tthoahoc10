"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Thay the import that we will build later
// import Slide1 from "./slides/Slide1";
// import Slide2 from "./slides/Slide2";
// ...

const TOTAL_SLIDES = 20;

export function Presentation({ children, slides }: { children?: React.ReactNode, slides: React.FC[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

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
