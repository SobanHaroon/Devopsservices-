import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language, dictionary } = useLanguage();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-36 overflow-hidden bg-zinc-950/20">
      
      {/* Background illumination radial glow */}
      <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with elegante reveal */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-4"
          >
            <span>{dictionary.faq.sectionTag}</span>
            <span className="w-8 h-[1px] bg-blue-500/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight"
          >
            {dictionary.faq.sectionTitle}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto"
          >
            {dictionary.faq.sectionDesc}
          </motion.p>
        </div>

        {/* Faq Items Accordion Stack */}
        <div className="space-y-4">
          {dictionary.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            const countStr = (index + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                  isOpen 
                    ? "bg-zinc-900/30 border-blue-500/30 shadow-xl shadow-blue-900/5 backdrop-blur-md" 
                    : "bg-zinc-900/10 border-white/5 hover:border-white/10 hover:bg-zinc-900/15"
                }`}
                onClick={() => toggleFaq(index)}
              >
                {/* Header Title Bar */}
                <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                  
                  <div className="flex items-center gap-4 sm:gap-6 text-left">
                    <span className="font-mono text-zinc-600 text-xs sm:text-sm font-medium group-hover:text-blue-500/50 transition-colors duration-500 select-none">
                      {countStr}
                    </span>
                    
                    <div className="flex flex-col items-start">
                      <span className="text-[8px] font-mono font-bold text-blue-400 tracking-widest uppercase mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-display font-semibold text-sm sm:text-base md:text-lg text-white tracking-tight">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isOpen 
                      ? "bg-blue-600/10 border-blue-500/30 text-blue-400 rotate-90" 
                      : "bg-white/5 border-white/5 text-zinc-500"
                  }`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>

                </div>

                {/* Answer Expanded Reveal panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="border-t border-white/5 bg-zinc-950/20"
                    >
                      <div className="px-6 pb-8 pt-6 md:px-12 md:pb-10 md:pt-8 text-left">
                        <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                          {item.answer}
                        </p>
                        
                        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-600">
                          <span>
                            {language === "JP" ? "デブオプス・サービス・パラダイム" : language === "FR" ? "PARADIGME DE SERVICE DEVOPS" : language === "DE" ? "DEVOPS-SERVICE-PARADIGMA" : "DEVOPS SERVICE PARADIGM"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-blue-400">
                            {language === "JP" ? "マイルストーンについて詳しく知る" : language === "FR" ? "EN SAVOIR PLUS SUR LES JALONS" : language === "DE" ? "MEHR UEBER MEILENSTEINE ERFAHREN" : "LEARN MORE ABOUT MILESTONES"}
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
