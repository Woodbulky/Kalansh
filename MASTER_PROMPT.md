# Kalansh — Master Prompt for Google Antigravity

## Your Task

Build a **complete, production-ready showcase website** for **Kalansh Udyog Nirmit**, an organic food brand from Kopargaon, Maharashtra, India. This is a **brochure/showcase website only** — no ecommerce, no backend, no cart, no login. Every page is static HTML + CSS + vanilla JS.

Read ALL context files in the `/context/` folder before writing a single line of code. They are the source of truth for content, design, and structure.

---

## Tech Stack

- **Pure HTML5 + CSS3 + Vanilla JavaScript** — no frameworks, no build tools
- One CSS file: `style.css`
- One JS file: `main.js`
- Pages: `index.html`, `about.html`, `products.html`, `product-detail.html` (template), `blog.html`, `contact.html`
- Fonts: Load from Google Fonts — `Fraunces` (display/headings) + `DM Sans` (body)
- Icons: Use inline SVGs only — no icon font CDN
- Images: All image paths are referenced in `context/assets.md` — use those paths exactly
- Deployment: Files must work when opened directly in a browser (relative paths only)

---

## Design Direction

**Vibe:** Earthy, organic, warm — like a premium artisan food brand. Think Himsagar mangoes meets Forest Essentials. NOT corporate, NOT flashy, NOT generic food-delivery green.

**Colour Palette** (defined in `context/design-tokens.md`):
- Primary: Deep Jaggery Brown `#4A2C0A`
- Accent: Warm Saffron `#D47A1E`
- Background: Cream `#FAF6EE`
- Surface: Off-white `#F2EBD9`
- Text: Dark Walnut `#2C1A08`
- Muted: `#8C7355`
- Success green: `#3B6D11`

**Typography:**
- Headings: `Fraunces` (serif, variable weight) — expressive, organic feel
- Body: `DM Sans` — clean, readable
- Hindi/Marathi tagline (`आरोग्यम धनसंपदा`): Use `Noto Serif Devanagari` from Google Fonts

**Layout philosophy:**
- Generous whitespace — sections breathe
- Full-bleed earthy texture sections alternating with cream sections
- Asymmetric hero layouts (text left, image right — but break this rule intentionally once per page)
- Rounded cards (`border-radius: 20px`) with subtle warm shadows (`box-shadow: 0 4px 24px rgba(74,44,10,0.10)`)
- No harsh borders — use background colour changes to separate sections instead

---

## Pages to Build

### 1. Homepage (`index.html`)
- **Top bar:** Phone, email, social icons (Instagram, Facebook, YouTube, WhatsApp)
- **Navbar:** Logo left, links right, sticky with blur backdrop on scroll
- **Hero:** Full-height section. Large Fraunces heading "Pure Organic Goodness from Maharashtra". Subheading with the Marathi tagline. Two CTAs: "Explore Our Products" → products.html, "Our Story" → about.html. Hero image: product flat-lay or founder photo.
- **Trust bar:** 4 stats in a row — 754,700+ Ladoos Sold | 90+ Women Employed | ISO 22000:2018 Certified | 20+ Distribution Locations
- **Products strip:** Horizontal scroll or 3-column grid showing all 7 products as cards. Each card: product image, name, one-line description, "Learn More" link. NO prices, NO cart.
- **Brand story teaser:** 2-column layout. Left: headline + 2–3 sentences about Rohit & Vinay Kale. Right: founder photo. CTA → about.html
- **Why Kalansh section:** 3 icon + text blocks — 100% Organic Ingredients | Jaggery-based (no refined sugar) | Women-made with care
- **Testimonials:** 5 customer reviews in a carousel/slider (auto-scroll, pause on hover)
- **Milestone number:** Large centred stat — "754,700+ Rajgira Ladoos sold" with earthy background
- **Blog preview:** 3 blog cards (real content from `context/blog-content.md`)
- **Distribution map teaser:** Simple text list of cities served
- **Footer:** Logo, tagline, nav links, contact details, social icons, ISO badge, copyright

