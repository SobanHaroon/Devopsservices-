import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TESTIMONIALS_DATA, Testimonial } from "../types";
import { Star, Quote, MessageSquare, Check, Sparkles, Loader2, AlertCircle, Award } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const TestimonialTranslations: Record<string, Record<string, any>> = {
  EN: {
    sectionTag: "05 // PARTNER ADVOCACY BOARD",
    sectionTitle: "Leave Your Experience.",
    sectionDesc: "We strive for architectural excellence. Share your testimonial and rate our engineering services in real-time.",
    trustScoreLabel: "Average Trust Score",
    verifiedReviewsLabel: "Verified Reviews",
    submissionsCount: "Submissions",
    satisfactionLabel: "Client satisfaction",
    satisfactionValue: "100% Guaranteed",
    submitFeedbackTitle: "Submit Feedback",
    ratingLabel: "Review Rating",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "e.g. Sarah Connor",
    roleLabel: "Role / Designation",
    rolePlaceholder: "e.g. Chief Technical Officer",
    companyLabel: "Company Name",
    companyPlaceholder: "e.g. TechCorp Solutions",
    reviewLabel: "Your Review",
    reviewPlaceholder: "Share your experience working with DevOps Services Ltd...",
    minChars: "Min 15 chars",
    publishButton: "Publish Feedback",
    publishingButton: "Publishing Testimonial...",
    successTitle: "Successfully published!",
    successDesc: "Your review has been added to our live partner feedback board.",
    liveFeedTitle: "Live Partner Feed",
    realTimeUpdates: "Real-Time Updates",
    errAuthor: "Your name is required",
    errCompany: "Company name is required",
    errQuote: "Feedback quote is required",
    errQuoteLength: "Please share a bit more detail (at least 15 characters)",
    defaultTestimonials: [
      {
        id: "1",
        author: "Elena Vance",
        role: "VP of Product",
        company: "Nexis Global",
        quote: "DevOps Services completely re-imagined our online presence. Our custom platform is fast, stunning, and has doubled our leads in less than six months. Their operational website management gives us total peace of mind.",
        rating: 5
      },
      {
        id: "2",
        author: "Marcus Aurel",
        role: "Founder",
        company: "Valo Digital",
        quote: "Their UI/UX design is world-class, and their technical SEO strategy put us in the top three positions on Google for all high-intent terms. An elite team that works with meticulous care and incredible speed.",
        rating: 5
      },
      {
        id: "3",
        author: "Clara Tremblay",
        role: "Chief Marketing Officer",
        company: "Elysium Group",
        quote: "The brand identity designed by DevOps Services Ltd is breathtaking. It instantly elevated our company's market perception. Their business automation structures save our team over 30 hours of work every week.",
        rating: 5
      }
    ]
  },
  FR: {
    sectionTag: "05 // TRIBUNE DE NOS PARTENAIRES",
    sectionTitle: "Partagez votre expérience.",
    sectionDesc: "Nous visons l'excellence architecturale. Partagez votre témoignage et évaluez nos services d'ingénierie en temps réel.",
    trustScoreLabel: "Score de confiance moyen",
    verifiedReviewsLabel: "Avis vérifiés",
    submissionsCount: "Soumissions",
    satisfactionLabel: "Satisfaction client",
    satisfactionValue: "100% Garantie",
    submitFeedbackTitle: "Donner un avis",
    ratingLabel: "Note de l'avis",
    fullNameLabel: "Nom complet",
    fullNamePlaceholder: "ex. Sarah Connor",
    roleLabel: "Rôle / Poste",
    rolePlaceholder: "ex. Directrice de la Technologie",
    companyLabel: "Nom de l'entreprise",
    companyPlaceholder: "ex. TechCorp Solutions",
    reviewLabel: "Votre avis",
    reviewPlaceholder: "Partagez votre expérience avec DevOps Services Ltd...",
    minChars: "Min. 15 caractères",
    publishButton: "Publier l'avis",
    publishingButton: "Publication de l'avis...",
    successTitle: "Publié avec succès !",
    successDesc: "Votre avis a été ajouté à notre fil de retour en direct.",
    liveFeedTitle: "Avis en direct de nos partenaires",
    realTimeUpdates: "Mises à jour en direct",
    errAuthor: "Votre nom est requis",
    errCompany: "Le nom de l'entreprise est requis",
    errQuote: "Le contenu de l'avis est requis",
    errQuoteLength: "Veuillez détailler un peu plus votre avis (au moins 15 caractères)",
    defaultTestimonials: [
      {
        id: "1",
        author: "Elena Vance",
        role: "Vice-présidente Produit",
        company: "Nexis Global",
        quote: "DevOps Services a complètement réinventé notre présence en ligne. Notre plateforme personnalisée est rapide, superbe et a doublé nos prospects en moins de six mois. Leur gestion opérationnelle de site web nous offre une tranquillité d'esprit totale.",
        rating: 5
      },
      {
        id: "2",
        author: "Marcus Aurel",
        role: "Fondateur",
        company: "Valo Digital",
        quote: "Leur design UI/UX est de classe mondiale et leur stratégie SEO technique nous a propulsés dans les trois premières positions de Google pour tous nos mots-clés stratégiques. Une équipe d'élite qui travaille avec un soin méticuleux et une rapidité incroyable.",
        rating: 5
      },
      {
        id: "3",
        author: "Clara Tremblay",
        role: "Directrice du Marketing",
        company: "Elysium Group",
        quote: "L'identité de marque conçue par DevOps Services Ltd est époustouflante. Elle a instantanément rehaussé l'image de marque de notre entreprise. Leurs systèmes d'automatisation d'entreprise font gagner plus de 30 heures de travail par semaine à notre équipe.",
        rating: 5
      }
    ]
  },
  DE: {
    sectionTag: "05 // PARTNER-PROFIL-BOARD",
    sectionTitle: "Teilen Sie Ihre Erfahrung.",
    sectionDesc: "Wir streben nach architektonischer Exzellenz. Teilen Sie Ihr Feedback und bewerten Sie unsere Ingenieurleistungen in Echtzeit.",
    trustScoreLabel: "Durchschnittliche Bewertung",
    verifiedReviewsLabel: "Verifizierte Bewertungen",
    submissionsCount: "Einsendungen",
    satisfactionLabel: "Kundenzufriedenheit",
    satisfactionValue: "100% Garantiert",
    submitFeedbackTitle: "Feedback senden",
    ratingLabel: "Bewertung",
    fullNameLabel: "Vollständiger Name",
    fullNamePlaceholder: "z.B. Sarah Connor",
    roleLabel: "Position / Rolle",
    rolePlaceholder: "z.B. Technischer Leiter",
    companyLabel: "Unternehmensname",
    companyPlaceholder: "z.B. TechCorp Solutions",
    reviewLabel: "Ihre Bewertung",
    reviewPlaceholder: "Teilen Sie Ihre Erfahrungen mit DevOps Services Ltd...",
    minChars: "Mind. 15 Zeichen",
    publishButton: "Feedback veröffentlichen",
    publishingButton: "Veröffentliche Feedback...",
    successTitle: "Erfolgreich veröffentlicht!",
    successDesc: "Ihre Bewertung wurde unserem Live-Feedback-Board hinzugefügt.",
    liveFeedTitle: "Live-Partner-Feedback",
    realTimeUpdates: "Echtzeit-Updates",
    errAuthor: "Ihr Name ist erforderlich",
    errCompany: "Unternehmensname ist erforderlich",
    errQuote: "Bewertungstext ist erforderlich",
    errQuoteLength: "Bitte teilen Sie uns etwas mehr Details mit (mindestens 15 Zeichen)",
    defaultTestimonials: [
      {
        id: "1",
        author: "Elena Vance",
        role: "VP of Product",
        company: "Nexis Global",
        quote: "DevOps Services hat unsere Online-Präsenz komplett neu gestaltet. Unsere maßgeschneiderte Plattform ist blitzschnell, atemberaubend und hat unsere Leads in weniger als sechs Monaten verdoppelt. Ihre professionelle Website-Verwaltung gibt uns absolute Sicherheit.",
        rating: 5
      },
      {
        id: "2",
        author: "Marcus Aurel",
        role: "Gründer",
        company: "Valo Digital",
        quote: "Ihr UI/UX-Design ist Weltklasse, und ihre technische SEO-Strategie hat uns für alle wichtigen Begriffe auf die ersten drei Google-Plätze gebracht. Ein Elite-Team, das mit äußerster Präzision und unglaublicher Geschwindigkeit arbeitet.",
        rating: 5
      },
      {
        id: "3",
        author: "Clara Tremblay",
        role: "Chief Marketing Officer",
        company: "Elysium Group",
        quote: "Die von DevOps Services Ltd entworfene Markenidentität ist atemberaubend. Sie hat das Image unseres Unternehmens auf dem Markt sofort aufgewertet. Ihre Geschäftsautomatisierungen sparen unserem Team wöchentlich über 30 Arbeitsstunden.",
        rating: 5
      }
    ]
  },
  JP: {
    sectionTag: "05 // パートナー評価ボード",
    sectionTitle: "体験をシェアする",
    sectionDesc: "私たちは常に技術の極致を追求しています。お客様の声を共有し、リアルタイムで当社のエンジニアリングを評価してください。",
    trustScoreLabel: "平均信頼スコア",
    verifiedReviewsLabel: "確認済みのレビュー",
    submissionsCount: "件の投稿",
    satisfactionLabel: "クライアント満足度",
    satisfactionValue: "100% 保証",
    submitFeedbackTitle: "フィードバックを投稿する",
    ratingLabel: "評価",
    fullNameLabel: "お名前（フルネーム）",
    fullNamePlaceholder: "例：サラ・コナー",
    roleLabel: "役職 / 職種",
    rolePlaceholder: "例：最高技術責任者（CTO）",
    companyLabel: "会社名",
    companyPlaceholder: "例：テックコーポレーション",
    reviewLabel: "レビュー内容",
    reviewPlaceholder: "DevOps Services Ltd との取り組みに関するご感想をお書きください...",
    minChars: "最小15文字以上",
    publishButton: "フィードバックを投稿する",
    publishingButton: "フィードバックを公開中...",
    successTitle: "公開に成功しました！",
    successDesc: "レビューがライブパートナーフィードに追加されました。",
    liveFeedTitle: "ライブパートナーフィード",
    realTimeUpdates: "リアルタイム更新中",
    errAuthor: "お名前は必須です",
    errCompany: "会社名は必須です",
    errQuote: "レビュー内容は必須です",
    errQuoteLength: "もう少し詳しくご記入ください（少なくとも15文字必要です）",
    defaultTestimonials: [
      {
        id: "1",
        author: "エレナ・ヴァンス",
        role: "製品担当バイスプレジデント",
        company: "ネクシス・グローバル",
        quote: "DevOps Servicesは当社のデジタルプレゼンスを劇的に変革しました。カスタム構築された新プラットフォームは非常に高速で、わずか半年でリード数が2倍に増加しました。継続的なWebサイト管理は素晴らしい安心感をもたらしています。",
        rating: 5
      },
      {
        id: "2",
        author: "マーカス・アウレル",
        role: "創業者",
        company: "ヴァロ・デジタル",
        quote: "UI/UXデザインは最高峰の品質で、高度な技術的SEO施策により主力キーワードのすべてでGoogle検索上位3位を達成しました。一切の妥協なく迅速に業務を遂行するエリートエンジニア集団です。",
        rating: 5
      },
      {
        id: "3",
        author: "クララ・トレンブレイ",
        role: "最高マーケティング責任者（CMO）",
        company: "エリジウム・グループ",
        quote: "DevOps Services Ltdが構築したブランドアイデンティティには息を呑みました。市場における当社の信頼とブランド価値を瞬時に引き上げ、ビジネス自動化の仕組みによって毎週30時間以上の業務削減に成功しています。",
        rating: 5
      }
    ]
  }
};

