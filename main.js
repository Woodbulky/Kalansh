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
  initScrollEntrance();
  initTrustBarCountUp();
  initProductWhatsApp();
  initProductImageWrap();
  initButtonRipple();
  initHeroGrain();
  initLadooCursor();
  initContactForm();
});

function isMobileView() {
  return window.matchMedia('(max-width: 767px)').matches;
}

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

  const searchInput = document.getElementById('productSearch');
  const searchClear = document.getElementById('productSearchClear');
  const noResults = document.getElementById('productsNoResults');
  const resetSearchBtn = document.getElementById('productsResetSearch');

  let activeFilter = 'all';
  let searchTerm = '';

  // Cache each card's searchable text once
  products.forEach(product => {
    const name = product.querySelector('.product-card__name');
    const desc = product.querySelector('.product-card__desc');
    product.dataset.searchText = (
      (name ? name.textContent : '') + ' ' +
      (desc ? desc.textContent : '') + ' ' +
      (product.dataset.category || '')
    ).toLowerCase();
  });

  function applyFilters() {
    let visibleCount = 0;

    products.forEach(product => {
      const matchesTab = activeFilter === 'all' || product.dataset.category === activeFilter;
      const matchesSearch = !searchTerm || product.dataset.searchText.includes(searchTerm);

      if (matchesTab && matchesSearch) {
        product.style.display = '';
        product.style.animation = 'fadeInUp 0.4s ease forwards';
        visibleCount++;
      } else {
        product.style.display = 'none';
      }
    });

    if (noResults) noResults.hidden = visibleCount !== 0;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeFilter = tab.dataset.filter;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      if (searchClear) searchClear.hidden = searchTerm === '';
      applyFilters();
    });

    // Pressing Escape clears the search
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.value) {
        clearSearch();
      }
    });
  }

  function clearSearch() {
    if (!searchInput) return;
    searchInput.value = '';
    searchTerm = '';
    if (searchClear) searchClear.hidden = true;
    applyFilters();
    searchInput.focus();
  }

  if (searchClear) searchClear.addEventListener('click', clearSearch);
  if (resetSearchBtn) resetSearchBtn.addEventListener('click', clearSearch);
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
  if (prefersReduced || isMobileView()) return;

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


/* ============================================================
   SCROLL ENTRANCE — IntersectionObserver reveal
   ============================================================ */
function initScrollEntrance() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const mobile = isMobileView();
  const staggerMs = mobile ? 60 : 100;
  const maxStagger = mobile ? 240 : 700;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: mobile ? 0.06 : 0.12,
    rootMargin: mobile ? '0px 0px 8px 0px' : '0px 0px -40px 0px'
  });

  document.querySelectorAll('.section, .hero, .trust-bar').forEach(el => {
    el.classList.add('scroll-enter');
    if (mobile) el.classList.add('scroll-enter--mobile');
    observer.observe(el);
  });

  document.querySelectorAll('.grid-3, .testimonials-track').forEach(parent => {
    const cards = parent.querySelectorAll('.product-card, .testimonial-card');
    cards.forEach((card, i) => {
      card.classList.add('scroll-enter');
      if (mobile) card.classList.add('scroll-enter--mobile');
      card.style.transitionDelay = `${Math.min(i * staggerMs, maxStagger)}ms`;
      observer.observe(card);
    });
  });

  document.querySelectorAll('.product-card').forEach(card => {
    if (!card.classList.contains('scroll-enter')) {
      card.classList.add('scroll-enter');
      observer.observe(card);
    }
  });

  document.querySelectorAll('.testimonial-card').forEach(card => {
    if (!card.classList.contains('scroll-enter')) {
      card.classList.add('scroll-enter');
      observer.observe(card);
    }
  });
}

/* ============================================================
   TRUST BAR — Animated count-up
   ============================================================ */
