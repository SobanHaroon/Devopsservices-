import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Service, Project, ValueCard, Testimonial } from "../types";

export type LanguageType = "EN" | "FR" | "DE" | "JP";

interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

interface Dictionary {
  nav: {
    about: string;
    services: string;
    faq: string;
    portfolio: string;
    testimonials: string;
    contact: string;
    cta: string;
  };
  hero: {
    badgePartner: string;
    badgeAgency: string;
    words: string[];
    subheading: string;
    ctaInitiate: string;
    ctaExplore: string;
    activeOperations: string;
    liveTelemetry: string;
    mockupTitle: string;
    mockupDesc: string;
    systemLatency: string;
    systemLatencySub: string;
    conversionRate: string;
    conversionRateSub: string;
    capabilityParadigm: string;
    capabilities: string[];
    verdict: string;
    verdictSource: string;
  };
  about: {
    sectionNum: string;
    heading: string;
    subheading: string;
    interactiveConsole: string;
    consoleLog: string;
    consoleLogSuccess: string;
    consoleMetrics: string;
    values: ValueCard[];
  };
  services: {
    sectionNum: string;
    heading: string;
    subheading: string;
    detailsTitle: string;
    ctaClose: string;
    items: Service[];
  };
  faq: {
    sectionNum: string;
    heading: string;
    subheading: string;
    engagement: string;
    learnMore: string;
    items: FaqItem[];
  };
  portfolio: {
    sectionNum: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterWebDev: string;
    filterSaaS: string;
    filterBrand: string;
    viewProject: string;
    detailsLabel: string;
    yearLabel: string;
    clientLabel: string;
    items: Project[];
  };
  testimonials: {
    sectionNum: string;
    heading: string;
    subheading: string;
    statTrust: string;
    statReviews: string;
    statSatisfaction: string;
    statReviewsSub: string;
    statSatisfactionSub: string;
    formTitle: string;
    formRating: string;
    formName: string;
    formRole: string;
    formCompany: string;
    formReview: string;
    formReviewSub: string;
    btnSubmit: string;
    btnSubmitting: string;
    msgSuccessTitle: string;
    msgSuccessText: string;
    boardTitle: string;
    boardSub: string;
    items: Testimonial[];
  };
  contact: {
    sectionNum: string;
    heading: string;
    subheading: string;
    sidebarTitle: string;
    sidebarDesc: string;
    directContact: string;
    officeAddress: string;
    formFullName: string;
    formCompany: string;
    formEmail: string;
    formPhone: string;
    formCountry: string;
    formIndustry: string;
    formService: string;
    formBudget: string;
    formDescription: string;
    formDescriptionSub: string;
    btnSubmit: string;
    btnSubmitting: string;
    successTitle: string;
    successDesc: string;
    successRecipient: string;
    successCompany: string;
    successBudget: string;
    successService: string;
    btnMailClient: string;
    btnNewBrief: string;
    servicesList: string[];
  };
  footer: {
    desc: string;
    columnLinks: string;
    columnContact: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    allRightsReserved: string;
    curatedBy: string;
  };
}

