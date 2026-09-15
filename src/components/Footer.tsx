import { motion } from "motion/react";
import { useSmoothScroll } from "./SmoothScroll";
import { useLanguage } from "../context/LanguageContext";
import logoImage from "../assets/images/devops_logo_1782900415278.jpg";
import { 
  Activity, 
  Linkedin, 
  Instagram, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Heart
} from "lucide-react";

const FooterTranslations: Record<string, any> = {
  EN: {
    tagline: "DevOps Services Ltd is an elite, award-winning digital creative agency. We build, manage, and optimize lightning-fast digital storefronts and systems.",
    exploreTitle: "Explore Operations",
    contactTitle: "Direct Contact",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    addressLabel: "Office Address",
    allRightsReserved: "ALL RIGHTS RESERVED.",
    privacyCode: "PRIVACY CODE",
    termsOfUtility: "TERMS OF UTILITY",
    links: [
      { label: "Our Services", target: "#services" },
      { label: "Case Studies", target: "/case-studies" },
      { label: "Manifesto / About", target: "#about" },
      { label: "Client Advocacy", target: "#testimonials" },
      { label: "Initiate Coalition", target: "#contact" }
    ]
  },
  FR: {
    tagline: "DevOps Services Ltd est une agence créative numérique d'élite primée. Nous concevons, gérons et optimisons des plateformes et systèmes en ligne ultra-rapides.",
    exploreTitle: "Explorer les opérations",
    contactTitle: "Contact direct",
    emailLabel: "Email",
    phoneLabel: "Numéro de téléphone",
    addressLabel: "Adresse du bureau",
    allRightsReserved: "TOUS DROITS RÉSERVÉS.",
    privacyCode: "CHARTE DE CONFIDENTIALITÉ",
    termsOfUtility: "CONDITIONS D'UTILISATION",
    links: [
      { label: "Nos Services", target: "#services" },
      { label: "Études de cas", target: "/case-studies" },
      { label: "Manifeste / À Propos", target: "#about" },
      { label: "Témoignages clients", target: "#testimonials" },
      { label: "Initier un projet", target: "#contact" }
    ]
  },
  DE: {
    tagline: "DevOps Services Ltd ist eine preisgekrönte, erstklassige Digitalagentur. Wir entwickeln, verwalten und optimieren blitzschnelle digitale Plattformen und Systeme.",
    exploreTitle: "Arbeitsbereiche erkunden",
    contactTitle: "Direktkontakt",
    emailLabel: "E-Mail",
    phoneLabel: "Telefonnummer",
    addressLabel: "Büroadresse",
    allRightsReserved: "ALLE RECHTE VORBEHALTEN.",
    privacyCode: "DATENSCHUTZERKLÄRUNG",
    termsOfUtility: "NUTZUNGSBEDINGUNGEN",
    links: [
      { label: "Unsere Leistungen", target: "#services" },
      { label: "Fallstudien", target: "/case-studies" },
      { label: "Manifest / Über uns", target: "#about" },
      { label: "Kundenstimmen", target: "#testimonials" },
      { label: "Projekt anfragen", target: "#contact" }
    ]
  },
  JP: {
    tagline: "DevOps Services Ltdは、受賞歴を誇る最先端のデジタルクリエイティブエージェンシーです。超高速なデジタル体験、店舗、システムを構築・保守・最適化します。",
    exploreTitle: "メニュー",
    contactTitle: "直接のお問い合わせ",
    emailLabel: "メールアドレス",
    phoneLabel: "電話番号",
    addressLabel: "オフィス住所",
    allRightsReserved: "ALL RIGHTS RESERVED.",
    privacyCode: "プライバシーポリシー",
    termsOfUtility: "利用規約",
    links: [
      { label: "提供サービス", target: "#services" },
      { label: "ケーススタディ", target: "/case-studies" },
      { label: "会社概要 / マニフェスト", target: "#about" },
      { label: "お客様の声", target: "#testimonials" },
      { label: "協働のご依頼", target: "#contact" }
    ]
  }
};

export default function Footer() {
  const lenis = useSmoothScroll();
  const { language } = useLanguage();
  const t = FooterTranslations[language] || FooterTranslations.EN;

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (target: string) => {
    if (target.startsWith("/")) {
      window.history.pushState({}, "", target);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/" + target);
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-white/5 pt-20 pb-12 overflow-hidden">
      
      {/* Visual background gradient flare */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Footer Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-10 md:gap-16 pb-16 border-b border-white/5"
        >
          
          {/* Logo & Manifesto */}
          <div className="col-span-12 md:col-span-5 flex flex-col items-start text-left">
            <button 
              onClick={() => handleNavClick("#hero")}
              className="flex items-center gap-2.5 text-white font-display font-bold text-xl tracking-tight select-none cursor-pointer group mb-6"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-md">
                <img 
                  src={logoImage} 
                  alt="DevOps Services Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-semibold text-lg">DevOps Services</span>
                <span className="text-[9px] font-mono tracking-widest text-blue-400 font-medium">LTD</span>
              </div>
            </button>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
              {t.tagline}
            </p>

            {/* Social Icons with empty href placeholders */}
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                data-hover-expand
                data-hover-text="LINKEDIN"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white border border-white/5 hover:border-blue-500/30 flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                data-hover-expand
                data-hover-text="INSTAGRAM"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white border border-white/5 hover:border-blue-500/30 flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/SobanHaroon" 
                target="_blank"
                rel="noopener noreferrer"
                data-hover-expand
                data-hover-text="GITHUB"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-blue-600 text-zinc-400 hover:text-white border border-white/5 hover:border-blue-500/30 flex items-center justify-center transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-12 sm:col-span-6 md:col-span-3 text-left">
            <h4 className="text-white font-display font-semibold text-sm tracking-tight mb-6">
              {t.exploreTitle}
            </h4>
            <ul className="space-y-3">
              {t.links.map((link: any) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.target)}
                    className="text-zinc-400 hover:text-white text-xs sm:text-sm cursor-pointer transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Contact Column with real DevOps Services details */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 text-left">
            <h4 className="text-white font-display font-semibold text-sm tracking-tight mb-6">
              {t.contactTitle}
            </h4>
            <div className="space-y-5 bg-white/[0.02] border border-white/5 p-5 rounded-2xl backdrop-blur-sm">
              
              {/* Email Slot */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/15 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">{t.emailLabel}</span>
                  <a 
                    href="mailto:devopsservicesltd@gmail.com" 
                    className="text-zinc-300 hover:text-blue-400 transition-colors font-mono text-xs break-all"
                  >
                    devopsservicesltd@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Slot */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/15 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">{t.phoneLabel}</span>
                  <a 
                    href="tel:+923354006114" 
                    className="text-zinc-300 hover:text-blue-400 transition-colors font-mono text-xs"
                  >
                    +92 335 4006114
                  </a>
                </div>
              </div>

              {/* Location Slot */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/15 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">{t.addressLabel}</span>
                  <span className="text-zinc-300 text-xs leading-relaxed">
                    Rawalpindi, Pakistan
                  </span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>

        {/* Bottom copyright row */}
        <div className="pt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-mono text-zinc-500">
          
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} DEVOPS SERVICES LTD. {t.allRightsReserved}</span>
          </div>

          {/* Quick legal/social link icon groupings */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">{t.privacyCode}</a>
            <a href="#" className="hover:text-white transition-colors">{t.termsOfUtility}</a>
            
            <button
              onClick={handleScrollToTop}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