export default function Testimonials() {
  const { language } = useLanguage();
  const t = TestimonialTranslations[language] || TestimonialTranslations.EN;

  // Load testimonials from localStorage or fallback to default data
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("devops_services_reviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return TESTIMONIALS_DATA;
      }
    }
    return TESTIMONIALS_DATA;
  });

  const [formState, setFormState] = useState({
    author: "",
    role: "",
    company: "",
    quote: "",
    rating: 5,
  });

  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync reviews with localStorage when updated
  useEffect(() => {
    localStorage.setItem("devops_services_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleRatingClick = (rating: number) => {
    setFormState((prev) => ({ ...prev, rating }));
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formState.author.trim()) {
      tempErrors.author = t.errAuthor;
    }
    if (!formState.company.trim()) {
      tempErrors.company = t.errCompany;
    }
    if (!formState.quote.trim()) {
      tempErrors.quote = t.errQuote;
    } else if (formState.quote.trim().length < 15) {
      tempErrors.quote = t.errQuoteLength;
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate premium agency server persistence delay
    setTimeout(() => {
      const newReview: Testimonial = {
        id: Date.now().toString(),
        author: formState.author.trim(),
        role: formState.role.trim() || "Partner",
        company: formState.company.trim(),
        quote: formState.quote.trim(),
        rating: formState.rating,
      };

      setReviews((prev) => [newReview, ...prev]);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({
        author: "",
        role: "",
        company: "",
        quote: "",
        rating: 5,
      });

      // Reset success state after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Calculate stats
  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  // Map reviews dynamically for translations of defaults
  const localizedReviews = reviews.map((r) => {
    if (r.id === "1" || r.id === "2" || r.id === "3") {
      const matched = t.defaultTestimonials.find((item: any) => item.id === r.id);
      return matched ? { ...r, ...matched } : r;
    }
    return r;
  });

  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-zinc-950/30 overflow-hidden">
      {/* Sleek top separator line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-4"
          >
            <span>{t.sectionTag}</span>
            <span className="w-8 h-[1px] bg-blue-500/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            {t.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-zinc-400 text-sm md:text-base max-w-xl mt-4 leading-relaxed"
          >
            {t.sectionDesc}
          </motion.p>
        </div>

        {/* Dashboard Statistics Overview Banner */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 bg-zinc-950/40"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-400 fill-blue-400/20" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{t.trustScoreLabel}</p>
              <h4 className="text-2xl font-bold text-white font-display mt-0.5">{averageRating} / 5.0</h4>
            </div>
          </motion.div>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 bg-zinc-950/40"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{t.verifiedReviewsLabel}</p>
              <h4 className="text-2xl font-bold text-white font-display mt-0.5">{reviews.length} {t.submissionsCount}</h4>
            </div>
          </motion.div>
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 bg-zinc-950/40"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{t.satisfactionLabel}</p>
              <h4 className="text-2xl font-bold text-white font-display mt-0.5">{t.satisfactionValue}</h4>
            </div>
          </motion.div>
        </motion.div>

        {/* Split Grid: Form & Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Submission Form */}
          <motion.div 
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-zinc-950/50 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-blue-400" />
                {t.submitFeedbackTitle}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Star Rating Select */}
                <div className="text-left">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    {t.ratingLabel} <span className="text-blue-400">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 transition-all duration-200 ${
                            star <= (hoveredRating ?? formState.rating)
                              ? "fill-blue-500 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                              : "text-zinc-700 hover:text-zinc-500"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-zinc-500 font-mono ml-2">
                      ({formState.rating} / 5)
                    </span>
                  </div>
                </div>

                {/* Author Name */}
                <div className="text-left">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    {t.fullNameLabel} <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.author}
                    onChange={(e) => setFormState((p) => ({ ...p, author: e.target.value }))}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  />
                  {errors.author && (
                    <p className="text-red-400 text-xs font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.author}
                    </p>
                  )}
                </div>

                {/* Role / Job Title */}
                <div className="text-left">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    {t.roleLabel} <span className="text-zinc-600">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formState.role}
                    onChange={(e) => setFormState((p) => ({ ...p, role: e.target.value }))}
                    placeholder={t.rolePlaceholder}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>

                {/* Company Name */}
                <div className="text-left">
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    {t.companyLabel} <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState((p) => ({ ...p, company: e.target.value }))}
                    placeholder={t.companyPlaceholder}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  />
                  {errors.company && (
                    <p className="text-red-400 text-xs font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.company}
                    </p>
                  )}
                </div>

                {/* Review Message */}
                <div className="text-left">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {t.reviewLabel} <span className="text-blue-400">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-zinc-600">
                      {t.minChars}
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    value={formState.quote}
                    onChange={(e) => setFormState((p) => ({ ...p, quote: e.target.value }))}
                    placeholder={t.reviewPlaceholder}
                    className="w-full bg-zinc-900/60 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                  />
                  {errors.quote && (
                    <p className="text-red-400 text-xs font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.quote}
                    </p>
                  )}
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      {t.publishingButton}
                    </>
                  ) : (
                    <>
                      {t.publishButton}
                      <Check className="w-4 h-4 transition-transform group-hover:scale-125" />
                    </>
                  )}
                </button>

                {/* Success Notification message */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-2.5"
                    >
                      <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <div className="text-left">
                        <strong className="text-blue-300 block text-xs">{t.successTitle}</strong>
                        <p className="text-[11px] text-zinc-300 leading-relaxed mt-0.5">
                          {t.successDesc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </motion.div>

          {/* RIGHT: Live Reviews Board */}
          <motion.div 
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 max-h-[680px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-semibold text-lg text-white">
                {t.liveFeedTitle}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                {t.realTimeUpdates}
              </div>
            </div>

            <AnimatePresence initial={false}>
              {localizedReviews.map((review) => {
                // Generate a visual avatar background color based on name length
                const colors = [
                  "from-blue-600 to-indigo-600",
                  "from-cyan-600 to-blue-600",
                  "from-teal-600 to-emerald-600",
                  "from-violet-600 to-purple-600"
                ];
                const bgGradient = colors[review.author.length % colors.length];

                return (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel p-6 rounded-2xl border border-white/5 bg-zinc-950/20 hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 text-left">
                      
                      {/* Interactive Avatar */}
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${bgGradient} flex items-center justify-center font-display font-bold text-white shrink-0 shadow-lg shadow-blue-500/5 select-none`}>
                        {review.author.substring(0, 1).toUpperCase()}
                      </div>

                      <div className="flex-1 space-y-3">
                        
                        {/* Header Details: Author, stars & date */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h4 className="font-display font-semibold text-white text-sm sm:text-base">
                              {review.author}
                            </h4>
                            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mt-0.5">
                              {review.role} // <span className="text-blue-400">{review.company}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < review.rating
                                    ? "fill-blue-500 text-blue-500"
                                    : "text-zinc-800"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review Message Text */}
                        <div className="relative">
                          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-white/5 pointer-events-none select-none" />
                          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic pl-3">
                            "{review.quote}"
                          </p>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
