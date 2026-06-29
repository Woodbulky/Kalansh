# context/design-tokens.md — Kalansh Design System

## Colour Palette

```css
:root {
  /* Core Brand */
  --color-primary:       #4A2C0A;   /* Deep Jaggery Brown — headings, nav, footer */
  --color-primary-light: #6B3F12;   /* Lighter brown — hover states */
  --color-accent:        #D47A1E;   /* Warm Saffron — CTAs, highlights, icons */
  --color-accent-hover:  #B8631A;   /* Darker saffron — CTA hover */

  /* Backgrounds */
  --color-bg:            #FAF6EE;   /* Cream — main page background */
  --color-surface:       #F2EBD9;   /* Off-white warm — card backgrounds */
  --color-surface-dark:  #E8DCC8;   /* Slightly darker surface — alternating sections */
  --color-earth:         #3D2008;   /* Very dark brown — footer, dark sections */

  /* Text */
  --color-text:          #2C1A08;   /* Dark Walnut — primary body text */
  --color-text-muted:    #8C7355;   /* Warm grey-brown — captions, meta */
  --color-text-light:    #FAF6EE;   /* Cream — text on dark backgrounds */

  /* Functional */
  --color-success:       #3B6D11;   /* Organic green — badges, ISO tag */
  --color-border:        rgba(74, 44, 10, 0.12); /* Subtle warm border */
  --color-shadow:        rgba(74, 44, 10, 0.10); /* Warm card shadow */
}
```

---

## Typography

```css
/* Google Fonts import — include in every HTML <head> */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Noto+Serif+Devanagari:wght@400;500&display=swap');

:root {
  --font-display: 'Fraunces', Georgia, serif;      /* All headings */
  --font-body:    'DM Sans', system-ui, sans-serif; /* All body text */
  --font-hindi:   'Noto Serif Devanagari', serif;   /* Marathi tagline */
}
```

### Type Scale

```css
:root {
  --text-xs:   0.75rem;   /* 12px — fine print, timestamps */
  --text-sm:   0.875rem;  /* 14px — captions, meta */
  --text-base: 1rem;      /* 16px — body text */
  --text-lg:   1.125rem;  /* 18px — lead paragraphs */
  --text-xl:   1.25rem;   /* 20px — card headings */
  --text-2xl:  1.5rem;    /* 24px — section subheadings */
  --text-3xl:  1.875rem;  /* 30px — section headings */
  --text-4xl:  2.25rem;   /* 36px — page headings */
  --text-5xl:  3rem;      /* 48px — hero heading mobile */
  --text-6xl:  3.75rem;   /* 60px — hero heading desktop */
  --text-7xl:  4.5rem;    /* 72px — statement numbers */
}

/* Heading styles — use font-display */
h1, h2, h3, h4 { font-family: var(--font-display); font-weight: 600; color: var(--color-primary); line-height: 1.15; }
h1 { font-size: clamp(var(--text-5xl), 6vw, var(--text-6xl)); }
h2 { font-size: clamp(var(--text-3xl), 4vw, var(--text-4xl)); }
h3 { font-size: clamp(var(--text-2xl), 3vw, var(--text-3xl)); }
h4 { font-size: var(--text-xl); }

/* Body */
body { font-family: var(--font-body); font-size: var(--text-base); color: var(--color-text); background: var(--color-bg); line-height: 1.7; }

/* Tagline in Marathi */
.tagline-hindi { font-family: var(--font-hindi); font-size: var(--text-xl); color: var(--color-accent); letter-spacing: 0.02em; }
```

---

## Spacing

```css
:root {
  --space-xs:  0.25rem;   /* 4px */
  --space-sm:  0.5rem;    /* 8px */
  --space-md:  1rem;      /* 16px */
  --space-lg:  1.5rem;    /* 24px */
  --space-xl:  2rem;      /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --space-5xl: 8rem;      /* 128px */

  --section-padding: clamp(4rem, 8vw, 8rem); /* Vertical section padding */
  --container-max: 1200px;
  --container-padding: clamp(1rem, 5vw, 4rem);
}
```

