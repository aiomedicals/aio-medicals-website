const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const serviceCards = document.querySelectorAll(".service-card");
const bloodTestsMenu = document.querySelector(".blood-tests-menu");
const bloodTestsToggle = document.querySelector(".nav-dropdown-toggle");
const bloodTestsPanel = document.querySelector(".blood-tests-panel");
const homepageEnquiryForm = document.querySelector('form[name="homepage-enquiry"]');
const desktopMegaMenuQuery = window.matchMedia("(min-width: 921px) and (hover: hover) and (pointer: fine)");
const SITE_BASE_URL = "https://aio-medicals.com";
const DEFAULT_SOCIAL_IMAGE = `${SITE_BASE_URL}/assets/clinic-hero.png`;
const MAIN_BOOKING_URL = "https://calendly.com/aiomedicals";
const CLINIC_PHONE = "+447825563775";
const CLINIC_EMAIL = "info@aio-medicals.com";
const COOKIE_CONSENT_STORAGE_KEY = "aioCookieConsent";
const COOKIE_CONSENT_VALUES = {
  ACCEPT_ALL: "accept-all",
  ESSENTIAL_ONLY: "essential-only",
};
const BLOG_ARTICLES = {
  "private-blood-testing-tunbridge-wells": {
    title: "Private blood testing in Tunbridge Wells",
    url: "blog/private-blood-testing-tunbridge-wells",
  },
  "wellness-blood-tests-mayfield-tunbridge-wells": {
    title: "Wellness blood tests near Mayfield and Tunbridge Wells",
    url: "blog/wellness-blood-tests-mayfield-tunbridge-wells",
  },
  "fatigue-blood-tests-tunbridge-wells": {
    title: "Fatigue blood tests in Tunbridge Wells",
    url: "blog/fatigue-blood-tests-tunbridge-wells",
  },
  "menopause-blood-tests-tunbridge-wells": {
    title: "Menopause blood tests in Tunbridge Wells",
    url: "blog/menopause-blood-tests-tunbridge-wells",
  },
  "thyroid-blood-tests-mayfield-tunbridge-wells": {
    title: "Thyroid blood tests near Mayfield and Tunbridge Wells",
    url: "blog/thyroid-blood-tests-mayfield-tunbridge-wells",
  },
  "cholesterol-blood-tests-tunbridge-wells-kent": {
    title: "Cholesterol blood tests in Tunbridge Wells and Kent",
    url: "blog/cholesterol-blood-tests-tunbridge-wells-kent",
  },
  "sports-performance-blood-tests-tunbridge-wells": {
    title: "Sports performance blood tests in Tunbridge Wells",
    url: "blog/sports-performance-blood-tests-tunbridge-wells",
  },
  "mens-health-blood-tests-kent-tunbridge-wells": {
    title: "Men's health blood tests in Kent and Tunbridge Wells",
    url: "blog/mens-health-blood-tests-kent-tunbridge-wells",
  },
  "womens-health-blood-tests-mayfield-tunbridge-wells": {
    title: "Women's health blood tests near Mayfield and Tunbridge Wells",
    url: "blog/womens-health-blood-tests-mayfield-tunbridge-wells",
  },
  "vitamin-deficiency-blood-tests-kent-east-sussex": {
    title: "Vitamin deficiency blood tests in Kent and East Sussex",
    url: "blog/vitamin-deficiency-blood-tests-kent-east-sussex",
  },
  "prostate-blood-tests-kent-tunbridge-wells": {
    title: "Prostate blood tests in Kent and Tunbridge Wells",
    url: "blog/prostate-blood-tests-kent-tunbridge-wells",
  },
  "weight-loss-blood-tests-mayfield-tunbridge-wells": {
    title: "Weight loss blood tests near Mayfield and Tunbridge Wells",
    url: "blog/weight-loss-blood-tests-mayfield-tunbridge-wells",
  },
};
const testPriceGuide = {
  "advanced-vitamins-blood-test": "649.00",
  "advanced-well-man-blood-test": "175.00",
  "advanced-well-woman-test": "175.00",
  "alzheimer-s-disease": "449.00",
  "amh-fertility-blood-test": "109.00",
  "anaemia-blood-test": "79.00",
  "autoimmune-disease-blood-test": "379.00",
  "blood-group-blood-test": "109.00",
  "cardiac-risk-blood-test": "59.00",
  "cholesterol-blood-test": "49.00",
  "coeliac-screen-blood-test": "179.00",
  "complete-allergy-test": "369.00",
  "cortisol-stress-blood-test": "45.00",
  "diabetes-hba1c-blood-test": "49.00",
  "early-baby-gender-blood-test": "120.00",
  "episwitch-pse-advanced-blood-test": "879.00",
  "erectile-dysfunction-blood-test": "79.00",
  "essential-allergy-test": null,
  "female-hormones-blood-test": "79.00",
  "full-blood-count-blood-test": "69.00",
  "helicobacter-pylori-blood-test": "105.00",
  "hepatitis-screening-blood-test": "129.00",
  "kidney-blood-test": "49.00",
  "liver-blood-test": "49.00",
  "male-hormone-and-fertility-blood-test": "79.00",
  "menopause-blood-test": "79.00",
  "pcos-blood-test": "89.00",
  "phlebotomy-appointment": null,
  "pregnancy-blood-test": "79.00",
  "premium-complete-blood-test": "249.00",
  "prenatal-paternity-test": "765.00",
  "prenatalsafe-3-nipt-blood-test": "315.00",
  "prenatalsafe-5-nipt-blood-test": "375.00",
  "prenatalsafe-complete-plus-nipt-blood-test": "1545.00",
  "prenatalsafe-karyo-nipt-blood-test": "645.00",
  "prenatalsafe-karyo-plus-nipt-blood-test": "795.00",
  "prostate-psa-blood-test": "69.00",
  "sports-and-fitness-blood-test": "99.00",
  "stockholm3-prostate-cancer-screening-blood-test": "595.00",
  "thyroid-function-blood-test": "49.00",
  "thyroid-function-with-antibodies-blood-test": "109.00",
  "tiredness-and-fatigue-blood-test": "139.00",
  "vitamins-blood-test": "69.00",
  "weight-loss-blood-test": "99.00",
};

