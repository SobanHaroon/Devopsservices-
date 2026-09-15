import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Radio, Sparkles } from "lucide-react";

export function AmbientSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscRef1 = useRef<OscillatorNode | null>(null);
  const oscRef2 = useRef<OscillatorNode | null>(null);
  const oscRef3 = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startSoundscape = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master low-pass filter for soft warm cinematic tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(380, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      // Master Gain with gentle fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3.0);
      masterGain.connect(filter);
      filter.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Root Drone Oscillator (110Hz - A2 Warm Root)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(110, ctx.currentTime);
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.6, ctx.currentTime);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start();
      oscRef1.current = osc1;

      // Harmonic Fifth (165Hz - E3 Subtle Harmonic)
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(165, ctx.currentTime);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start();
      oscRef2.current = osc2;

      // Octave Harmonic (220Hz - A3 Ethereal Shimmer)
      const osc3 = ctx.createOscillator();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(220, ctx.currentTime);
      const gain3 = ctx.createGain();
      gain3.gain.setValueAtTime(0.12, ctx.currentTime);
      osc3.connect(gain3);
      gain3.connect(masterGain);
      osc3.start();
      oscRef3.current = osc3;

      // LFO for organic breathing volume swell
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // ~6.6 second meditative loop
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);
      lfo.start();
      lfoRef.current = lfo;

      setIsPlaying(true);
    } catch (err) {
      console.error("Audio engine initialization failed:", err);
      setIsPlaying(false);
    }
  }, []);

  const stopSoundscape = useCallback(() => {
    try {
      const ctx = audioContextRef.current;
      const masterGain = masterGainRef.current;
      if (ctx && masterGain) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        
        setTimeout(() => {
          oscRef1.current?.stop();
          oscRef2.current?.stop();
          oscRef3.current?.stop();
          lfoRef.current?.stop();
          oscRef1.current = null;
          oscRef2.current = null;
          oscRef3.current = null;
          lfoRef.current = null;
          setIsPlaying(false);
        }, 1300);
      } else {
        setIsPlaying(false);
      }
    } catch (err) {
      setIsPlaying(false);
    }
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    return () => {
      try {
        oscRef1.current?.stop();
        oscRef2.current?.stop();
        oscRef3.current?.stop();
        lfoRef.current?.stop();
        audioContextRef.current?.close();
      } catch (e) {
        // cleanup silent catch
      }
    };
  }, []);

  return (
    <div 
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={toggleAudio}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border text-xs font-mono tracking-wider transition-all duration-500 cursor-pointer shadow-xl ${
          isPlaying
            ? "bg-zinc-900/90 border-blue-500/60 text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.25)]"
            : "bg-zinc-950/80 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
        } backdrop-blur-md`}
        title={isPlaying ? "Mute Cinematic Ambient Soundscape" : "Activate Cinematic Ambient Soundscape"}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          )}

          {/* Subtle Outer Ping when playing */}
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
          )}
        </div>

        <span className="font-semibold uppercase text-[10px]">
          {isPlaying ? "AUDIO: ON" : "AUDIO: OFF"}
        </span>

        {/* Animated Equalizer Bars */}
        <div className="flex items-end gap-0.5 h-3.5 px-1">
          <motion.span
            animate={{ height: isPlaying ? ["25%", "90%", "40%"] : "20%" }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className={`w-0.5 rounded-full ${isPlaying ? "bg-blue-400" : "bg-zinc-700"}`}
          />
          <motion.span
            animate={{ height: isPlaying ? ["80%", "30%", "100%"] : "20%" }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className={`w-0.5 rounded-full ${isPlaying ? "bg-blue-500" : "bg-zinc-700"}`}
          />
          <motion.span
            animate={{ height: isPlaying ? ["40%", "95%", "35%"] : "20%" }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className={`w-0.5 rounded-full ${isPlaying ? "bg-cyan-400" : "bg-zinc-700"}`}
          />
        </div>
      </motion.button>

      {/* Expanded Luxury Description Badge on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-[9px] font-mono text-zinc-300 backdrop-blur-md shadow-lg whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>432Hz CINEMATIC AMBIENT SOUNDSCAPE</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
