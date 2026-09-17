import outsourceoneHero from '../assets/images/outsourceone_hero_1786554724935.jpg';
import outsourceoneServices from '../assets/images/outsourceone_services_1786554742110.jpg';
import outsourceoneWhyUs from '../assets/images/outsourceone_whyus_1786554758472.jpg';
import outsourceoneOrderForm from '../assets/images/outsourceone_orderform_1786554776360.jpg';

import babaydeeHero from '../assets/User attachment 5.png';
import babaydeeOrbit from '../assets/User attachment 3.png';
import babaydeeChakki from '../assets/User attachment 4.png';
import babaydeeCatalog from '../assets/User attachment 2.png';
import babaydeeAbout from '../assets/User attachment.png';

export interface KeyFeature {
  title: string;
  description: string;
  iconName: string; // Lucide icon name string
}

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  shortDescription: string;
  liveUrl: string;
  ctaText: string;
  featuredImage: string;
  highlights: string[];
  technologies: string[];
  overview: {
    whatItIs: string;
    whoBuiltFor: string;
    businessPurpose: string;
    ourContribution: string;
  };
  challenge: string;
  solution: string;
  keyFeatures: KeyFeature[];
  designApproach: {
    responsive: string;
    userExperience: string;
    visualHierarchy: string;
    navigation: string;
    animations: string;
  };
  galleryImages: GalleryImage[];
  results: string[];
  seo: {
    title: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "babey-dee-atta-chakki",
    slug: "babey-dee-atta-chakki",
    title: "Babay Dee Atta Chakki",
    category: "E-Commerce Development",
    client: "Babay Dee Atta Chakki",
    shortDescription: "A complete online grocery/e-commerce platform for Babay Dee Atta Chakki, allowing customers to browse products, add products to cart, place orders, and interact with the business online.",
    liveUrl: "https://babaydeeattachakki.com/",
    ctaText: "Visit Live Website",
    featuredImage: babaydeeHero,
    highlights: [
      "E-commerce functionality",
      "Product catalog",
      "Shopping cart",
      "Checkout/order flow",
      "Order management",
      "Delivery functionality",
      "Responsive design",
      "Business-focused UX"
    ],
    technologies: [
      "React",
      "Node.js",
      "Express API",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Web Architecture"
    ],
    overview: {
      whatItIs: "A complete online grocery and staple food e-commerce platform developed for Babay Dee Atta Chakki, bringing daily essentials directly to digital shoppers.",
      whoBuiltFor: "Built specifically for Babay Dee Atta Chakki and its retail customer base seeking convenient, reliable online food staple ordering.",
      businessPurpose: "Digitizing traditional grain mill (Atta Chakki) and grocery store ordering, enabling consumers to browse flour varieties, grains, and kitchen staples, manage carts, and place direct delivery orders online 24/7.",
      ourContribution: "DevOps Services engineered the full-stack web application, crafted the e-commerce UI/UX, implemented responsive cart and checkout systems, and optimized cross-device performance."
    },
    challenge: "Traditional grain mill and staple grocery businesses historically rely on physical foot traffic and phone calls for order placement. Babay Dee Atta Chakki needed a seamless way to showcase their comprehensive product catalog online, manage customizable flour/grain quantities, and provide an effortless checkout experience for household customers on mobile and desktop without operational complexity.",
    solution: "We designed and engineered a clean, high-performance e-commerce platform with intuitive product categorization, dynamic cart calculation, direct checkout order management, clear delivery details, and a responsive mobile interface that allows customers to complete orders in seconds.",
    keyFeatures: [
      {
        title: "Dynamic Product Catalog",
        description: "Clear product categorization for fresh flours, whole grains, pulses, and daily household staples with rich product details.",
        iconName: "ShoppingBag"
      },
      {
        title: "Interactive Shopping Cart",
        description: "Real-time cart quantity controls, instant total price updates, and persistent session storage for seamless shopping.",
        iconName: "ShoppingCart"
      },
      {
        title: "Streamlined Order Flow",
        description: "Simplified checkout process designed to collect customer delivery details and order preferences without friction.",
        iconName: "CheckCircle2"
      },
      {
        title: "Delivery & Service Info",
        description: "Transparent delivery zone schedules, minimum order criteria, and direct customer contact options.",
        iconName: "Truck"
      },
      {
        title: "Business Order Management",
        description: "Structured order summaries enabling the business to process, organize, and fulfill incoming customer orders efficiently.",
        iconName: "ClipboardList"
      },
      {
        title: "Mobile-First Accessibility",
        description: "Fully responsive layout ensuring effortless browsing and purchasing on mobile phones, tablets, and desktop computers.",
        iconName: "Smartphone"
      }
    ],
    designApproach: {
      responsive: "Engineered with a mobile-first fluid grid that adjusts product cards, cart sliders, and checkout forms smoothly across screen widths.",
      userExperience: "Focused on reducing steps to purchase for busy household shoppers, using high-visibility CTA buttons and transparent pricing.",
      visualHierarchy: "Clean neutral background palettes with vibrant product accents, readable typography, and un-cluttered card layouts.",
      navigation: "Sticky top bar with instant search, category quick-filters, and persistent cart counters for effortless item browsing.",
      animations: "Subtle micro-interactions on button presses, smooth drawer transitions for cart management, and crisp hover states."
    },
    galleryImages: [
      {
        url: babaydeeHero,
        caption: "Babay Dee Atta Chakki - Official E-Commerce Homepage & Natural Stone-Grounded Fresh Atta Hero"
      },
      {
        url: babaydeeOrbit,
        caption: "Babay Dee Atta Chakki - Freshly Sourced Products Interactive Orbit Showcase"
      },
      {
        url: babaydeeChakki,
        caption: "Babay Dee Atta Chakki - Experience Our Authentic Interactive 3D Stone Chakki & Web Audio Synth"
      },
      {
        url: babaydeeCatalog,
        caption: "Babay Dee Atta Chakki - Store Catalog with Chakki Atta, Makai Atta & Quick Add Options"
      },
      {
        url: babaydeeAbout,
        caption: "Babay Dee Atta Chakki - Contact Page, Head Office Details & Digital Map Guidance"
      }
    ],
    results: [
      "Established an operational 24/7 digital storefront for Babay Dee Atta Chakki",
      "Expanded business reach to digital consumers outside local walk-in boundaries",
      "Streamlined order collection and product catalog presentation",
      "Delivered a modern, mobile-friendly e-commerce purchasing experience"
    ],
    seo: {
      title: "Babay Dee Atta Chakki Case Study | E-Commerce Web Platform | DevOps Services",
      metaDescription: "Explore how DevOps Services engineered a complete online grocery and e-commerce platform for Babay Dee Atta Chakki with product catalog, shopping cart, and seamless checkout flow.",
      ogTitle: "Babay Dee Atta Chakki E-Commerce Platform | Case Study",
      ogDescription: "Full-stack e-commerce web platform engineered for Babay Dee Atta Chakki featuring real-time cart management and responsive mobile ordering."
    }
  },
  {
    id: "devops-services",
    slug: "devops-services",
    title: "DevOps Services",
    category: "Corporate / Agency Website",
    client: "DevOps Services Ltd",
    shortDescription: "The official company website for DevOps Services, designed to present the company's web development and digital marketing services, capabilities, portfolio, and business offerings.",
    liveUrl: "https://devopsservices-seven.vercel.app/",
    ctaText: "Visit Live Website",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Professional corporate design",
      "Service presentation",
      "Responsive UI",
      "Conversion-focused sections",
      "Modern animations",
      "Agency branding"
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Motion",
      "WebGL Shaders",
      "Cloud Run Container Platform",
      "Vite"
    ],
    overview: {
      whatItIs: "The official corporate digital platform and interactive agency website for DevOps Services Ltd.",
      whoBuiltFor: "Architected for DevOps Services Ltd to serve as its flagship international client facing platform.",
      businessPurpose: "Presenting the agency's full-stack web development, 24/7 website management, UI/UX design systems, SEO solutions, digital marketing, brand identity, and business automation offerings.",
      ourContribution: "Designed, engineered, and deployed the complete corporate platform, incorporating custom dark/midnight high-contrast themes, interactive diagnostic consoles, and live telemetry engines."
    },
    challenge: "Creating an agency web experience that demonstrates technical excellence, sub-100ms load speeds, and sophisticated UI craftsmanship while clearly communicating multi-disciplinary technical services, client work, and structured project brief inquiry pathways without clutter.",
    solution: "We built a bespoke React application featuring dual high-contrast theme engines, kinetic typography, an interactive technology radar, real-time client feedback feeds, dynamic case study modals, and multilingual support across 4 global languages (English, French, German, Japanese).",
    keyFeatures: [
      {
        title: "Service Specification Matrix",
        description: "Interactive service allocation cards with deep protocol specification drawers for technical transparency.",
        iconName: "Layers"
      },
      {
        title: "Interactive Technology Radar",
        description: "Live radar widget showcasing technical stack adoption across Adopt, Trial, Assess, and Hold rings.",
        iconName: "Activity"
      },
      {
        title: "Multilingual Engine",
        description: "Instant seamless language switching supporting English, French, German, and Japanese localized copy.",
        iconName: "Globe"
      },
      {
        title: "Live Partner Feedback Board",
        description: "Real-time client review submission system with verified ratings and interactive testimonial feeds.",
        iconName: "MessageSquare"
      },
      {
        title: "Sub-100ms Performance SLA",
        description: "Optimized bundle footprint delivering top-tier Core Web Vitals and instant page renders.",
        iconName: "Zap"
      },
      {
        title: "Interactive Project Exhibition",
        description: "Dynamic case study showcase displaying production metrics, architecture summaries, and live links.",
        iconName: "FolderOpen"
      }
    ],
    designApproach: {
      responsive: "Fluid multi-column grid layouts with breakpoint-aware padding, scaling font sizes, and touch-optimized controls.",
      userExperience: "Designed around executive conversion funnels with clear CTA hierarchy, structured project briefs, and immediate contact options.",
      visualHierarchy: "Sophisticated dark canvas aesthetics with vibrant cyan/blue telemetry accents, bold display headings, and crisp mono typography.",
      navigation: "Fixed glassmorphism header with smooth Lenis scroll acceleration and responsive full-screen mobile drawer.",
      animations: "GPU-accelerated Motion choreography, fluid background lighting orbs, velocity marquee rows, and smooth hover tilt effects."
    },
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        caption: "DevOps Services Corporate Hero & Telemetry Console"
      },
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        caption: "Interactive Operations & Technology Radar Visualization"
      },
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        caption: "Service Allocation Panels & Detailed Protocol Specifications"
      },
      {
        url: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80",
        caption: "Responsive Mobile Interface & Dark Theme Palette"
      }
    ],
    results: [
      "Established a high-impact corporate online identity for international client acquisition",
      "Centralized service capabilities, technology stack details, and project portfolios",
      "Achieved sub-100ms page load benchmarks and top-tier Core Web Vitals metrics",
      "Drove client engagement through interactive telemetry, case studies, and multilingual access"
    ],
    seo: {
      title: "DevOps Services Corporate Agency Platform Case Study | DevOps Services",
      metaDescription: "Learn how DevOps Services engineered its official corporate agency web platform featuring sub-100ms edge speed, interactive technology radar, and multilingual support.",
      ogTitle: "DevOps Services Official Corporate Website | Case Study",
      ogDescription: "Official corporate platform engineered with sub-100ms performance, interactive tech radar, and multilingual capabilities."
    }
  },
  {
    id: "outsource-one",
    slug: "outsource-one",
    title: "Outsource One LLC",
    category: "B2B / Corporate Website",
    client: "Outsource One LLC",
    shortDescription: "A professional B2B website created for Outsource One LLC, a CDR data provider serving the call-center industry.",
    liveUrl: "https://outsourceonellc.netlify.app/",
    ctaText: "Visit Live Website",
    featuredImage: outsourceoneHero,
    highlights: [
      "B2B-focused design",
      "Corporate presentation",
      "Service/product presentation",
      "Lead-generation focused UX",
      "Responsive design",
      "Professional business interface"
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Node.js API",
      "Responsive Grid Framework"
    ],
    overview: {
      whatItIs: "A corporate B2B website designed and developed for Outsource One LLC, a Call Detail Record (CDR) data provider for call centers.",
      whoBuiltFor: "Created for Outsource One LLC to engage call center executives, B2B data managers, and telecommunication partners.",
      businessPurpose: "Showcasing specialized call center CDR data feeds, B2B telecommunication solutions, service reliability standards, and facilitating corporate inquiry capture.",
      ourContribution: "DevOps Services developed the corporate web architecture, designed the B2B UI/UX visual layout, structured technical service offerings, and implemented responsive contact channels."
    },
    challenge: "Presenting complex, highly technical call center CDR data feeds and B2B telecommunication infrastructure services clearly to industry decision-makers while establishing corporate trust, compliance standards, and driving qualified lead inquiries.",
    solution: "We designed a clean, authoritative corporate B2B web interface featuring clear service capability cards, data accuracy commitments, structured business contact forms, and mobile-friendly navigation optimized for executive decision-makers.",
    keyFeatures: [
      {
        title: "B2B Service Catalog",
        description: "Structured presentation of CDR data solutions, call center data feeds, and telecom analytics.",
        iconName: "Server"
      },
      {
        title: "Lead Generation UX",
        description: "Prominent conversion channels and inquiry touchpoints designed for enterprise buyers.",
        iconName: "Send"
      },
      {
        title: "Corporate Trust Presentation",
        description: "Clear communication of data security protocols, accuracy standards, and service reliability.",
        iconName: "ShieldCheck"
      },
      {
        title: "Call Center Integration Overview",
        description: "Visual explanation of how Outsource One LLC data feeds integrate into existing call center systems.",
        iconName: "Workflow"
      },
      {
        title: "Executive Content Hierarchy",
        description: "Scannable headings, key takeaway callouts, and clean technical feature matrices.",
        iconName: "FileText"
      },
      {
        title: "Cross-Device Responsiveness",
        description: "Flawless rendering on mobile, tablet, and desktop viewports for business users on the go.",
        iconName: "Monitor"
      }
    ],
    designApproach: {
      responsive: "Mobile-first responsive corporate layout with structured grid spacing and touch-friendly navigation elements.",
      userExperience: "Designed to minimize friction for enterprise inquiries with prominent service highlights and direct contact options.",
      visualHierarchy: "Trust-building navy and slate visual scheme paired with crisp typography and clear section dividers.",
      navigation: "Intuitive top navigation bar with quick jump links to services, corporate overview, and lead form.",
      animations: "Subtle fade-in scroll transitions and clean hover highlights that enhance corporate readability without distraction."
    },
    galleryImages: [
      {
        url: outsourceoneHero,
        caption: "Outsource One LLC - Official Corporate Homepage & Hero Section"
      },
      {
        url: outsourceoneServices,
        caption: "Outsource One LLC - Our Premium Services & B2B Solutions Grid"
      },
      {
        url: outsourceoneWhyUs,
        caption: "Outsource One LLC - Why Choose Us Advantage Cards & Metrics"
      },
      {
        url: outsourceoneOrderForm,
        caption: "Outsource One LLC - Place Your Order & Instant B2B Data Request Portal"
      }
    ],
    results: [
      "Delivered a professional corporate web presence for Outsource One LLC",
      "Streamlined presentation of specialized call center CDR data services",
      "Established clear digital lead capture channels for B2B client acquisition",
      "Enhanced brand credibility among call center industry decision-makers"
    ],
    seo: {
      title: "Outsource One LLC B2B Corporate Website Case Study | DevOps Services",
      metaDescription: "Discover how DevOps Services created a professional corporate B2B website for Outsource One LLC, a call center CDR data provider.",
      ogTitle: "Outsource One LLC B2B Website | Case Study",
      ogDescription: "Professional B2B corporate web architecture created for Outsource One LLC to present call center CDR data solutions."
    }
  },
  {
    id: "msoban-portfolio",
    slug: "msoban-portfolio",
    title: "Muhammad Soban Personal Portfolio",
    category: "Personal Portfolio / Developer Website",
    client: "Muhammad Soban",
    shortDescription: "A personal developer portfolio designed to showcase technical skills, projects, experience, and professional capabilities through a modern interactive interface.",
    liveUrl: "https://muhammadsoban.vercel.app/",
    ctaText: "Visit Live Website",
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Personal branding",
      "Project showcase",
      "Responsive design",
      "Interactive UI",
      "Modern animations",
      "Developer-focused UX"
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Vite",
      "JavaScript ES6+"
    ],
    overview: {
      whatItIs: "A personal developer portfolio and interactive project showcase web application built for software engineer Muhammad Soban.",
      whoBuiltFor: "Designed for Muhammad Soban to present engineering capabilities to clients, recruiters, and technical collaborators.",
      businessPurpose: "Highlighting software engineering proficiency, showcasing live web and API applications, presenting professional history, and enabling direct contact.",
      ourContribution: "DevOps Services designed the interactive portfolio layout, engineered the frontend component hierarchy, integrated smooth animations, and optimized mobile performance."
    },
    challenge: "Creating an engaging personal developer website that effectively highlights technical skills, code repositories, and web applications in a sleek, modern visual aesthetic that stands out to tech employers and clients.",
    solution: "We engineered a modern, dark-themed developer portfolio featuring dynamic skill badge matrices, interactive project showcase cards with direct project links, smooth section navigation, and a responsive mobile layout.",
    keyFeatures: [
      {
        title: "Developer Skill Matrix",
        description: "Categorized skill badges highlighting proficiency in frontend engineering, APIs, and modern web tools.",
        iconName: "Code"
      },
      {
        title: "Interactive Project Showcase",
        description: "Visual project cards featuring project titles, technology tags, key summaries, and live demo links.",
        iconName: "Layout"
      },
      {
        title: "Developer Bio & Timeline",
        description: "Clean presentation of professional experience, background, and software development background.",
        iconName: "User"
      },
      {
        title: "Direct Contact Integration",
        description: "Accessible contact triggers and social developer profile links (GitHub, LinkedIn, Email).",
        iconName: "Mail"
      },
      {
        title: "Sleek Dark Theme UI",
        description: "Modern developer-focused dark canvas with high-contrast accent lighting and clean font pairings.",
        iconName: "Moon"
      },
      {
        title: "Adaptive Mobile Layout",
        description: "Smooth, responsive rendering tailored for mobile screens, tablets, and high-resolution monitors.",
        iconName: "Tablet"
      }
    ],
    designApproach: {
      responsive: "Mobile-first responsive grid ensuring code blocks, skill badges, and project cards render legibly on all screens.",
      userExperience: "Designed for rapid technical evaluation with clear project descriptions and instant external link triggers.",
      visualHierarchy: "Code-inspired dark palette with crisp cyan/blue highlights, structured borders, and legible typography.",
      navigation: "Compact navigation bar with quick jump links to skills, portfolio projects, about section, and contact.",
      animations: "Smooth micro-interactions on hover, kinetic button effects, and seamless section entrance transitions."
    },
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        caption: "Muhammad Soban Developer Portfolio Hero & Overview"
      },
      {
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
        caption: "Technical Stack & Engineering Skill Matrix"
      },
      {
        url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        caption: "Interactive Project Showcase & Repository Highlights"
      },
      {
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        caption: "Mobile Responsive Layout & Contact Channels"
      }
    ],
    results: [
      "Established an authentic personal developer brand for Muhammad Soban",
      "Effectively presented technical capabilities, stack mastery, and live projects",
      "Provided an accessible direct contact portal for professional opportunities",
      "Delivered a fast, responsive, and visually appealing web presence"
    ],
    seo: {
      title: "Muhammad Soban Developer Portfolio Case Study | DevOps Services",
      metaDescription: "See how DevOps Services engineered an interactive personal developer portfolio for Muhammad Soban highlighting technical skills and live projects.",
      ogTitle: "Muhammad Soban Developer Portfolio | Case Study",
      ogDescription: "Interactive personal developer portfolio created for Muhammad Soban with technical stack matrices and project showcases."
    }
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