function isLocalFilePreview() {
  return window.location.protocol === "file:";
}

function stripHtmlExtension(path = "") {
  if (!path) return path;
  if (path.endsWith("/index.html")) {
    const trimmedIndex = path.slice(0, -10);
    return trimmedIndex || "/";
  }
  return path.replace(/\.html(?=($|#|\?))/, "");
}

function toPrettyInternalUrl(path = "") {
  if (!path) return path;
  if (isLocalFilePreview()) {
    if (path === "index.html") return "index.html";
    if (path.startsWith("index.html#")) return path;
    if (path === "tests/index.html") return "tests/index.html";
    if (path.startsWith("tests/index.html#")) return path;
    if (path === "blog/index.html") return "blog/index.html";
    if (path.startsWith("blog/index.html#")) return path;
    if (/\.html(?=($|#|\?))/.test(path)) return path;

    const [pathWithoutHash, hash = ""] = path.split("#");
    const [pathname, query = ""] = pathWithoutHash.split("?");
    const suffix = `${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;

    if (pathname.endsWith("/")) {
      return `${pathname}index.html${suffix}`;
    }

    return `${pathname}.html${suffix}`;
  }

  if (path === "index.html") return "./";
  if (path.startsWith("index.html#")) return `./${path.slice("index.html".length)}`;
  if (path === "tests/index.html") return "tests/";
  if (path.startsWith("tests/index.html#")) return `tests/${path.slice("tests/index.html".length)}`;
  if (path === "blog/index.html") return "blog/";
  if (path.startsWith("blog/index.html#")) return `blog/${path.slice("blog/index.html".length)}`;
  return stripHtmlExtension(path);
}

function getCanonicalPath() {
  const path = window.location.pathname || "/";

  if (isLocalFilePreview()) {
    const workspacePath = "/AIO-Medicals-Website-Main";
    const workspaceIndex = path.indexOf(workspacePath);
    const relativePath = workspaceIndex >= 0 ? path.slice(workspaceIndex + workspacePath.length) : path;
    return relativePath || "/";
  }

  return path;
}

function getLocalWorkspaceRootUrl() {
  const scriptSource = document.querySelector('script[src$="script.js"]')?.getAttribute("src");

  if (!scriptSource) return null;

  try {
    return new URL(".", new URL(scriptSource, document.baseURI));
  } catch {
    return null;
  }
}

function convertHrefForLocalFilePreview(href = "") {
  if (!href) return href;
  if (/^(?:[a-z]+:|\/\/)/i.test(href)) return href;
  if (href.startsWith("#")) return href;

  const [pathWithoutHash, hash = ""] = href.split("#");
  const [pathname, query = ""] = pathWithoutHash.split("?");

  if (!pathname) return href;

  let nextPath = pathname;
  const workspaceRootUrl = getLocalWorkspaceRootUrl();
  const isRootRelative = pathname.startsWith("/");

  if (isRootRelative) {
    nextPath = pathname.slice(1);
  }

  if (nextPath.endsWith("/")) {
    nextPath = `${nextPath}index.html`;
  } else if (/\/(?:index)$/.test(nextPath) || nextPath === "index" || nextPath === "." || nextPath === "..") {
    nextPath = `${nextPath}.html`;
  } else if (!/\.[a-z0-9]+$/i.test(nextPath)) {
    nextPath = `${nextPath}.html`;
  }

  const suffix = `${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;

  if (isRootRelative && workspaceRootUrl) {
    return new URL(`${nextPath}${suffix}`, workspaceRootUrl).toString();
  }

  return `${nextPath}${suffix}`;
}

function localiseExistingInternalLinks() {
  if (!isLocalFilePreview()) return;

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const localHref = convertHrefForLocalFilePreview(href);
    if (localHref !== href) {
      link.setAttribute("href", localHref);
    }
  });
}

function getPublicUrl(path = getCanonicalPath()) {
  if (!path || path === "/") return SITE_BASE_URL;
  const trimmedPath = stripHtmlExtension(path);
  return `${SITE_BASE_URL}${trimmedPath === "/" ? "" : trimmedPath}`;
}

function getCurrentPageTitle() {
  return document.title?.trim() || document.querySelector("h1")?.textContent?.trim() || "AIO Medicals";
}

function getCurrentPageDescription() {
  const existingDescription = document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim();
  if (existingDescription) return existingDescription;

  const heroCopy = document.querySelector(".hero-copy")?.textContent?.trim();
  if (heroCopy) return heroCopy;

  const firstParagraph = document.querySelector("main p")?.textContent?.trim();
  return firstParagraph || "Private blood tests and clinical appointments from AIO Medicals.";
}

function ensureHeadMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.append(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  return element;
}

function ensureCanonicalLink(url) {
  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.append(canonicalLink);
  }

  canonicalLink.href = url;
}

function getPrimaryImageUrl() {
  const image = document.querySelector(
    ".hero-image, .blog-card-media img, .barry-photo-card img, .performance-media img, .social-hero-card img, .test-hero img",
  );

  if (!image) return DEFAULT_SOCIAL_IMAGE;

  try {
    return new URL(image.getAttribute("src"), SITE_BASE_URL).toString();
  } catch {
    return DEFAULT_SOCIAL_IMAGE;
  }
}

function getCurrentBlogSlug() {
  if (!window.location.pathname.includes("/blog/")) return "";
  return getCurrentTestSlug();
}

function getPageSchemaType() {
  if (document.querySelector(".blog-article-page")) return "blog-article";
  if (document.querySelector(".blog-page")) return "blog-hub";
  if (document.querySelector(".test-page")) return "test-page";
  if (document.querySelector(".catalogue-page") && window.location.pathname.includes("/tests")) return "test-hub";
  return "web-page";
}

function buildBreadcrumbSchema(canonicalUrl) {
  const breadcrumbItems = [{ name: "Home", item: SITE_BASE_URL }];

  if (window.location.pathname.includes("/blog/")) {
    breadcrumbItems.push({ name: "Blog", item: `${SITE_BASE_URL}/blog/` });
  }

  if (window.location.pathname.includes("/tests/") && !window.location.pathname.endsWith("/index.html")) {
    breadcrumbItems.push({ name: "Blood tests", item: `${SITE_BASE_URL}/tests/` });
  }

  const currentTitle = document.querySelector("h1")?.textContent?.trim();
  if (currentTitle) {
    breadcrumbItems.push({ name: currentTitle, item: canonicalUrl });
  }

  if (breadcrumbItems.length < 2) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function buildPageSchema(canonicalUrl, description) {
  const pageType = getPageSchemaType();
  const h1 = document.querySelector("h1")?.textContent?.trim() || getCurrentPageTitle();
  const primaryImage = getPrimaryImageUrl();
  const breadcrumbSchema = buildBreadcrumbSchema(canonicalUrl);
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": `${SITE_BASE_URL}/#medicalclinic`,
      name: "AIO Medicals",
      url: SITE_BASE_URL,
      image: `${SITE_BASE_URL}/assets/aio-medicals-logo.png`,
      telephone: CLINIC_PHONE,
      email: CLINIC_EMAIL,
      areaServed: ["Royal Tunbridge Wells", "Mayfield", "Kent", "East Sussex"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_BASE_URL}/#website`,
      name: "AIO Medicals",
      url: SITE_BASE_URL,
    },
  ];

  if (pageType === "blog-article") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: h1,
      description,
      mainEntityOfPage: canonicalUrl,
      url: canonicalUrl,
      image: primaryImage,
      publisher: { "@id": `${SITE_BASE_URL}/#medicalclinic` },
      author: {
        "@type": "Organization",
        name: "AIO Medicals",
      },
      about: Array.from(document.querySelectorAll(".blog-article-meta span")).map((item) => item.textContent?.trim()).filter(Boolean),
    });
  } else if (pageType === "blog-hub") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: h1,
      description,
      url: canonicalUrl,
      isPartOf: { "@id": `${SITE_BASE_URL}/#website` },
    });
  } else if (pageType === "test-page") {
    const slug = getCurrentTestSlug();
    const price = testPriceGuide[slug];
    graph.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: h1,
      description,
      serviceType: "Private blood test",
      provider: { "@id": `${SITE_BASE_URL}/#medicalclinic` },
      areaServed: ["Royal Tunbridge Wells", "Mayfield", "Kent", "East Sussex"],
      url: canonicalUrl,
      offers: price
        ? {
            "@type": "Offer",
            price,
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: canonicalUrl,
          }
        : undefined,
    });
  } else if (pageType === "test-hub") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: h1,
      description,
      url: canonicalUrl,
    });
  } else {
    graph.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: h1,
      description,
      url: canonicalUrl,
    });
  }

  if (breadcrumbSchema) {
    graph.push({ "@context": "https://schema.org", ...breadcrumbSchema });
  }

  return graph;
}

