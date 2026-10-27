/**
 * Updates SEO meta tags specifically for Case Study views (list & detail pages).
 */
export function updateCaseStudyMetaTags(
  title: string,
  description: string,
  ogTitle?: string,
  ogDescription?: string,
  canonicalPath?: string,
  structuredData?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  document.title = title;

  const setMetaTag = (
    selector: string,
    attrName: string,
    attrValue: string,
    content: string,
  ) => {
    let element = document.querySelector(`meta[${selector}]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  const currentOrigin = window.location.origin;
  const canonicalUrl = canonicalPath
    ? `${currentOrigin}${canonicalPath}`
    : window.location.href;

  setMetaTag('name="description"', "name", "description", description);
  setMetaTag('property="og:title"', "property", "og:title", ogTitle || title);
  setMetaTag(
    'property="og:description"',
    "property",
    "og:description",
    ogDescription || description,
  );
  setMetaTag('property="og:url"', "property", "og:url", canonicalUrl);
  setMetaTag('name="twitter:title"', "name", "twitter:title", ogTitle || title);
  setMetaTag(
    'name="twitter:description"',
    "name",
    "twitter:description",
    ogDescription || description,
  );

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