### 2. About Page (`about.html`)
- **Page hero:** Full-width banner with page title "Our Story"
- **Brand origin story:** Timeline-style layout — 1992 (grocery shop), 2019 (Rohit & Vinay pivot), 2023 (10,000 sq ft facility, 100+ team)
- **Founders section:** Two cards side by side — Rohit Kale (CEO) and Vinay Kale. Photo, name, title, 2–3 line bio.
- **Women's empowerment section:** This is a KEY differentiator. Feature it prominently. "90 Women Employed. Empowered." Section with stats and a short paragraph. Warm earthy background.
- **Certifications & awards:** ISO 22000:2018 badge + any achievements
- **Group companies:** List of Kalansh entities (from `context/brand-data.md`)
- **Distribution reach:** Cities list from `context/brand-data.md`

### 3. Products Page (`products.html`)
- Grid of all 7 products (+ gift box = 8 total)
- Each card: product image, product name, short description (1–2 lines), "View Details" button → individual product page
- Filter tabs at top: All | Ladoo | Chikki | Jaggery

### 4. Product Detail Template (`product-detail.html`)
- This is ONE template page used for all products. Content is swapped via URL query params or just duplicate for each product.
- Layout: Left — product image gallery (3 images). Right — product name, description, key highlights (bullets), ingredients, usage/storage note, share buttons (WhatsApp, Facebook)
- "Where to Buy" section below: list of platforms (Flipkart, Amazon, Jio Mart) with their logos and external links, plus a "Order on WhatsApp" button → `https://wa.me/919504959501`
- Related products strip

### 5. Blog Page (`blog.html`)
- 3 real blog posts (content in `context/blog-content.md`)
- Each card: cover image, date, title, excerpt, "Read More" link
- Individual blog posts can be separate HTML files: `blog-rajgira-benefits.html`, `blog-jaggery-guide.html`, `blog-women-empowerment.html`

### 6. Contact Page (`contact.html`)
- Two columns: Left — contact form (name, email, phone, message — static form using Formspree or just mailto action). Right — address, phone, email, WhatsApp button, embedded Google Map.
- Map embed code is in `context/brand-data.md`

---

## Global Components

**Navbar:**
- Sticky, starts transparent, gets `background: rgba(250,246,238,0.92); backdrop-filter: blur(12px)` on scroll
- Mobile: hamburger menu with slide-in drawer
- Active page link underlined

**Footer:**
- Dark background (`#2C1A08`), light text
- 3-column layout: Brand column (logo + tagline + social), Explore column (nav links), Contact column
- ISO badge visible
- Copyright: `© 2026 Kalansh Udyog Nirmit. All rights reserved.`

**WhatsApp floating button:**
- Fixed bottom-right, always visible
- Green circle with WhatsApp icon SVG
- Links to `https://wa.me/919504959501`

---

## Critical Rules

1. **No placeholder text anywhere.** Every word must come from the context files. Do not write "Lorem ipsum" or "Coming soon" or "Description here."
2. **No broken links.** Every `href` must point to a real page in this project or a real external URL from the context files.
3. **No empty stats.** The counter section must use hardcoded real numbers from `context/brand-data.md`, not animated JS counters that start at 0.
4. **Fully responsive.** Mobile-first. Test breakpoints at 375px, 768px, 1280px.
5. **Images.** If actual images are not available, use `<div>` placeholders with a warm earthy background colour and the product name as text. Never use external image URLs from placeholder services.
6. **Semantic HTML.** Use `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, `<header>` correctly.
7. **Alt text.** Every `<img>` must have a descriptive `alt` attribute.
8. **Performance.** Lazy-load images (`loading="lazy"`). Minify nothing (keep readable for iteration).
9. **The contact form email** must use `kalanshudyognirmit@gmail.com` — not any placeholder email.
