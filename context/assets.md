# context/assets.md — Image & Asset References

## Folder Structure

```
assets/
├── images/
│   ├── logo/
│   │   ├── kalansh-logo.png          ← From: https://kalansh.in/wp-content/uploads/2023/10/kalansh-logo.png
│   │   ├── kalansh-logo-white.png    ← From: https://kalansh.in/wp-content/uploads/2023/10/kalansh-logo-white.png
│   │   └── favicon.jpg               ← From: https://kalansh.in/wp-content/uploads/2023/10/favicon.jpg
│   ├── products/
│   │   ├── rajgira-ladoo-1.jpg       ← From: https://kalansh.in/wp-content/uploads/2023/10/Rajgira-ladoo-1.jpg
│   │   ├── rajgira-ladoo-2.jpg       ← From: https://kalansh.in/wp-content/uploads/2023/10/Rajgira-ladoo-2.jpg
│   │   ├── rajgira-ladoo-3.jpg       ← From: https://kalansh.in/wp-content/uploads/2023/10/Rajgira-ladoo-3.jpg
│   │   ├── peanut-chikki.png         ← From: https://kalansh.in/wp-content/themes/kalansh/images/products/krash-chkiki-product-4.png
│   │   ├── peanut-crush-chikki.png   ← From: https://kalansh.in/wp-content/uploads/2023/10/krash-chkiki-product-4.png
│   │   ├── til-ladoo.png             ← From: https://kalansh.in/wp-content/themes/kalansh/images/products/til-ladu-product-2.png
│   │   ├── murmura-ladoo.png         ← From: https://kalansh.in/wp-content/uploads/2023/10/Murmura-Ladu.png
│   │   ├── organic-jaggery.png       ← From: https://kalansh.in/wp-content/uploads/2023/10/Jaggery-product-1.png
│   │   ├── rajgira-chikki.png        ← From: https://kalansh.in/wp-content/uploads/2023/10/rajgira-chkiki-product-5.png
│   │   └── healthy-gift-box.png      ← From: https://kalansh.in/wp-content/uploads/2024/01/kalansh-healthy-gift.png
│   ├── founders/
│   │   └── rohit-kale.jpg            ← From: https://kalansh.in/wp-content/uploads/2023/10/rohit-kale-about-4.jpg
│   ├── about/
│   │   ├── about-banner.jpg          ← From: https://kalansh.in/wp-content/uploads/2023/10/Rajgira-Ladoo-Chikki-about-1.jpg
│   │   ├── about-company-1.jpg       ← From: http://kalansh.in/wp-content/uploads/2023/10/About-Company-about-2-1.jpg
│   │   └── about-company-2.jpg       ← From: http://kalansh.in/wp-content/uploads/2023/10/About-Company-about-2-2.jpg
│   ├── blog/
│   │   ├── blog-rajgira.jpg          ← From: https://kalansh.in/wp-content/uploads/2023/10/blog-3.jpg
│   │   ├── blog-jaggery.jpg          ← From: https://kalansh.in/wp-content/uploads/2023/10/blog-2.jpg
│   │   └── blog-women.jpg            ← From: https://kalansh.in/wp-content/uploads/2023/10/blog-1.jpg
│   └── misc/
│       └── achievements.jpg          ← From: http://kalansh.in/wp-content/uploads/2023/10/Achievement-about-3-1.jpg
└── fonts/  (leave empty — fonts are loaded from Google Fonts CDN)
```

---

## How to Download All Assets

Run this in your terminal from the project root to pull all images from the live site:

```bash
# Create folders
mkdir -p assets/images/logo assets/images/products assets/images/founders assets/images/about assets/images/blog assets/images/misc

# Logos
curl -o assets/images/logo/kalansh-logo.png "https://kalansh.in/wp-content/uploads/2023/10/kalansh-logo.png"
curl -o assets/images/logo/kalansh-logo-white.png "https://kalansh.in/wp-content/uploads/2023/10/kalansh-logo-white.png"
curl -o assets/images/logo/favicon.jpg "https://kalansh.in/wp-content/uploads/2023/10/favicon.jpg"

# Products
curl -o assets/images/products/rajgira-ladoo-1.jpg "https://kalansh.in/wp-content/uploads/2023/10/Rajgira-ladoo-1.jpg"
curl -o assets/images/products/rajgira-ladoo-2.jpg "https://kalansh.in/wp-content/uploads/2023/10/Rajgira-ladoo-2.jpg"
curl -o assets/images/products/rajgira-ladoo-3.jpg "https://kalansh.in/wp-content/uploads/2023/10/Rajgira-ladoo-3.jpg"
curl -o assets/images/products/peanut-chikki.png "https://kalansh.in/wp-content/uploads/2023/10/shengdana-chkiki-product-6.png"
curl -o assets/images/products/peanut-crush-chikki.png "https://kalansh.in/wp-content/uploads/2023/10/krash-chkiki-product-4.png"
curl -o assets/images/products/til-ladoo.png "https://kalansh.in/wp-content/uploads/2023/10/til-ladu-product-2.png"
curl -o assets/images/products/murmura-ladoo.png "https://kalansh.in/wp-content/uploads/2023/10/Murmura-Ladu.png"
curl -o assets/images/products/organic-jaggery.png "https://kalansh.in/wp-content/uploads/2023/10/Jaggery-product-1.png"
curl -o assets/images/products/rajgira-chikki.png "https://kalansh.in/wp-content/uploads/2023/10/rajgira-chkiki-product-5.png"
curl -o assets/images/products/healthy-gift-box.png "https://kalansh.in/wp-content/uploads/2024/01/kalansh-healthy-gift.png"

# Founders
curl -o assets/images/founders/rohit-kale.jpg "https://kalansh.in/wp-content/uploads/2023/10/rohit-kale-about-4.jpg"

# About
curl -o assets/images/about/about-banner.jpg "https://kalansh.in/wp-content/uploads/2023/10/Rajgira-Ladoo-Chikki-about-1.jpg"
curl -o assets/images/about/about-company-1.jpg "http://kalansh.in/wp-content/uploads/2023/10/About-Company-about-2-1.jpg"
curl -o assets/images/about/about-company-2.jpg "http://kalansh.in/wp-content/uploads/2023/10/About-Company-about-2-2.jpg"

# Blog
curl -o assets/images/blog/blog-rajgira.jpg "https://kalansh.in/wp-content/uploads/2023/10/blog-3.jpg"
curl -o assets/images/blog/blog-jaggery.jpg "https://kalansh.in/wp-content/uploads/2023/10/blog-2.jpg"
curl -o assets/images/blog/blog-women.jpg "https://kalansh.in/wp-content/uploads/2023/10/blog-1.jpg"

# Misc
curl -o assets/images/misc/achievements.jpg "http://kalansh.in/wp-content/uploads/2023/10/Achievement-about-3-1.jpg"
```

---

## Image Fallback Rule

If any image fails to load, the agent should use a warm earthy placeholder:
```html
<div style="background: #E8DCC8; display:flex; align-items:center; justify-content:center; color:#8C7355; font-family:sans-serif;">
  [Image: Product Name]
</div>
```

---

## External URLs to link to (not embed)

| Platform | URL |
|----------|-----|
| Flipkart | https://www.flipkart.com (search "Kalansh") |
| Amazon | https://www.amazon.in (search "Kalansh") |
| Jio Mart | https://www.jiomart.com (search "Kalansh") |
| WhatsApp Order | https://wa.me/919504959501 |
| YouTube embed | https://www.youtube.com/embed/KCx4OVToES0 |
| JD (JustDial) | https://jsdl.in/RSL-MJM1696925791 |
