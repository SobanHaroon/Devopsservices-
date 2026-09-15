import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Filter, Sparkles, Shield, Layers } from "lucide-react";
import { CASE_STUDIES, CaseStudy } from "../data/caseStudiesData";
import { updateCaseStudyMetaTags } from "../lib/seo";

interface CaseStudiesListProps {
  onSelectCaseStudy: (slug: string) => void;
  onBackToHome: () => void;
  onContactClick: () => void;
}

export default function CaseStudiesList({
  onSelectCaseStudy,
  onBackToHome,
  onContactClick,
}: CaseStudiesListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    window.scrollTo(0, 0);
    updateCaseStudyMetaTags(
      "Case Studies & Real Client Projects | DevOps Services Ltd",
      "Explore real-world case studies for E-Commerce, B2B Corporate platforms, and web applications engineered by DevOps Services Ltd.",
      "Case Studies & Production Projects | DevOps Services",
      "In-depth analysis of real digital platforms built by DevOps Services Ltd for business partners.",
      "/case-studies",
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "DevOps Services Case Studies",
        "description": "Real-world web engineering case studies and portfolio projects.",
        "url": `${window.location.origin}/case-studies`,
      }
    );
  }, []);

  const categories = [
    "ALL",
    "E-Commerce Development",
    "Corporate / Agency Website",
    "B2B / Corporate Website",
    "Personal Portfolio / Developer Website",
  ];

  const filteredProjects =
    selectedCategory === "ALL"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pt-28 pb-24 relative overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Breadcrumb / Back Link */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-blue-400" />
            <span>Return to Homepage</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            <span>REAL BUSINESS CASE STUDIES</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
            Case Studies<span className="text-blue-500">.</span>
          </h1>
          <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed">
            Detailed case studies showcasing digital platforms, corporate websites, e-commerce storefronts, and web applications engineered by DevOps Services Ltd for real businesses.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono mr-2">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>FILTER BY INDUSTRY:</span>
          </div>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 border border-blue-500/50"
                  : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20"
              }`}
            >
              {category === "ALL" ? "All Case Studies" : category}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project: CaseStudy, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-blue-500/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-mono">
                    {project.client}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-zinc-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectCaseStudy(project.slug)}
                    className="flex-1 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                  >
                    <span>{project.ctaText}</span>
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Consultation Callout Banner */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-zinc-900/80 to-zinc-950 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>CUSTOM DIGITAL ENGINEERING</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
              Need a similar solution for your business?
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              We engineer custom web platforms, e-commerce storefronts, and B2B portals built for high performance, security, and growth. Connect with our directors today.
            </p>
          </div>

          <button
            onClick={onContactClick}
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-3 transition-colors cursor-pointer shrink-0 shadow-xl shadow-blue-600/30"
          >
            <span>Initiate Project Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
