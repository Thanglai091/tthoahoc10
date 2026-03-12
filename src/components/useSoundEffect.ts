"use client";

import { useCallback, useRef, useEffect } from "react";

export type SoundType = "click" | "correct" | "wrong" | "success" | "slide" | "start" | "explosion" | "hover";

export function useSoundEffect() {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const play = useCallback((type: SoundType) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      switch (type) {
        case "click":
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
          gainNode.gain.setValueAtTime(0.2, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;

        case "slide":
          osc.type = "sine";
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
          gainNode.gain.setValueAtTime(0.05, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;

        case "correct":
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.setValueAtTime(800, now + 0.1);
          gainNode.gain.setValueAtTime(0.15, now);
          gainNode.gain.setValueAtTime(0, now + 0.09);
          gainNode.gain.setValueAtTime(0.15, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;

        case "wrong":
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(150, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.25);
          gainNode.gain.setValueAtTime(0.1, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;

        case "success":
          osc.type = "sine";
          const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
          freqs.forEach((freq, i) => {
            const time = now + i * 0.1;
            osc.frequency.setValueAtTime(freq, time);
            gainNode.gain.setValueAtTime(i === 0 ? 0 : 0.1, time - 0.01); // avoid click
            gainNode.gain.linearRampToValueAtTime(0.15, time + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
          });
          osc.start(now);
          osc.stop(now + freqs.length * 0.1);
          break;
          
        case "start":
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.linearRampToValueAtTime(880, now + 0.3);
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;

        case "explosion":
          const bufferSize = ctx.sampleRate * 1.5; // 1.5 seconds
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1000, now);
          filter.frequency.exponentialRampToValueAtTime(100, now + 1.5);

          noise.connect(filter);
          filter.connect(gainNode);

          gainNode.gain.setValueAtTime(0.5, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

          noise.start(now);
          break;

        case "hover":
          // Deep, short, typewriter/thump sound
          osc.type = "sine"; // smooth, deep sound
          osc.frequency.setValueAtTime(150, now); // Low frequency
          osc.frequency.exponentialRampToValueAtTime(50, now + 0.05); // Rapid drop
          gainNode.gain.setValueAtTime(0.05, now); // Low volume
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;
      }
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }, []);

  return { play };
}