function ensureSeoMetadata() {
  const canonicalUrl = getPublicUrl();
  const title = getCurrentPageTitle();
  const description = getCurrentPageDescription();
  const pageType = getPageSchemaType();
  const socialImage = getPrimaryImageUrl();

  ensureCanonicalLink(canonicalUrl);
  ensureHeadMeta('meta[name="description"]', { name: "description", content: description });
  ensureHeadMeta('meta[name="robots"]', { name: "robots", content: "index,follow,max-image-preview:large" });
  ensureHeadMeta('meta[property="og:title"]', { property: "og:title", content: title });
  ensureHeadMeta('meta[property="og:description"]', { property: "og:description", content: description });
  ensureHeadMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
  ensureHeadMeta('meta[property="og:type"]', { property: "og:type", content: pageType === "blog-article" ? "article" : "website" });
  ensureHeadMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "AIO Medicals" });
  ensureHeadMeta('meta[property="og:image"]', { property: "og:image", content: socialImage });
  ensureHeadMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  ensureHeadMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
  ensureHeadMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
  ensureHeadMeta('meta[name="twitter:image"]', { name: "twitter:image", content: socialImage });

  let schemaScript = document.querySelector('script[data-seo-schema="true"]');
  if (!schemaScript) {
    schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.dataset.seoSchema = "true";
    document.head.append(schemaScript);
  }

  schemaScript.textContent = JSON.stringify({ "@graph": buildPageSchema(canonicalUrl, description) });
}

