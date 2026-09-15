import React, { useState } from "react";
import { motion } from "motion/react";
import { ValueCard } from "../types";
import { Shield, Zap, Target, Sparkles, ArrowRight, Gauge } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { NumberTicker } from "./ui/NumberTicker";
import { AnimateDigits } from "./ui/AnimateDigits";
import { AnimatedCircularProgressBar } from "./ui/AnimatedCircularProgressBar";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { TechRadar } from "./ui/TechRadar";

// Helper to resolve icon dynamically by card id
const IconMapById: Record<string, React.ComponentType<any>> = {
  excellence: Zap,
  results: Target,
  trust: Shield,
  agility: Sparkles,
};

const LocalAboutTranslations: Record<string, {
  manifesto: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  partnerTag: string;
  pillarsTitle: string;
}> = {
  EN: {
    manifesto: "GENESIS & CORE VALUES",
    missionTitle: "OUR MISSION",
    missionText: "To engineer digital platforms that combine flawless technical performance with gorgeous, pixel-perfect front-end design.",
    visionTitle: "OUR VISION",
    visionText: "To redefine the standards of modern web architecture, proving that ultimate speed and exquisite aesthetics can coexist seamlessly.",
    partnerTag: "CORE PILLARS",
    pillarsTitle: "Why Choose DevOps Services",
  },
  FR: {
    manifesto: "GENÈSE & VALEURS",
    missionTitle: "NOTRE MISSION",
    missionText: "Concevoir des plateformes numériques qui allient des performances techniques irréprochables à un design d'interface somptueux et précis.",
    visionTitle: "NOTRE VISION",
    visionText: "Redéfinir les standards de l'architecture web moderne, en prouvant qu'une vitesse ultime et une esthétique exquise peuvent coexister harmonieusement.",
    partnerTag: "PILIERS CENTRAUX",
    pillarsTitle: "Pourquoi Choisir DevOps Services",
  },
  DE: {
    manifesto: "ENTSTEHUNG & WERTE",
    missionTitle: "UNSERE MISSION",
    missionText: "Digitale Plattformen zu entwickeln, die makellose technische Leistung mit wunderschönem, pixelgenauem Front-End-Design verbinden.",
    visionTitle: "UNSERE VISION",
    visionText: "Die Standards der modernen Webarchitektur neu zu definieren und zu beweisen, dass ultimative Geschwindigkeit und exquisite Ästhetik nahtlos koexistieren können.",
    partnerTag: "KERNSÄULEN",
    pillarsTitle: "Warum DevOps Services wählen",
  },
  JP: {
    manifesto: "創立 & コアバリュー",
    missionTitle: "私たちの使命",
    missionText: "完璧な技術的パフォーマンスと、息を呑むほど美しくピクセルパーフェクトなフロントエンドデザインを融合したデジタルプラットフォームを構築すること。",
    visionTitle: "私たちのビジョン",
    visionText: "究極の表示速度と洗練された美しさがシームレスに共存できることを証明し、現代のウェブアーキテクチャの基準を再定義すること。",
    partnerTag: "コアピラー（中核）",
    pillarsTitle: "DevOps Services が選ばれる理由",
  }
};

