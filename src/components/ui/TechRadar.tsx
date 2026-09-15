import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Radar, Cpu, Zap, Cloud, Code2, CheckCircle2, Sparkles, Filter } from "lucide-react";

export interface RadarStackItem {
  id: string;
  name: string;
  category: "frontend" | "cloud" | "ai";
  ring: "CORE" | "ARCHITECTURE" | "EDGE";
  metric: string;
  description: string;
  x: number; // percentage coordinates (0-100) inside 400x400 canvas
  y: number;
}

const RADAR_STACKS: RadarStackItem[] = [
  // Frontend / Core
  {
    id: "react18",
    name: "React 18 & Next.js",
    category: "frontend",
    ring: "CORE",
    metric: "60 FPS Render Matrix",
    description: "Concurrent rendering, server actions, and ultra-lean client hydration.",
    x: 35,
    y: 38,
  },
  {
    id: "ts-strict",
    name: "TypeScript (Strict)",
    category: "frontend",
    ring: "CORE",
    metric: "Zero Runtime Type Errors",
    description: "End-to-end type safety across API boundaries and data transformations.",
    x: 45,
    y: 32,
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS & Motion",
    category: "frontend",
    ring: "CORE",
    metric: "0.00 CLS / <40KB CSS",
    description: "Atomic utility CSS with GPU-accelerated motion choreography.",
    x: 58,
    y: 42,
  },
  {
    id: "webgl-three",
    name: "WebGL & Canvas API",
    category: "frontend",
    ring: "ARCHITECTURE",
    metric: "Sub-16ms Frame Times",
    description: "Custom shaders, interactive particles, and 3D geometric visualizers.",
    x: 72,
    y: 30,
  },
  // Cloud & DevOps
  {
    id: "cloud-run",
    name: "GCP Cloud Run / Edge",
    category: "cloud",
    ring: "CORE",
    metric: "99.99% SLA / Auto-Scale",
    description: "Serverless container orchestration with sub-second cold starts.",
    x: 38,
    y: 62,
  },
  {
    id: "docker-k8s",
    name: "Docker & K8s Cluster",
    category: "cloud",
    ring: "ARCHITECTURE",
    metric: "10M+ Requests / Day",
    description: "Containerized microservice architecture with zero-downtime rolling deploys.",
    x: 65,
    y: 68,
  },
  {
    id: "cloud-sql",
    name: "Cloud SQL & Drizzle",
    category: "cloud",
    ring: "CORE",
    metric: "<4ms Query Average",
    description: "High-throughput PostgreSQL persistence with connection pooling.",
    x: 48,
    y: 54,
  },
  {
    id: "edge-cdn",
    name: "Global Edge CDN",
    category: "cloud",
    ring: "EDGE",
    metric: "<48ms TTFB Worldwide",
    description: "Distributed asset caching and edge compute middleware.",
    x: 82,
    y: 78,
  },
  // AI & Data Automation
  {
    id: "gemini-ai",
    name: "Gemini 2.5 AI Engine",
    category: "ai",
    ring: "CORE",
    metric: "Real-Time Inference",
    description: "Multi-modal reasoning, structured JSON schemas, and automated workflows.",
    x: 28,
    y: 48,
  },
  {
    id: "graphql-rest",
    name: "High-Throughput APIs",
    category: "ai",
    ring: "ARCHITECTURE",
    metric: "120ms P99 Latency",
    description: "Type-safe RPC and GraphQL interfaces with rate limiting and caching.",
    x: 20,
    y: 68,
  },
  {
    id: "ci-cd-auto",
    name: "Automated CI/CD Pipeline",
    category: "ai",
    ring: "EDGE",
    metric: "180+ Deploys Verified",
    description: "Automated test suites, lighthouse audits, and canary deployments.",
    x: 18,
    y: 28,
  },
];

