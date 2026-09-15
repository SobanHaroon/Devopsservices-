import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Service } from "../types";
import { 
  Code2, 
  Settings, 
  Layers, 
  TrendingUp, 
  Megaphone, 
  Compass, 
  Cpu,
  ArrowRight,
  CheckCircle2,
  Maximize2,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ExternalLink,
  ChevronRight,
  Terminal,
  Activity
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useToast } from "./Toast";
import { BorderBeam } from "./ui/BorderBeam";
import { AnimatedServiceIcon } from "./ui/AnimatedServiceIcons";

const ServiceIconMap: Record<string, React.ComponentType<any>> = {
  "web-development": Code2,
  "development": Code2,
  "Code2": Code2,
  "web-management": Settings,
  "maintenance": Settings,
  "Settings": Settings,
  "ui-ux-design": Layers,
  "branding": Layers,
  "Layers": Layers,
  "seo": TrendingUp,
  "marketing": TrendingUp,
  "TrendingUp": TrendingUp,
  "digital-marketing": Megaphone,
  "Megaphone": Megaphone,
  "brand-identity": Compass,
  "Compass": Compass,
  "business-automation": Cpu,
  "Cpu": Cpu,
};

const SERVICE_MODAL_SPECS: Record<string, {
  tagline: string;
  sla: string;
  sprint: string;
  impact: string;
  techStack: string[];
}> = {
  "web-development": {
    tagline: "High-Performance Full-Stack Digital Architectures & Micro-Interactions",
    sla: "99.99% Cloud SLA Guarantee",
    sprint: "2 - 4 Weeks Typical Sprint",
    impact: "Sub-100ms PageSpeed",
    techStack: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "WebGL", "GraphQL"]
  },
  "web-management": {
    tagline: "24/7 Enterprise Cloud Monitoring, Security Hardening & Continuous Upgrades",
    sla: "24/7 Dedicated Ops Monitoring",
    sprint: "Continuous Optimization",
    impact: "Zero Unplanned Downtime",
    techStack: ["Kubernetes", "Cloudflare Enterprise", "Docker", "AWS Cloud", "Datadog", "CI/CD"]
  },
  "ui-ux-design": {
    tagline: "Bespoke Digital Design Systems & Intuitive User Journey Choreography",
    sla: "100% Usability Verified",
    sprint: "2 - 3 Weeks Prototyping",
    impact: "+140% Conversion Lift",
    techStack: ["Figma Enterprise", "Framer Motion", "Design Systems", "Usability Testing", "A/B Testing"]
  },
  "seo": {
    tagline: "Programmatic Search Architecture & Semantic Schema Optimization",
    sla: "Top 3 Ranking Guarantee Target",
    sprint: "Ongoing Growth Sprints",
    impact: "+320% Non-Branded Organic Traffic",
    techStack: ["Programmatic SEO", "JSON-LD Schema", "Core Web Vitals", "Search Console", "Semrush"]
  },
  "digital-marketing": {
    tagline: "Analytical Audience Acquisition & Multi-Channel Performance Funnels",
    sla: "3.5x - 8.4x ROAS Benchmark",
    sprint: "Bi-Weekly Funnel Audits",
    impact: "8.4% Average Lead Conversion",
    techStack: ["Multi-Touch Attribution", "Google Ads 360", "Meta Business", "GA4 Analytics", "Conversion Funnels"]
  },
  "brand-identity": {
    tagline: "Distinctive Editorial Typography, Brand Marks & Multi-Platform Identity Systems",
    sla: "Complete Asset Compilation",
    sprint: "3 - 5 Weeks Creative Direction",
    impact: "+200% Institutional Resonance",
    techStack: ["Bespoke Typography", "Brand Guidelines", "Vector Assets", "Editorial Systems", "Motion Logos"]
  },
  "business-automation": {
    tagline: "Intelligent Workflow Orchestration, Middleware & Automated AI Agents",
    sla: "30+ Hours Saved / Week",
    sprint: "2 - 4 Weeks Architecture",
    impact: "99.9% Workflow Execution",
    techStack: ["Node.js / Python", "REST & Webhooks", "Make / Zapier", "CRM Middleware", "AI Agents"]
  }
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function TiltCard({ children, className = "", onClick }: TiltCardProps) {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [glare, setGlare] = useState({ x: 50, y: 50, pxX: 0, pxY: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle 3D tilt calculations
    const rotateX = -((y - centerY) / centerY) * 6; // max 6deg vertical tilt
    const rotateY = ((x - centerX) / centerX) * 6; // max 6deg horizontal tilt
    
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      pxX: Math.round(x),
      pxY: Math.round(y),
      opacity: 0.9,
    });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border border-white/10 bg-zinc-900/20 hover:border-blue-500/40 hover:bg-zinc-900/40 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden group ${className}`}
    >
      {/* Interactive cursor spotlight reflection glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(450px circle at ${glare.pxX}px ${glare.pxY}px, rgba(59, 130, 246, 0.22), rgba(6, 182, 212, 0.08), transparent 70%)`,
        }}
      />

      {/* Dynamic mouse-following border light-glow mask */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl border-2 border-blue-400/80 transition-opacity duration-300 z-15"
        style={{
          opacity: glare.opacity,
          WebkitMaskImage: `radial-gradient(220px circle at ${glare.pxX}px ${glare.pxY}px, black 30%, transparent 80%)`,
          maskImage: `radial-gradient(220px circle at ${glare.pxX}px ${glare.pxY}px, black 30%, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Services() {
  const { dictionary } = useLanguage();
  const { showToast } = useToast();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Cinematic Parallax displacements for background graphics
  const bgOrbY1 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const bgOrbY2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  // Close modal on Escape key press and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    };

    if (selectedService) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService]);

  const handleInquireService = (service: Service) => {
    setSelectedService(null);
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    
    // Dispatch custom event to auto select service option in form
    window.dispatchEvent(new CustomEvent("select-service-option", { detail: service.title }));
    
    showToast({
      type: "info",
      title: "Service Selected",
      message: `Pre-filled "${service.title}" in your project requirements brief.`,
    });
  };

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-36 bg-zinc-950/40 overflow-hidden">
      
      {/* Cinematic Parallax Background Graphic Elements */}
      <motion.div
        style={{ y: bgOrbY1, scale: bgScale }}
        className="absolute top-10 left-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <motion.div
        style={{ y: bgOrbY2 }}
        className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-indigo-600/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10"
      />

      {/* Parallax Geometric Tech Ring Graphic */}
      <motion.div
        style={{ y: bgOrbY1, rotate: bgRotate }}
        className="absolute top-1/4 right-6 w-96 h-96 rounded-full border border-blue-500/10 pointer-events-none -z-10 flex items-center justify-center opacity-70"
      >
        <div className="w-72 h-72 rounded-full border border-dashed border-cyan-500/15" />
        <div className="w-48 h-48 rounded-full border border-blue-400/10" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-4"
          >
            <span>{dictionary.services.sectionTag}</span>
            <span className="w-8 h-[1px] bg-blue-500/40" />
          </motion.div>

          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 lg:col-span-7 text-left">
              <motion.h2
                initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight"
              >
                {dictionary.services.sectionTitle1} <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  {dictionary.services.sectionTitle2}
                </span>
              </motion.h2>
            </div>
            <div className="col-span-12 lg:col-span-5 text-left">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-zinc-400 text-sm md:text-base leading-relaxed"
              >
                {dictionary.services.sectionDesc}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Service Cards Grid with 3D Tilt & Scale on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dictionary.services.items.map((service, index) => {
            const CustomIcon = ServiceIconMap[service.id] || ServiceIconMap[service.iconName] || Code2;
            const countStr = (index + 1).toString().padStart(2, "0");
            const spec = SERVICE_MODAL_SPECS[service.id] || SERVICE_MODAL_SPECS["web-development"];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
              >
                <TiltCard onClick={() => setSelectedService(service)}>
                  {index === 0 && (
                    <BorderBeam duration={12} size={180} borderWidth={1.5} colorFrom="#3b82f6" colorTo="#60a5fa" />
                  )}
                  <div className="p-7 md:p-8 flex flex-col justify-between h-full min-h-[380px] relative z-20 text-left">
                    
                    {/* Top Row: Index + Tag + Glowing Icon */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-zinc-600 text-xs font-semibold">
                            {countStr}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-blue-400/90 tracking-widest uppercase px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                            {service.tag}
                          </span>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-white/10 group-hover:bg-blue-600/20 group-hover:border-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] text-blue-400 flex items-center justify-center transition-all duration-500 shadow-md p-2.5">
                          <AnimatedServiceIcon id={service.id} className="w-7 h-7" />
                        </div>
                      </div>

                      {/* Title & Short Description */}
                      <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight group-hover:text-blue-300 transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-zinc-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Middle: Feature Highlights */}
                    <div className="my-6 border-t border-white/5 pt-5 space-y-2">
                      {service.details.slice(0, 2).map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span className="truncate">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom CTA Trigger */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs font-mono font-semibold text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                        Inspect Blueprint
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>

                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-500/30 transition-all duration-300">
                        <Maximize2 className="w-3 h-3" />
                      </div>
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Cinematic Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onInquire={handleInquireService}
          />
        )}
      </AnimatePresence>

    </section>
  );
}

interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
  onInquire: (service: Service) => void;
}

function ServiceDetailModal({ service, onClose, onInquire }: ServiceDetailModalProps) {
  const CustomIcon = ServiceIconMap[service.id] || ServiceIconMap[service.iconName] || Code2;
  const spec = SERVICE_MODAL_SPECS[service.id] || SERVICE_MODAL_SPECS["web-development"];
  const { dictionary } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
      
      {/* Dark Blurred Backdrop Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 cursor-pointer"
      />

      {/* Modal Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.92, y: 20, filter: "blur(8px)" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 max-w-3xl w-full bg-zinc-950/95 border border-blue-500/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-blue-500/10 text-white overflow-hidden max-h-[90vh] flex flex-col justify-between"
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Modal Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-blue-400/40 text-blue-300 flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0 p-3 group">
              <AnimatedServiceIcon id={service.id} className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                  {service.tag}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  ONLINE SPEC
                </span>
              </div>
              
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {service.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="overflow-y-auto my-6 pr-2 space-y-8 text-left custom-scrollbar">
          
          {/* Subtitle / Tagline Banner */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
            <p className="text-xs sm:text-sm font-mono text-blue-200">
              {spec.tagline}
            </p>
          </div>

          {/* Strategic Overview / Description */}
          <div>
            <h4 className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-2 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>{dictionary.services.paradigmLabel || "CORE OPERATIONAL PARADIGM"}</span>
            </h4>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Deliverables / Checklist Grid */}
          <div>
            <h4 className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{dictionary.services.integralsLabel || "TECHNICAL DELIVERABLES & INTEGRALS"}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {service.details.map((detail, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 hover:border-blue-500/30 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-zinc-300 leading-snug">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
              <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest">SLA UPTIME</span>
              <span className="font-display font-bold text-sm sm:text-base text-blue-300 mt-0.5 block">{spec.sla}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
              <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest">SPRINT CYCLE</span>
              <span className="font-display font-bold text-sm sm:text-base text-cyan-300 mt-0.5 block">{spec.sprint}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 text-center">
              <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest">TARGET IMPACT</span>
              <span className="font-display font-bold text-sm sm:text-base text-emerald-300 mt-0.5 block">{spec.impact}</span>
            </div>
          </div>

          {/* Recommended Tech Stack Matrix */}
          <div>
            <h4 className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>RECOMMENDED ARCHITECTURE STACK</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {spec.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:border-blue-500/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            Close Blueprint
          </button>

          <button
            onClick={() => onInquire(service)}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <span>Inquire About This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </motion.div>
    </div>
  );
}