function getRelatedBlogLinksForTest(slug) {
  const add = (...keys) => keys.map((key) => BLOG_ARTICLES[key]).filter(Boolean);

  if (/thyroid/.test(slug)) return add("thyroid-blood-tests-mayfield-tunbridge-wells", "fatigue-blood-tests-tunbridge-wells");
  if (/vitamin/.test(slug)) return add("vitamin-deficiency-blood-tests-kent-east-sussex", "wellness-blood-tests-mayfield-tunbridge-wells");
  if (/(tiredness|fatigue|anaemia|full-blood-count)/.test(slug)) return add("fatigue-blood-tests-tunbridge-wells", "private-blood-testing-tunbridge-wells");
  if (/(cholesterol|cardiac|diabetes|weight-loss)/.test(slug)) return add("cholesterol-blood-tests-tunbridge-wells-kent", "weight-loss-blood-tests-mayfield-tunbridge-wells");
  if (/(prostate|erectile|well-man|male-hormone|stockholm3)/.test(slug)) return add("mens-health-blood-tests-kent-tunbridge-wells", "prostate-blood-tests-kent-tunbridge-wells");
  if (/(well-woman|female-hormones|menopause|pcos|amh)/.test(slug)) return add("womens-health-blood-tests-mayfield-tunbridge-wells", "menopause-blood-tests-tunbridge-wells");
  if (/sports/.test(slug)) return add("sports-performance-blood-tests-tunbridge-wells", "wellness-blood-tests-mayfield-tunbridge-wells");
  return add("private-blood-testing-tunbridge-wells", "wellness-blood-tests-mayfield-tunbridge-wells");
}