function initTrustBarCountUp() {
  const trustBar = document.querySelector('.trust-bar');
  if (!trustBar) return;

  const numbers = trustBar.querySelectorAll('.trust-bar__number');
  numbers.forEach(el => {
    el.dataset.countTarget = el.textContent.trim();
  });

  const mobile = isMobileView();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      numbers.forEach(el => animateCountUp(el, mobile ? 1500 : 2000));
      observer.disconnect();
    });
  }, { threshold: mobile ? 0.35 : 0.5 });

  observer.observe(trustBar);
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function formatIndianNumber(num) {
  const str = String(Math.floor(num));
  if (str.length <= 3) return str;
  const lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
}

function animateCountUp(el, duration = 2000) {
  const raw = el.dataset.countTarget || el.textContent.trim();
  const hasPlus = raw.endsWith('+');
  const digitsOnly = raw.replace(/,/g, '').replace(/\+$/, '');
  const target = parseInt(digitsOnly, 10);

  if (Number.isNaN(target)) return;

  const start = performance.now();
  el.textContent = hasPlus ? '0+' : '0';

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = easeOutQuad(progress);
    const current = Math.round(target * eased);
    el.textContent = formatIndianNumber(current) + (hasPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = raw;
  }

  requestAnimationFrame(tick);
}

/* ============================================================
   PRODUCT CARDS — WhatsApp order CTA
   ============================================================ */
const WHATSAPP_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

function initProductWhatsApp() {
  document.querySelectorAll('.product-card').forEach(card => {
    const body = card.querySelector('.product-card__body');
    const nameEl = card.querySelector('.product-card__name');
    if (!body || !nameEl || body.querySelector('.product-card__whatsapp')) return;

    const productName = nameEl.textContent.trim();
    const message = encodeURIComponent(`Hi, I'd like to order ${productName}`);
    const link = document.createElement('a');
    link.href = `https://wa.me/919504959501?text=${message}`;
    link.className = 'product-card__whatsapp';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = WHATSAPP_SVG + ' Order on WhatsApp';
    body.appendChild(link);
  });
}

function initProductImageWrap() {
  document.querySelectorAll('.product-card__image').forEach(img => {
    if (img.parentElement.classList.contains('product-card__image-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'product-card__image-wrap';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);
  });
}

/* ============================================================
   BUTTON RIPPLE — Click effect on primary/secondary buttons
   ============================================================ */
function initButtonRipple() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    if (btn.dataset.rippleInit) return;
    btn.dataset.rippleInit = 'true';

    const spawnRipple = (clientX, clientY) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${clientX - rect.left - size / 2}px`;
      ripple.style.top = `${clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);

      const cleanup = (ev) => {
        if (ev.propertyName !== 'opacity') return;
        ripple.removeEventListener('transitionend', cleanup);
        ripple.remove();
      };
      ripple.addEventListener('transitionend', cleanup);

      requestAnimationFrame(() => {
        ripple.classList.add('is-active');
      });
    };

    btn.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      spawnRipple(e.clientX, e.clientY);
    });
  });
}

/* ============================================================
   HERO — SVG grain filter injection
   ============================================================ */
function initHeroGrain() {
  if (isMobileView() || window.matchMedia('(hover: none)').matches) return;
  if (document.getElementById('hero-grain-svg')) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'hero-grain-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  svg.innerHTML = '<filter id="hero-grain-filter" x="0%" y="0%" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>';
  document.body.appendChild(svg);
}

/* ============================================================
   LADOO CURSOR TRAIL
   ============================================================ */
function initLadooCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  let enabled = true;
  let lastSpawn = 0;
  const THROTTLE_MS = 60;
  const DURATION_MS = 700;

  const toast = document.createElement('div');
  toast.className = 'ladoo-trail-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove('is-visible'), 1500);
  }

  function createLadooSVG() {
    return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="13" r="9" fill="#D47A1E"/>
      <ellipse cx="9" cy="10" rx="2.5" ry="1.5" fill="rgba(255,255,255,0.35)"/>
      <circle cx="12" cy="4.5" r="2.2" fill="#4A2C0A"/>
    </svg>`;
  }

  function spawnLadoo(x, y) {
    const el = document.createElement('div');
    el.className = 'ladoo-trail-particle';
    const rotation = (Math.random() * 40 - 20).toFixed(1);
    const scale = (Math.random() * 0.5 + 0.4).toFixed(2);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty('--ladoo-rotate', `${rotation}deg`);
    el.style.setProperty('--ladoo-scale', scale);
    el.innerHTML = createLadooSVG();
    document.body.appendChild(el);

    requestAnimationFrame(() => el.classList.add('is-active'));

    const cleanup = () => {
      el.removeEventListener('transitionend', cleanup);
      el.remove();
    };
    el.addEventListener('transitionend', cleanup);
    setTimeout(cleanup, DURATION_MS + 50);
  }

  document.addEventListener('mousemove', (e) => {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastSpawn < THROTTLE_MS) return;
    lastSpawn = now;
    spawnLadoo(e.clientX, e.clientY);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'l' && e.key !== 'L') return;
    if (e.target.matches('input, textarea, select, [contenteditable="true"]')) return;
    enabled = !enabled;
    showToast(enabled ? '✦ Ladoo trail on' : '✦ Ladoo trail off');
  });
}

/* ============================================================
   CONTACT FORM — Validation + success state (no backend)
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const WHATSAPP_NUMBER = '919504959501';
  const EMAIL_TO = 'kalanshudyognirmit@gmail.com';

  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    phone: form.querySelector('#phone'),
    message: form.querySelector('#message')
  };

  const successPanel = document.getElementById('formSuccess');
  const successName = document.getElementById('successName');
  const successEmail = document.getElementById('successEmail');
  const successWhatsApp = document.getElementById('successWhatsApp');
  const resetBtn = document.getElementById('formReset');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Accepts 7–15 digits, allowing +, spaces, dashes, parentheses
  const PHONE_RE = /^[+]?[\d\s().-]{7,18}$/;

  function setError(field, msg) {
    if (!field) return false;
    const group = field.closest('.form-group');
    const errorEl = document.getElementById(field.id + '-error');
    if (group) group.classList.add('has-error');
    if (errorEl) errorEl.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
    return false;
  }

  function clearError(field) {
    if (!field) return true;
    const group = field.closest('.form-group');
    const errorEl = document.getElementById(field.id + '-error');
    if (group) group.classList.remove('has-error');
    if (errorEl) errorEl.textContent = '';
    field.removeAttribute('aria-invalid');
    return true;
  }

  function validateField(field) {
    if (!field) return true;
    const value = field.value.trim();

    if (field === fields.name) {
      if (!value) return setError(field, 'Please enter your name.');
      if (value.length < 2) return setError(field, 'That name looks a little short.');
    } else if (field === fields.email) {
      if (!value) return setError(field, 'Please enter your email address.');
      if (!EMAIL_RE.test(value)) return setError(field, 'Please enter a valid email address.');
    } else if (field === fields.phone) {
      // Optional — only validate if something was typed
      if (value && !PHONE_RE.test(value)) return setError(field, 'Please enter a valid phone number.');
    } else if (field === fields.message) {
      if (!value) return setError(field, 'Please enter a message.');
      if (value.length < 10) return setError(field, 'Please add a little more detail (10+ characters).');
    }
    return clearError(field);
  }

  // Validate on blur; clear the error as the user fixes it
  Object.values(fields).forEach(field => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  function buildMessageText() {
    const name = fields.name.value.trim();
    const email = fields.email.value.trim();
    const phone = fields.phone.value.trim();
    const message = fields.message.value.trim();
    let body = `Name: ${name}\nEmail: ${email}`;
    if (phone) body += `\nPhone: ${phone}`;
    body += `\n\nMessage:\n${message}`;
    return body;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate every field; focus the first invalid one
    let firstInvalid = null;
    Object.values(fields).forEach(field => {
      const ok = validateField(field);
      if (!ok && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const name = fields.name.value.trim();
    const bodyText = buildMessageText();

    // Prefill both send options — no backend, user picks a channel
    const subject = `Website enquiry from ${name}`;
    successEmail.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    successWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bodyText)}`;
    successName.textContent = name.split(' ')[0] || name;

    // Swap form for the success panel
    form.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.values(fields).forEach(clearError);
      successPanel.hidden = true;
      form.hidden = false;
      fields.name.focus();
    });
  }
}

