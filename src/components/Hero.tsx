import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useSmoothScroll } from "./SmoothScroll";
import { useLanguage } from "../context/LanguageContext";
import { RetroGrid } from "./ui/RetroGrid";
import { BorderBeam } from "./ui/BorderBeam";
import { TypingAnimation } from "./ui/TypingAnimation";
import { FluidBlobs } from "./ui/FluidBlobs";
import { AnimatedCounter } from "./ui/AnimatedCounter";

export default function Hero() {
  const lenis = useSmoothScroll();
  const { language, dictionary } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const { scrollY } = useScroll();

  // Parallax elements tied directly to scroll depth
  const yText = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleDevice = useTransform(scrollY, [0, 1000], [1, 1.12]);
  const yDevice = useTransform(scrollY, [0, 1000], [0, -80]);

  const headingWords = dictionary.hero.words;

  // Custom 3D Tilt calculation for the premium mockup card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates around center (0,0) from -1 to 1
    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;

    // Constrain tilt angle (max 8 degrees)
    const rotateX = -yNorm * 8;
    const rotateY = xNorm * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
    });
  };

  const triggerScrollToContact = () => {
    if (lenis) {
      lenis.scrollTo("#contact", { offset: -80, duration: 1.5 });
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerScrollToServices = () => {
    if (lenis) {
      lenis.scrollTo("#services", { offset: -80, duration: 1.2 });
    } else {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-24 md:pt-40 md:pb-36 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Fluid Blobs Atmosphere */}
      <FluidBlobs
        lightColors={["#1d4ed8", "#2563eb", "#0284c7", "#7c3aed"]}
        origins={[
          { x: 20, y: 30 },
          { x: 80, y: 25 },
          { x: 50, y: 65 },
          { x: 30, y: 80 },
        ]}
        blur={60}
        className="opacity-40 z-0 pointer-events-none"
      />

      {/* 3D Retro Grid Background Accent */}
      <RetroGrid className="z-0 opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10">
        
        {/* Top Premium Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-400" />
          <span className="text-blue-400 font-mono">{dictionary.hero.badgeAgency}</span>
        </motion.div>

        {/* Cinematic Oversized Heading with Reveal Clipping Mask */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center justify-center max-w-5xl"
        >
          <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white leading-[0.9] flex flex-wrap justify-center gap-x-6 gap-y-2">
            {headingWords.map((word, wordIdx) => {
              // Clean word formatting
              const cleanWord = word.replace("_", "");
              return (
                <span key={wordIdx} className="inline-block relative overflow-hidden h-[1.1em] clip-text">
                  <motion.span
                    initial={{ y: "115%", rotate: 4, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{
                      duration: 1.4,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.3 + wordIdx * 0.12,
                    }}
                    className={`inline-block origin-left ${
                      wordIdx === headingWords.length - 1
                        ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    {cleanWord}
                  </motion.span>
                </span>
              );
            })}
          </h1>
        </motion.div>

        {/* Staggered Subheading Line-by-Line Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="mt-8 max-w-2xl text-zinc-400 text-base md:text-xl font-normal leading-relaxed text-center"
        >
          {dictionary.hero.subheading}
        </motion.p>

        {/* Micro-interactive CTA Buttons with Magnetic/Hover Effects */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
          className="mt-10 flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
        >
          <button
            onClick={triggerScrollToContact}
            data-hover-expand
            data-hover-text="Let's build"
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 font-semibold rounded-full flex items-center justify-center gap-2.5 hover:shadow-2xl hover:shadow-blue-500/20 group cursor-pointer hover:bg-zinc-100 transition-all duration-300"
          >
            {dictionary.hero.ctaInitiate}
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </button>

          <button
            onClick={triggerScrollToServices}
            data-hover-expand
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 hover:text-white font-medium rounded-full border border-white/5 hover:border-zinc-700/50 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
          >
            {dictionary.hero.ctaExplore}
            <Zap className="w-4 h-4 text-zinc-500 group-hover:text-blue-400" />
          </button>
        </motion.div>

        {/* Mockup Dashboard Canvas with Parallax Scroll & 3D Interactive Mouse Tilt */}
        <motion.div
          style={{ y: yDevice, scale: scaleDevice }}
          className="w-full max-w-5xl mt-20 md:mt-28 relative"
        >
          {/* Subtle Outer Glow behind device */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-3xl -z-10" />

          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="w-full rounded-2xl border border-white/10 bg-zinc-950/40 p-3 md:p-4 backdrop-blur-md shadow-2xl transition-all duration-300 overflow-hidden relative"
          >
            {/* Animated Border Beam Effect */}
            <BorderBeam duration={10} size={220} borderWidth={1.5} colorFrom="#3b82f6" colorTo="#06b6d4" />
            {/* Window Top Controls Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 md:mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/35" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/35" />
                <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/35" />
              </div>
              <div className="px-5 py-0.5 rounded-md bg-zinc-900/50 border border-white/5 text-[10px] font-mono text-zinc-500 tracking-wider">
                devops-services.ltd/intelligence
              </div>
              <div className="w-16 h-1 bg-transparent" />
            </div>

            {/* Simulated UI Screen Grid */}
            <div className="grid grid-cols-12 gap-3.5 md:gap-5 text-left p-2">
              {/* Left Column Area */}
              <div className="col-span-12 lg:col-span-8 space-y-4 md:space-y-6">
                <div className="p-5 md:p-6 rounded-xl bg-zinc-900/40 border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">{dictionary.hero.activeOperations}</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      {dictionary.hero.liveTelemetry}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-display font-medium text-white mb-2">{dictionary.hero.mockupTitle}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {dictionary.hero.mockupDesc}
                  </p>
                  
                  {/* Live Terminal Log Line */}
                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 text-xs text-blue-300 font-mono flex items-center gap-2">
                    <span className="text-green-400 font-bold">$</span>
                    <TypingAnimation text="deploy --cluster=prod-asia-east-1 --optimize-bundle --cache-edge" duration={45} delay={1200} className="text-[11px] text-zinc-300" />
                  </div>
                </div>

                {/* Sub UI Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-zinc-900/20 border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase mb-2">
                      {language === "JP" ? "システム遅延" : language === "FR" ? "LATENCE SYSTÈME" : language === "DE" ? "SYSTEMLATENZ" : "SYSTEM LATENCY"}
                    </div>
                    <div className="text-3xl font-display font-bold text-white tracking-tight flex items-baseline">
                      <AnimatedCounter value={14} suffix="ms" duration={1.8} suffixClassName="text-blue-500 text-sm font-normal ml-1" />
                    </div>
                    <div className="text-[9px] text-green-400 font-mono mt-1">{dictionary.hero.systemLatencySub}</div>
                  </div>
                  <div className="p-5 rounded-xl bg-zinc-900/20 border border-white/5">
                    <div className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase mb-2">
                      {language === "JP" ? "コンバージョン向上" : language === "FR" ? "HAUSSE DE CONVERSION" : language === "DE" ? "CONVERSION-ANSTIEG" : "CONVERSION RATE LIFT"}
                    </div>
                    <div className="text-3xl font-display font-bold text-white tracking-tight flex items-baseline">
                      <AnimatedCounter value={8.4} prefix="+" suffix="%" decimals={1} duration={2.0} prefixClassName="text-white" suffixClassName="text-blue-500 text-sm font-normal ml-1" />
                    </div>
                    <div className="text-[9px] text-green-400 font-mono mt-1">{dictionary.hero.conversionRateSub}</div>
                  </div>
                </div>
              </div>

              {/* Right Column Area */}
              <div className="col-span-12 lg:col-span-4 space-y-4 md:space-y-6">
                <div className="p-5 md:p-6 rounded-xl bg-zinc-900/40 border border-white/5 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block mb-3">{dictionary.hero.capabilityParadigm}</span>
                    <ul className="space-y-2.5">
                      {dictionary.hero.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 font-bold" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-4">
                    <div className="text-xs text-zinc-400 italic font-display">
                      "{dictionary.hero.verdict}"
                    </div>
                    <div className="text-[9px] font-mono text-blue-400 tracking-widest uppercase mt-2">
                      {dictionary.hero.verdictSource}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
