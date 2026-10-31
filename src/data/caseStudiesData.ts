const outsourceoneHero = "/media/work/outsourceone_hero_1786554724935.webp";
const outsourceoneServices =
  "/media/work/outsourceone_services_1786554742110.webp";
const outsourceoneWhyUs = "/media/work/outsourceone_whyus_1786554758472.webp";
const outsourceoneOrderForm =
  "/media/work/outsourceone_orderform_1786554776360.webp";

const babaydeeHero = "/media/work/user-attachment-5.webp";
const babaydeeOrbit = "/media/work/user-attachment-3.webp";
const babaydeeChakki = "/media/work/user-attachment-4.webp";
const babaydeeCatalog = "/media/work/user-attachment-2.webp";
const babaydeeAbout = "/media/work/user-attachment.webp";

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
    id: "atelier-noir",
    slug: "atelier-noir",
    title: "Atelier Noir",
    category: "E-Commerce Development",
    client: "Atelier Noir",
    shortDescription:
      "An editorial fashion storefront with an interactive 3D jacket, a full collection, and a considered shopping journey.",
    liveUrl: "https://atelier-noir-motion.vercel.app/",
    ctaText: "Visit website",
    featuredImage: "/media/work/atelier-noir.webp",
    highlights: [
      "3D product experience",
      "Full collection",
      "Responsive storefront",
      "Search & cart",
    ],
    technologies: ["React", "Three.js", "GSAP", "Framer Motion", "Vercel"],
    overview: {
      whatItIs:
        "A contemporary fashion storefront that brings editorial art direction and an interactive 3D product together.",
      whoBuiltFor: "An original fashion-commerce project for Atelier Noir.",
      businessPurpose:
        "Help visitors discover the collection, explore products, and move from inspiration to a clear shopping flow.",
      ourContribution:
        "We designed and built the responsive storefront, 3D jacket experience, collection and product routes, search, cart, checkout interface, and contact page.",
    },
    challenge:
      "Bring the atmosphere of a fashion editorial into an online store while keeping the catalog, navigation, and shopping controls easy to use on a phone.",
    solution:
      "A restrained layout pairs expressive typography and product imagery with lightweight motion. The 3D jacket has an image fallback, while dedicated collection, product, and cart views keep the shopping journey clear.",
    keyFeatures: [
      {
        title: "Interactive 3D jacket",
        description:
          "A product-led hero built with Three.js and a static fallback for devices that cannot render WebGL.",
        iconName: "Layers",
      },
      {
        title: "Collection and search",
        description:
          "Dedicated catalog and product views with search and category navigation.",
        iconName: "ShoppingBag",
      },
      {
        title: "Cart and checkout",
        description:
          "A persistent cart and checkout flow backed by server endpoints. Live purchasing depends on configured store, inventory, and payment services.",
        iconName: "ShoppingCart",
      },
      {
        title: "Responsive experience",
        description:
          "Layouts and touch controls designed for mobile, tablet, and desktop browsing.",
        iconName: "Smartphone",
      },
    ],
    designApproach: {
      responsive: "Fluid grids and touch-friendly controls.",
      userExperience: "Clear shopping steps.",
      visualHierarchy:
        "Editorial product photography and deliberate type scale.",
      navigation: "Dedicated catalog, product, contact, and cart routes.",
      animations:
        "GSAP, Framer Motion, and an original Three.js product presentation.",
    },
    galleryImages: [
      {
        url: "/media/work/atelier-noir.webp",
        caption:
          "Atelier Noir — editorial storefront and 3D jacket presentation.",
      },
      {
        url: "/media/work/atelier-jacket.webp",
        caption: "Product imagery used in the Atelier Noir collection.",
      },
    ],
    results: [
      "A complete responsive fashion storefront and project source.",
      "An interactive product presentation with an image fallback.",
      "Dedicated collection, search, product, cart, checkout, and contact views.",
      "Commerce endpoints prepared for configured inventory and payment services.",
    ],
    seo: {
      title: "Atelier Noir Case Study | DevOps Services",
      metaDescription:
        "An editorial fashion storefront with 3D product presentation, responsive shopping, search and cart.",
      ogTitle: "Atelier Noir — DevOps Services",
      ogDescription:
        "Fashion, thoughtful interaction, and a complete shopping journey.",
    },
  },
  {
    id: "babey-dee-atta-chakki",
    slug: "babey-dee-atta-chakki",
    title: "Babay Dee Atta Chakki",
    category: "E-Commerce Development",
    client: "Babay Dee Atta Chakki",
    shortDescription:
      "From the local chakki to the online store. E-commerce, campaign artwork, and brand films for an everyday essentials business.",
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
      "Business-focused UX",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express API",
      "Tailwind CSS",
      "JavaScript",
      "Responsive Web Architecture",
    ],
    overview: {
      whatItIs:
        "A complete online grocery and staple food e-commerce platform developed for Babay Dee Atta Chakki, bringing daily essentials directly to digital shoppers.",
      whoBuiltFor:
        "Built specifically for Babay Dee Atta Chakki and its retail customer base seeking convenient, reliable online food staple ordering.",
      businessPurpose:
        "Digitizing traditional grain mill (Atta Chakki) and grocery store ordering, enabling consumers to browse flour varieties, grains, and kitchen staples, manage carts, and place direct delivery orders online 24/7.",
      ourContribution:
        "DevOps Services engineered the full-stack web application, crafted the e-commerce UI/UX, implemented responsive cart and checkout systems, and optimized cross-device performance.",
    },
    challenge:
      "Traditional grain mill and staple grocery businesses historically rely on physical foot traffic and phone calls for order placement. Babay Dee Atta Chakki needed a seamless way to showcase their comprehensive product catalog online, manage customizable flour/grain quantities, and provide an effortless checkout experience for household customers on mobile and desktop without operational complexity.",
    solution:
      "We designed and engineered a clean, high-performance e-commerce platform with intuitive product categorization, dynamic cart calculation, direct checkout order management, clear delivery details, and a responsive mobile interface for browsing products and placing delivery orders.",
    keyFeatures: [
      {
        title: "Dynamic Product Catalog",
        description:
          "Clear product categorization for fresh flours, whole grains, pulses, and daily household staples with rich product details.",
        iconName: "ShoppingBag",
      },
      {
        title: "Interactive Shopping Cart",
        description:
          "Real-time cart quantity controls, instant total price updates, and persistent session storage for seamless shopping.",
        iconName: "ShoppingCart",
      },
      {
        title: "Streamlined Order Flow",
        description:
          "Simplified checkout process designed to collect customer delivery details and order preferences without friction.",
        iconName: "CheckCircle2",
      },
      {
        title: "Delivery & Service Info",
        description:
          "Transparent delivery zone schedules, minimum order criteria, and direct customer contact options.",
        iconName: "Truck",
      },
      {
        title: "Business Order Management",
        description:
          "Structured order summaries enabling the business to process, organize, and fulfill incoming customer orders efficiently.",
        iconName: "ClipboardList",
      },
      {
        title: "Mobile-First Accessibility",
        description:
          "Fully responsive layout ensuring effortless browsing and purchasing on mobile phones, tablets, and desktop computers.",
        iconName: "Smartphone",
      },
    ],
    designApproach: {
      responsive:
        "Engineered with a mobile-first fluid grid that adjusts product cards, cart sliders, and checkout forms smoothly across screen widths.",
      userExperience:
        "Focused on reducing steps to purchase for busy household shoppers, using high-visibility CTA buttons and transparent pricing.",
      visualHierarchy:
        "Clean neutral background palettes with vibrant product accents, readable typography, and un-cluttered card layouts.",
      navigation:
        "Sticky top bar with instant search, category quick-filters, and persistent cart counters for effortless item browsing.",
      animations:
        "Subtle micro-interactions on button presses, smooth drawer transitions for cart management, and crisp hover states.",
    },
    galleryImages: [
      {
        url: babaydeeHero,
        caption:
          "Babay Dee Atta Chakki - Official E-Commerce Homepage & Natural Stone-Grounded Fresh Atta Hero",
      },
      {
        url: babaydeeOrbit,
        caption:
          "Babay Dee Atta Chakki - Freshly Sourced Products Interactive Orbit Showcase",
      },
      {
        url: babaydeeChakki,
        caption:
          "Babay Dee Atta Chakki - Experience Our Authentic Interactive 3D Stone Chakki & Web Audio Synth",
      },
      {
        url: babaydeeCatalog,
        caption:
          "Babay Dee Atta Chakki - Store Catalog with Chakki Atta, Makai Atta & Quick Add Options",
      },
      {
        url: babaydeeAbout,
        caption:
          "Babay Dee Atta Chakki - Contact Page, Head Office Details & Digital Map Guidance",
      },
    ],
    results: [
      "Established an operational 24/7 digital storefront for Babay Dee Atta Chakki",
      "Expanded business reach to digital consumers outside local walk-in boundaries",
      "Streamlined order collection and product catalog presentation",
      "Delivered a modern, mobile-friendly e-commerce purchasing experience",
    ],
    seo: {
      title:
        "Babay Dee Atta Chakki Case Study | E-Commerce Web Platform | DevOps Services",
      metaDescription:
        "Explore how DevOps Services engineered a complete online grocery and e-commerce platform for Babay Dee Atta Chakki with product catalog, shopping cart, and seamless checkout flow.",
      ogTitle: "Babay Dee Atta Chakki E-Commerce Platform | Case Study",
      ogDescription:
        "Full-stack e-commerce web platform engineered for Babay Dee Atta Chakki featuring real-time cart management and responsive mobile ordering.",
    },
  },
  {
    id: "devops-services",
    slug: "devops-services",
    title: "DevOps Services",
    category: "Corporate / Agency Website",
    client: "DevOps Services",
    shortDescription:
      "A Japanese-inspired digital studio: expressive typography, original 3D artwork, and a straightforward path from discovery to project brief.",
    liveUrl: "https://devopsservices-seven.vercel.app/",
    ctaText: "Visit website",
    featuredImage: "/media/work/devops-services.webp",
    highlights: [
      "Original 3D scene",
      "Multilingual interface",
      "White-label partnerships",
      "Responsive grids",
    ],
    technologies: ["React", "TypeScript", "Three.js", "GSAP", "Motion", "Vite"],
    overview: {
      whatItIs:
        "The website for DevOps Services, an independent digital studio based in Rawalpindi, Pakistan.",
      whoBuiltFor:
        "Business owners and agency partners looking for design, development, and digital support.",
      businessPurpose:
        "Show real work, explain services, and make it easy to discuss a project or white-label contract.",
      ourContribution:
        "Art direction, interface design, original 3D models, responsive development, multilingual content, and the inquiry workflow.",
    },
    challenge:
      "Combine anime-inspired Japanese art direction with a credible IT studio presence, without making navigation or contact more complicated.",
    solution:
      "A logo-led navy, cyan, ice, and gold visual system pairs with original 3D anime characters. Native scrolling, aligned grids, a personal founder profile, and direct forms keep the experience focused.",
    keyFeatures: [
      {
        title: "Original anime characters",
        description:
          "Three original 3D characters respond to scrolling and hover in the hero, services, and partnership sections.",
        iconName: "Layers",
      },
      {
        title: "White-label contracts",
        description:
          "Project-based, monthly, and weekly partnership inquiries with contract-based pricing.",
        iconName: "Briefcase",
      },
      {
        title: "Accessible motion",
        description:
          "Continuous ambient films and 3D animation, with a static fallback when WebGL is unavailable.",
        iconName: "Activity",
      },
      {
        title: "Reliable navigation",
        description:
          "Direct case-study routes, browser history, and deliberate scroll restoration.",
        iconName: "Globe",
      },
    ],
    designApproach: {
      responsive: "Fluid grids and touch-friendly controls.",
      userExperience:
        "Direct contact with the founder and simple service selection.",
      visualHierarchy:
        "Sora headings, Manrope body copy, and a logo-led color palette.",
      navigation:
        "Case-study routes with reliable Back/Forward and scroll restoration.",
      animations:
        "GSAP reveals, Motion for React scroll transforms, and three original Three.js characters.",
    },
    galleryImages: [
      {
        url: "/media/work/devops-services.webp",
        caption: "The Japanese-inspired DevOps Services homepage.",
      },
      {
        url: "/media/characters/kael.webp",
        caption:
          "Kael Astra, reconstructed in 3D from the founder’s character design.",
      },
    ],
    results: [
      "A responsive design across the homepage and case studies.",
      "A clear inquiry form with contract-based partnership options.",
      "Original local 3D assets and self-hosted typography.",
      "Reduced-motion support and dependable route recovery.",
    ],
    seo: {
      title: "DevOps Services Website Case Study",
      metaDescription:
        "A Japanese-inspired digital studio: expressive typography, original 3D artwork, and a straightforward path from discovery to project brief.",
      ogTitle: "DevOps Services — Digital Studio",
      ogDescription:
        "A Japanese-inspired digital studio: expressive typography, original 3D artwork, and a straightforward path from discovery to project brief.",
    },
  },
  {
    id: "outsource-one",
    slug: "outsource-one",
    title: "Outsource One LLC",
    category: "B2B / Corporate Website",
    client: "Outsource One LLC",
    shortDescription:
      "A professional B2B website created for Outsource One LLC, a CDR data provider serving the call-center industry.",
    liveUrl: "https://outsourceonellc.netlify.app/",
    ctaText: "Visit Live Website",
    featuredImage: outsourceoneHero,
    highlights: [
      "B2B-focused design",
      "Corporate presentation",
      "Service/product presentation",
      "Lead-generation focused UX",
      "Responsive design",
      "Professional business interface",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Node.js API",
      "Responsive Grid Framework",
    ],
    overview: {
      whatItIs:
        "A corporate B2B website designed and developed for Outsource One LLC, a Call Detail Record (CDR) data provider for call centers.",
      whoBuiltFor:
        "Created for Outsource One LLC to engage call center executives, B2B data managers, and telecommunication partners.",
      businessPurpose:
        "Showcasing specialized call center CDR data feeds, B2B telecommunication solutions, service reliability standards, and facilitating corporate inquiry capture.",
      ourContribution:
        "DevOps Services developed the corporate web architecture, designed the B2B UI/UX visual layout, structured technical service offerings, and implemented responsive contact channels.",
    },
    challenge:
      "Presenting complex, highly technical call center CDR data feeds and B2B telecommunication infrastructure services clearly to industry decision-makers while establishing corporate trust, compliance standards, and driving qualified lead inquiries.",
    solution:
      "We designed a clean, authoritative corporate B2B web interface featuring clear service capability cards, data accuracy commitments, structured business contact forms, and mobile-friendly navigation optimized for executive decision-makers.",
    keyFeatures: [
      {
        title: "B2B Service Catalog",
        description:
          "Structured presentation of CDR data solutions, call center data feeds, and telecom analytics.",
        iconName: "Server",
      },
      {
        title: "Lead Generation UX",
        description:
          "Prominent conversion channels and inquiry touchpoints designed for enterprise buyers.",
        iconName: "Send",
      },
      {
        title: "Corporate Trust Presentation",
        description:
          "Clear communication of data security protocols, accuracy standards, and service reliability.",
        iconName: "ShieldCheck",
      },
      {
        title: "Call Center Integration Overview",
        description:
          "Visual explanation of how Outsource One LLC data feeds integrate into existing call center systems.",
        iconName: "Workflow",
      },
      {
        title: "Executive Content Hierarchy",
        description:
          "Scannable headings, key takeaway callouts, and clean technical feature matrices.",
        iconName: "FileText",
      },
      {
        title: "Cross-Device Responsiveness",
        description:
          "Flawless rendering on mobile, tablet, and desktop viewports for business users on the go.",
        iconName: "Monitor",
      },
    ],
    designApproach: {
      responsive:
        "Mobile-first responsive corporate layout with structured grid spacing and touch-friendly navigation elements.",
      userExperience:
        "Designed to minimize friction for enterprise inquiries with prominent service highlights and direct contact options.",
      visualHierarchy:
        "Trust-building navy and slate visual scheme paired with crisp typography and clear section dividers.",
      navigation:
        "Intuitive top navigation bar with quick jump links to services, corporate overview, and lead form.",
      animations:
        "Subtle fade-in scroll transitions and clean hover highlights that enhance corporate readability without distraction.",
    },
    galleryImages: [
      {
        url: outsourceoneHero,
        caption:
          "Outsource One LLC - Official Corporate Homepage & Hero Section",
      },
      {
        url: outsourceoneServices,
        caption:
          "Outsource One LLC - Our Premium Services & B2B Solutions Grid",
      },
      {
        url: outsourceoneWhyUs,
        caption: "Outsource One LLC - Why Choose Us Advantage Cards & Metrics",
      },
      {
        url: outsourceoneOrderForm,
        caption:
          "Outsource One LLC - Place Your Order & Instant B2B Data Request Portal",
      },
    ],
    results: [
      "Delivered a professional corporate web presence for Outsource One LLC",
      "Streamlined presentation of specialized call center CDR data services",
      "Established clear digital lead capture channels for B2B client acquisition",
      "Enhanced brand credibility among call center industry decision-makers",
    ],
    seo: {
      title:
        "Outsource One LLC B2B Corporate Website Case Study | DevOps Services",
      metaDescription:
        "Discover how DevOps Services created a professional corporate B2B website for Outsource One LLC, a call center CDR data provider.",
      ogTitle: "Outsource One LLC B2B Website | Case Study",
      ogDescription:
        "Professional B2B corporate web architecture created for Outsource One LLC to present call center CDR data solutions.",
    },
  },
  {
    id: "msoban-portfolio",
    slug: "msoban-portfolio",
    title: "Muhammad Soban Portfolio",
    category: "Personal Portfolio / Developer Website",
    client: "Muhammad Soban",
    shortDescription:
      "A personal developer portfolio designed to showcase technical skills, projects, experience, and professional capabilities through a modern interactive interface.",
    liveUrl: "https://muhammadsoban.vercel.app/",
    ctaText: "Visit Live Website",
    featuredImage: "/media/work/portfolio-workspace-1.webp",
    highlights: [
      "Personal branding",
      "Project showcase",
      "Responsive design",
      "Interactive UI",
      "Modern animations",
      "Developer-focused UX",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Vite",
      "JavaScript ES6+",
    ],
    overview: {
      whatItIs:
        "A personal developer portfolio and interactive project showcase web application built for software engineer Muhammad Soban.",
      whoBuiltFor:
        "Designed for Muhammad Soban to present engineering capabilities to clients, recruiters, and technical collaborators.",
      businessPurpose:
        "Highlighting software engineering proficiency, showcasing live web and API applications, presenting professional history, and enabling direct contact.",
      ourContribution:
        "DevOps Services designed the interactive portfolio layout, engineered the frontend component hierarchy, integrated smooth animations, and optimized mobile performance.",
    },
    challenge:
      "Creating an engaging personal developer website that effectively highlights technical skills, code repositories, and web applications in a sleek, modern visual aesthetic that stands out to tech employers and clients.",
    solution:
      "We engineered a modern, dark-themed developer portfolio featuring dynamic skill badge matrices, interactive project showcase cards with direct project links, smooth section navigation, and a responsive mobile layout.",
    keyFeatures: [
      {
        title: "Developer Skill Matrix",
        description:
          "Categorized skill badges highlighting proficiency in frontend engineering, APIs, and modern web tools.",
        iconName: "Code",
      },
      {
        title: "Interactive Project Showcase",
        description:
          "Visual project cards featuring project titles, technology tags, key summaries, and live demo links.",
        iconName: "Layout",
      },
      {
        title: "Developer Bio & Timeline",
        description:
          "Clean presentation of professional experience, background, and software development background.",
        iconName: "User",
      },
      {
        title: "Direct Contact Integration",
        description:
          "Accessible contact triggers and social developer profile links (GitHub, LinkedIn, Email).",
        iconName: "Mail",
      },
      {
        title: "Sleek Dark Theme UI",
        description:
          "Modern developer-focused dark canvas with high-contrast accent lighting and clean font pairings.",
        iconName: "Moon",
      },
      {
        title: "Adaptive Mobile Layout",
        description:
          "Smooth, responsive rendering tailored for mobile screens, tablets, and high-resolution monitors.",
        iconName: "Tablet",
      },
    ],
    designApproach: {
      responsive:
        "Mobile-first responsive grid ensuring code blocks, skill badges, and project cards render legibly on all screens.",
      userExperience:
        "Designed for rapid technical evaluation with clear project descriptions and instant external link triggers.",
      visualHierarchy:
        "Code-inspired dark palette with crisp cyan/blue highlights, structured borders, and legible typography.",
      navigation:
        "Compact navigation bar with quick jump links to skills, portfolio projects, about section, and contact.",
      animations:
        "Smooth micro-interactions on hover, kinetic button effects, and seamless section entrance transitions.",
    },
    galleryImages: [
      {
        url: "/media/work/portfolio-workspace-1.webp",
        caption:
          "Programming workspace — illustrative photograph, not a website screenshot",
      },
      {
        url: "/media/work/portfolio-workspace-2.webp",
        caption: "Development setup — illustrative photograph",
      },
      {
        url: "/media/work/portfolio-workspace-3.webp",
        caption: "Design workspace — illustrative photograph",
      },
      {
        url: "/media/work/portfolio-workspace-4.webp",
        caption: "Code detail — illustrative photograph",
      },
    ],
    results: [
      "Established an authentic personal developer brand for Muhammad Soban",
      "Effectively presented technical capabilities, stack mastery, and live projects",
      "Provided an accessible direct contact portal for professional opportunities",
      "Delivered a fast, responsive, and visually appealing web presence",
    ],
    seo: {
      title: "Muhammad Soban Developer Portfolio Case Study | DevOps Services",
      metaDescription:
        "See how DevOps Services engineered an interactive personal developer portfolio for Muhammad Soban highlighting technical skills and live projects.",
      ogTitle: "Muhammad Soban Developer Portfolio | Case Study",
      ogDescription:
        "Interactive personal developer portfolio created for Muhammad Soban with technical stack matrices and project showcases.",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
