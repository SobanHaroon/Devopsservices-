import { 
  Code2, 
  Settings, 
  Layers, 
  TrendingUp, 
  Megaphone, 
  Compass, 
  Cpu,
  Shield,
  Zap,
  Target,
  Sparkles,
  Users2
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
  tag: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link: string;
  year: string;
  client: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface ValueCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
  metricLabel?: string;
}

export const SERVICES_DATA: Service[] = [
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
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "atelier",
    title: "The Atelier Studio",
    category: "Web Development / UIUX Design",
    description: "A visually mesmerizing immersive experience designed for an elite Parisian architectural firm. Built with WebGL transitions, minimalist grids, and custom cursor mapping.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    year: "2025",
    client: "Atelier Paris"
  },
  {
    id: "linearis",
    title: "Linearis Systems",
    category: "SaaS Platform / Automation",
    description: "A complex web-based infrastructure and custom dashboard with real-time analytics. Re-architected operational data structures to process 10M+ events daily with 120ms latencies.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    year: "2026",
    client: "Linearis Corp"
  },
  {
    id: "vero-capital",
    title: "Vero Capital Trust",
    category: "Brand Identity / SEO / Design",
    description: "Comprehensive branding, structural SEO, and web development for a private venture capital trust. Boosted non-branded organic keyword rankings by 320% in 90 days.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    year: "2025",
    client: "Vero Capital"
  },
  {
    id: "strive-fintech",
    title: "Strive Analytics",
    category: "Digital Marketing / Branding",
    description: "A luxury fintech dashboard and go-to-market advertising funnel. Engineered high-performing interactive landing modules that converted leads at a record-breaking 8.4%.",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    link: "#",
    year: "2026",
    client: "Strive Inc"
  }
];

export const VALUES_DATA: ValueCard[] = [
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
];

export const TESTIMONIALS_DATA: Testimonial[] = [
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
];
