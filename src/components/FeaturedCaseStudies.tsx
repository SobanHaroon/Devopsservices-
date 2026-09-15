import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, ArrowRight, Layers, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { CASE_STUDIES, CaseStudy } from "../data/caseStudiesData";

interface FeaturedCaseStudiesProps {
  onNavigateToCaseStudy: (slug: string) => void;
  onNavigateToAllCaseStudies: () => void;
}

export default function FeaturedCaseStudies({
  onNavigateToCaseStudy,
  onNavigateToAllCaseStudies,
}: FeaturedCaseStudiesProps) {
  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-zinc-950/40">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              <span>REAL-WORLD CLIENT PORTFOLIO</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Featured Case Studies<span className="text-blue-500">.</span>
            </h2>
            <p className="mt-3 text-zinc-400 max-w-2xl text-base leading-relaxed">
              In-depth analysis of production web platforms, B2B enterprise portals, and e-commerce systems engineered by DevOps Services Ltd for real businesses.
            </p>
          </div>

          <button
            onClick={onNavigateToAllCaseStudies}
            className="self-start md:self-end px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:border-blue-500/40 cursor-pointer group shrink-0"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-400" />
          </button>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.map((project: CaseStudy, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-blue-500/30 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Image Preview Area */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-blue-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-300 text-[10px] font-mono">
                    {project.client}
                  </span>
                </div>

                {/* Overlay Quick Action on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950/90 px-3 py-1 rounded-md border border-white/10">
                    REAL PRODUCTION PROJECT
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Highlights checklist tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.highlights.slice(0, 4).map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                        <span>{highlight}</span>
                      </span>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigateToCaseStudy(project.slug)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
                  >
                    <span>{project.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-zinc-900/50 to-zinc-950 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 hidden sm:flex">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-display font-bold text-white">Looking for complete architectural breakdowns?</h4>
              <p className="text-xs text-zinc-400 mt-1">Browse our entire case study directory with challenge notes, key features, and production tech stacks.</p>
            </div>
          </div>

          <button
            onClick={onNavigateToAllCaseStudies}
            className="px-6 py-3 rounded-xl bg-white text-zinc-950 hover:bg-blue-50 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg"
          >
            <span>Explore All Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