export default function About() {
  const { language, dictionary } = useLanguage();
  const localT = LocalAboutTranslations[language] || LocalAboutTranslations.EN;

  let titleLine1 = "";
  let titleLine2 = "";
  if (language === "JP") {
    titleLine1 = "より優れた";
    titleLine2 = "構築を。";
  } else {
    const heading = dictionary.about.heading || "We Build Better.";
    const parts = heading.split(" ");
    titleLine1 = parts.slice(0, parts.length - 1).join(" ");
    titleLine2 = parts[parts.length - 1] || "";
  }

  const manifestoText = dictionary.about.subheading;
  const cards = dictionary.about.values || [];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="about" className="relative py-24 md:py-36 overflow-hidden">
      
      {/* Background radial accent flare */}
      <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24">
          <div className="col-span-12 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-4"
            >
              <span>{localT.manifesto}</span>
              <span className="w-8 h-[1px] bg-blue-500/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
            >
              {titleLine1} <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                {titleLine2}
              </span>
            </motion.h2>
          </div>

          <div className="col-span-12 lg:col-span-6 flex flex-col justify-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-zinc-400 text-base md:text-lg leading-relaxed font-normal text-left"
            >
              {manifestoText}
            </motion.p>
          </div>
        </div>

        {/* Mission, Vision, Values Text Split Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 border-t border-white/5 pt-12 mb-16 md:mb-20 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-3">{localT.missionTitle}</h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              {localT.missionText}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-3">{localT.visionTitle}</h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              {localT.visionText}
            </p>
          </motion.div>
        </div>

        {/* Realtime Live Performance Metrics Grid */}
        <div className="p-8 md:p-10 rounded-2xl bg-zinc-950/60 border border-white/10 mb-20 md:mb-28 text-left backdrop-blur-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-blue-400" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">SYSTEM PERFORMANCE TELEMETRY</span>
            </div>
            <span className="text-[10px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
              LIVE AUDIT METRICS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">UPTIME GUARANTEE</span>
              <div className="text-4xl font-display font-bold text-white flex items-baseline gap-0.5">
                <AnimatedCounter
                  value={99.99}
                  decimals={2}
                  suffix="%"
                  duration={2.2}
                  suffixClassName="text-blue-400 font-normal"
                />
              </div>
              <span className="text-[10px] text-zinc-400">High availability SLA</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">DEPLOYED PROJECT NODES</span>
              <div className="text-4xl font-display font-bold text-white flex items-baseline">
                <AnimatedCounter
                  value={180}
                  suffix="+"
                  duration={2.0}
                  suffixClassName="text-blue-400"
                />
              </div>
              <span className="text-[10px] text-zinc-400">Enterprise applications</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">AVG RESPONSE LATENCY</span>
              <div className="text-4xl font-display font-bold text-white flex items-baseline gap-1">
                <AnimatedCounter
                  value={42}
                  suffix="ms"
                  duration={1.8}
                  suffixClassName="text-blue-400 text-lg font-mono font-normal ml-0.5"
                />
              </div>
              <span className="text-[10px] text-zinc-400">Global edge CDN response</span>
            </div>

            <div className="flex items-center gap-4">
              <AnimatedCircularProgressBar value={98} max={100} gaugePrimaryColor="#3b82f6" />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-white flex items-center gap-1">
                  LIGHTHOUSE <AnimatedCounter value={98} suffix="/100" duration={1.8} suffixClassName="text-zinc-400 font-normal" />
                </span>
                <span className="text-[10px] text-zinc-400">SEO & Speed Index Score</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us: Premium Animated Cards Showcase */}
        <div>
          <div className="mb-10 text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block mb-2"
            >
              {localT.partnerTag}
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-semibold text-2xl text-white tracking-tight"
            >
              {localT.pillarsTitle}
            </motion.h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left"
          >
            {cards.map((card) => {
              const CustomIcon = IconMapById[card.id] || Zap;
              return (
                <AboutCard key={card.id} card={card} CustomIcon={CustomIcon} variants={cardVariants} />
              );
            })}
          </motion.div>
        </div>

        {/* Interactive Technology Radar Component */}
        <TechRadar />

      </div>
    </section>
  );
}

interface AboutCardProps {
  card: ValueCard;
  CustomIcon: React.ComponentType<any>;
  variants: any;
  key?: React.Key;
}

function AboutCard({ card, CustomIcon, variants }: AboutCardProps) {
  const [hovered, setHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xNorm = (x / rect.width) * 2 - 1;
    const yNorm = (y / rect.height) * 2 - 1;

    // Subtle 3D tilt, max 5 degrees
    const rotateX = -yNorm * 5;
    const rotateY = xNorm * 5;

    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s ease-out"
    });
    setHovered(false);
  };

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={tiltStyle}
      className="relative rounded-2xl border border-white/5 bg-zinc-900/15 p-6 md:p-8 backdrop-blur-sm cursor-default overflow-hidden group select-none flex flex-col justify-between h-full min-h-[300px]"
    >
      {/* Background illumination radial glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl pointer-events-none"
        animate={{
          background: hovered
            ? "radial-gradient(circle at 50% 12%, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)"
            : "radial-gradient(circle at 50% 12%, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0) 70%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Subtle border shine on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/10 rounded-2xl transition-colors duration-500 -z-10" />

      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500/30 transition-all duration-500">
            <CustomIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-500" />
          </div>
          
          {card.metric && (
            <div className="text-right">
              <div className="text-sm font-mono font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500">
                {card.metric}
              </div>
              <div className="text-[8px] font-mono text-zinc-500 tracking-wider uppercase">
                {card.metricLabel}
              </div>
            </div>
          )}
        </div>

        <h4 className="text-lg font-display font-semibold text-white tracking-tight mb-2 group-hover:text-blue-300 transition-colors duration-500">
          {card.title}
        </h4>
        
        <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
          {card.description}
        </p>
      </div>

      {/* Bottom Corner Accent Decorator */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-600 group-hover:text-blue-500/60 transition-colors duration-500">
        <span>00{card.id === "excellence" ? "1" : card.id === "results" ? "2" : card.id === "trust" ? "3" : "4"}</span>
        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-500" />
      </div>

    </motion.div>
  );
}
