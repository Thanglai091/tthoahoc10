"use client";

import { useCallback, useRef, useEffect } from "react";
import { useAudioState } from "./AudioProvider";

export type SoundType = "click" | "correct" | "wrong" | "success" | "slide" | "start" | "explosion" | "hover" | "scan";

export function useSoundEffect() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const { sfxVolume: rawSfxVolume } = useAudioState();
  const sfxVolume = rawSfxVolume / 5; // Level 5 is 1x. Level 15 is 3x (Loud)

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
          gainNode.gain.setValueAtTime(0.2 * sfxVolume, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;

        case "slide":
          osc.type = "sine";
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
          gainNode.gain.setValueAtTime(0.05 * sfxVolume, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;

        case "correct":
          // Cmaj chord arpeggio effect
          ["sine", "triangle"].forEach((type, index) => {
            const multiOsc = ctx.createOscillator();
            multiOsc.type = type as OscillatorType;
            // 600 -> 800 -> 1200
            multiOsc.frequency.setValueAtTime(600 + (index * 100), now);
            multiOsc.frequency.setValueAtTime(800 + (index * 100), now + 0.1);
            multiOsc.frequency.setValueAtTime(1200 + (index * 100), now + 0.2);
            multiOsc.connect(gainNode);
            multiOsc.start(now);
            multiOsc.stop(now + 0.3);
          });
          gainNode.gain.setValueAtTime(0.2 * sfxVolume, now);
          gainNode.gain.setValueAtTime(0, now + 0.09);
          gainNode.gain.setValueAtTime(0.2 * sfxVolume, now + 0.1);
          gainNode.gain.setValueAtTime(0, now + 0.19);
          gainNode.gain.setValueAtTime(0.3 * sfxVolume, now + 0.2);
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 0.4);
          break;

        case "wrong":
          // Distorted low buzz
          ["sawtooth", "square"].forEach((type, index) => {
            const multiOsc = ctx.createOscillator();
            multiOsc.type = type as OscillatorType;
            multiOsc.frequency.setValueAtTime(150 - (index * 20), now);
            multiOsc.frequency.exponentialRampToValueAtTime(60 - (index * 20), now + 0.4);
            multiOsc.connect(gainNode);
            multiOsc.start(now);
            multiOsc.stop(now + 0.4);
          });
          gainNode.gain.setValueAtTime(0.2 * sfxVolume, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 0.4);
          break;

        case "success":
          // Success audio is now handled via an HTML Audio Element directly in GameResult.tsx
          break;
          
        case "start":
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.linearRampToValueAtTime(880, now + 0.3);
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.15 * sfxVolume, now + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
          break;

        case "explosion":
          const bufferSize = ctx.sampleRate * 2.0; // 2 seconds for a deeper tail
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            // White noise
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1000, now);
          filter.frequency.exponentialRampToValueAtTime(50, now + 2.0); // Sweep down lower

          noise.connect(filter);
          filter.connect(gainNode);

          gainNode.gain.setValueAtTime(1 * sfxVolume, now); // LOUDER explosion
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 2.0);

          noise.start(now);
          break;

        case "hover":
          osc.type = "sine"; 
          osc.frequency.setValueAtTime(150, now); 
          osc.frequency.exponentialRampToValueAtTime(50, now + 0.05); 
          gainNode.gain.setValueAtTime(0.1 * sfxVolume, now); // Increased hover volume a bit
          gainNode.gain.exponentialRampToValueAtTime(0.001 * sfxVolume, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
          break;

        case "scan":
          // Quick tech blips
          osc.type = "square";
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.setValueAtTime(1200, now + 0.05);
          osc.frequency.setValueAtTime(900, now + 0.1);
          osc.frequency.setValueAtTime(1500, now + 0.15);
          osc.frequency.setValueAtTime(1300, now + 0.2);
          
          gainNode.gain.setValueAtTime(0.15 * sfxVolume, now);
          gainNode.gain.setValueAtTime(0, now + 0.04);
          gainNode.gain.setValueAtTime(0.15 * sfxVolume, now + 0.05);
          gainNode.gain.setValueAtTime(0, now + 0.09);
          gainNode.gain.setValueAtTime(0.15 * sfxVolume, now + 0.1);
          gainNode.gain.setValueAtTime(0, now + 0.14);
          gainNode.gain.setValueAtTime(0.15 * sfxVolume, now + 0.15);
          gainNode.gain.setValueAtTime(0, now + 0.19);
          gainNode.gain.setValueAtTime(0.2 * sfxVolume, now + 0.2);
          gainNode.gain.exponentialRampToValueAtTime(0.01 * sfxVolume, now + 0.4);
          
          osc.start(now);
          osc.stop(now + 0.4);
          break;
      }
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }, []);

  return { play };
}
