import React from "react";

interface AnimatedServiceIconProps {
  id: string;
  className?: string;
}

// 1. Web Development (Code Brackets Architecture)
export function WebDevAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="webDevGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Ambient background ring */}
      <circle
        cx="24"
        cy="24"
        r="20"
        className="stroke-blue-500/20 group-hover:stroke-blue-400/50 transition-colors duration-500"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Left Bracket < */}
      <path
        d="M17 17L10 24L17 31"
        stroke="url(#webDevGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 group-hover:-translate-x-1.5 filter drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
      />

      {/* Center Slash / */}
      <path
        d="M27 15L21 33"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="transition-transform duration-500 origin-center group-hover:rotate-12 group-hover:stroke-cyan-300"
      />

      {/* Right Bracket > */}
      <path
        d="M31 17L38 24L31 31"
        stroke="url(#webDevGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 group-hover:translate-x-1.5 filter drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
      />

      {/* Floating Node Sparks */}
      <circle
        cx="24"
        cy="8"
        r="2"
        className="fill-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1"
      />
      <circle
        cx="24"
        cy="40"
        r="2"
        className="fill-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-1"
      />
    </svg>
  );
}

// 2. Web Management & DevOps (Dual Precision Gear Core)
export function WebMgmtAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="mgmtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Rotating Outer Tech Gear */}
      <g className="transition-transform duration-700 origin-center group-hover:rotate-90">
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="url(#mgmtGrad)"
          strokeWidth="2"
          strokeDasharray="6 3 2 3"
          className="opacity-80 group-hover:opacity-100"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <rect
            key={i}
            x="22.5"
            y="5"
            width="3"
            height="4"
            rx="1"
            className="fill-blue-400"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </g>

      {/* Inner Counter-Rotating Gear Core */}
      <g className="transition-transform duration-700 origin-center group-hover:-rotate-45">
        <circle
          cx="24"
          cy="24"
          r="9"
          className="stroke-cyan-300 fill-zinc-950"
          strokeWidth="2"
        />
        <circle cx="24" cy="24" r="4" className="fill-blue-500" />
      </g>

      {/* Central Health Heartbeat Glow */}
      <circle
        cx="24"
        cy="24"
        r="2"
        className="fill-white animate-ping opacity-75"
      />
    </svg>
  );
}

// 3. UI/UX Design (3D Isometric Stacked Layers)
export function UiUxAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="layerGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="layerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Bottom Layer */}
      <path
        d="M24 36L10 29L24 22L38 29L24 36Z"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-all duration-500 group-hover:translate-y-2 group-hover:stroke-blue-600"
      />

      {/* Middle Layer */}
      <path
        d="M24 28L10 21L24 14L38 21L24 28Z"
        fill="url(#layerGrad2)"
        fillOpacity="0.35"
        stroke="url(#layerGrad2)"
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-all duration-500 group-hover:scale-105 origin-center"
      />

      {/* Top Layer */}
      <path
        d="M24 20L10 13L24 6L38 13L24 20Z"
        fill="url(#layerGrad1)"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-all duration-500 group-hover:-translate-y-2.5 filter drop-shadow-[0_4px_8px_rgba(59,130,246,0.5)]"
      />

      {/* Alignment Cursor Marker */}
      <circle
        cx="24"
        cy="13"
        r="2"
        className="fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </svg>
  );
}

// 4. SEO & Organic Growth (Ascending Graph & Milestone Node)
export function SeoAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="seoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#4ade80" />
        </linearGradient>
      </defs>

      {/* Grid Axis Base */}
      <path
        d="M10 38H38"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 10V38"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Trend Bar Columns */}
      <rect x="15" y="28" width="4" height="10" rx="1" className="fill-blue-900/60 group-hover:fill-blue-600 transition-colors duration-300" />
      <rect x="23" y="20" width="4" height="18" rx="1" className="fill-blue-800/60 group-hover:fill-blue-500 transition-colors duration-300" />
      <rect x="31" y="12" width="4" height="26" rx="1" className="fill-blue-700/60 group-hover:fill-cyan-400 transition-colors duration-300" />

      {/* Ascending Growth Line */}
      <path
        d="M10 32L17 24L25 26L37 12"
        stroke="url(#seoGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
      />

      {/* Ascending Arrow Tip */}
      <path
        d="M31 12H37V18"
        stroke="#4ade80"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />

      {/* Pulsing Target Dot */}
      <circle
        cx="37"
        cy="12"
        r="3"
        className="fill-emerald-400 animate-pulse"
      />
    </svg>
  );
}