function enhanceTestPagesWithRelatedGuides() {
  const testPage = document.querySelector(".test-page");
  const detailGrid = document.querySelector(".detail-grid");
  if (!testPage || !detailGrid) return;
  if (detailGrid.querySelector(".related-guides-panel")) return;

  const relatedGuides = getRelatedBlogLinksForTest(getCurrentTestSlug());
  if (!relatedGuides.length) return;

  detailGrid.insertAdjacentHTML(
    "beforeend",
    `
      <article class="detail-panel related-guides-panel">
        <h2>Related guides</h2>
        <p>Useful local reading before you book, with practical guidance linked to this test.</p>
        <ul>
          ${relatedGuides
            .map(
              (guide) => `
                <li>
                  <a href="${normaliseSiteUrl(guide.url)}">${guide.title}</a>
                </li>
              `,
            )
            .join("")}
        </ul>
      </article>
    `,
  );
}

function getCurrentTestSlug() {
  const path = stripHtmlExtension(window.location.pathname || "");
  const segments = path.split("/").filter(Boolean);
  const fileName = segments[segments.length - 1] || "";

  if (["tests", "blog"].includes(fileName)) return "";
  return fileName;
}

function buildPriceMarkup(slug) {
  const price = testPriceGuide[slug];

  if (price) {
    return {
      summary: `From £${price}`,
      amount: `From £${price}`,
      body: "Private clinic price guide for this test, including the in-clinic blood draw.",
      meta: "Final pricing and any preparation details are confirmed before you book.",
    };
  }

  if (slug === "phlebotomy-appointment") {
    return {
      summary: "Price confirmed on enquiry",
      amount: "Price on enquiry",
      body: "Clinic blood draw pricing depends on the kit, referral route and appointment type.",
      meta: "AIO Medicals will confirm the fee before your appointment is arranged.",
    };
  }

  return {
    summary: "Price confirmed on enquiry",
    amount: "Price on enquiry",
    body: "This page does not have a matched guide price yet, so AIO Medicals will confirm the private clinic price before booking.",
    meta: "The appointment still includes an in-clinic blood draw where required.",
  };
}

