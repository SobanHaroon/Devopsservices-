export interface SectionMetaConfig {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}

const SECTION_META_MAP: Record<string, SectionMetaConfig> = {
  hero: {
    title: "DevOps Services | Web Design, Development, SEO & NFC",
    description: "Web design, development, SEO, digital marketing, API automation and NFC business cards. Based in Pakistan, building for businesses worldwide.",
    ogTitle: "DevOps Services | Web Design, Development, SEO & NFC",
    ogDescription: "Bespoke engineering, programmatic SEO, and enterprise cloud DevOps tailored for market dominance."
  },
  about: {
    title: "About Our Engineering | DevOps Services Ltd",
    description: "Discover our mission, surgical precision SLA guarantees, and enterprise technology radar powering 180+ global deployments.",
    ogTitle: "Why Choose DevOps Services | Engineering Excellence",
    ogDescription: "99.99% high-availability SLA, sub-100ms edge response, and state-of-the-art full-stack mastery."
  },
  services: {
    title: "Service Capabilities | Web Dev, UI/UX, SEO & Cloud Management",
    description: "Explore our targeted service allocations: Web Development, Continuous Cloud Management, UI/UX Design, SEO, and AI Automation.",
    ogTitle: "Elite Technical & Creative Services | DevOps Services",
    ogDescription: "Architectural web development, programmatic organic SEO, and automated enterprise workflows."
  },
  faq: {
    title: "Operational Clearances & FAQs | DevOps Services",
    description: "In-depth responses covering our 4-8 week development cycles, 24/7 SLA management, and security protocols.",
    ogTitle: "Frequently Asked Questions | DevOps Services Paradigm",
    ogDescription: "Everything you need to know about our project timelines, pricing milestones, and enterprise security."
  },
  portfolio: {
    title: "Deployed Projects & Portfolio | DevOps Services",
    description: "Explore our featured engineering case studies: high-throughput e-commerce, meteorological telemetry, and enterprise SaaS platforms.",
    ogTitle: "Featured Case Studies | DevOps Services Portfolio",
    ogDescription: "Real-world engineering metrics: 100/100 PageSpeed scores, sub-100ms latencies, and 300%+ SEO growth."
  },
  testimonials: {
    title: "Partner Advocacy & Live Client Feed | DevOps Services",
    description: "Read real-time verified reviews from VP of Product, Founders, and CMOs regarding our cloud DevOps and design engineering.",
    ogTitle: "Client Reviews & Advocacy Board | DevOps Services",
    ogDescription: "100% client satisfaction guaranteed across enterprise web architecture and cloud operations."
  },
  contact: {
    title: "Initiate Your Project Brief | DevOps Services",
    description: "Connect with our senior engineering directors. Submit your project scope for immediate evaluation and technical proposal.",
    ogTitle: "Contact DevOps Services | Start Your Digital Ascent",
    ogDescription: "Direct engineering communication. Let's architect your next disruptive digital product."
  }
};

/**
 * Dynamically updates document title, description, open graph, and twitter meta tags
 * based on the section currently in view to improve SEO and social sharing.
 */
export function updateSectionMetaTags(sectionId: string): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const config = SECTION_META_MAP[sectionId] || SECTION_META_MAP.hero;

  // Update Document Title
  document.title = config.title;

  // Helper to update or create a meta tag by attribute selector
  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${selector}]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // Update Standard SEO description
  setMetaTag('name="description"', "name", "description", config.description);

  // Update Open Graph (Facebook/LinkedIn) tags
  setMetaTag('property="og:title"', "property", "og:title", config.ogTitle || config.title);
  setMetaTag('property="og:description"', "property", "og:description", config.ogDescription || config.description);
  setMetaTag('property="og:url"', "property", "og:url", `${window.location.origin}/#${sectionId}`);

  // Update Twitter Card tags
  setMetaTag('name="twitter:title"', "name", "twitter:title", config.ogTitle || config.title);
  setMetaTag('name="twitter:description"', "name", "twitter:description", config.ogDescription || config.description);
}

/**
 * Updates SEO meta tags specifically for Case Study views (list & detail pages).
 */
export function updateCaseStudyMetaTags(
  title: string,
  description: string,
  ogTitle?: string,
  ogDescription?: string,
  canonicalPath?: string,
  structuredData?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  document.title = title;

  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(`meta[${selector}]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  const currentOrigin = window.location.origin;
  const canonicalUrl = canonicalPath ? `${currentOrigin}${canonicalPath}` : window.location.href;

  setMetaTag('name="description"', "name", "description", description);
  setMetaTag('property="og:title"', "property", "og:title", ogTitle || title);
  setMetaTag('property="og:description"', "property", "og:description", ogDescription || description);
  setMetaTag('property="og:url"', "property", "og:url", canonicalUrl);
  setMetaTag('name="twitter:title"', "name", "twitter:title", ogTitle || title);
  setMetaTag('name="twitter:description"', "name", "twitter:description", ogDescription || description);

  // Canonical link tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", canonicalUrl);

  // Inject JSON-LD Structured Data
  let ldJsonScript = document.querySelector('script[id="case-study-jsonld"]');
  if (structuredData) {
    if (!ldJsonScript) {
      ldJsonScript = document.createElement("script");
      ldJsonScript.setAttribute("id", "case-study-jsonld");
      ldJsonScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(ldJsonScript);
    }
    ldJsonScript.textContent = JSON.stringify(structuredData);
  } else if (ldJsonScript) {
    ldJsonScript.remove();
  }
}

