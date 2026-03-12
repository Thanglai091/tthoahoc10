"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Context definition
interface AudioContextType {
  sfxVolume: number;
  bgmVolume: number;
  setSfxVolume: (vol: number) => void;
  setBgmVolume: (vol: number) => void;
  isGameActive: boolean;
  setIsGameActive: (active: boolean) => void;
}

const AudioStateContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [sfxVolume, setSfxVolume] = useState(8);
  const [bgmVolume, setBgmVolume] = useState(5);
  const [isGameActive, setIsGameActive] = useState(false);

  return (
    <AudioStateContext.Provider value={{
      sfxVolume,
      bgmVolume,
      setSfxVolume,
      setBgmVolume,
      isGameActive,
      setIsGameActive
    }}>
      {children}
    </AudioStateContext.Provider>
  );
}

export function useAudioState() {
  const context = useContext(AudioStateContext);
  if (!context) {
    throw new Error('useAudioState must be used within an AudioProvider');
  }
  return context;
}
