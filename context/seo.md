# context/seo.md — SEO & Meta Tags for Every Page

## Rules
- Every page must have a unique `<title>`, `<meta name="description">`, and Open Graph tags
- All pages must have `<link rel="canonical">` pointing to the intended URL
- Use schema.org JSON-LD for LocalBusiness and Product structured data
- The `lang` attribute on `<html>` must be `en-IN`

---

## Page-by-Page Meta Tags

### Homepage (index.html)
```html
<title>Kalansh | Organic Rajgira Ladoo & Chikki Manufacturer — Kopargaon, Maharashtra</title>
<meta name="description" content="Kalansh Udyog makes authentic organic Rajgira Ladoo, Peanut Chikki, Til Ladoo, Murmura Ladoo, and Organic Jaggery in Kopargaon. ISO 22000:2018 certified. 7,54,700+ ladoos sold. Women-empowered production.">
<meta name="keywords" content="rajgira ladoo, organic chikki, peanut chikki, til ladoo, organic jaggery, kopargaon, ahmadnagar, maharashtra, healthy sweets">
<link rel="canonical" href="https://kalansh.in/">
```

### About (about.html)
```html
<title>Our Story | Kalansh — Women-Empowered Organic Food Brand from Kopargaon</title>
<meta name="description" content="Founded in 2019 by Rohit and Vinay Kale, Kalansh employs 90+ women in Kopargaon to produce organic ladoos and chikkis. From a family grocery shop to a 10,000 sq ft ISO-certified facility.">
<link rel="canonical" href="https://kalansh.in/about">
```

### Products (products.html)
```html
<title>Our Products | Kalansh Organic Ladoo, Chikki & Jaggery</title>
<meta name="description" content="Explore Kalansh's range of organic products: Rajgira Ladoo, Peanut Chikki, Peanut Crush Chikki, Til Ladoo, Murmura Ladoo, Organic Jaggery, Rajgira Chikki, and our Healthy Gift Box.">
<link rel="canonical" href="https://kalansh.in/products">
```

### Rajgira Ladoo (products/rajgira-ladoo.html)
```html
<title>Rajgira Ladoo | Organic Amaranth Ladoo by Kalansh</title>
<meta name="description" content="Kalansh's Rajgira Ladoo is made from 100% organic amaranth and pure jaggery — no refined sugar. Gluten-free, protein-rich, and handcrafted by women artisans in Kopargaon. 7,54,700+ sold.">
<link rel="canonical" href="https://kalansh.in/products/rajgira-ladoo">
```

### Blog (blog.html)
```html
<title>Blog | Kalansh — Organic Food, Health & Our Story</title>
<meta name="description" content="Read about the health benefits of rajgira and jaggery, the women behind Kalansh's products, and why traditional Indian sweets are making a comeback.">
<link rel="canonical" href="https://kalansh.in/blog">
```

### Contact (contact.html)
```html
<title>Contact Us | Kalansh Udyog Nirmit — Kopargaon, Maharashtra</title>
<meta name="description" content="Get in touch with Kalansh Udyog Nirmit. Order on WhatsApp, call +91 95049 59501, or visit us at Kopargaon, Ahmadnagar. Wholesale and retail enquiries welcome.">
<link rel="canonical" href="https://kalansh.in/contact">
```

---

## Global Open Graph Tags (add to every page, update per page)

```html
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kalansh">
<meta property="og:locale" content="en_IN">
<meta property="og:image" content="https://kalansh.in/assets/images/logo/kalansh-logo.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

---

## LocalBusiness Schema (homepage only)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Kalansh Udyog Nirmit",
  "alternateName": "Kalansh Mahila Gruh Udyog",
  "description": "Organic Rajgira Ladoo, Peanut Chikki, Til Ladoo, Murmura Ladoo, and Organic Jaggery manufacturer in Kopargaon, Maharashtra.",
  "url": "https://kalansh.in",
  "telephone": "+919504959501",
  "email": "kalanshudyognirmit@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Girme Chawl, Near Kanya Vidya Mandir",
    "addressLocality": "Kopargaon",
    "addressRegion": "Maharashtra",
    "postalCode": "423601",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.1047,
    "longitude": 74.7178
  },
  "sameAs": [
    "https://www.instagram.com/kalansh.udyog/",
    "https://www.facebook.com/profile.php?id=61551733415528",
    "https://twitter.com/KalanshU",
    "https://www.youtube.com/@kalanshudyog4649"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Kalansh Organic Products",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Rajgira Ladoo" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Peanut Chikki" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Organic Jaggery" } }
    ]
  }
}
</script>
```

---

## Common Head Block (paste into every HTML file)

```html
<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- PAGE-SPECIFIC: title, description, canonical, og tags go here -->
  <link rel="icon" type="image/jpeg" href="assets/images/logo/favicon.jpg">
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Noto+Serif+Devanagari:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
```