function enhanceTestPagesWithPricing() {
  const testPage = document.querySelector(".test-page");
  const summaryCard = document.querySelector(".test-summary-card dl");
  const detailGrid = document.querySelector(".detail-grid");

  if (!testPage || !summaryCard || !detailGrid) return;
  if (detailGrid.querySelector(".price-panel")) return;

  const slug = getCurrentTestSlug();
  const pricing = buildPriceMarkup(slug);

  summaryCard.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="price-summary">
        <dt>In-clinic price</dt>
        <dd>${pricing.summary}</dd>
      </div>
    `,
  );

  detailGrid.insertAdjacentHTML(
    "afterbegin",
    `
      <article class="detail-panel price-panel">
        <h2>Private clinic price</h2>
        <p class="price-amount">${pricing.amount}</p>
        <p>${pricing.body}</p>
        <p class="price-meta">${pricing.meta}</p>
      </article>
    `,
  );
}

function enhanceTestPageSummaryCard() {
  const testPage = document.querySelector(".test-page");
  const summaryItems = document.querySelectorAll(".test-summary-card dt");

  if (!testPage || !summaryItems.length) return;

  summaryItems.forEach((term) => {
    if (term.textContent?.trim().toLowerCase() === "preparation") {
      term.closest("div")?.remove();
    }
  });
}

function enhanceTestPageNextSteps() {
  const testPage = document.querySelector(".test-page");
  const ctaPanel = document.querySelector(".pathway-section .cta-panel");
  const heading = document.querySelector(".pathway-section h2");

  if (!testPage || !ctaPanel) return;

  const testName = heading?.textContent
    ?.replace(/^Request a\s+/i, "")
    .replace(/\s+appointment\.?$/i, "")
    .trim();
  const emailSubject = testName ? encodeURIComponent(testName) : "Appointment";

  ctaPanel.innerHTML = `
    <a class="button primary" href="https://calendly.com/aiomedicals" target="_blank" rel="noreferrer">Book an appointment</a>
    <a class="button secondary" href="https://calendly.com/aiomedicals/30min?back=1&month=2026-05" target="_blank" rel="noreferrer">Book an on-line consultation</a>
    <a class="button secondary" href="mailto:${CLINIC_EMAIL}?subject=${emailSubject}">Email</a>
    <a class="button secondary" href="tel:+447825563775">Call</a>
  `;
}

function enhanceTestPageHeroActions() {
  const testPage = document.querySelector(".test-page");
  const heroActions = document.querySelector(".test-hero .hero-actions");

  if (!testPage || !heroActions) return;

  heroActions.innerHTML = `
    <a class="button primary" href="https://calendly.com/aiomedicals" target="_blank" rel="noreferrer">Book an appointment</a>
    <a class="button secondary" href="https://calendly.com/aiomedicals/30min?back=1&month=2026-05" target="_blank" rel="noreferrer">Book an on-line consultation</a>
  `;
}

function closeBloodTestsMenu() {
  bloodTestsMenu?.classList.remove("is-open");
  bloodTestsPanel?.setAttribute("hidden", "");
  bloodTestsToggle?.setAttribute("aria-expanded", "false");
}

function openBloodTestsMenu() {
  bloodTestsMenu?.classList.add("is-open");
  bloodTestsPanel?.removeAttribute("hidden");
  bloodTestsToggle?.setAttribute("aria-expanded", "true");
}

function normaliseTestUrl(url) {
  const prettyUrl = toPrettyInternalUrl(url);
  const path = window.location.pathname || "/";

  if (path.includes("/tests/")) {
    return prettyUrl.replace(/^tests\//, "");
  }

  if (path.includes("/blog/")) {
    return `../${prettyUrl.startsWith("tests/") ? prettyUrl : `tests/${prettyUrl}`}`;
  }

  return prettyUrl.startsWith("tests/") ? prettyUrl : `tests/${prettyUrl}`;
}

function normaliseSiteUrl(url) {
  const isNestedPage = window.location.pathname.includes("/tests/") || window.location.pathname.includes("/blog/");
  const prettyUrl = toPrettyInternalUrl(url);

  return isNestedPage ? `../${prettyUrl}` : prettyUrl;
}

function ensureBlogNavLink() {
  const siteNavElement = document.querySelector(".site-nav");
  if (!siteNavElement) return;
  if (siteNavElement.querySelector('[data-nav-link="blog"]')) return;

  const blogLink = document.createElement("a");
  blogLink.href = normaliseSiteUrl("blog/index.html");
  blogLink.textContent = "Blog";
  blogLink.dataset.navLink = "blog";

  const faqLink = Array.from(siteNavElement.querySelectorAll("a")).find((link) => link.textContent?.trim() === "FAQs");
  if (faqLink) {
    siteNavElement.insertBefore(blogLink, faqLink);
    return;
  }

  const ctaLink = siteNavElement.querySelector(".nav-cta");
  if (ctaLink) {
    siteNavElement.insertBefore(blogLink, ctaLink);
    return;
  }

  siteNavElement.append(blogLink);
}

function ensureBookingNavLink() {
  const ctaLink = document.querySelector(".site-nav .nav-cta");
  if (!(ctaLink instanceof HTMLAnchorElement)) return;

  ctaLink.href = MAIN_BOOKING_URL;
  ctaLink.textContent = "Book a test";
  ctaLink.target = "_blank";
  ctaLink.rel = "noreferrer";
}

function getStoredCookieConsent() {
  try {
    const storedValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!storedValue) return "";

    const parsedValue = JSON.parse(storedValue);
    const consentValue = parsedValue?.value;

    if (Object.values(COOKIE_CONSENT_VALUES).includes(consentValue)) {
      return consentValue;
    }

    return "";
  } catch {
    return "";
  }
}

function storeCookieConsent(value) {
  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({ value, savedAt: new Date().toISOString() }),
    );
  } catch {
    // Ignore storage failures and keep the banner available.
  }
}

function createCookieConsentUi() {
  if (document.querySelector(".cookie-banner")) return;

  const banner = document.createElement("aside");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-modal", "false");
  banner.setAttribute("aria-labelledby", "cookie-banner-title");
  banner.setAttribute("aria-describedby", "cookie-banner-copy cookie-banner-status");

  banner.innerHTML = `
    <p id="cookie-banner-title" class="cookie-banner-title">Cookie preferences</p>
    <p id="cookie-banner-copy" class="cookie-banner-copy">
      We use essential cookies and similar storage to keep this website working and to remember your privacy choices.
      We do not load non-essential cookies before you choose. External services such as Calendly may set their own
      cookies if you choose to visit them.
    </p>
    <p id="cookie-banner-status" class="cookie-banner-status" aria-live="polite"></p>
    <div class="cookie-banner-actions">
      <button type="button" class="cookie-banner-button cookie-banner-button-primary" data-cookie-choice="accept-all">Accept all</button>
      <button type="button" class="cookie-banner-button cookie-banner-button-secondary" data-cookie-choice="essential-only">Essential only</button>
    </div>
  `;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "cookie-settings-trigger";
  trigger.textContent = "Cookie settings";
  trigger.hidden = true;

  const status = banner.querySelector(".cookie-banner-status");

  const setBannerStatus = (value) => {
    if (!(status instanceof HTMLElement)) return;

    if (value === COOKIE_CONSENT_VALUES.ACCEPT_ALL) {
      status.textContent = "Current setting: all cookies accepted.";
      return;
    }

    if (value === COOKIE_CONSENT_VALUES.ESSENTIAL_ONLY) {
      status.textContent = "Current setting: essential cookies only.";
      return;
    }

    status.textContent = "Choose whether to allow non-essential cookies.";
  };

  const openBanner = () => {
    const storedConsent = getStoredCookieConsent();
    setBannerStatus(storedConsent);
    banner.classList.add("is-visible");
    trigger.hidden = true;
  };

  const closeBanner = () => {
    banner.classList.remove("is-visible");
    trigger.hidden = true;
  };

  banner.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) return;

    const choice = event.target.dataset.cookieChoice;
    if (!choice || !Object.values(COOKIE_CONSENT_VALUES).includes(choice)) return;

    storeCookieConsent(choice);
    setBannerStatus(choice);
    closeBanner();
  });

  trigger.addEventListener("click", openBanner);

  document.body.append(banner, trigger);

  if (getStoredCookieConsent()) {
    setBannerStatus(getStoredCookieConsent());
    trigger.hidden = true;
    return;
  }

  openBanner();
}

function buildBloodTestsMenu() {
  const catalogue = window.AIO_TEST_CATALOGUE;
  if (!bloodTestsPanel || !Array.isArray(catalogue) || !catalogue.length) return;
  if (bloodTestsPanel.querySelector(".blood-tests-categories")) return;

  bloodTestsPanel.innerHTML = `
    <div class="blood-tests-menu-heading">
      <span>Browse blood tests</span>
      <a href="${normaliseTestUrl("tests/index.html")}">View all tests</a>
    </div>
    <div class="blood-tests-categories" role="tablist" aria-label="Blood test categories">
      ${catalogue
        .map(
          (category, index) => `
            <button
              class="blood-tests-category${index === 0 ? " active" : ""}"
              type="button"
              data-category-index="${index}"
              role="tab"
              aria-selected="${index === 0}"
            >
              <span>${category.title}</span>
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="blood-tests-lists">
      ${catalogue
        .map(
          (category, index) => `
            <div class="blood-tests-list${index === 0 ? " active" : ""}" data-category-panel="${index}">
              <div class="blood-tests-list-header">
                <div>
                  <strong>${category.title}</strong>
                  <p>${category.intro}</p>
                </div>
                <a href="${normaliseTestUrl(`tests/index.html#${category.slug}`)}">View category</a>
              </div>
              <div class="blood-tests-links">
                ${category.tests
                  .map(
                    (test) => `
                      <a href="${normaliseTestUrl(test.url)}">
                        <span>${test.name}</span>
                      </a>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function setActiveBloodTestsCategory(index) {
  const categories = bloodTestsPanel?.querySelectorAll(".blood-tests-category") || [];
  const lists = bloodTestsPanel?.querySelectorAll(".blood-tests-list") || [];

  categories.forEach((category) => {
    const isActive = category.dataset.categoryIndex === String(index);
    category.classList.toggle("active", isActive);
    category.setAttribute("aria-selected", String(isActive));
  });

  lists.forEach((list) => {
    list.classList.toggle("active", list.dataset.categoryPanel === String(index));
  });
}

function updateFooterCopyrightNotice() {
  const footerBottom = document.querySelector(".footer-bottom");
  const footerNotice = footerBottom?.querySelector("span");

  if (footerNotice) {
    footerNotice.textContent = "© AIO Medicals 2026";
  }
}

function getFooterPartnerLogoUrl() {
  const scriptSource = document.querySelector('script[src$="script.js"]')?.getAttribute("src");

  if (scriptSource) {
    return new URL("good-body-logo.png", new URL(scriptSource, document.baseURI)).toString();
  }

  return normaliseSiteUrl("good-body-logo.png");
}

function applyWhiteTransparentLogoTreatment(image) {
  if (!(image instanceof HTMLImageElement) || image.dataset.logoProcessed === "true") return;

  const source = image.currentSrc || image.src;
  if (!source) return;

  const rawImage = new Image();
  rawImage.decoding = "async";

  rawImage.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    canvas.width = rawImage.naturalWidth;
    canvas.height = rawImage.naturalHeight;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    context.drawImage(rawImage, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;

    for (let index = 0; index < data.length; index += 4) {
      const red = data[index];
      const green = data[index + 1];
      const blue = data[index + 2];
      const alpha = data[index + 3];

      if (alpha === 0) continue;

      const average = (red + green + blue) / 3;
      if (average >= 246) {
        data[index + 3] = 0;
        continue;
      }

      const opacityScale = Math.max(0.22, Math.pow((255 - average) / 255, 0.7));

      data[index] = 255;
      data[index + 1] = 255;
      data[index + 2] = 255;
      data[index + 3] = Math.round(alpha * opacityScale);
    }

    context.putImageData(imageData, 0, 0);
    image.src = canvas.toDataURL("image/png");
    image.dataset.logoProcessed = "true";
  }, { once: true });

  rawImage.src = source;
}

function ensureFooterPartnershipLogo() {
  const footerBrand = document.querySelector(".footer-brand");
  if (!footerBrand || footerBrand.querySelector(".footer-partnership")) return;

  const footerDescription = footerBrand.querySelector("p");
  const footerContact = footerBrand.querySelector(".footer-contact");
  const partnershipMarkup = `
    <div class="footer-partnership" aria-label="AIO Medicals in partnership with Goodbody">
      <span class="footer-partnership-label">In partnership with</span>
      <img
        class="footer-partnership-logo"
        src="${getFooterPartnerLogoUrl()}"
        alt="Goodbody"
        loading="lazy"
        decoding="async"
      >
    </div>
  `;

  if (footerDescription) {
    footerDescription.insertAdjacentHTML("beforebegin", partnershipMarkup);
    applyWhiteTransparentLogoTreatment(footerBrand.querySelector(".footer-partnership-logo"));
    return;
  }

  if (footerContact) {
    footerContact.insertAdjacentHTML("beforebegin", partnershipMarkup);
    applyWhiteTransparentLogoTreatment(footerBrand.querySelector(".footer-partnership-logo"));
    return;
  }

  footerBrand.insertAdjacentHTML("beforeend", partnershipMarkup);
  applyWhiteTransparentLogoTreatment(footerBrand.querySelector(".footer-partnership-logo"));
}

function serialiseFormData(formData) {
  return new URLSearchParams(Array.from(formData.entries())).toString();
}

function enableHomepageEnquiryFormSubmission() {
  if (!(homepageEnquiryForm instanceof HTMLFormElement)) return;

  const submitButton = homepageEnquiryForm.querySelector('button[type="submit"]');
  if (!(submitButton instanceof HTMLButtonElement)) return;

  const defaultButtonLabel = submitButton.textContent?.trim() || "Send enquiry";

  const resetButtonLabel = () => {
    submitButton.disabled = false;
    submitButton.textContent = defaultButtonLabel;
  };

  homepageEnquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const formData = new FormData(homepageEnquiryForm);
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: serialiseFormData(formData),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      homepageEnquiryForm.reset();
      submitButton.textContent = "Form sent";
    } catch {
      submitButton.textContent = "Try again";
      window.setTimeout(resetButtonLabel, 2500);
    }
  });

  homepageEnquiryForm.addEventListener("input", () => {
    if (submitButton.textContent === "Form sent") {
      resetButtonLabel();
    }
  });
}

buildBloodTestsMenu();
ensureBlogNavLink();
ensureBookingNavLink();
enhanceTestPagesWithPricing();
enhanceTestPageSummaryCard();
enhanceTestPageNextSteps();
enhanceTestPageHeroActions();
enhanceTestPagesWithRelatedGuides();
ensureSeoMetadata();
localiseExistingInternalLinks();
createCookieConsentUi();
updateFooterCopyrightNotice();
ensureFooterPartnershipLogo();
enableHomepageEnquiryFormSubmission();

bloodTestsToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const isOpen = bloodTestsMenu?.classList.contains("is-open");
  if (isOpen) {
    closeBloodTestsMenu();
  } else {
    openBloodTestsMenu();
  }
});

bloodTestsMenu?.addEventListener("mouseenter", openBloodTestsMenu);
bloodTestsMenu?.addEventListener("mouseleave", closeBloodTestsMenu);

bloodTestsPanel?.addEventListener("pointerover", (event) => {
  if (!desktopMegaMenuQuery.matches) return;
  if (!(event.target instanceof Element)) return;
  const category = event.target.closest(".blood-tests-category");
  if (category) {
    setActiveBloodTestsCategory(category.dataset.categoryIndex);
  }
});

bloodTestsPanel?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const category = event.target.closest(".blood-tests-category");
  if (category) {
    event.preventDefault();
    setActiveBloodTestsCategory(category.dataset.categoryIndex);
  }
});

document.addEventListener("click", (event) => {
  if (bloodTestsMenu && !bloodTestsMenu.contains(event.target)) {
    closeBloodTestsMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBloodTestsMenu();
  }
});

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    closeBloodTestsMenu();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    serviceCards.forEach((card) => {
      const tags = card.dataset.tags || "";
      card.classList.toggle("is-hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});
