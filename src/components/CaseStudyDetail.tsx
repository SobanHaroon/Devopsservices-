import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Shield,
  Layers,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Truck,
  ClipboardList,
  Smartphone,
  Activity,
  Globe,
  MessageSquare,
  Zap,
  FolderOpen,
  Server,
  Send,
  ShieldCheck,
  Workflow,
  FileText,
  Monitor,
  Code,
  Layout,
  User,
  Mail,
  Moon,
  Tablet,
  Cpu,
  Check,
  Building2,
  Briefcase,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Compass
} from "lucide-react";
import { getCaseStudyBySlug, CASE_STUDIES, CaseStudy } from "../data/caseStudiesData";
import { updateCaseStudyMetaTags } from "../lib/seo";

interface CaseStudyDetailProps {
  slug: string;
  onBackToCaseStudies: () => void;
  onBackToHome: () => void;
  onContactClick: () => void;
  onSelectCaseStudy?: (slug: string) => void;
}

// Icon mapper helper
function renderFeatureIcon(iconName: string) {
  const iconProps = { className: "w-6 h-6 text-blue-400 shrink-0" };
  switch (iconName) {
    case "ShoppingBag":
      return <ShoppingBag {...iconProps} />;
    case "ShoppingCart":
      return <ShoppingCart {...iconProps} />;
    case "CheckCircle2":
      return <CheckCircle2 {...iconProps} />;
    case "Truck":
      return <Truck {...iconProps} />;
    case "ClipboardList":
      return <ClipboardList {...iconProps} />;
    case "Smartphone":
      return <Smartphone {...iconProps} />;
    case "Layers":
      return <Layers {...iconProps} />;
    case "Activity":
      return <Activity {...iconProps} />;
    case "Globe":
      return <Globe {...iconProps} />;
    case "MessageSquare":
      return <MessageSquare {...iconProps} />;
    case "Zap":
      return <Zap {...iconProps} />;
    case "FolderOpen":
      return <FolderOpen {...iconProps} />;
    case "Server":
      return <Server {...iconProps} />;
    case "Send":
      return <Send {...iconProps} />;
    case "ShieldCheck":
      return <ShieldCheck {...iconProps} />;
    case "Workflow":
      return <Workflow {...iconProps} />;
    case "FileText":
      return <FileText {...iconProps} />;
    case "Monitor":
      return <Monitor {...iconProps} />;
    case "Code":
      return <Code {...iconProps} />;
    case "Layout":
      return <Layout {...iconProps} />;
    case "User":
      return <User {...iconProps} />;
    case "Mail":
      return <Mail {...iconProps} />;
    case "Moon":
      return <Moon {...iconProps} />;
    case "Tablet":
      return <Tablet {...iconProps} />;
    default:
      return <Cpu {...iconProps} />;
  }
}