---

## Components

### Buttons

```css
/* Primary CTA */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-accent);
  color: #fff;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.15s ease;
}
.btn-primary:hover { background: var(--color-accent-hover); transform: translateY(-1px); }

/* Secondary / Ghost */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 500;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  border: 1.5px solid var(--color-primary);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
.btn-secondary:hover { background: var(--color-primary); color: var(--color-text-light); }
```

### Cards

```css
.card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: var(--space-xl);
  box-shadow: 0 4px 24px var(--color-shadow);
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(74,44,10,0.15); }

/* Product card */
.product-card {
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px var(--color-shadow);
  transition: transform 0.2s ease;
}
.product-card:hover { transform: translateY(-6px); }
.product-card__image { width: 100%; aspect-ratio: 1/1; object-fit: cover; background: var(--color-surface-dark); }
.product-card__body { padding: var(--space-lg); }
.product-card__name { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 600; color: var(--color-primary); margin-bottom: var(--space-sm); }
.product-card__desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; }
.product-card__link { display: inline-block; margin-top: var(--space-md); font-weight: 500; color: var(--color-accent); text-decoration: none; }
.product-card__link:hover { text-decoration: underline; }
```

### Badges

```css
.badge { display: inline-block; font-size: var(--text-xs); font-weight: 500; padding: 0.25rem 0.75rem; border-radius: 100px; }
.badge-organic { background: #EAF3DE; color: #3B6D11; }
.badge-iso { background: #E8DCC8; color: #4A2C0A; border: 1px solid rgba(74,44,10,0.2); }
.badge-certified { background: var(--color-accent); color: #fff; }
```

---

## Section Patterns

### Alternating backgrounds
Odd sections: `background: var(--color-bg)`
Even sections: `background: var(--color-surface)`
Dark CTA sections: `background: var(--color-earth); color: var(--color-text-light)`

### Section structure
```html
<section class="section">
  <div class="container">
    <div class="section__header">
      <span class="section__eyebrow">Eyebrow label</span>
      <h2 class="section__title">Main Heading</h2>
      <p class="section__lead">Optional lead paragraph</p>
    </div>
    <!-- section content -->
  </div>
</section>
```

```css
.section { padding: var(--section-padding) 0; }
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }
.section__header { text-align: center; max-width: 640px; margin: 0 auto var(--space-3xl); }
.section__eyebrow { display: inline-block; font-size: var(--text-sm); font-weight: 500; color: var(--color-accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-sm); }
.section__lead { font-size: var(--text-lg); color: var(--color-text-muted); margin-top: var(--space-md); }
```

---

## Navbar

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.navbar.scrolled {
  background: rgba(250, 246, 238, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--color-border);
}
.navbar__links { display: flex; gap: var(--space-xl); list-style: none; }
.navbar__links a { font-size: var(--text-sm); font-weight: 500; color: var(--color-primary); text-decoration: none; position: relative; }
.navbar__links a.active::after,
.navbar__links a:hover::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  border-radius: 2px;
}
```

---

## WhatsApp Floating Button

```html
<a href="https://wa.me/919504959501" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

```css
.whatsapp-float {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: #25D366;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  z-index: 999;
  transition: transform 0.2s ease;
}
.whatsapp-float:hover { transform: scale(1.1); }
```

---

## Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px */
@media (min-width: 640px)  { ... }
/* md: 768px */
@media (min-width: 768px)  { ... }
/* lg: 1024px */
@media (min-width: 1024px) { ... }
/* xl: 1280px */
@media (min-width: 1280px) { ... }

/* Common grid patterns */
.grid-2 { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); }
@media (min-width: 768px)  { .grid-2 { grid-template-columns: repeat(2, 1fr); } }

.grid-3 { display: grid; grid-template-columns: 1fr; gap: var(--space-xl); }
@media (min-width: 640px)  { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid-3 { grid-template-columns: repeat(3, 1fr); } }

.grid-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-lg); }
@media (min-width: 1024px) { .grid-4 { grid-template-columns: repeat(4, 1fr); } }
```
