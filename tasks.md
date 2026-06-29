# tasks.md — Kalansh Website Build Tasks

This is the persistent task list for the Antigravity agent. Check off tasks as completed. Do NOT start a new task until the previous one passes review.

---

## Phase 0 — Setup

- [ ] Read all context files: `context/brand-data.md`, `context/products.md`, `context/design-tokens.md`, `context/blog-content.md`, `context/assets.md`, `context/seo.md`
- [ ] Run the asset download script from `context/assets.md` to pull all images
- [ ] Create folder structure: `assets/images/logo`, `assets/images/products`, `assets/images/founders`, `assets/images/about`, `assets/images/blog`

---

## Phase 1 — Global Files

- [ ] Create `style.css` using ALL tokens from `context/design-tokens.md`
  - Global reset (box-sizing, margin 0, padding 0)
  - CSS custom properties (all variables from design-tokens.md)
  - Base typography
  - Container and grid utilities
  - Navbar styles (transparent + scrolled state)
  - Button styles (primary + secondary)
  - Card styles (base card + product card)
  - Badge styles
  - Section patterns
  - WhatsApp float button
  - Footer styles
  - Responsive breakpoints
  - Testimonial slider styles
  - Product image gallery styles

- [ ] Create `main.js`
  - Navbar scroll detection → add `.scrolled` class
  - Mobile hamburger menu toggle
  - Testimonial carousel (auto-scroll, pause on hover, dot navigation)
  - Product filter tabs on products page
  - Smooth scroll for anchor links
  - Active nav link detection based on current page

---

## Phase 2 — Homepage (index.html)

- [ ] Top contact bar (phone, email)
- [ ] Navbar with all links and mobile hamburger
- [ ] Hero section — large heading, Marathi tagline, 2 CTAs, hero visual
- [ ] Trust/stats bar — 4 hardcoded stats (NO animated counters from 0)
- [ ] Products section — 7 product cards + gift box in grid
- [ ] Brand story teaser — founder image + text + YouTube video embed
- [ ] Why Kalansh — 3 value proposition blocks
- [ ] Testimonials — 5 customer reviews with carousel
- [ ] Milestone stat — "7,54,700+ Rajgira Ladoos sold"
- [ ] Blog preview — 3 blog cards with REAL content from context/blog-content.md
- [ ] Distribution cities — text list
- [ ] Footer
- [ ] WhatsApp float button
- [ ] SEO meta tags from context/seo.md

**Review checkpoint:** Open in browser. Check: no lorem ipsum, no "0+" stats, all links work, responsive on mobile.

---

## Phase 3 — About Page (about.html)

- [ ] Navbar + footer (reuse from index)
- [ ] Page hero banner
- [ ] Brand origin timeline (1992 → 2019 → 2023 → present)
- [ ] Founders section (Rohit + Vinay cards with photos)
- [ ] Women's empowerment section (PROMINENT — this is a key story)
- [ ] YouTube video embed
- [ ] Certifications (ISO badge)
- [ ] Group companies list
- [ ] Distribution reach
- [ ] SEO meta tags

---

## Phase 4 — Products Page (products.html)

- [ ] Navbar + footer
- [ ] Page hero
- [ ] Filter tabs: All | Ladoo | Chikki | Jaggery | Gift
- [ ] Product grid — all 8 products with real descriptions from context/products.md
- [ ] Each card links to its individual product detail page
- [ ] SEO meta tags

---

## Phase 5 — Product Detail Pages (one per product)

Create one HTML file for each product using the template structure from MASTER_PROMPT.md:

- [ ] `products/rajgira-ladoo.html`
- [ ] `products/peanut-chikki.html`
- [ ] `products/peanut-crush-chikki.html`
- [ ] `products/til-ladoo.html`
- [ ] `products/murmura-ladoo.html`
- [ ] `products/organic-jaggery.html`
- [ ] `products/rajgira-chikki.html`
- [ ] `products/kalansh-healthy-gift.html`

Each must include:
- Product image gallery
- Full description from context/products.md
- Key highlights bullets
- Ingredients
- Storage notes
- "Where to Buy" section (Flipkart, Amazon, JioMart links + WhatsApp order button)
- Related products strip

---

## Phase 6 — Blog Pages

- [ ] `blog.html` — blog listing page with 3 real posts
- [ ] `blog-rajgira-benefits.html` — full post content from context/blog-content.md
- [ ] `blog-jaggery-guide.html` — full post content from context/blog-content.md
- [ ] `blog-women-empowerment.html` — full post content from context/blog-content.md

---

## Phase 7 — Contact Page (contact.html)

- [ ] Navbar + footer
- [ ] Two-column layout: form (left) + contact details + map (right)
- [ ] Form fields: Name, Email, Phone, Message, Submit
- [ ] Form action: `mailto:kalanshudyognirmit@gmail.com` (static mailto — no backend)
- [ ] Google Maps embed (from context/brand-data.md)
- [ ] WhatsApp order CTA
- [ ] SEO meta tags

---

## Phase 8 — QA Checklist

- [ ] Open every page in Chrome — no console errors
- [ ] Mobile test at 375px width — no horizontal scroll, all content readable
- [ ] All internal links work (no 404s, no `#!` links)
- [ ] No lorem ipsum text anywhere
- [ ] No "0+" stats
- [ ] No "needhelp@company.com" or any placeholder email
- [ ] No "fesho" or any stray dev artifacts
- [ ] All images have alt text
- [ ] Navbar shows correct active state per page
- [ ] WhatsApp float button visible on all pages
- [ ] Contact form email is `kalanshudyognirmit@gmail.com`
- [ ] Footer copyright says 2026