// 5. Digital Marketing (Broadcasting Signal Arcs)
export function MarketingAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="mktGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Megaphone Body */}
      <path
        d="M10 20H15L26 12V36L15 28H10C8.89543 28 8 27.1046 8 26V22C8 20.8954 8.89543 20 10 20Z"
        fill="url(#mktGrad)"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeLinejoin="round"
        className="transition-transform duration-300 origin-left group-hover:rotate-[-8deg]"
      />

      {/* Handle */}
      <path
        d="M15 28L18 36H22L19 28"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Signal Arc 1 */}
      <path
        d="M31 18C33.5 21.5 33.5 26.5 31 30"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="transition-all duration-300 group-hover:translate-x-1 group-hover:stroke-cyan-300"
      />

      {/* Signal Arc 2 */}
      <path
        d="M36 14C40 19.5 40 28.5 36 34"
        stroke="#60a5fa"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="transition-all duration-500 group-hover:translate-x-2 group-hover:stroke-blue-300 opacity-80 group-hover:opacity-100"
      />

      {/* Signal Arc 3 */}
      <path
        d="M41 10C46.5 17.5 46.5 30.5 41 38"
        stroke="#93c5fd"
        strokeWidth="2"
        strokeDasharray="2 3"
        strokeLinecap="round"
        className="opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:translate-x-3"
      />
    </svg>
  );
}

// 6. Brand Identity (Precision Compass Dial)
export function BrandAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Outer Dial Ring */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="url(#brandGrad)"
        strokeWidth="2"
        className="transition-transform duration-700 origin-center group-hover:rotate-180"
        strokeDasharray="12 4 4 4"
      />

      {/* Inner Ring */}
      <circle
        cx="24"
        cy="24"
        r="12"
        stroke="#1e293b"
        strokeWidth="2"
      />

      {/* Rotating Compass Needle */}
      <g className="transition-transform duration-500 origin-center group-hover:rotate-45">
        <polygon
          points="24,10 27,24 24,21 21,24"
          fill="#38bdf8"
          className="filter drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
        />
        <polygon
          points="24,38 27,24 24,27 21,24"
          fill="#1e3a8a"
        />
      </g>

      {/* Pivot Core */}
      <circle cx="24" cy="24" r="2.5" className="fill-white" />
    </svg>
  );
}

// 7. Business Automation & AI (Neural CPU Silicon Core)
export function AutomationAnimatedIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Circuit Traces Top & Bottom */}
      <path d="M16 6V12 M24 4V12 M32 6V12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-cyan-300" />
      <path d="M16 36V42 M24 36V44 M32 36V42" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-cyan-300" />

      {/* Circuit Traces Left & Right */}
      <path d="M6 16H12 M4 24H12 M6 32H12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-cyan-300" />
      <path d="M36 16H42 M36 24H44 M36 32H42" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" className="transition-all duration-300 group-hover:stroke-cyan-300" />

      {/* Outer Chip Frame */}
      <rect
        x="12"
        y="12"
        width="24"
        height="24"
        rx="5"
        fill="#090d16"
        stroke="url(#cpuGrad)"
        strokeWidth="2.5"
        className="transition-all duration-300 group-hover:stroke-cyan-400 group-hover:shadow-lg"
      />

      {/* Silicon Core */}
      <rect
        x="18"
        y="18"
        width="12"
        height="12"
        rx="2.5"
        fill="url(#cpuGrad)"
        className="transition-all duration-500 origin-center group-hover:scale-110 group-hover:rotate-90 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
      />

      {/* Neural Core Dot */}
      <circle cx="24" cy="24" r="2" className="fill-white animate-pulse" />
    </svg>
  );
}

export function AnimatedServiceIcon({ id, className = "w-6 h-6" }: AnimatedServiceIconProps) {
  switch (id) {
    case "web-development":
    case "development":
    case "Code2":
      return <WebDevAnimatedIcon className={className} />;
    case "web-management":
    case "maintenance":
    case "Settings":
      return <WebMgmtAnimatedIcon className={className} />;
    case "ui-ux-design":
    case "branding":
    case "Layers":
      return <UiUxAnimatedIcon className={className} />;
    case "seo":
    case "marketing":
    case "TrendingUp":
      return <SeoAnimatedIcon className={className} />;
    case "digital-marketing":
    case "Megaphone":
      return <MarketingAnimatedIcon className={className} />;
    case "brand-identity":
    case "Compass":
      return <BrandAnimatedIcon className={className} />;
    case "business-automation":
    case "Cpu":
      return <AutomationAnimatedIcon className={className} />;
    default:
      return <WebDevAnimatedIcon className={className} />;
  }
}
