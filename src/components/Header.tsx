import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSmoothScroll } from "./SmoothScroll";
import { Menu, X, ArrowRight, Activity, Contrast } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import logoImage from "../assets/images/devops_logo_1782900415278.jpg";

interface HeaderProps {
  theme?: "dark" | "midnight";
  toggleTheme?: () => void;
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export default function Header({ theme = "dark", toggleTheme, currentRoute = "/", onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useSmoothScroll();
  const { language, setLanguage, dictionary } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: dictionary.nav.services, target: "#services" },
    { label: "Case Studies", target: "/case-studies" },
    { label: dictionary.nav.about, target: "#about" },
    { label: dictionary.nav.faq, target: "#faq" },
    { label: dictionary.nav.testimonials, target: "#testimonials" },
    { label: dictionary.nav.contact, target: "#contact" },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);

    if (target.startsWith("/")) {
      if (onNavigate) {
        onNavigate(target);
      } else {
        window.history.pushState({}, "", target);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
      return;
    }

    if (currentRoute !== "/") {
      if (onNavigate) {
        onNavigate("/" + target);
      } else {
        window.history.pushState({}, "", "/" + target);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.5,
      });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        id="app-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? "py-4 bg-zinc-950/70 border-b border-white/5 backdrop-blur-xl shadow-xl shadow-black/20" 
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2.5 text-white font-display font-bold text-xl tracking-tight select-none group cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-md">
              <img 
                src={logoImage} 
                alt="DevOps Services Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="font-semibold text-lg text-white">DevOps Services</span>
              <span className="text-[9px] font-mono tracking-widest text-blue-400 font-medium">LTD</span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.target)}
                className="text-sm font-medium text-zinc-400 hover:text-white cursor-pointer transition-colors duration-300 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-blue-500 origin-bottom-right scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>
            ))}
          </nav>

          {/* Connect Action CTA & Language Toggle */}
          <div className="hidden md:flex items-center gap-5">
            {/* Inline Language Selector */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/60 border border-white/5 text-[10px] font-mono">
              {(["EN", "FR", "DE", "JP"] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full cursor-pointer transition-all duration-300 ${
                    language === lang
                      ? "bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30 shadow-md"
                      : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Midnight High-Contrast" : "Switch to Standard Dark"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 hover:bg-zinc-800 border border-white/5 text-[10px] font-mono text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer select-none shrink-0"
            >
              <Contrast className={`w-3.5 h-3.5 transition-transform duration-500 ${theme === "midnight" ? "rotate-180 text-cyan-400" : "text-blue-400"}`} />
              <span className="uppercase tracking-wider font-semibold">
                {theme === "dark" ? "Standard" : "Midnight HC"}
              </span>
            </button>

            <button
              onClick={() => handleNavClick("#contact")}
              data-hover-expand
              className="relative px-5 py-2.5 bg-white/5 text-white text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 overflow-hidden cursor-pointer group transition-all duration-300 hover:border-blue-500/30 shrink-0"
            >
              {/* Shifting Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <span className="flex items-center gap-2 relative z-10">
                {dictionary.nav.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Tiny mobile indicator */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-colors animate-fade-in"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Fullscreen Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[70px] z-30 md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-white/5 py-8 px-6 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.target)}
                  className="text-left text-lg font-medium text-zinc-300 hover:text-white cursor-pointer py-1.5 border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">LANGUAGE PROTOCOL</span>
                <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-mono">
                  {(["EN", "FR", "DE", "JP"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 rounded-full cursor-pointer transition-all duration-300 ${
                        language === lang
                          ? "bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30"
                          : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Theme Selector */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">VISUAL ENGINE</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  <Contrast className={`w-3.5 h-3.5 transition-transform duration-500 ${theme === "midnight" ? "rotate-180 text-cyan-400" : "text-blue-400"}`} />
                  <span className="uppercase tracking-wider font-semibold">
                    {theme === "dark" ? "STANDARD DARK" : "MIDNIGHT HC"}
                  </span>
                </button>
              </div>

              <button
                onClick={() => handleNavClick("#contact")}
                className="mt-4 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/20"
              >
                {dictionary.nav.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
