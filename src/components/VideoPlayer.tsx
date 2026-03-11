"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  thumbnailUrl?: string;
  title?: string;
}

export function VideoPlayer({ videoId, thumbnailUrl, title = "Video" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!isPlaying ? (
        <div 
          className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          {thumbnailUrl && (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
            />
          )}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="z-10 bg-red-600 rounded-full p-4 shadow-[0_0_20px_rgba(220,38,38,0.8)] flex items-center justify-center"
          >
            <Play className="w-12 h-12 text-white fill-white ml-2" />
          </motion.div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