const DICTIONARIES: Record<LanguageType, Dictionary> = {
  EN: {
    nav: {
      about: "About",
      services: "Services",
      faq: "FAQ",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
      cta: "Get in Touch"
    },
    hero: {
      badgePartner: "AWWWARDS CREATIVE PARTNER",
      badgeAgency: "DEVOPS SERVICES LTD",
      words: ["WE", "ENGINEER", "DIGITAL", "ASCENT"],
      subheading: "We engineer flawless website development, robust 24/7 management, high-fidelity UI/UX, and data-driven marketing funnels. Tailored for companies seeking premium digital execution.",
      ctaInitiate: "Initiate Project",
      ctaExplore: "Explore Services",
      activeOperations: "ACTIVE OPERATIONS ENGINE",
      liveTelemetry: "LIVE TELEMETRY",
      mockupTitle: "Architecting Scalable Corporate Infrastructures",
      mockupDesc: "We replace bottleneck systems with reactive micro-architectures that scale on-demand. Deploying with a sub-second Lighthouse budget is our default baseline.",
      systemLatency: "14ms",
      systemLatencySub: "▲ 410% FASTER SPEED",
      conversionRate: "+8.4%",
      conversionRateSub: "▲ INBOUND ROI RISE",
      capabilityParadigm: "OUR CAPABILITY PARADIGM",
      capabilities: [
        "Surgical UI/UX Prototyping",
        "99.99% Node Container Uptime",
        "Dynamic Elastic Workflows",
        "Global Content Delivery (Edge)"
      ],
      verdict: "\"Exquisite pacing, premium visuals, and exceptional technical execution.\"",
      verdictSource: "- THE AWWWARDS VERDICT"
    },
    about: {
      sectionNum: "01 // GENESIS & CORE VALUES",
      heading: "We Build Better.",
      subheading: "DevOps Services Ltd is a Pakistan-based digital agency committed to ultimate speed, meticulous typography, and pristine front-end aesthetics.",
      interactiveConsole: "INTERACTIVE OPERATIONS CONSOLE",
      consoleLog: "Connecting secure socket tunnels to edge databases...",
      consoleLogSuccess: "Success. Cloud Node container cluster online and healthy.",
      consoleMetrics: "SYSTEM DIAGNOSTICS: COMPILING 60FPS UI TRANSITIONS",
      values: [
        {
          id: "excellence",
          title: "Surgical Precision",
          description: "We don't do 'good enough'. Our engineering designs are pixel-perfect, and our codebases are crafted like fine Swiss watches.",
          iconName: "Zap",
          metric: "99.9%",
          metricLabel: "SLA Uptime"
        },
        {
          id: "results",
          title: "Performance First",
          description: "We focus on real metrics: sub-second page loads, conversion lift, SEO prominence, and scalable architectures that grow with you.",
          iconName: "Target",
          metric: "100%",
          metricLabel: "PageSpeed Index"
        },
        {
          id: "trust",
          title: "Transparent Care",
          description: "We act as your dedicated engineering and creative directors. No hidden scopes, no communication black holes, just elite talent.",
          iconName: "Shield",
          metric: "24/7",
          metricLabel: "Dedicated Monitoring"
        },
        {
          id: "innovation",
          title: "Dynamic Evolution",
          description: "We leverage the absolute state-of-the-art frameworks and practices, from motion choreography to intelligent system automation.",
          iconName: "Sparkles",
          metric: "+150%",
          metricLabel: "Average ROI Uplift"
        }
      ]
    },
    services: {
      sectionNum: "02 // SERVICE ALLOCATIONS",
      heading: "What We Offer.",
      subheading: "Highly targeted service capabilities managed by elite engineering teams and award-winning creative directors.",
      detailsTitle: "CORE WORKFLOW PROTOCOLS",
      ctaClose: "Close Specification Panel",
      items: [
        {
          id: "web-development",
          title: "Website Development",
          description: "Next-generation, lightning-fast digital products engineered with ultra-modern code frameworks for peak scalability and performance.",
          tag: "ENGINEERING",
          iconName: "Code2",
          details: [
            "Custom React & Next.js architectures",
            "High-performance headless CMS integrations",
            "Robust state orchestration & modern APIs",
            "60FPS micro-interactions & WebGL experiences"
          ]
        },
        {
          id: "web-management",
          title: "Website Management",
          description: "Continuous cloud orchestration, visual upgrades, and technical optimization keeping your digital operation flawless and secure 24/7.",
          tag: "MAINTENANCE",
          iconName: "Settings",
          details: [
            "Enterprise cloud hosting & DNS management",
            "Proactive core web vitals speed optimization",
            "Real-time monitoring, security hardening & backups",
            "Dynamic visual & copy updates on demand"
          ]
        },
        {
          id: "ui-ux-design",
          title: "UI/UX Design",
          description: "High-fidelity digital design systems combining intuitive user psychology with timeless, elegant editorial layouts.",
          tag: "PRODUCT DESIGN",
          iconName: "Layers",
          details: [
            "Bespoke digital design system compilation",
            "Behavioral wireframing & interactive prototyping",
            "User journey mapping & usability validation",
            "Timeless minimalist typography & layout systems"
          ]
        },
        {
          id: "seo",
          title: "SEO Solutions",
          description: "Data-driven architectural and content search strategy designed to dominate high-intent organic rankings globally.",
          tag: "GROWTH",
          iconName: "TrendingUp",
          details: [
            "In-depth programmatic keyword mapping",
            "Semantic markup & structural schema integration",
            "High-authority backlink profiling & growth campaigns",
            "Comprehensive indexation audits & page-speed tuning"
          ]
        },
        {
          id: "digital-marketing",
          title: "Digital Marketing",
          description: "Strategic audience acquisition campaigns built around analytical precision, behavioral targeting, and measurable ROI.",
          tag: "PERFORMANCE",
          iconName: "Megaphone",
          details: [
            "Multi-channel advertising campaign structures",
            "Conversion rate optimization (CRO) testing",
            "Sophisticated attribution models & custom reports",
            "Behavioral retargeting & funnel orchestration"
          ]
        },
        {
          id: "brand-identity",
          title: "Brand Identity",
          description: "Distinctive typography, visual assets, brand marks, and style guidelines that build institutional trust and resonance.",
          tag: "CREATIVE DIRECTION",
          iconName: "Compass",
          details: [
            "Bespoke corporate logomark compilation",
            "Custom typography & unified color palettes",
            "Comprehensive multi-platform brand guidelines",
            "Executive visual presentations & digital assets"
          ]
        },
        {
          id: "business-automation",
          title: "Business Automation",
          description: "Intelligent background workflows, platform integrations, and operational tools designed to accelerate your growth.",
          tag: "AUTOMATION",
          iconName: "Cpu",
          details: [
            "Custom ERP & CRM workflow integrations",
            "Automated marketing pipelines & lead scoring",
            "Secure payment processing & invoice structures",
            "AI-integrated customer success middleware"
          ]
        }
      ]
    },
    faq: {
      sectionNum: "03 // FREQUENT INQUIRIES",
      heading: "Operational Clearances.",
      subheading: "Comprehensive responses explaining our professional timelines, secure cloud infrastructures, and elite delivery frameworks.",
      engagement: "DEVOPS SERVICE PARADIGM",
      learnMore: "LEARN MORE ABOUT MILESTONES",
      items: [
        {
          category: "TIMELINES & PROCESS",
          question: "What is the typical development cycle for a custom Next.js platform?",
          answer: "Our standard cycle ranges from 4 to 8 weeks depending on integration complexity. This includes a 1-week high-fidelity design system sprint, 3 weeks of high-performance frontend engineering, 2 weeks of custom server/API orchestration, and a final week of meticulous performance optimization, speed audits, and security profiling."
        },
        {
          category: "ENGAGEMENT MODELS",
          question: "Do you offer ongoing technical management after site launch?",
          answer: "Yes, our Website Management packages operate on an enterprise 24/7 SLA. This guarantees continuous container optimization, global edge CDN monitoring, core web vitals preservation, daily database backups, visual/copy update provisions, and direct slack communication with our senior engineering directors."
        },
        {
          category: "BUDGET & PRICING",
          question: "How do your service allocations and payment schedules operate?",
          answer: "We align project milestones with secure, structured delivery. Standard agreements operate on a 40/30/30 sequence (40% initiation, 30% alpha launch validation, 30% final cloud container deployment). Each phase undergoes a strict design-to-code regression test and client sign-off."
        },
        {
          category: "TECHNICAL INFRASTRUCTURE",
          question: "How do you guarantee a perfect 100% PageSpeed performance score?",
          answer: "We bypass standard heavy frameworks. Every product is custom-architected using Next.js/Vite with native TypeScript. We implement aggressive image optimization protocols, critical CSS extraction, absolute layout stability (preventing CLS), server-side rendering (SSR), and minimal dependency footprint to keep bundle sizes ultra-lean."
        },
        {
          category: "COLLABORATION MODEL",
          question: "Can we integrate custom CRM, ERP, and payment gateways?",
          answer: "Absolutely. Our Business Automation pipelines safely integrate custom REST/GraphQL APIs, Stripe payment orchestrations, Salesforce, HubSpot, or custom proprietary internal database workflows, fully protected behind enterprise encryption layers."
        }
      ]
    },
    portfolio: {
      sectionNum: "04 // THE EXHIBITION",
      heading: "Recent Ventures.",
      subheading: "A highly curated look at digital platforms and branding guidelines engineered by our teams.",
      filterAll: "ALL VENTURES",
      filterWebDev: "ENGINEERING",
      filterSaaS: "AUTOMATION & SAAS",
      filterBrand: "CREATIVE & BRANDING",
      viewProject: "Analyze Case Study",
      detailsLabel: "PROJECT DEEP BRIEF",
      yearLabel: "COMPLETION YEAR",
      clientLabel: "PARTNER CLIENT",
      items: [
        {
          id: "weather-forecast",
          title: "Weather Forecast Engine",
          category: "Web App / API Integration",
          description: "A responsive, real-time meteorological tracking platform displaying dynamic radar feeds, search parameters, and geolocation metrics.",
          imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/weather-forecast-",
          year: "2026",
          client: "Soban Haroon"
        },
        {
          id: "kfc-demo",
          title: "KFC Digital Storefront",
          category: "E-Commerce / Frontend",
          description: "An exquisite high-fidelity simulation of an e-commerce fast-food ordering menu with optimized responsive carts and stateful checkout transitions.",
          imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/KFC-Demo-",
          year: "2025",
          client: "Soban Haroon"
        },
        {
          id: "arsha",
          title: "ARSHA Corporate Hub",
          category: "UI/UX / Design Architecture",
          description: "A modern business portal built with ultra-clean corporate layouts, lightning-fast interactive features, and elegant visual hierarchies.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/ARSHA",
          year: "2025",
          client: "Soban Haroon"
        }
      ]
    },
    testimonials: {
      sectionNum: "05 // PARTNER ADVOCACY BOARD",
      heading: "Leave Your Experience.",
      subheading: "We strive for architectural excellence. Share your testimonial and rate our engineering services in real-time.",
      statTrust: "Average Trust Score",
      statReviews: "Verified Reviews",
      statSatisfaction: "Client satisfaction",
      statReviewsSub: "Submissions",
      statSatisfactionSub: "100% Guaranteed",
      formTitle: "Submit Feedback",
      formRating: "Review Rating",
      formName: "Full Name",
      formRole: "Role / Designation (Optional)",
      formCompany: "Company Name",
      formReview: "Your Review",
      formReviewSub: "Min 15 chars",
      btnSubmit: "Publish Feedback",
      btnSubmitting: "Publishing Testimonial...",
      msgSuccessTitle: "Successfully published!",
      msgSuccessText: "Your review has been added to our live partner feedback board.",
      boardTitle: "Live Partner Feed",
      boardSub: "Real-Time Updates",
      items: [
        {
          id: "1",
          quote: "DevOps Services completely re-imagined our online presence. Our custom platform is fast, stunning, and has doubled our leads in less than six months. Their operational website management gives us total peace of mind.",
          author: "Elena Vance",
          role: "VP of Product",
          company: "Nexis Global",
          rating: 5
        },
        {
          id: "2",
          quote: "Their UI/UX design is world-class, and their technical SEO strategy put us in the top three positions on Google for all high-intent terms. An elite team that works with meticulous care and incredible speed.",
          author: "Marcus Aurel",
          role: "Founder",
          company: "Valo Digital",
          rating: 5
        },
        {
          id: "3",
          quote: "The brand identity designed by DevOps Services Ltd is breathtaking. It instantly elevated our company's market perception. Their business automation structures save our team over 30 hours of work every week.",
          author: "Clara Tremblay",
          role: "Chief Marketing Officer",
          company: "Elysium Group",
          rating: 5
        }
      ]
    },
    contact: {
      sectionNum: "06 // THE COALITION",
      heading: "Initiate Launch.",
      subheading: "Engage our digital orchestration unit. Submit your project scope specifications to initialize the consultation protocol.",
      sidebarTitle: "Operation HQ",
      sidebarDesc: "Our senior design directors and systems architects are active. Tunnels are fully open.",
      directContact: "Direct Contact",
      officeAddress: "Office Address",
      formFullName: "Full Name",
      formCompany: "Company / Organization",
      formEmail: "Email Protocol Address",
      formPhone: "Secure Phone Number",
      formCountry: "Country / Region",
      formIndustry: "Your Industry Sector",
      formService: "Primary Service Required",
      formBudget: "Target Budget Range",
      formDescription: "Project Description & Objectives",
      formDescriptionSub: "Define scope criteria...",
      btnSubmit: "Transmit Project Brief",
      btnSubmitting: "Transmitting...",
      successTitle: "Brief Generated",
      successDesc: "Your project brief has been logged and drafted for secure delivery to devopsservicesltd@gmail.com. Your mail client should have opened automatically. If not, please click below to send your structured inquiry directly.",
      successRecipient: "Recipient",
      successCompany: "Company",
      successBudget: "Est. Budget",
      successService: "Protocol Service",
      btnMailClient: "Open Mail Client Manually",
      btnNewBrief: "Transmit New Brief",
      servicesList: [
        "Website Development",
        "Website Management",
        "UI/UX Design",
        "SEO Solutions",
        "Digital Marketing",
        "Brand Identity",
        "Business Automation"
      ]
    },
    footer: {
      desc: "Architecting pristine digital systems, lightning-fast interfaces, and elite visual guidelines from our operations hub in Rawalpindi, Pakistan.",
      columnLinks: "SITEMAP",
      columnContact: "DIRECT CONTACT",
      emailLabel: "Email",
      phoneLabel: "Phone Number",
      addressLabel: "Office Address",
      allRightsReserved: "All rights reserved.",
      curatedBy: "CURATED BY DEVOPS SERVICES LTD"
    }
  },
  FR: {
    nav: {
      about: "À propos",
      services: "Services",
      faq: "FAQ",
      portfolio: "Portfolio",
      testimonials: "Avis",
      contact: "Contact",
      cta: "Prendre contact"
    },
    hero: {
      badgePartner: "PARTENAIRE CRÉATIF AWWWARDS",
      badgeAgency: "DEVOPS SERVICES LTD",
      words: ["NOUS", "CONCEVONS", "L'ÉLAN", "DIGITAL"],
      subheading: "Nous concevons des sites web impeccables, assurons une gestion robuste 24h/24, fournissons une UI/UX haute-fidélité et orchestrons des tunnels de marketing axés sur les données.",
      ctaInitiate: "Lancer le Projet",
      ctaExplore: "Explorer les Services",
      activeOperations: "MOTEUR D'OPÉRATIONS ACTIF",
      liveTelemetry: "TÉLÉMÉTRIE EN DIRECT",
      mockupTitle: "Architecture d'Infrastructures d'Entreprise Évolutives",
      mockupDesc: "Nous remplaçons les goulots d'étranglement par des micro-architectures réactives adaptables à la demande. Le déploiement sous la seconde est notre standard.",
      systemLatency: "14ms",
      systemLatencySub: "▲ VITESSE ACCÉLÉRÉE DE 410%",
      conversionRate: "+8.4%",
      conversionRateSub: "▲ HAUSSE DU ROI INBOUND",
      capabilityParadigm: "NOTRE PARADIGME DE CAPACITÉS",
      capabilities: [
        "Prototypage UI/UX chirurgical",
        "Disponibilité de conteneur de 99.99%",
        "Flux de travail élastiques dynamiques",
        "Diffusion mondiale de contenu (Edge)"
      ],
      verdict: "\"Rythme exquis, visuels haut de gamme et exécution technique exceptionnelle.\"",
      verdictSource: "- LE VERDICT D'AWWWARDS"
    },
    about: {
      sectionNum: "01 // GENÈSE & VALEURS CORE",
      heading: "Nous Concevons Mieux.",
      subheading: "DevOps Services Ltd est une agence numérique basée à Londres qui s'engage à offrir une vitesse ultime, une typographie méticuleuse et une esthétique impeccable.",
      interactiveConsole: "CONSOLE D'OPÉRATIONS INTERACTIVE",
      consoleLog: "Connexion de tunnels de sockets sécurisés aux bases de données...",
      consoleLogSuccess: "Succès. Le cluster de conteneurs Cloud Node est en ligne.",
      consoleMetrics: "DIAGNOSTIC SYSTEME : COMPILATION DES TRANSITIONS 60FPS",
      values: [
        {
          id: "excellence",
          title: "Précision Chirurgicale",
          description: "Nous ne faisons pas dans le 'suffisant'. Nos conceptions techniques sont parfaites, et nos codes sont assemblés comme de l'horlogerie suisse.",
          iconName: "Zap",
          metric: "99.9%",
          metricLabel: "Disponibilité SLA"
        },
        {
          id: "results",
          title: "La Performance d'Abord",
          description: "Nous nous concentrons sur les vrais chiffres: chargements en moins d'une seconde, conversion accrue et visibilité SEO maximale.",
          iconName: "Target",
          metric: "100%",
          metricLabel: "Score PageSpeed"
        },
        {
          id: "trust",
          title: "Soin Transparent",
          description: "Nous agissons en tant que directeurs techniques et de création dédiés. Pas de coûts cachés, pas de trous noirs de communication.",
          iconName: "Shield",
          metric: "24/7",
          metricLabel: "Surveillance Dédiée"
        },
        {
          id: "innovation",
          title: "Évolution Dynamique",
          description: "Nous tirons parti des frameworks les plus récents, des animations chorégraphiées aux automatisations intelligentes.",
          iconName: "Sparkles",
          metric: "+150%",
          metricLabel: "Hausse Moyenne du ROI"
        }
      ]
    },
    services: {
      sectionNum: "02 // ATTRIBUTIONS DES SERVICES",
      heading: "Notre Offre.",
      subheading: "Des capacités de service hautement ciblées gérées par des équipes d'ingénierie d'élite et des directeurs artistiques récompensés.",
      detailsTitle: "PROTOCOLES DE WORKFLOWS CORE",
      ctaClose: "Fermer le Panneau de Spécification",
      items: [
        {
          id: "web-development",
          title: "Développement de Sites Web",
          description: "Produits digitaux de nouvelle génération, ultra-rapides, conçus avec des frameworks de code modernes pour une évolutivité de pointe.",
          tag: "INGÉNIERIE",
          iconName: "Code2",
          details: [
            "Architectures sur mesure React & Next.js",
            "Intégrations de CMS headless haute performance",
            "Orchestration d'état robuste & API modernes",
            "Micro-interactions à 60 images/seconde & WebGL"
          ]
        },
        {
          id: "web-management",
          title: "Gestion de Sites Web",
          description: "Orchestration cloud continue, mises à niveau visuelles et optimisations techniques pour une exploitation sans faille 24/7.",
          tag: "MAINTENANCE",
          iconName: "Settings",
          details: [
            "Hébergement cloud d'entreprise & gestion DNS",
            "Optimisation proactive de la vitesse Core Web Vitals",
            "Surveillance en direct, sécurité renforcée & sauvegardes",
            "Mises à jour visuelles et textuelles à la demande"
          ]
        },
        {
          id: "ui-ux-design",
          title: "Design UI/UX",
          description: "Systèmes de design numérique haute-fidélité alliant psychologie utilisateur et mises en page éditoriales intemporelles.",
          tag: "CONCEPTION PRODUIT",
          iconName: "Layers",
          details: [
            "Création de chartes et systèmes de design sur mesure",
            "Zonage comportemental & prototypage interactif",
            "Cartographie du parcours utilisateur & tests de convivialité",
            "Typographie minimaliste & grilles de mise en page"
          ]
        },
        {
          id: "seo",
          title: "Solutions Référencement",
          description: "Stratégie de contenu et d'architecture axée sur les données pour dominer les résultats de recherche organique à l'échelle mondiale.",
          tag: "CROISSANCE",
          iconName: "TrendingUp",
          details: [
            "Cartographie approfondie des mots-clés programmatiques",
            "Balisage sémantique & intégration de schémas structurés",
            "Profilage de liens retour & campagnes d'autorité",
            "Audits complets d'indexation & réglage de la vitesse"
          ]
        },
        {
          id: "digital-marketing",
          title: "Marketing Digital",
          description: "Campagnes d'acquisition d'audience stratégiques articulées autour d'une précision analytique et d'un ciblage comportemental.",
          tag: "PERFORMANCE",
          iconName: "Megaphone",
          details: [
            "Structures de campagnes publicitaires multi-canaux",
            "Tests d'optimisation du taux de conversion (CRO)",
            "Modèles d'attribution sophistiqués & rapports personnalisés",
            "Reciblage comportemental & orchestration de tunnels"
          ]
        },
        {
          id: "brand-identity",
          title: "Identité de Marque",
          description: "Typographie distinctive, chartes graphiques, logos et guides de style qui renforcent la confiance institutionnelle.",
          tag: "DIRECTION CRÉATIVE",
          iconName: "Compass",
          details: [
            "Conception de logomarks d'entreprise sur mesure",
            "Typographies personnalisées & palettes de couleurs unifiées",
            "Directives de marque multi-plateformes exhaustives",
            "Présentations visuelles exécutives & actifs numériques"
          ]
        },
        {
          id: "business-automation",
          title: "Automatisation de Processus",
          description: "Flux de travail automatisés intelligents, intégrations de plateformes et outils opérationnels conçus pour accélérer votre croissance.",
          tag: "AUTOMATISATION",
          iconName: "Cpu",
          details: [
            "Intégrations de flux de travail ERP & CRM sur mesure",
            "Pipelines de marketing automatisés & notation de prospects",
            "Traitement sécurisé des paiements & structures de factures",
            "Middleware de service client intégré à l'IA"
          ]
        }
      ]
    },
    faq: {
      sectionNum: "03 // QUESTIONS FRÉQUENTES",
      heading: "Clarifications Opérationnelles.",
      subheading: "Réponses détaillées sur nos délais professionnels, nos infrastructures cloud sécurisées et nos modèles de livraison.",
      engagement: "PARADIGME DE SERVICE DEVOPS",
      learnMore: "EN SAVOIR PLUS SUR LES ÉTAPES",
      items: [
        {
          category: "DÉLAIS & PROCESSUS",
          question: "Quel est le cycle de développement typique d'une plateforme Next.js?",
          answer: "Notre cycle standard varie de 4 à 8 semaines selon la complexité des intégrations. Cela comprend 1 semaine de sprint sur le système de conception, 3 semaines d'ingénierie front-end, 2 semaines d'orchestration d'API, et une dernière semaine d'optimisation méticuleuse des performances."
        },
        {
          category: "MODÈLES D'ENGAGEMENT",
          question: "Offrez-vous un support technique continu après le lancement?",
          answer: "Oui, nos forfaits de gestion de sites web fonctionnent sous un SLA d'entreprise 24/7. Cela garantit une optimisation continue des conteneurs, une surveillance CDN, le maintien des Core Web Vitals et une communication Slack directe."
        },
        {
          category: "BUDGET & PRIX",
          question: "Comment fonctionnent les allocations de services et les paiements?",
          answer: "Nous alignons les étapes du projet sur une livraison sécurisée et structurée. Les accords types fonctionnent sur une séquence 40/30/30 (40% à l'initiation, 30% à la validation alpha, 30% au déploiement final cloud)."
        },
        {
          category: "INFRASTRUCTURE TECHNIQUE",
          question: "Comment garantissez-vous un score de performance PageSpeed de 100%?",
          answer: "Nous évitons les frameworks trop lourds. Chaque produit est conçu sur mesure à l'aide de Next.js/Vite avec TypeScript natif. Nous appliquons des protocoles rigoureux d'optimisation d'images et d'extraction de CSS critiques."
        },
        {
          category: "MODÈLE DE COLLABORATION",
          question: "Pouvons-nous intégrer nos propres CRM, ERP et passerelles de paiement?",
          answer: "Absolument. Nos pipelines d'automatisation intègrent en toute sécurité les API REST/GraphQL personnalisées, les paiements Stripe, Salesforce, HubSpot ou des workflows de bases de données internes propriétaires."
        }
      ]
    },
    portfolio: {
      sectionNum: "04 // L'EXHIBITION",
      heading: "Projets Récents.",
      subheading: "Un aperçu très soigné des plateformes numériques et des chartes graphiques conçues par nos équipes.",
      filterAll: "TOUTES LES RÉALISATIONS",
      filterWebDev: "INGÉNIERIE",
      filterSaaS: "AUTOMATISATION & SAAS",
      filterBrand: "CRÉATIVE & MARQUE",
      viewProject: "Analyser l'Étude de Cas",
      detailsLabel: "BRIEF DÉTAILLÉ DU PROJET",
      yearLabel: "ANNÉE DE RÉALISATION",
      clientLabel: "PARTENAIRE CLIENT",
      items: [
        {
          id: "weather-forecast",
          title: "Moteur de Prévisions Météo",
          category: "App Web / Intégration API",
          description: "Une plateforme de suivi météorologique réactive et en temps réel affichant des flux radar dynamiques et des mesures de géolocalisation.",
          imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/weather-forecast-",
          year: "2026",
          client: "Soban Haroon"
        },
        {
          id: "kfc-demo",
          title: "Boutique Numérique KFC",
          category: "E-Commerce / Frontend",
          description: "Une simulation haute-fidélité d'un menu de commande de restauration rapide avec panier réactif optimisé et transitions d'achat fluides.",
          imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/KFC-Demo-",
          year: "2025",
          client: "Soban Haroon"
        },
        {
          id: "arsha",
          title: "Portail ARSHA Enterprise",
          category: "Architecture UI/UX & Design",
          description: "Un portail d'entreprise moderne doté d'une mise en page épurée, de fonctionnalités interactives ultra-rapides et de hiérarchies visuelles élégantes.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/ARSHA",
          year: "2025",
          client: "Soban Haroon"
        }
      ]
    },
    testimonials: {
      sectionNum: "05 // TABLEAU DES PARTENAIRES",
      heading: "Partagez Votre Expérience.",
      subheading: "Nous visons l'excellence architecturale. Partagez votre témoignage et évaluez nos services d'ingénierie en temps réel.",
      statTrust: "Score de Confiance Moyen",
      statReviews: "Avis Vérifiés",
      statSatisfaction: "Satisfaction Client",
      statReviewsSub: "Soumissions",
      statSatisfactionSub: "100% Garanti",
      formTitle: "Soumettre un Avis",
      formRating: "Note d'Évaluation",
      formName: "Nom Complet",
      formRole: "Rôle / Fonction (Optionnel)",
      formCompany: "Nom de l'Entreprise",
      formReview: "Votre Témoignage",
      formReviewSub: "Min 15 caractères",
      btnSubmit: "Publier mon Avis",
      btnSubmitting: "Publication de l'avis...",
      msgSuccessTitle: "Publié avec succès!",
      msgSuccessText: "Votre avis a été ajouté à notre fil de commentaires en temps réel.",
      boardTitle: "Avis des Partenaires",
      boardSub: "Mises à jour en direct",
      items: [
        {
          id: "1",
          quote: "DevOps Services a complètement réinventé notre présence en ligne. Notre plateforme est ultra-rapide et a doublé nos prospects en moins de six mois. Leur gestion opérationnelle nous apporte une tranquillité totale.",
          author: "Elena Vance",
          role: "VP de Produit",
          company: "Nexis Global",
          rating: 5
        },
        {
          id: "2",
          quote: "Leur design UI/UX est de classe mondiale et leur stratégie SEO technique nous a placés dans le top 3 de Google. Une équipe d'élite rapide et méticuleuse.",
          author: "Marcus Aurel",
          role: "Fondateur",
          company: "Valo Digital",
          rating: 5
        },
        {
          id: "3",
          quote: "L'identité de marque conçue par DevOps Services Ltd est époustouflante. Elle a instantanément rehaussé l'image de notre entreprise sur le marché. Leurs structures d'automatisation nous font économiser 30h par semaine.",
          author: "Clara Tremblay",
          role: "Directrice Marketing",
          company: "Elysium Group",
          rating: 5
        }
      ]
    },
    contact: {
      sectionNum: "06 // LA COALITION",
      heading: "Initier le Lancement.",
      subheading: "Engagez notre unité d'orchestration numérique. Soumettez les spécifications de votre projet pour démarrer le protocole de consultation.",
      sidebarTitle: "QG des Opérations",
      sidebarDesc: "Nos directeurs de conception et architectes de systèmes sont actifs. Les tunnels sont ouverts.",
      directContact: "Contact Direct",
      officeAddress: "Adresse du Bureau",
      formFullName: "Nom Complet",
      formCompany: "Entreprise / Organisation",
      formEmail: "Adresse Email de Protocole",
      formPhone: "Numéro de Téléphone Sécurisé",
      formCountry: "Pays / Région",
      formIndustry: "Secteur d'Activité",
      formService: "Service Principal Requis",
      formBudget: "Gamme Budgétaire Cible",
      formDescription: "Description du Projet & Objectifs",
      formDescriptionSub: "Définissez les critères de portée...",
      btnSubmit: "Transmettre le Brief",
      btnSubmitting: "Transmission...",
      successTitle: "Brief Généré",
      successDesc: "Votre brief de projet a été enregistré et préparé pour une livraison sécurisée à devopsservicesltd@gmail.com. Votre client de messagerie devrait s'ouvrir automatiquement. Sinon, cliquez ci-dessous.",
      successRecipient: "Destinataire",
      successCompany: "Entreprise",
      successBudget: "Budget Est.",
      successService: "Service Demandé",
      btnMailClient: "Ouvrir l'E-mail Manuellement",
      btnNewBrief: "Transmettre un Nouveau Brief",
      servicesList: [
        "Développement de Sites Web",
        "Gestion de Sites Web",
        "Design UI/UX",
        "Solutions Référencement",
        "Marketing Digital",
        "Identité de Marque",
        "Automatisation de Processus"
      ]
    },
    footer: {
      desc: "Conception de systèmes numériques d'une pureté absolue, d'interfaces ultra-rapides et de chartes graphiques d'élite depuis Londres.",
      columnLinks: "PLAN DU SITE",
      columnContact: "CONTACT DIRECT",
      emailLabel: "E-mail",
      phoneLabel: "Téléphone",
      addressLabel: "Adresse",
      allRightsReserved: "Tous droits réservés.",
      curatedBy: "GÉRÉ PAR DEVOPS SERVICES LTD"
    }
  },
  DE: {
    nav: {
      about: "Über uns",
      services: "Services",
      faq: "FAQ",
      portfolio: "Portfolio",
      testimonials: "Bewertungen",
      contact: "Kontakt",
      cta: "In Verbindung treten"
    },
    hero: {
      badgePartner: "AWWWARDS KREATIVPARTNER",
      badgeAgency: "DEVOPS SERVICES LTD",
      words: ["WIR", "ENTWICKELN", "DIGITALEN", "AUFSTIEG"],
      subheading: "Wir entwickeln fehlerfreie Websites, bieten robustes 24/7-Management, High-Fidelity UI/UX und datengetriebene Marketing-Funnel. Maßgeschneidert für anspruchsvolle digitale Umsetzung.",
      ctaInitiate: "Projekt Starten",
      ctaExplore: "Dienstleistungen",
      activeOperations: "AKTIVE OPERATIONS-ENGINE",
      liveTelemetry: "LIVE-TELEMETRIE",
      mockupTitle: "Architektur skalierbarer Unternehmens-Infrastrukturen",
      mockupDesc: "Wir ersetzen Engpässe durch reaktive Mikroarchitekturen, die bedarfsgerecht skalieren. Ladezeiten unter einer Sekunde sind unser Standard.",
      systemLatency: "14ms",
      systemLatencySub: "▲ 410% SCHNELLER",
      conversionRate: "+8.4%",
      conversionRateSub: "▲ INBOUND-ROI-STEIGERUNG",
      capabilityParadigm: "UNSER LEISTUNGSSPEKTRUM",
      capabilities: [
        "Präzises UI/UX-Prototyping",
        "99,99% Container-Uptime",
        "Dynamische elastische Workflows",
        "Globale Content-Bereitstellung (Edge)"
      ],
      verdict: "\"Hervorragendes Pacing, erstklassige Grafik und außergewöhnliche technische Umsetzung.\"",
      verdictSource: "- DAS AWWWARDS-URTEIL"
    },
    about: {
      sectionNum: "01 // ENTSTEHUNG & CORE VALUES",
      heading: "Wir Bauen Besser.",
      subheading: "DevOps Services Ltd ist eine in Rawalpindi, Pakistan, ansässige Digitalagentur, die sich für ultimative Geschwindigkeit, anspruchsvolle Typografie und makellose Ästhetik einsetzt.",
      interactiveConsole: "INTERAKTIVE OPERATIONS-KONSOLE",
      consoleLog: "Sichere Socket-Tunnel zu Edge-Datenbanken werden aufgebaut...",
      consoleLogSuccess: "Erfolgreich. Cloud-Node-Containercluster ist online.",
      consoleMetrics: "SYSTEMDIAGNOSE: KOMPILIERUNG VON 60FPS-UI-TRANSITIONEN",
      values: [
        {
          id: "excellence",
          title: "Sorgfältige Präzision",
          description: "Ein 'gut genug' gibt es bei uns nicht. Unsere technischen Entwürfe sind pixelgenau und unsere Codebasen sind wie Schweizer Uhren gefertigt.",
          iconName: "Zap",
          metric: "99.9%",
          metricLabel: "SLA-Uptime"
        },
        {
          id: "results",
          title: "Performance First",
          description: "Wir konzentrieren uns auf echte Zahlen: Ladezeiten unter einer Sekunde, Conversion-Uplift und höchste SEO-Prominenz.",
          iconName: "Target",
          metric: "100%",
          metricLabel: "PageSpeed-Index"
        },
        {
          id: "trust",
          title: "Transparente Betreuung",
          description: "Wir agieren als Ihre engagierten technischen Leiter und Kreativdirektoren. Keine versteckten Kosten, keine Funkstille.",
          iconName: "Shield",
          metric: "24/7",
          metricLabel: "Aktive Überwachung"
        },
        {
          id: "innovation",
          title: "Dynamische Evolution",
          description: "Wir nutzen modernste Frameworks und Methoden, von anspruchsvoller Bewegungschoreografie bis zur intelligenten Systemautomatisierung.",
          iconName: "Sparkles",
          metric: "+150%",
          metricLabel: "Durchschnittlicher ROI"
        }
      ]
    },
    services: {
      sectionNum: "02 // SERVICE-PORTFOLIO",
      heading: "Was Wir Bieten.",
      subheading: "Präzise ausgerichtete Dienstleistungen, gesteuert von hochkarätigen Entwicklerteams und preisgekrönten Kreativdirektoren.",
      detailsTitle: "CORE WORKFLOW PROTOKOLLE",
      ctaClose: "Spezifikationsfenster Schließen",
      items: [
        {
          id: "web-development",
          title: "Website-Entwicklung",
          description: "Zukunftsweisende, blitzschnelle digitale Produkte, entwickelt mit ultramodernen Frameworks für maximale Skalierbarkeit.",
          tag: "ENGINEERING",
          iconName: "Code2",
          details: [
            "Maßgeschneiderte React- & Next.js-Architekturen",
            "Leistungsstarke Headless-CMS-Integrationen",
            "Robuste Status-Orchestrierung & moderne APIs",
            "60FPS Mikro-Interaktionen & WebGL-Erlebnisse"
          ]
        },
        {
          id: "web-management",
          title: "Website-Management",
          description: "Kontinuierliche Cloud-Orchestrierung, visuelle Upgrades und technische Optimierung für einen reibungslosen 24/7-Betrieb.",
          tag: "WARTUNG",
          iconName: "Settings",
          details: [
            "Enterprise Cloud-Hosting & DNS-Verwaltung",
            "Proaktive Core Web Vitals Geschwindigkeitsoptimierung",
            "Echtzeit-Überwachung, Security-Härtung & Backups",
            "Dynamische Design- & Text-Updates auf Abruf"
          ]
        },
        {
          id: "ui-ux-design",
          title: "UI/UX-Design",
          description: "High-Fidelity-Designsysteme, die intuitive Benutzerpsychologie mit zeitlosen, eleganten redaktionellen Layouts verbinden.",
          tag: "PRODUKT-DESIGN",
          iconName: "Layers",
          details: [
            "Erstellung maßgeschneiderter Designsysteme",
            "Verhaltenstests & interaktives Prototyping",
            "User-Journey-Mapping & Usability-Validierung",
            "Zeitlose minimalistische Typografie"
          ]
        },
        {
          id: "seo",
          title: "SEO-Lösungen",
          description: "Datengetriebene Architektur- und Content-Strategien, um globale organische Spitzenpositionen nachhaltig zu besetzen.",
          tag: "GROWTH",
          iconName: "TrendingUp",
          details: [
            "Umfassendes programmatisches Keyword-Mapping",
            "Semantisches Markup & strukturierte Schemas",
            "Hochwertiges Backlink-Profilierung & Autoritätskampagnen",
            "Indexierungs-Audits & Ladezeitoptimierung"
          ]
        },
        {
          id: "digital-marketing",
          title: "Digitales Marketing",
          description: "Strategische Kampagnen zur Zielgruppenansprache, basierend auf analytischer Präzision und messbarem ROI.",
          tag: "PERFORMANCE",
          iconName: "Megaphone",
          details: [
            "Strukturierte Multi-Channel-Werbekampagnen",
            "Conversion-Rate-Optimierung (CRO) Tests",
            "Ausgefeilte Attributionsmodelle & benutzerdefinierte Reports",
            "Verhaltensbasiertes Retargeting & Funnel-Strukturen"
          ]
        },
        {
          id: "brand-identity",
          title: "Markenidentität",
          description: "Unverwechselbare Typografie, visuelle Assets, Markenlogos und Styleguides, die institutionelles Vertrauen aufbauen.",
          tag: "CREATIVE DIRECTION",
          iconName: "Compass",
          details: [
            "Entwurf maßgeschneiderter Firmenlogos",
            "Eigene Typografie & abgestimmte Farbpaletten",
            "Umfassende Multi-Plattform Markenrichtlinien",
            "Executive Präsentationen & digitale Assets"
          ]
        },
        {
          id: "business-automation",
          title: "Prozessautomatisierung",
          description: "Intelligente Hintergrund-Workflows, Plattformintegrationen und Tools zur Beschleunigung Ihres Wachstums.",
          tag: "AUTOMATISIERUNG",
          iconName: "Cpu",
          details: [
            "Individuelle ERP- & CRM-Workflow-Integrationen",
            "Automatisierte Marketing-Pipelines & Lead-Scoring",
            "Sichere Zahlungsabwicklung & Rechnungsstrukturen",
            "KI-integrierte Kundenservice-Middleware"
          ]
        }
      ]
    },
    faq: {
      sectionNum: "03 // HÄUFIGE FRAGEN",
      heading: "Betriebliche Details.",
      subheading: "Umfassende Antworten zu unseren professionellen Zeitplänen, Cloud-Infrastrukturen und Liefermodellen.",
      engagement: "DEVOPS-DIENSTLEISTUNGSMUSTER",
      learnMore: "MEHR ÜBER MEILENSTEINE ERFAHREN",
      items: [
        {
          category: "ZEITPLAN & PROZESS",
          question: "Wie sieht der typische Entwicklungszyklus für Next.js aus?",
          answer: "Unser Standardzyklus dauert je nach Komplexität 4 bis 8 Wochen. Dies umfasst 1 Woche Design-Sprint, 3 Wochen Frontend-Engineering, 2 Wochen API-Integration und eine abschließende Woche mit gründlichen Geschwindigkeits- und Performance-Optimierungen."
        },
        {
          category: "ZUSAMMENARBEIT",
          question: "Bieten Sie auch fortlaufendes technisches Management nach dem Go-Live?",
          answer: "Ja, unsere Website-Management-Pakete basieren auf einem Enterprise 24/7 SLA. Dies garantiert kontinuierliche Container-Optimierung, CDN-Überwachung, Erhalt der Core Web Vitals und direkte Slack-Kommunikation."
        },
        {
          category: "BUDGET & PREISE",
          question: "Wie funktionieren die Zahlungspläne und Meilensteine?",
          answer: "Wir stimmen Meilensteine auf sichere, strukturierte Lieferungen ab. Standardverträge folgen einem 40/30/30-Muster (40% bei Projektstart, 30% bei Alpha-Freigabe, 30% bei finaler Cloud-Bereitstellung)."
        },
        {
          category: "TECHNISCHE INFRASTRUKTUR",
          question: "Wie garantieren Sie einen perfekten 100% PageSpeed-Score?",
          answer: "Wir verzichten auf überladene Frameworks. Jedes Produkt wird maßgeschneidert mit Next.js/Vite und nativem TypeScript entwickelt. Wir setzen aggressive Bildoptimierung und kritisches CSS ein."
        },
        {
          category: "AUTOMATISIERUNG",
          question: "Können wir benutzerdefinierte CRMs, ERPs und Payment-Gateways anbinden?",
          answer: "Absolut. Unsere Automatisierungs-Pipelines integrieren problemlos REST/GraphQL-APIs, Stripe-Zahlungen, Salesforce, HubSpot oder proprietäre Datenbanken hinter sicheren Verschlüsselungen."
        }
      ]
    },
    portfolio: {
      sectionNum: "04 // AUSSTELLUNG",
      heading: "Aktuelle Projekte.",
      subheading: "Ein kuratierter Blick auf digitale Plattformen und Markenrichtlinien, die von unseren Teams entwickelt wurden.",
      filterAll: "ALLE PROJEKTE",
      filterWebDev: "ENGINEERING",
      filterSaaS: "AUTOMATION & SAAS",
      filterBrand: "KREATIV & MARKE",
      viewProject: "Fallstudie analysieren",
      detailsLabel: "PROJEKT-BRIEFING",
      yearLabel: "FERTIGSTELLUNG",
      clientLabel: "PARTNER-KLIENT",
      items: [
        {
          id: "weather-forecast",
          title: "Echtzeit-Wettervorhersage-Engine",
          category: "Web-App / API-Integration",
          description: "Eine reaktionsschnelle meteorologische Tracking-Plattform zur Anzeige dynamischer Radar-Feeds und Geolokalisierungsdaten.",
          imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/weather-forecast-",
          year: "2026",
          client: "Soban Haroon"
        },
        {
          id: "kfc-demo",
          title: "KFC Digitaler Storefront",
          category: "E-Commerce / Frontend",
          description: "Eine hocheffiziente Nachbildung eines Fast-Food-Bestellmenüs mit optimierten reaktionsschnellen Warenkörben.",
          imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/KFC-Demo-",
          year: "2025",
          client: "Soban Haroon"
        },
        {
          id: "arsha",
          title: "ARSHA Business-Portal",
          category: "UI/UX & Design-Architektur",
          description: "Ein modernes Geschäftsportal mit klarem Design, blitzschnellen interaktiven Funktionen und eleganten visuellen Hierarchien.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/ARSHA",
          year: "2025",
          client: "Soban Haroon"
        }
      ]
    },
    testimonials: {
      sectionNum: "05 // KUNDENSTIMMEN",
      heading: "Erfahrung Hinterlassen.",
      subheading: "Wir streben nach architektonischer Exzellenz. Teilen Sie Ihr Feedback und bewerten Sie unsere Ingenieursleistungen in Echtzeit.",
      statTrust: "Durchschnittliche Bewertung",
      statReviews: "Verifizierte Stimmen",
      statSatisfaction: "Kundenzufriedenheit",
      statReviewsSub: "Einträge",
      statSatisfactionSub: "100% Garantiert",
      formTitle: "Feedback einreichen",
      formRating: "Bewertung",
      formName: "Vollständiger Name",
      formRole: "Rolle / Position (Optional)",
      formCompany: "Firmenname",
      formReview: "Ihre Bewertung",
      formReviewSub: "Mind. 15 Zeichen",
      btnSubmit: "Feedback veröffentlichen",
      btnSubmitting: "Feedback wird übertragen...",
      msgSuccessTitle: "Erfolgreich veröffentlicht!",
      msgSuccessText: "Ihre Bewertung wurde erfolgreich zu unserem Partner-Feed hinzugefügt.",
      boardTitle: "Partner-Feed",
      boardSub: "Echtzeit-Aktualisierung",
      items: [
        {
          id: "1",
          quote: "DevOps Services hat unseren Online-Auftritt komplett neu erfunden. Unsere maßgeschneiderte Plattform ist extrem schnell und hat unsere Leads in weniger als sechs Monaten verdoppelt.",
          author: "Elena Vance",
          role: "VP of Product",
          company: "Nexis Global",
          rating: 5
        },
        {
          id: "2",
          quote: "Das UI/UX-Design ist weltklasse, und ihre technische SEO-Strategie hat uns bei allen relevanten Suchbegriffen unter die Top 3 auf Google gebracht. Ein hervorragendes Team.",
          author: "Marcus Aurel",
          role: "Gründer",
          company: "Valo Digital",
          rating: 5
        },
        {
          id: "3",
          quote: "Die von DevOps Services Ltd entwickelte Markenidentität ist atemberaubend. Sie hat unsere Marktwahrnehmung sofort auf ein neues Niveau gehoben. Die Automatisierung spart uns jede Woche über 30 Stunden.",
          author: "Clara Tremblay",
          role: "Chief Marketing Officer",
          company: "Elysium Group",
          rating: 5
        }
      ]
    },
    contact: {
      sectionNum: "06 // KOOPERATION",
      heading: "Projekt Starten.",
      subheading: "Sprechen Sie mit unserem digitalen Orchestrierungsteam. Übermitteln Sie Ihre Anforderungen, um das Beratungsprotokoll zu starten.",
      sidebarTitle: "Einsatzzentrale",
      sidebarDesc: "Unsere leitenden Design-Direktoren und Systemarchitekten sind aktiv. Tunnel sind vollständig geöffnet.",
      directContact: "Direkter Kontakt",
      officeAddress: "Büroadresse",
      formFullName: "Vollständiger Name",
      formCompany: "Unternehmen / Organisation",
      formEmail: "E-Mail-Protokolladresse",
      formPhone: "Sichere Telefonnummer",
      formCountry: "Land / Region",
      formIndustry: "Ihre Branche",
      formService: "Gewünschte Dienstleistung",
      formBudget: "Geplantes Budget",
      formDescription: "Projektbeschreibung & Ziele",
      formDescriptionSub: "Umfang definieren...",
      btnSubmit: "Projektbriefing übermitteln",
      btnSubmitting: "Übermittlung...",
      successTitle: "Briefing Generiert",
      successDesc: "Ihr Projektbriefing wurde erfasst und für eine sichere Übermittlung an devopsservicesltd@gmail.com vorbereitet. Ihr E-Mail-Programm sollte sich automatisch geöffnet haben. Falls nicht, klicken Sie unten.",
      successRecipient: "Empfänger",
      successCompany: "Unternehmen",
      successBudget: "Est. Budget",
      successService: "Dienstleistung",
      btnMailClient: "E-Mail manuell öffnen",
      btnNewBrief: "Neues Briefing senden",
      servicesList: [
        "Website-Entwicklung",
        "Website-Management",
        "UI/UX-Design",
        "SEO-Lösungen",
        "Digitales Marketing",
        "Markenidentität",
        "Prozessautomatisierung"
      ]
    },
    footer: {
      desc: "Entwicklung erstklassiger digitaler Systeme, blitzschneller Schnittstellen und anspruchsvoller Designrichtlinien von unserer Zentrale in Rawalpindi, Pakistan.",
      columnLinks: "SITEMAP",
      columnContact: "DIREKTER KONTAKT",
      emailLabel: "E-Mail",
      phoneLabel: "Telefonnummer",
      addressLabel: "Büroadresse",
      allRightsReserved: "Alle Rechte vorbehalten.",
      curatedBy: "BETREUT DURCH DEVOPS SERVICES LTD"
    }
  },
  JP: {
    nav: {
      about: "事業概要",
      services: "サービス",
      faq: "よくある質問",
      portfolio: "実績",
      testimonials: "お客様の声",
      contact: "お問い合わせ",
      cta: "ご連絡はこちら"
    },
    hero: {
      badgePartner: "AWWWARDS クリエイティブパートナー",
      badgeAgency: "DEVOPS SERVICES LTD",
      words: ["私たちは", "デジタルの", "高みへ", "創造する"],
      subheading: "完璧なウェブ開発、堅牢な24時間365日の保守管理、高品質なUI/UX、データ主導のマーケティングファネルを構築します。プレミアムなデジタル体験を求める企業に最適です。",
      ctaInitiate: "プロジェクトを開始",
      ctaExplore: "サービスを見る",
      activeOperations: "アクティブ運用エンジン",
      liveTelemetry: "ライブ・テレメトリ",
      mockupTitle: "スケーラブルな企業インフラの構築",
      mockupDesc: "ボトルネックをオンデマンドで拡張可能なリアクティブ・マイクロアーキテクチャに置き換えます。1秒未満の高速読み込みが当社の基準です。",
      systemLatency: "14ms",
      systemLatencySub: "▲ 410% の高速化を実現",
      conversionRate: "+8.4%",
      conversionRateSub: "▲ インバウンドROI上昇",
      capabilityParadigm: "当社のコア能力",
      capabilities: [
        "精密なUI/UXプロトタイピング",
        "99.99% のコンテナ稼働率",
        "動的かつ弾力的なワークフロー",
        "グローバルコンテンツ配信 (Edge)"
      ],
      verdict: "「絶妙なテンポ、プレミアムなビジュアル、そして卓越した技術力」",
      verdictSource: "— AWWWARDS審査結果"
    },
    about: {
      sectionNum: "01 // 創立 & コアバリュー",
      heading: "より優れた構築を。",
      subheading: "DevOps Services Ltdは、究極のスピード、細部へのこだわり、そして非の打ち所がない美しいフロントエンド体験を提供するロンドン拠点のデジタルエージェンシーです。",
      interactiveConsole: "インタラクティブ操作コンソール",
      consoleLog: "エッジデータベースへの安全なソケットトンネルを接続中...",
      consoleLogSuccess: "成功。クラウドノードコンテナがオンラインで稼働中。",
      consoleMetrics: "システム診断: 60FPS UIトランジションをコンパイル中",
      values: [
        {
          id: "excellence",
          title: "精密な職人技",
          description: "「十分」で妥協しません。ピクセル単位で完璧に設計され、スイスの高級時計のように美しいコードを記述します。",
          iconName: "Zap",
          metric: "99.9%",
          metricLabel: "SLA稼働率"
        },
        {
          id: "results",
          title: "パフォーマンス第一",
          description: "1秒未満のページ読み込み、CVR向上、SEO上位獲得、そして成長を支えるスケーラブルな設計という真の実績に焦点を当てます。",
          iconName: "Target",
          metric: "100%",
          metricLabel: "PageSpeed 指標"
        },
        {
          id: "trust",
          title: "透明性の高いサポート",
          description: "専任の技術顧問およびクリエイティブディレクターとして機能します。不透明な見積もりや連絡の途絶えはありません。",
          iconName: "Shield",
          metric: "24時間",
          metricLabel: "365日専任監視"
        },
        {
          id: "innovation",
          title: "動的な進化",
          description: "滑らかなモーション演出から高度な自動化システムまで、常に最新のフレームワークと開発手法を活用します。",
          iconName: "Sparkles",
          metric: "+150%",
          metricLabel: "平均ROI向上率"
        }
      ]
    },
    services: {
      sectionNum: "02 // 提供サービス",
      heading: "当社のサービス。",
      subheading: "一流のエンジニアリングチームと、数々の賞を獲得したクリエイティブディレクターが管理する高度なサービスポートフォリオ。",
      detailsTitle: "コアワークフロープロトコル",
      ctaClose: "仕様パネルを閉じる",
      items: [
        {
          id: "web-development",
          title: "ウェブサイト開発",
          description: "最新鋭のコードフレームワークで構築された、究極に高速で拡張性の高い次世代型デジタルプロダクト開発を提供します。",
          tag: "エンジニアリング",
          iconName: "Code2",
          details: [
            "カスタムReact & Next.js アーキテクチャ",
            "超高速なヘッドレスCMSインテグレーション",
            "強固なステート管理と現代的なAPI設計",
            "60FPS動作のマイクロインタラクション & WebGL体験"
          ]
        },
        {
          id: "web-management",
          title: "ウェブ保守・管理",
          description: "24時間365日、デジタルビジネスを完璧かつ安全に維持するための継続的なクラウド管理、ビジュアル向上、技術最適化を提供します。",
          tag: "メンテナンス",
          iconName: "Settings",
          details: [
            "エンタープライズ対応クラウドホスティング & DNS管理",
            "プロアクティブなCore Web Vitals速度最適化",
            "リアルタイム監視、セキュリティ強化、自動バックアップ",
            "ご要望に応じた迅速なビジュアル・テキスト更新"
          ]
        },
        {
          id: "ui-ux-design",
          title: "UI/UX デザイン",
          description: "直感的なユーザー心理分析と、時代を超越した美しくエレガントなエディトリアルレイアウトを融合した高品質デジタルデザイン。",
          tag: "プロダクトデザイン",
          iconName: "Layers",
          details: [
            "オーダーメイドの独自デジタルデザインシステム構築",
            "行動分析ワイヤーフレーム & インタラクティブモックアップ",
            "ユーザージャーニーマップ作成 & ユーザビリティ検証",
            "無駄を削ぎ落とした洗練されたタイポグラフィ"
          ]
        },
        {
          id: "seo",
          title: "SEO 検索エンジン最適化",
          description: "検索エンジンのアルゴリズムに基づいた設計とコンテンツ戦略により、世界規模で購買意欲の高いオーガニック検索上位を独占します。",
          tag: "グロース",
          iconName: "TrendingUp",
          details: [
            "プログラマティックかつ詳細なキーワードマップ作成",
            "セマンティックマークアップ & 構造化データの統合",
            "高品質なバックリンク獲得 & 権威性向上キャンペーン",
            "包括的なインデックス監査 & ページ速度のチューニング"
          ]
        },
        {
          id: "digital-marketing",
          title: "デジタルマーケティング",
          description: "精密な分析、行動を捉えたターゲット配信、そして成果測定に基づく戦略的な顧客獲得・広告キャンペーンを展開します。",
          tag: "パフォーマンス",
          iconName: "Megaphone",
          details: [
            "マルチチャネル対応の最適化広告配信設計",
            "コンバージョン率最適化 (CRO) テストの実施",
            "洗練されたアトリビューション分析 & カスタムレポート作成",
            "リターゲティング広告 & コンバージョンファネルの構築"
          ]
        },
        {
          id: "brand-identity",
          title: "ブランドアイデンティティ",
          description: "企業の信頼と共感を醸成する、独特のタイポグラフィ、ビジュアルアセット、ロゴマーク、およびスタイルガイドの作成。",
          tag: "クリエイティブディレクション",
          iconName: "Compass",
          details: [
            "オーダーメイドの企業コーポレートロゴ作成",
            "カスタムタイポグラフィ & 統一されたカラーパレット",
            "包括的なマルチプラットフォーム向けブランドガイドライン",
            "プレゼンテーション用のビジュアル制作 & デジタル素材"
          ]
        },
        {
          id: "business-automation",
          title: "業務自動化・DX推進",
          description: "企業の成長速度を飛躍的に加速させる、高度なバックグラウンド処理、システム統合、および業務自動化ツールの導入。",
          tag: "オートメーション",
          iconName: "Cpu",
          details: [
            "カスタムERP & CRM ワークフローシステム統合",
            "マーケティング自動化 & リードスコアリング機能",
            "安全な決済処理 & オンライン請求システムの構築",
            "AIを統合した次世代型カスタマーサポートシステム"
          ]
        }
      ]
    },
    faq: {
      sectionNum: "03 // よくあるご質問",
      heading: "業務プロセスと仕様。",
      subheading: "当社の開発期間、安全なクラウド構成、およびデリバリー体制に関する詳細な回答です。",
      engagement: "DEVOPS サービス体制",
      learnMore: "マイルストーンに関する詳細",
      items: [
        {
          category: "開発スケジュール",
          question: "Next.jsによるカスタム開発期間はどのくらいですか？",
          answer: "難易度によりますが、通常4〜8週間を基準としています。これには、1週間の高品質デザインスプリント、3週間の高速フロントエンド実装、2週間のAPI連携・構成、そして最終週の徹底したパフォーマンス検証・速度調整が含まれます。"
        },
        {
          category: "保守・サポート体制",
          question: "公開後の継続的な技術運用サポートはありますか？",
          answer: "はい、24時間365日のエンタープライズSLA保守プランを提供しています。コンテナの継続的最適化、CDN監視、Core Web Vitalsの維持、Slackを通じたリアルタイム相談に対応します。"
        },
        {
          category: "予算・お支払い",
          question: "お支払いのスケジュールと条件はどうなっていますか？",
          answer: "納品成果物とマイルストーンを連動させた、安心の段階支払いを採用しています。基本的には、初期費用40%、アルファ版検証時30%、本番環境ローンチ時30%の分割構成です。"
        },
        {
          category: "システム仕様",
          question: "PageSpeedで「100%」のパフォーマンスをどう実現しますか？",
          answer: "不要な依存関係や肥大化したフレームワークを排除します。すべてNext.js/Viteと純粋なTypeScriptでスクラッチ構築し、厳格な画像圧縮やクリティカルCSS抽出を適用します。"
        },
        {
          category: "他システム連携",
          question: "自社で利用中のCRMや決済システムとの連携は可能ですか？",
          answer: "はい、可能です。REST/GraphQL APIによる外部システム連携、Stripeによる安全な決済システム、Salesforce、HubSpot、社内データベースなどの高度なデータ自動連携に対応します。"
        }
      ]
    },
    portfolio: {
      sectionNum: "04 // 実績紹介",
      heading: "最近の開発実績。",
      subheading: "当社チームが設計した、最先端のデジタルプラットフォームやクリエイティブアセットの一部をご紹介します。",
      filterAll: "すべてのプロジェクト",
      filterWebDev: "開発・エンジニアリング",
      filterSaaS: "自動化 & SAAS",
      filterBrand: "クリエイティブ & ブランディング",
      viewProject: "ケーススタディを分析",
      detailsLabel: "プロジェクト詳細情報",
      yearLabel: "完了年度",
      clientLabel: "パートナー企業",
      items: [
        {
          id: "weather-forecast",
          title: "気象予報データエンジン",
          category: "Webアプリ / API連携",
          description: "リアルタイムの気象追跡プラットフォーム。動的なレーダーフィード、検索パラメーター、位置情報測定値をシームレスに表示。",
          imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/weather-forecast-",
          year: "2026",
          client: "Soban Haroon"
        },
        {
          id: "kfc-demo",
          title: "KFCデジタルストアフロント",
          category: "Eコマース / フロントエンド",
          description: "オンラインファーストフード注文メニューのシミュレーション。最適化されたレスポンシブなカート機能を搭載。",
          imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/KFC-Demo-",
          year: "2025",
          client: "Soban Haroon"
        },
        {
          id: "arsha",
          title: "ARSHAコーポレートハブ",
          category: "UI/UX & デザイン設計",
          description: "洗練されたコーポレートレイアウト、高速インタラクティブ機能、エレガントな視覚的階層を備えたモダンビジネスハブ。",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          link: "https://github.com/SobanHaroon/ARSHA",
          year: "2025",
          client: "Soban Haroon"
        }
      ]
    },
    testimonials: {
      sectionNum: "05 // パートナー様の声",
      heading: "お声をお寄せください。",
      subheading: "私たちは常に高品質なプロダクトを追求しています。開発サービスに対するご評価をリアルタイムでお送りください。",
      statTrust: "平均顧客満足度",
      statReviews: "確認済みのレビュー数",
      statSatisfaction: "顧客満足保証",
      statReviewsSub: "件の投稿",
      statSatisfactionSub: "100% 成果保証",
      formTitle: "評価を送信",
      formRating: "評価の星の数",
      formName: "お名前",
      formRole: "役職・担当 (任意)",
      formCompany: "会社名",
      formReview: "レビュー内容",
      formReviewSub: "15文字以上",
      btnSubmit: "評価を送信する",
      btnSubmitting: "送信中...",
      msgSuccessTitle: "送信が完了しました！",
      msgSuccessText: "お寄せいただいた声は、リアルタイムでフィードに反映されます。",
      boardTitle: "パートナーフィード",
      boardSub: "リアルタイム更新",
      items: [
        {
          id: "1",
          quote: "DevOps Servicesは当社のデジタルプレゼンスを一新してくれました。構築されたシステムは非常に高速で、半年足らずでリード獲得数が2倍に増加。保守管理も完璧で、大変信頼しています。",
          author: "Elena Vance",
          role: "製品企画担当 VP",
          company: "Nexis Global",
          rating: 5
        },
        {
          id: "2",
          quote: "UI/UXデザインは世界トップクラス。また、技術的なSEO施策により主要な検索キーワードでGoogleの上位3位を独占しました。驚異的な速さと高い正確性を兼ね備えたチームです。",
          author: "Marcus Aurel",
          role: "創業者",
          company: "Valo Digital",
          rating: 5
        },
        {
          id: "3",
          quote: "設計されたブランドアイデンティティは圧巻で、市場における当社の評価が一瞬で高まりました。また、業務自動化の導入により、チーム全体の作業時間が週に30時間以上削減されました。",
          author: "Clara Tremblay",
          role: "最高マーケティング責任者 (CMO)",
          company: "Elysium Group",
          rating: 5
        }
      ]
    },
    contact: {
      sectionNum: "06 // お問い合わせ",
      heading: "開発のご相談。",
      subheading: "システム構築から運用保守まで、お気軽にご相談ください。以下のフォームより仕様を入力して送信してください。",
      sidebarTitle: "オフィス本部",
      sidebarDesc: "当社のクリエイティブディレクターおよびシステム設計担当が常時待機しております。",
      directContact: "直接のご連絡",
      officeAddress: "所在地・住所",
      formFullName: "お名前",
      formCompany: "会社名・組織名",
      formEmail: "メールアドレス",
      formPhone: "お電話番号",
      formCountry: "国 / 地域",
      formIndustry: "業界・セクター",
      formService: "ご希望のサービス",
      formBudget: "予定予算範囲",
      formDescription: "プロジェクトの概要と目標",
      formDescriptionSub: "ご希望の仕様や目的を記入してください...",
      btnSubmit: "プロジェクト概要を送信",
      btnSubmitting: "送信処理中...",
      successTitle: "概要の作成完了",
      successDesc: "プロジェクト概要が記録され、devopsservicesltd@gmail.com への安全な送信準備が完了しました。メーラーが自動的に起動します。起動しない場合は、以下をクリックしてください。",
      successRecipient: "送信先アドレス",
      successCompany: "会社名",
      successBudget: "予定予算",
      successService: "選択サービス",
      btnMailClient: "メールを手動で作成する",
      btnNewBrief: "新規のお問い合わせ",
      servicesList: [
        "ウェブサイト開発",
        "ウェブ保守・管理",
        "UI/UX デザイン",
        "SEO 検索エンジン最適化",
        "デジタルマーケティング",
        "ブランドアイデンティティ",
        "業務自動化・DX推進"
      ]
    },
    footer: {
      desc: "ロンドンの開発拠点より、非の打ち所がない最高品質のシステム、超高速なウェブUI、そして洗練されたブランド表現を提供します。",
      columnLinks: "サイトマップ",
      columnContact: "ダイレクト連絡窓口",
      emailLabel: "メールアドレス",
      phoneLabel: "電話番号",
      addressLabel: "オフィス住所",
      allRightsReserved: "All rights reserved. (無断転載・複製を禁じます)",
      curatedBy: "CURATED BY DEVOPS SERVICES LTD"
    }
  }
};

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  dictionary: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>(() => {
    const saved = localStorage.getItem("devops_services_language");
    return saved && ["EN", "FR", "DE", "JP"].includes(saved) ? saved as LanguageType : "EN";
  });

  useEffect(() => {
    localStorage.setItem("devops_services_language", language);
    document.documentElement.lang = ({ EN: "en", FR: "fr", DE: "de", JP: "ja" })[language];
  }, [language]);

  const dictionary = DICTIONARIES[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