export function TechRadar() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "frontend" | "cloud" | "ai">("all");
  const [selectedStack, setSelectedStack] = useState<RadarStackItem>(RADAR_STACKS[0]);

  const filteredStacks = RADAR_STACKS.filter((item) =>
    selectedCategory === "all" ? true : item.category === selectedCategory
  );

  return (
    <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-md relative overflow-hidden my-16 text-left">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-widest mb-1">
            <Radar className="w-4 h-4 animate-spin" style={{ animationDuration: "12s" }} />
            <span>INTERACTIVE ENGINEERING TELEMETRY</span>
          </div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Our Technology Radar
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Explore our architectural stacks, operational SLA metrics, and production proficiency.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-mono">
          {(
            [
              { id: "all", label: "ALL STACKS" },
              { id: "frontend", label: "FRONTEND CORE" },
              { id: "cloud", label: "CLOUD DEVOPS" },
              { id: "ai", label: "AI & DATA" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                const firstMatch = RADAR_STACKS.find((item) => tab.id === "all" || item.category === tab.id);
                if (firstMatch) setSelectedStack(firstMatch);
              }}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Radar Canvas & Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left: Concentric Interactive Radar Circle */}
        <div className="col-span-1 lg:col-span-7 flex justify-center">
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full border border-white/10 bg-zinc-900/40 flex items-center justify-center select-none overflow-hidden">
            
            {/* Concentric Ring 3 (Outer - EDGE) */}
            <div className="absolute w-[88%] h-[88%] rounded-full border border-dashed border-white/10 flex items-start justify-center pt-2">
              <span className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase">
                EDGE // INNOVATION
              </span>
            </div>

            {/* Concentric Ring 2 (Middle - ARCHITECTURE) */}
            <div className="absolute w-[62%] h-[62%] rounded-full border border-dashed border-white/15 flex items-start justify-center pt-2">
              <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase">
                ARCHITECTURE
              </span>
            </div>

            {/* Concentric Ring 1 (Inner - CORE PRODUCTION) */}
            <div className="absolute w-[36%] h-[36%] rounded-full border border-blue-500/30 bg-blue-500/5 flex items-start justify-center pt-2">
              <span className="text-[9px] font-mono text-blue-400 font-bold tracking-widest uppercase">
                CORE
              </span>
            </div>

            {/* Rotating Radar Sweep Ray */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute w-[50%] h-0.5 left-[50%] top-[50%] origin-left pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 100%)",
              }}
            />

            {/* Center Core Dot */}
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10 animate-pulse" />

            {/* Interactive Stack Nodes */}
            {RADAR_STACKS.map((item) => {
              const isSelected = selectedStack.id === item.id;
              const isVisible = selectedCategory === "all" || item.category === selectedCategory;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setSelectedStack(item)}
                  initial={false}
                  animate={{
                    scale: isSelected ? 1.3 : isVisible ? 1.0 : 0.6,
                    opacity: isVisible ? 1 : 0.25,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer group z-20 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.8)] ring-2 ring-white"
                      : "bg-zinc-900 border border-white/20 text-zinc-300 hover:border-blue-400 hover:text-white"
                  }`}
                  title={`${item.name} — ${item.ring}`}
                >
                  <span className="text-[10px] font-mono font-bold">
                    {item.name.substring(0, 2).toUpperCase()}
                  </span>

                  {/* Tooltip Label on hover */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-900 border border-white/15 text-[9px] font-mono text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {item.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Stack Telemetry Insight Card */}
        <div className="col-span-1 lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStack.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-blue-500/30 flex flex-col justify-between"
            >
              <div>
                {/* Ring Category & Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold tracking-widest">
                    RING // {selectedStack.ring}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {selectedStack.category.toUpperCase()} STACK
                  </span>
                </div>

                <h4 className="font-display font-bold text-2xl text-white tracking-tight mb-2">
                  {selectedStack.name}
                </h4>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  {selectedStack.description}
                </p>
              </div>

              {/* Metric Indicator Card */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block mb-0.5">
                    VERIFIED PRODUCTION METRIC
                  </span>
                  <span className="text-base sm:text-lg font-mono font-bold text-blue-400">
                    {selectedStack.metric}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Stack Selector Pills (Quick Jump) */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block mb-2">
                  QUICK EVALUATE STACKS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {filteredStacks.slice(0, 5).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStack(s)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                        selectedStack.id === s.id
                          ? "bg-blue-600 text-white font-bold"
                          : "bg-white/5 text-zinc-400 hover:text-white border border-white/5"
                      }`}
                    >
                      {s.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