export default function CaseStudyDetail({
  slug,
  onBackToCaseStudies,
  onBackToHome,
  onContactClick,
  onSelectCaseStudy,
}: CaseStudyDetailProps) {
  const caseStudy = getCaseStudyBySlug(slug);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Related slider state
  const relatedStudies = CASE_STUDIES.filter((cs) => cs.slug !== slug);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLightboxIndex(null);
    setIsZoomed(false);
    setSliderIndex(0);

    if (caseStudy) {
      updateCaseStudyMetaTags(
        caseStudy.seo.title,
        caseStudy.seo.metaDescription,
        caseStudy.seo.ogTitle,
        caseStudy.seo.ogDescription,
        `/case-studies/${caseStudy.slug}`,
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": caseStudy.title,
          "description": caseStudy.shortDescription,
          "category": caseStudy.category,
          "author": {
            "@type": "Organization",
            "name": "DevOps Services Ltd"
          },
          "url": `${window.location.origin}/case-studies/${caseStudy.slug}`,
          "sameAs": caseStudy.liveUrl
        }
      );
    }
  }, [slug, caseStudy]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null || !caseStudy) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : caseStudy.galleryImages.length - 1
        );
        setIsZoomed(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null && prev < caseStudy.galleryImages.length - 1 ? prev + 1 : 0
        );
        setIsZoomed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, caseStudy]);

  const handleSelectRelated = (relatedSlug: string) => {
    if (onSelectCaseStudy) {
      onSelectCaseStudy(relatedSlug);
    } else {
      window.history.pushState({}, "", `/case-studies/${relatedSlug}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % relatedStudies.length);
  };

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + relatedStudies.length) % relatedStudies.length);
  };

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-display font-bold text-white">Case Study Not Found</h2>
        <p className="text-zinc-400 mt-2">The requested case study could not be located.</p>
        <button
          onClick={onBackToCaseStudies}
          className="mt-6 px-6 py-3 rounded-full bg-blue-600 text-white font-mono text-xs uppercase tracking-wider"
        >
          Return to Case Studies Directory
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#09090b] text-zinc-100 pt-28 pb-24 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">

        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-3 mb-10 text-xs font-mono text-zinc-400">
          <button
            onClick={onBackToHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onBackToCaseStudies}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Case Studies
          </button>
          <span>/</span>
          <span className="text-blue-400 font-semibold">{caseStudy.title}</span>
        </div>

        {/* 1. HERO SECTION */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{caseStudy.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
            {caseStudy.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl">
            {caseStudy.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mr-2">TECH STACK:</span>
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Primary CTA & Live Link */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-xl shadow-blue-600/20 cursor-pointer"
            >
              <span>{caseStudy.ctaText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onContactClick}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Request Similar Project</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Featured Hero Banner */}
          <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-zinc-950 group">
            <img
              src={caseStudy.featuredImage}
              alt={`${caseStudy.title} Project Preview`}
              loading="eager"
              className="w-full max-h-[520px] object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>PARTNER: {caseStudy.client}</span>
              <span className="text-blue-400 font-semibold">VERIFIED PRODUCTION PROJECT</span>
            </div>
          </div>
        </header>

        {/* 2. PROJECT OVERVIEW */}
        <section className="mb-20 py-12 border-y border-white/10">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Briefcase className="w-4 h-4" />
            <span>EXECUTIVE BRIEF</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Project Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">WHAT THE PROJECT IS</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{caseStudy.overview.whatItIs}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">WHO IT WAS BUILT FOR</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{caseStudy.overview.whoBuiltFor}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">THE BUSINESS PURPOSE</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{caseStudy.overview.businessPurpose}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">DEVOPS SERVICES CONTRIBUTION</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{caseStudy.overview.ourContribution}</p>
            </div>
          </div>
        </section>

        {/* 3. CHALLENGE & 4. SOLUTION */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Challenge */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>THE CHALLENGE</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Business & Technical Context
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-950/40 to-zinc-900/60 border border-blue-500/20 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
                <Check className="w-4 h-4 text-blue-400" />
                <span>THE ARCHITECTURAL SOLUTION</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Engineering Execution
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </section>

        {/* 5. KEY FEATURES */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Layers className="w-4 h-4" />
            <span>FUNCTIONAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Key Features & Modules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudy.keyFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {renderFeatureIcon(feature.iconName)}
                </div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. TECHNOLOGY STACK */}
        <section className="mb-20 p-8 md:p-10 rounded-2xl bg-zinc-900/30 border border-white/10">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Code className="w-4 h-4" />
            <span>TECHNICAL ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-6">
            Technology Stack Utilized
          </h2>

          <div className="flex flex-wrap gap-3">
            {caseStudy.technologies.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. DESIGN / EXPERIENCE */}
        <section className="mb-20">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Layout className="w-4 h-4" />
            <span>USER EXPERIENCE & INTERACTION</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Design & Experience Approach
          </h2>

          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest w-48 shrink-0">RESPONSIVE DESIGN</span>
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">{caseStudy.designApproach.responsive}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest w-48 shrink-0">USER EXPERIENCE</span>
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">{caseStudy.designApproach.userExperience}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest w-48 shrink-0">VISUAL HIERARCHY</span>
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">{caseStudy.designApproach.visualHierarchy}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest w-48 shrink-0">NAVIGATION MODEL</span>
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">{caseStudy.designApproach.navigation}</p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest w-48 shrink-0">ANIMATION & KINETICS</span>
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">{caseStudy.designApproach.animations}</p>
            </div>
          </div>
        </section>

        {/* 8. PROJECT GALLERY (WITH FULL-SCREEN LIGHTBOX TRIGGER) */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest">
              <Monitor className="w-4 h-4" />
              <span>VISUAL EXHIBITION</span>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:block">
              CLICK ANY IMAGE TO ENLARGE & INSPECT
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
            Project Gallery & Interface Views
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudy.galleryImages.map((img, i) => (
              <div
                key={i}
                onClick={() => {
                  setLightboxIndex(i);
                  setIsZoomed(false);
                }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 bg-zinc-950 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <img
                    src={img.url}
                    alt={`${caseStudy.title} Gallery Preview ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-4 py-2.5 rounded-full bg-zinc-950/90 border border-blue-500/40 text-blue-300 text-xs font-mono flex items-center gap-2 shadow-xl">
                      <ZoomIn className="w-4 h-4 text-blue-400" />
                      <span>Inspect High-Res View</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/90 border-t border-white/5 text-xs font-mono text-zinc-400 flex items-center justify-between">
                  <span className="truncate mr-2">{img.caption}</span>
                  <span className="text-blue-400 text-[10px] shrink-0 font-semibold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>VIEW {i + 1}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. RESULTS / OUTCOME */}
        <section className="mb-20 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-blue-950/30 to-zinc-900/50 border border-blue-500/20">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>QUALITATIVE OUTCOMES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-6">
            Project Results & Business Impact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {caseStudy.results.map((result, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed">{result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED CASE STUDIES SLIDER */}
        {relatedStudies.length > 0 && (
          <section className="mb-20 pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-2">
                  <Compass className="w-4 h-4" />
                  <span>MORE PRODUCTION WORKS</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                  Related Case Studies
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Discover how DevOps Services solves architectural challenges across industries.
                </p>
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevSlide}
                  className="p-3 rounded-full bg-zinc-900 border border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
                  aria-label="Previous case study"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-zinc-500">
                  {sliderIndex + 1} / {relatedStudies.length}
                </span>
                <button
                  onClick={handleNextSlide}
                  className="p-3 rounded-full bg-zinc-900 border border-white/10 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
                  aria-label="Next case study"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider Active Card Display */}
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                {relatedStudies[sliderIndex] && (
                  <motion.div
                    key={relatedStudies[sliderIndex].id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-blue-500/30 flex flex-col md:flex-row items-center gap-8"
                  >
                    {/* Image Preview */}
                    <div className="w-full md:w-1/2 aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 relative shrink-0 border border-white/5">
                      <img
                        src={relatedStudies[sliderIndex].featuredImage}
                        alt={relatedStudies[sliderIndex].title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-blue-400 text-[10px] font-mono uppercase font-semibold">
                        {relatedStudies[sliderIndex].category}
                      </div>
                    </div>

                    {/* Content Brief */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                          CLIENT: {relatedStudies[sliderIndex].client}
                        </span>
                        <h3 className="text-2xl font-display font-bold text-white mt-1 hover:text-blue-400 transition-colors">
                          {relatedStudies[sliderIndex].title}
                        </h3>
                        <p className="mt-3 text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                          {relatedStudies[sliderIndex].shortDescription}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {relatedStudies[sliderIndex].technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-zinc-400 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => handleSelectRelated(relatedStudies[sliderIndex].slug)}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* 10. LIVE PROJECT CTA & CONSULTATION */}
        <section className="p-8 md:p-12 rounded-3xl bg-zinc-900 border border-white/10 text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono uppercase tracking-widest mb-4">
            LIVE PROJECT ENGAGEMENT
          </span>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white max-w-2xl">
            Explore the Live Project
          </h2>

          <p className="mt-3 text-sm text-zinc-400 max-w-xl leading-relaxed">
            Experience the real-world performance, user interface, and functional architecture directly on the live website.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors shadow-xl shadow-blue-600/30 cursor-pointer"
            >
              <span>Explore Live Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onContactClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <span>Need a Similar Solution?</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </section>

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && caseStudy.galleryImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
            onClick={() => {
              setLightboxIndex(null);
              setIsZoomed(false);
            }}
          >
            {/* Modal Header Controls */}
            <div
              className="flex items-center justify-between gap-4 z-10 bg-zinc-950/80 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono text-[11px]">
                  IMAGE {lightboxIndex + 1} OF {caseStudy.galleryImages.length}
                </span>
                <span className="text-white font-display text-sm hidden sm:block truncate max-w-md">
                  {caseStudy.galleryImages[lightboxIndex].caption}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isZoomed ? "Reset Zoom" : "Zoom 100%"}</span>
                </button>

                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsZoomed(false);
                  }}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: High-Res Image Display */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Image Arrow */}
              <button
                onClick={() => {
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : caseStudy.galleryImages.length - 1
                  );
                  setIsZoomed(false);
                }}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-zinc-900/90 border border-white/20 hover:border-blue-500/50 text-white hover:text-blue-400 transition-all cursor-pointer shadow-2xl"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image Container */}
              <div
                className={`transition-all duration-300 max-w-full max-h-[75vh] flex items-center justify-center ${
                  isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={caseStudy.galleryImages[lightboxIndex].url}
                  alt={caseStudy.galleryImages[lightboxIndex].caption}
                  className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              {/* Next Image Arrow */}
              <button
                onClick={() => {
                  setLightboxIndex((prev) =>
                    prev !== null && prev < caseStudy.galleryImages.length - 1 ? prev + 1 : 0
                  );
                  setIsZoomed(false);
                }}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-zinc-900/90 border border-white/20 hover:border-blue-500/50 text-white hover:text-blue-400 transition-all cursor-pointer shadow-2xl"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer: Caption & Thumbnail Track */}
            <div
              className="z-10 flex flex-col items-center gap-3 bg-zinc-950/90 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs font-mono text-zinc-300 text-center max-w-2xl">
                {caseStudy.galleryImages[lightboxIndex].caption}
              </p>

              {/* Gallery Thumbnail Jump Strip */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
                {caseStudy.galleryImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative w-16 h-10 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      idx === lightboxIndex
                        ? "border-blue-500 ring-2 ring-blue-500/50 scale-105"
                        : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={thumb.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

