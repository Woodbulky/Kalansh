/* ============================================================
   KALANSH — MAIN.JS
   Interactions & UI Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTestimonials();
  initProductFilters();
  initSmoothScroll();
  initActiveNav();
});

/* ============================================================
   NAVBAR — Scroll Detection
   ============================================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check
}

/* ============================================================
   MOBILE MENU — Hamburger Toggle
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks = document.querySelector('.navbar__links');
  const overlay = document.querySelector('.nav-overlay');

  if (!hamburger || !navLinks) return;

  const toggle = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  const close = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggle);
  if (overlay) overlay.addEventListener('click', close);

  // Close when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      close();
    }
  });
}

/* ============================================================
   TESTIMONIALS — Carousel
   ============================================================ */
function initTestimonials() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonials-track');
  const cards = slider.querySelectorAll('.testimonial-card');
  const dotsContainer = slider.querySelector('.testimonials-dots');

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  let totalSlides = Math.ceil(cards.length / slidesPerView);
  let autoplayInterval;

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    currentIndex = index;
    const offset = -(currentIndex * (100 / slidesPerView)) * slidesPerView;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function next() {
    currentIndex = (currentIndex + 1) % totalSlides;
    goTo(currentIndex);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(next, 4000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  function handleResize() {
    const newSlidesPerView = getSlidesPerView();
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      totalSlides = Math.ceil(cards.length / slidesPerView);
      currentIndex = 0;
      buildDots();
      goTo(0);
    }
  }

  buildDots();
  startAutoplay();

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  window.addEventListener('resize', handleResize);
}

/* ============================================================
   PRODUCT FILTERS — Tab Filtering
   ============================================================ */
function initProductFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('[data-category]');

  if (tabs.length === 0 || products.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter products
      products.forEach(product => {
        if (filter === 'all' || product.dataset.category === filter) {
          product.style.display = '';
          product.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   SMOOTH SCROLL — Anchor Links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   ACTIVE NAV LINK — Based on Current Page
   ============================================================ */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();

    if (currentPage === linkPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}


/* ============================================
   SCROLL-TRIGGERED ANIMATIONS
   Using IntersectionObserver — no library needed
   ============================================ */

(function() {

  // Only run if user hasn't requested reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Add page overlay div to body for page-enter transition
  const overlay = document.createElement('div');
  overlay.className = 'page-overlay';
  document.body.appendChild(overlay);
  // Remove from DOM after animation completes
  overlay.addEventListener('animationend', () => overlay.remove());

  // IntersectionObserver — fires when element enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once visible, stop observing (no replay on scroll back up)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,       // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // trigger slightly before element hits bottom of viewport
  });

  // Elements to observe — add animation classes and start observing
  function initScrollAnimations() {

    // Section headers — slide up
    document.querySelectorAll('.section__header').forEach(el => {
      el.classList.add('anim-slide-up', 'anim-hidden');
      observer.observe(el);
    });

    // Product cards on homepage and products page — staggered slide up
    // The products grid uses .grid-3 containing .product-card elements
    document.querySelectorAll('.grid-3').forEach(grid => {
      const cards = grid.querySelectorAll('.product-card');
      if (cards.length > 0) {
        grid.classList.add('anim-stagger');
        cards.forEach(card => {
          card.classList.add('anim-slide-up', 'anim-hidden');
          observer.observe(card);
        });
      }
    });

    // Blog cards — staggered
    document.querySelectorAll('.grid-3').forEach(grid => {
      const cards = grid.querySelectorAll('.blog-card');
      if (cards.length > 0) {
        grid.classList.add('anim-stagger');
        cards.forEach(card => {
          card.classList.add('anim-slide-up', 'anim-hidden');
          observer.observe(card);
        });
      }
    });

    // Trust bar stat items — staggered scale
    document.querySelectorAll('.trust-bar .container').forEach(bar => {
      bar.classList.add('anim-stagger');
      bar.querySelectorAll('.trust-bar__item').forEach(item => {
        item.classList.add('anim-scale', 'anim-hidden');
        observer.observe(item);
      });
      // Stat numbers pop
      bar.querySelectorAll('.trust-bar__number').forEach(num => {
        observer.observe(num);
      });
    });

    // Story teaser — text slides from left, image from right
    document.querySelectorAll('.story-teaser').forEach(section => {
      const imageCol = section.querySelector('.story-teaser__image');
      const textCol = section.querySelector('.story-teaser__content');
      if (imageCol) {
        imageCol.classList.add('anim-slide-left', 'anim-hidden');
        observer.observe(imageCol);
      }
      if (textCol) {
        textCol.classList.add('anim-slide-right', 'anim-hidden');
        observer.observe(textCol);
      }
    });

    // Why Kalansh / value blocks — staggered slide up
    document.querySelectorAll('.grid-3').forEach(grid => {
      const blocks = grid.querySelectorAll('.value-block');
      if (blocks.length > 0) {
        grid.classList.add('anim-stagger');
        blocks.forEach(block => {
          block.classList.add('anim-slide-up', 'anim-hidden');
          observer.observe(block);
        });
      }
    });

    // Testimonial cards
    document.querySelectorAll('.testimonials-track .testimonial-card').forEach((card, i) => {
      card.classList.add('anim-scale', 'anim-hidden');
      card.style.animationDelay = (i * 100) + 'ms';
      observer.observe(card);
    });

    // Timeline items (About page) — alternate left/right
    document.querySelectorAll('.timeline__item').forEach((item, i) => {
      item.classList.add(i % 2 === 0 ? 'anim-slide-left' : 'anim-slide-right', 'anim-hidden');
      observer.observe(item);
    });

    // Founder cards (About page)
    document.querySelectorAll('.grid-2').forEach(grid => {
      const founders = grid.querySelectorAll('.founder-card');
      if (founders.length > 0) {
        founders.forEach((card, i) => {
          card.classList.add('anim-slide-up', 'anim-hidden');
          card.style.animationDelay = (i * 150) + 'ms';
          observer.observe(card);
        });
      }
    });

    // Women empowerment section stats
    document.querySelectorAll('.empowerment__stats').forEach(statsWrap => {
      statsWrap.querySelectorAll('.empowerment__stat').forEach((stat, i) => {
        stat.classList.add('anim-scale', 'anim-hidden');
        stat.style.animationDelay = (i * 120) + 'ms';
        observer.observe(stat);
      });
      // Stat numbers pop
      statsWrap.querySelectorAll('.empowerment__stat-number').forEach(num => {
        observer.observe(num);
      });
    });

    // Milestone section
    document.querySelectorAll('.milestone').forEach(el => {
      const num = el.querySelector('.milestone__number');
      if (num) {
        num.classList.add('anim-scale', 'anim-hidden');
        observer.observe(num);
      }
    });

    // Distribution cities
    document.querySelectorAll('.cities-list').forEach(el => {
      el.classList.add('anim-fade', 'anim-hidden');
      observer.observe(el);
    });

    // Product detail page — image gallery and info column
    const productGallery = document.querySelector('.product-gallery');
    const productInfo = document.querySelector('.product-info');
    if (productGallery) {
      productGallery.classList.add('anim-slide-left', 'anim-hidden');
      observer.observe(productGallery);
    }
    if (productInfo) {
      productInfo.classList.add('anim-slide-right', 'anim-hidden');
      observer.observe(productInfo);
    }

    // Where to buy
    document.querySelectorAll('.where-to-buy').forEach(el => {
      el.classList.add('anim-slide-up', 'anim-hidden');
      observer.observe(el);
    });

    // Related products
    document.querySelectorAll('.related-products').forEach(el => {
      el.classList.add('anim-fade', 'anim-hidden');
      observer.observe(el);
    });

    // Blog post content on blog detail pages
    document.querySelectorAll('.blog-post__content p').forEach((p, i) => {
      if (i < 10) { // only first 10 paragraphs to avoid over-animating
        p.classList.add('anim-fade', 'anim-hidden');
        p.style.animationDelay = (i * 60) + 'ms';
        observer.observe(p);
      }
    });

    // Blog post headings
    document.querySelectorAll('.blog-post__content h2').forEach(h => {
      h.classList.add('anim-slide-up', 'anim-hidden');
      observer.observe(h);
    });

    // Contact page — form and info columns
    const contactForm = document.querySelector('.contact-form');
    const contactInfo = document.querySelector('.contact-info');
    if (contactForm && contactInfo) {
      contactForm.classList.add('anim-slide-left', 'anim-hidden');
      observer.observe(contactForm);
      contactInfo.classList.add('anim-slide-right', 'anim-hidden');
      observer.observe(contactInfo);
    }

    // Video embed
    document.querySelectorAll('.video-embed').forEach(el => {
      el.classList.add('anim-scale', 'anim-hidden');
      observer.observe(el);
    });

    // Group companies
    document.querySelectorAll('.group-companies-list').forEach(grid => {
      grid.classList.add('anim-stagger');
      grid.querySelectorAll('.group-company').forEach(item => {
        item.classList.add('anim-slide-up', 'anim-hidden');
        observer.observe(item);
      });
    });

    // Certifications cards
    document.querySelectorAll('#certifications .card').forEach((card, i) => {
      card.classList.add('anim-scale', 'anim-hidden');
      card.style.animationDelay = (i * 150) + 'ms';
      observer.observe(card);
    });

    // Filter tabs
    document.querySelectorAll('.filter-tabs').forEach(el => {
      el.classList.add('anim-fade', 'anim-hidden');
      observer.observe(el);
    });

    // Contact map
    document.querySelectorAll('.contact-map').forEach(el => {
      el.classList.add('anim-scale', 'anim-hidden');
      observer.observe(el);
    });

  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

})();


/* ============================================
   SMOOTH PAGE TRANSITIONS
   Fade out before navigating to internal links
   ============================================ */

(function() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Only handle internal links (not anchors, not external, not mailto/tel/whatsapp)
    const isInternal = (href.endsWith('.html') || href.startsWith('./') || href.startsWith('../')) &&
                       !href.startsWith('http') && !href.startsWith('mailto') &&
                       !href.startsWith('tel') && !href.startsWith('#');
    if (!isInternal) return;

    e.preventDefault();

    // Fade the body out
    document.body.style.transition = 'opacity 0.25s ease';
    document.body.style.opacity = '0';

    setTimeout(() => {
      window.location.href = href;
    }, 250);
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });

})();


/* ============================================
   PARALLAX ON HERO IMAGE (subtle, not sickening)
   ============================================ */

(function() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const heroImage = document.querySelector('.hero__visual');
  if (!heroImage) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Move image up at 8% of scroll speed — subtle parallax
        if (scrollY < 800) { // Only parallax in the hero area
          heroImage.style.transform = `translateY(${scrollY * 0.08}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

})();

