// =====================================================
// PT PRINTWORK MULTIGRAPH INDONESIA
// Awwwards-Level Javascript Integration
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL PROGRESS BAR ──────────────────────────────
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (totalScroll / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });

  // ── CUSTOM CURSOR ────────────────────────────────────
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    document.body.classList.add('is-touch');
  }

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (isTouchDevice && cursorDot) cursorDot.style.display = 'none';
  if (isTouchDevice && cursorRing) cursorRing.style.display = 'none';

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let magneticX = 0;
  let magneticY = 0;
  let isMagnetic = false;

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDot && !isMagnetic) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    }, { passive: true });

    const renderCursor = () => {
      if (isMagnetic) {
        ringX += (magneticX - ringX) * 0.2;
        ringY += (magneticY - ringY) * 0.2;
      } else {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
      }

      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(renderCursor);
    };
    renderCursor();
  }

  // Hover states & Magnetic behavior
  const hoverElements = document.querySelectorAll('a, button, .workflow-step, .portfolio-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      if (el.classList.contains('btn') || el.classList.contains('magnetic')) {
        cursorRing.classList.add('magnetic');
        isMagnetic = true;
        const rect = el.getBoundingClientRect();
        cursorRing.style.width = `${rect.width + 10}px`;
        cursorRing.style.height = `${rect.height + 10}px`;
        cursorDot.style.opacity = '0';
      }
    });

    el.addEventListener('mousemove', (e) => {
      if (isMagnetic) {
        const rect = el.getBoundingClientRect();
        // Magnetic pull center
        magneticX = rect.left + rect.width / 2 + (e.clientX - (rect.left + rect.width / 2)) * 0.2;
        magneticY = rect.top + rect.height / 2 + (e.clientY - (rect.top + rect.height / 2)) * 0.2;
        el.style.transform = `translate(${(e.clientX - (rect.left + rect.width / 2)) * 0.1}px, ${(e.clientY - (rect.top + rect.height / 2)) * 0.1}px)`;
      }
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      cursorRing.classList.remove('magnetic');
      isMagnetic = false;
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorDot.style.opacity = '1';
      if (el.classList.contains('btn') || el.classList.contains('magnetic')) {
        el.style.transform = '';
      }
    });
  });

  // ── NAVIGATION & NAVBAR ─────────────────────────────
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navLinks) {
    const navLinkItems = navLinks.querySelectorAll('a');

    // Close mobile menu on click
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navToggle) navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  if (navbar) {
    // Sticky nav
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (navToggle && navLinks) {
    // Mobile menu toggle
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ── 21st.dev INSPIRED SVG HERO PATHS ──────────────────
  const initHeroPaths = () => {
    const container = document.getElementById('heroPaths');
    if (!container) return;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const pathCount = 8;
    const width = 1440;
    const height = 900;

    for (let i = 0; i < pathCount; i++) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      // Generate random curvy paths
      const startY = Math.random() * height;
      const cp1x = width * 0.25 + (Math.random() * 200 - 100);
      const cp1y = Math.random() * height;
      const cp2x = width * 0.75 + (Math.random() * 200 - 100);
      const cp2y = Math.random() * height;
      const endY = Math.random() * height;

      const d = `M 0 ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${width} ${endY}`;

      path.setAttribute("d", d);
      path.classList.add('hero-path');

      // Randomize animation
      const delay = Math.random() * -10;
      const duration = 6 + Math.random() * 6;
      path.style.animationDelay = `${delay}s`;
      path.style.animationDuration = `${duration}s`;

      // Randomize starting stroke dasharray
      const length = 2000; // approximate
      path.setAttribute("stroke-dasharray", `${length / 2} ${length}`);

      // Randomly transform origin and slight rotation for dynamic feel
      path.style.transformOrigin = `${width / 2}px ${height / 2}px`;
      path.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(${1 + Math.random() * 0.2})`;

      svg.appendChild(path);
    }
  };
  initHeroPaths();

  // ── HERO TEXT REVEAL ─────────────────────────────────
  const revealHeroText = () => {
    const activeSlide = document.querySelector('.narrative-slide.active');
    if (!activeSlide) return;

    const textMasks = activeSlide.querySelectorAll('.text-mask-inner');
    textMasks.forEach((mask, index) => {
      setTimeout(() => {
        mask.classList.add('revealed');
      }, 300 + (index * 200));
    });
  };

  window.addEventListener('load', () => {
    // Small delay to ensure initial state is set
    setTimeout(revealHeroText, 500);
  });

  // ── SCROLL REVEAL INTERSECTION OBSERVER ───────────────
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Staggered reveal for children
        if (el.classList.contains('stagger-reveal')) {
          const children = el.children;
          Array.from(children).forEach((child, idx) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, idx * 150);
          });
        }

        // Handle typewriter trigger
        if (el.classList.contains('typewriter-trigger')) {
          typeWriterEffect(el);
          el.classList.remove('typewriter-trigger'); // Only run once
        }

        // Handle quote words
        if (el.id === 'quoteText') {
          const words = el.querySelectorAll('.quote-word');
          words.forEach((word, idx) => {
            setTimeout(() => {
              word.classList.add('word-visible');
            }, idx * 100);
          });
        }

        // Handle stats counter
        if (el.classList.contains('about-stats-wrap')) {
          animateCounters();

          // Animate rings
          setTimeout(() => {
            el.querySelectorAll('.stat-ring-circle').forEach(ring => {
              ring.classList.add('animated');
            });
          }, 300);
        }

        // Basic reveals
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.classList.add('active');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ── TYPEWRITER TEXT EFFECT ───────────────────────────
  function typeWriterEffect(element) {
    const originalHTML = element.innerHTML;

    // Instead of simple textContent replacement which breaks spans,
    // we use a CSS-based approach for complex HTML content
    element.style.opacity = '1';

    // Wrap text nodes in spans to animate them individually if they aren't already wrapped
    // This is a simplified approach. For true HTML-aware typing, we rely on the CSS 
    // text-gradient-animate already built into the element and just ensure it's visible.

    // If it's pure text or simple, we could do full typewriter, but for titles with
    // <span class="text-accent">, it's safer to just fade them in or use a clip-path reveal.
    element.style.clipPath = 'polygon(0 0, 0 0, 0 100%, 0% 100%)';
    element.style.transition = 'clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1)';

    // Trigger layout
    void element.offsetWidth;

    element.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  }

  // ── MORPHING ODOMETER / COUNTERS ──────────────────────
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  // ── SCROLLYTELLING ANIMATION ─────────────────────────
  // This assumes scrolly.js is loaded and provides the Scrollytelling class
  if (typeof Scrollytelling !== 'undefined') {
    new Scrollytelling({
      canvasSelector: '#hero-canvas',
      triggerSelector: '.hero',
      framesDir: 'animation-50fps-new',
      frameCount: 247
    });
  }

  // ── UNIVERSAL 3D TILT & GLARE EFFECT ──────────────────
  const initUniversalTilt = () => {
    if (isTouchDevice) return;

    // Apply to newly relevant cards natively
    const tiltTargets = document.querySelectorAll('.tilt-card, .hz-card, .approach-item, .bento-box, .eco-card');
    tiltTargets.forEach(card => {
      card.classList.add('universal-tilt');

      // Add actual glare HTML inside the card dynamically if lacking
      let glare = card.querySelector('.glare-overlay');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'glare-overlay';
        card.appendChild(glare);
      }

      let tiltRaf = null;

      card.addEventListener('mousemove', (e) => {
        if (tiltRaf) return;
        tiltRaf = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          // Gentle rotation limit
          const rotateX = ((y - centerY) / centerY) * -6;
          const rotateY = ((x - centerX) / centerX) * 6;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
          card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
          tiltRaf = null;
        });
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.setProperty('--glare-x', `50%`);
        card.style.setProperty('--glare-y', `50%`);
      }, { passive: true });
    });
  };
  initUniversalTilt();

  // ── HERO PARALLAX TEXT ───────────────────────────────
  const initHeroParallax = () => {
    if (isTouchDevice) return;

    // We want to target all hero texts inside the slides
    const heroContents = document.querySelectorAll('.hero-content-glass');

    let parallaxRaf = null;
    window.addEventListener('mousemove', (e) => {
      if (window.scrollY > window.innerHeight) return; // Skip if scrolled past hero
      if (parallaxRaf) return;

      parallaxRaf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * -20;
        const y = (e.clientY / window.innerHeight - 0.5) * -20;

        heroContents.forEach(content => {
          content.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        parallaxRaf = null;
      });
    }, { passive: true });
  };
  initHeroParallax();

  // ── HORIZONTAL WORKFLOW CAROUSEL ─────────────────────
  const workflowCarousel = document.getElementById('workflowCarousel');
  const wfPrev = document.getElementById('wfPrev');
  const wfNext = document.getElementById('wfNext');
  const wfDotsContainer = document.getElementById('wfDots');
  const wfProgressFill = document.getElementById('workflowProgress');
  const wfSteps = document.querySelectorAll('.workflow-step');

  if (workflowCarousel && wfSteps.length > 0) {
    // Generate dots
    wfSteps.forEach((step, index) => {
      const dot = document.createElement('div');
      dot.className = `workflow-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        const scrollAmount = (workflowCarousel.scrollWidth / wfSteps.length) * index;
        workflowCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      });
      wfDotsContainer.appendChild(dot);
    });

    const wfDots = document.querySelectorAll('.workflow-dot');

    // Update state on scroll
    workflowCarousel.addEventListener('scroll', () => {
      const scrollLeft = workflowCarousel.scrollLeft;
      const scrollWidth = workflowCarousel.scrollWidth - workflowCarousel.clientWidth;

      // Update progress bar
      let progress = 0;
      if (scrollWidth > 0) {
        progress = (scrollLeft / scrollWidth) * 100;
      }
      wfProgressFill.style.width = `${progress}%`;

      // Calculate active step
      const stepWidth = workflowCarousel.scrollWidth / wfSteps.length;
      const activeIndex = Math.round(scrollLeft / stepWidth);

      // Update active classes
      wfSteps.forEach((step, idx) => {
        if (idx === activeIndex) {
          step.classList.add('step-active');
          // Start ring animation immediately if active
          const ring = step.querySelector('.step-ring-fill');
          if (ring) {
            ring.style.strokeDashoffset = '0';
          }
        } else {
          step.classList.remove('step-active');
          const ring = step.querySelector('.step-ring-fill');
          if (ring) {
            ring.style.strokeDashoffset = '226'; // Reset
          }
        }
      });

      // Update dots
      wfDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    });

    // Arrow navigation
    wfPrev.addEventListener('click', () => {
      const stepWidth = workflowCarousel.scrollWidth / wfSteps.length;
      workflowCarousel.scrollBy({ left: -stepWidth, behavior: 'smooth' });
    });

    wfNext.addEventListener('click', () => {
      const stepWidth = workflowCarousel.scrollWidth / wfSteps.length;
      workflowCarousel.scrollBy({ left: stepWidth, behavior: 'smooth' });
    });

    // Initialize first step as active
    wfSteps[0].classList.add('step-active');
  }

  // ── PARTICLE CANVAS (ABOUT & QUOTE) ──────────────────
  function initParticles(canvasId, color, particleCount) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        this.baseOpaciy = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Add subtle pulse to opacity based on time
        const pulseOpacity = this.baseOpaciy + Math.sin(Date.now() * 0.002 + this.x) * 0.2;
        ctx.fillStyle = `rgba(${color}, ${Math.max(0.1, pulseOpacity)})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let isVisible = false;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.01 });
    observer.observe(canvas);

    const animate = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - dist / 100)})`;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }

        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  // White section particles (gray/lime)
  initParticles('aboutParticles', '141, 194, 31', isTouchDevice ? 20 : 60);

  // Quote section particles (white/lime)
  initParticles('quoteParticles', '255, 255, 255', isTouchDevice ? 15 : 40);

  // ── PARALLAX BACKGROUNDS ON SCROLL ───────────────────
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Quote background parallax
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      const rect = quoteSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const bg = quoteSection.querySelector('.quote-gradient-bg');
        if (bg) {
          bg.style.transform = `translateY(${(rect.top) * 0.2}px)`;
        }
      }
    }
  });

  // ── HORIZONTAL SCROLL LOGIC ─────────────────────────
  const hzSticky = document.getElementById('hzSticky');
  const hzTrack = document.getElementById('hzTrack');
  const hzDots = document.getElementById('hzDots');

  const isMobile = () => window.innerWidth <= 768;

  if (hzSticky && hzTrack) {
    let ticking = false;
    let hzStickyHeight = hzSticky.offsetHeight;
    let hzTrackScrollWidth = hzTrack.scrollWidth;
    const cards = hzTrack.querySelectorAll('.hz-card');

    function calculateMaxTranslateX() {
      let max = hzTrackScrollWidth - window.innerWidth;
      if (max <= 0 && cards.length > 0) {
        const gap = 40;
        const pad = window.innerWidth * 0.2;
        const totalCardsWidth = Array.from(cards).reduce((a, b) => a + b.offsetWidth, 0);
        max = (totalCardsWidth + (cards.length - 1) * gap + pad) - window.innerWidth;
      }
      return Math.max(0, max);
    }

    let maxTranslateX = calculateMaxTranslateX();

    function updateHorizontalScroll() {
      const rect = hzSticky.getBoundingClientRect();
      const scrollDistance = -rect.top;
      const maxScrollY = hzStickyHeight - window.innerHeight;

      if (scrollDistance <= 0) {
        hzTrack.style.transform = `translate3d(0px, 0, 0)`;
      } else if (scrollDistance >= maxScrollY) {
        hzTrack.style.transform = `translate3d(-${maxTranslateX}px, 0, 0)`;
      } else {
        const scrollPercent = scrollDistance / maxScrollY;
        hzTrack.style.transform = `translate3d(-${maxTranslateX * scrollPercent}px, 0, 0)`;
      }
      ticking = false;
    }

    // Initial call
    updateHorizontalScroll();

    window.addEventListener('scroll', () => {
      if (isMobile()) return;
      if (!ticking) {
        window.requestAnimationFrame(updateHorizontalScroll);
        ticking = true;
      }
    }, { passive: true });

    // Mobile Dots & Scrollbar Logic
    if (hzDots) {
      function setupMobileDots() {
        hzDots.innerHTML = '';
        cards.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.classList.add('hz-dot');
          if (i === 0) dot.classList.add('active');

          // Make dot clickable to scroll to card
          dot.addEventListener('click', () => {
            cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          });

          hzDots.appendChild(dot);
        });
      }

      function updateMobileDots() {
        if (!isMobile()) return;
        const scrollLeft = hzTrack.scrollLeft;
        const scrollWidth = hzTrack.scrollWidth - hzTrack.clientWidth;

        // Update dots
        const cardWidth = hzTrack.offsetWidth;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        const dots = hzDots.querySelectorAll('.hz-dot');
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIndex);
        });

        // Update progress bar thumb
        const hzScrollThumb = document.getElementById('hzScrollThumb');
        if (hzScrollThumb && scrollWidth > 0) {
          const progress = (scrollLeft / scrollWidth) * 100;
          hzScrollThumb.style.width = `${Math.max(10, progress)}%`; // Keep a minimum width so it's visible
        }
      }

      setupMobileDots();
      hzTrack.addEventListener('scroll', updateMobileDots, { passive: true });
    }

    window.addEventListener('resize', () => {
      if (!isMobile()) {
        hzStickyHeight = hzSticky.offsetHeight;
        hzTrackScrollWidth = hzTrack.scrollWidth;
        updateHorizontalScroll();
      } else {
        hzTrack.style.transform = ''; // Reset for mobile
      }
    });
  }

  // ── 21st.dev INSPIRED: GLOW CARD MOUSE FOLLOW ─────────
  const initGlowCards = () => {
    if (isTouchDevice) return;

    const cards = document.querySelectorAll('.approach-item, .hz-card, .test-card');
    cards.forEach(card => {
      card.classList.add('glow-card-container');
      let glowRaf = null;

      card.addEventListener('mousemove', (e) => {
        if (glowRaf) return; // Throttle to 1 update per frame
        glowRaf = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--glow-x', `${x}%`);
          card.style.setProperty('--glow-y', `${y}%`);
          glowRaf = null;
        });
      }, { passive: true });
    });
  };
  initGlowCards();

  // ── 21st.dev INSPIRED: CTA PARTICLE FIELD ─────────────
  const initParticleField = () => {
    const canvas = document.getElementById('cta-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const section = canvas.closest('.section-cta');
    if (!section) return;

    let particles = [];
    let animId = null;
    let isActive = false;
    const particleCount = 35; // Reduced for performance
    const connectionDistSq = 120 * 120; // Pre-squared to avoid sqrt

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    }, { passive: true });

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    const draw = () => {
      if (!isActive) { animId = null; return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.015;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(152, 202, 63, ${currentOpacity})`;
        ctx.fill();
      }

      // Connection lines — use squared distance to skip sqrt
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connectionDistSq) {
            const alpha = 0.06 * (1 - distSq / connectionDistSq);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(152, 202, 63, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    // Only animate when visible
    const observer = new IntersectionObserver((entries) => {
      isActive = entries[0].isIntersecting;
      if (isActive && !animId) {
        animId = requestAnimationFrame(draw);
      }
    }, { threshold: 0.05 });
    observer.observe(section);
  };
  initParticleField();

  // ── 21st.dev INSPIRED: MAGNETIC TILT TITLES ──────────
  const initMagneticTitles = () => {
    if (isTouchDevice) return;

    const titles = document.querySelectorAll('.section-title, .cta-title, .brands-text-center h2');
    titles.forEach(title => {
      title.classList.add('magnetic-title');
      let tiltRaf = null;

      title.addEventListener('mousemove', (e) => {
        if (tiltRaf) return; // Throttle to 1 update per frame
        tiltRaf = requestAnimationFrame(() => {
          const rect = title.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / (rect.width / 2);
          const deltaY = (e.clientY - centerY) / (rect.height / 2);

          const rotateX = deltaY * -5;
          const rotateY = deltaX * 6;
          const translateX = deltaX * 3;
          const translateY = deltaY * 2;

          title.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px)`;
          tiltRaf = null;
        });
      }, { passive: true });

      title.addEventListener('mouseleave', () => {
        title.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translate(0, 0)';
      }, { passive: true });
    });
  };
  initMagneticTitles();

});

// ── LANGUAGE SWITCHER ──────────────────────────────
const langDictionary = {
  texts: [
    ['.nav-links a', 0, 'ABOUT', 'ABOUT'],
    ['.nav-links a', 1, 'SERVICES', 'SERVICES'],
    ['.nav-links a', 2, 'FACILITIES', 'FACILITIES'],
    ['.nav-links a', 3, 'PORTFOLIO', 'PORTFOLIO'],
    ['.nav-links a', 4, 'CONTACT US', 'CONTACT US'],
    ['.hero-motto', 0, 'PT Printwork Multigraph Indonesia — Perusahaan percetakan & desain premium selama lebih dari 10 tahun.', 'PT Printwork Multigraph Indonesia — Premium printing & design company for over 10 years.'],
    ['.hero-tagline', 0, 'Dimana ide menjadi nyata.', 'Where ideas come to life.'],
    ['.hero-cta .btn', 0, 'Hubungi Kami', 'Contact Us'],
    ['.hero-motto', 1, '"The art of giving the best, to create a strong belief" — Seni memberikan yang terbaik, untuk menciptakan kepercayaan yang kuat.', '"The art of giving the best, to create a strong belief" — The art of providing the best, to create a strong trust.'],
    ['.hero-tagline', 1, 'Kualitas Premium. Standar Internasional.', 'Premium Quality. International Standards.'],
    ['.hero-motto', 2, 'Solusi percetakan komersil lengkap — dari desain hingga distribusi ke seluruh dunia.', 'Complete commercial printing solutions — from design to worldwide distribution.'],
    ['.hero-tagline', 2, 'Kami Merancang Masa Depan.', 'We Design The Future.'],
    ['.hero-cta .btn', 1, 'Lihat Portfolio', 'View Portfolio'],
    ['.eco-card p', 0, '<strong>Ekosistem Terintegrasi</strong> yang menyatukan kreativitas dan manufaktur cetak.', '<strong>Integrated Ecosystem</strong> uniting creativity and print manufacturing.'],
    ['.eco-card p', 1, '<strong>Tim Berdedikasi</strong> yang mendorong kesuksesan dan kemitraan yang kuat.', '<strong>Dedicated Team</strong> driving success and strong partnerships.'],
    ['.eco-card p', 2, '<strong>Identitas Indonesia</strong> — memadukan keaslian dengan ekspresi modern.', '<strong>Indonesian Identity</strong> — blending authenticity with modern expression.'],
    ['.eco-card p', 3, 'Manufaktur canggih yang memungkinkan <strong>kustomisasi</strong> tanpa batas.', 'Advanced manufacturing enabling limitless <strong>customization</strong>.'],
    ['.approach-header .section-label', 0, 'PENDEKATAN KAMI', 'OUR APPROACH'],
    ['.approach-header h2', 0, 'Visi, Misi & Nilai Kami', 'Vision, Mission & Our Values'],
    ['.approach-content h4', 0, 'Visi', 'Vision'],
    ['.approach-content p', 0, 'Menjadi perusahaan percetakan yang memberi solusi dengan hasil cetak berkualitas sesuai standar internasional.', 'To be a printing company providing solutions with international standard quality.'],
    ['.approach-content h4', 1, 'Misi', 'Mission'],
    ['.approach-content p', 1, 'Improvisasi kualitas karyawan, divisi produksi, teknologi & manajemen yang berkesinambungan.', 'Continuous improvement of employee quality, production division, technology & management.'],
    ['.approach-content h4', 2, 'Integritas & Moral Kerja', 'Integrity & Work Ethics'],
    ['.approach-content p', 2, 'Berasaskan kebenaran, menghormati perbedaan untuk sinergi yang berkesinambungan dan kuat.', 'Based on truth, respecting differences for continuous and strong synergy.'],
    ['.approach-content h4', 3, 'Kepedulian Sosial', 'Social Responsibility'],
    ['.approach-content p', 3, 'Improvisasi berkesinambungan ke arah yang lebih baik di semua sektor, ramah lingkungan.', 'Continuous improvement towards better practices in all sectors, environmentally friendly.'],
    ['.brands-text-center h2', 0, 'Klien yang Telah Bekerja Sama', 'Clients We Have Worked With'],
    ['.brands-text-center p', 0, 'Klien-klien kami cukup beragam dari berbagai latar belakang industri — dari perusahaan korporat, start-up, hingga organisasi sosial.', 'Our clients range from various backgrounds — from corporate enterprises, start-ups, to social organizations.'],
    ['.section-testimonials .section-label', 0, 'INOVASI KAMI', 'OUR INNOVATION'],
    ['.section-testimonials h2', 0, 'Apa Kata Klien & Produk Unggulan', 'Client Feedback & Featured Products'],
    ['.test-quote', 0, '"Setiap detail cetakan katalog kami dikerjakan dengan presisi warna yang luar biasa, mencerminkan standar kualitas global kami."', '"Every detail of our catalog printing is crafted with extraordinary color precision, reflecting our global quality standards."'],
    ['.test-author', 0, 'Departemen Pemasaran', 'Marketing Department'],
    ['.test-role', 0, 'Jotun Indonesia', 'Jotun Indonesia'],
    ['.test-quote', 1, '"Solusi packaging yang ditawarkan PT Printwork tidak hanya melindungi produk, tetapi juga meningkatkan nilai jual brand kami di pasar."', '"The packaging solutions offered by PT Printwork not only protect the product but also increase our brand\'s market value."'],
    ['.test-author', 1, 'Manajer Produksi', 'Production Manager'],
    ['.test-role', 1, 'Client Korporat Premium', 'Premium Corporate Client'],
    ['.test-quote', 2, '"Ketepatan waktu dan kualitas hasil cetakan Annual Report kami selalu terjaga selama bertahun-tahun bekerja sama."', '"The timeliness and quality of our Annual Report printouts have always been maintained over years of collaboration."'],
    ['.test-author', 2, 'Divisi Komunikasi', 'Communications Division'],
    ['.test-role', 2, 'Sektor Perbankan & Asuransi', 'Banking & Insurance Sector']
  ]
};

function setLanguage(lang) {
  langDictionary.texts.forEach(([selector, index, id_text, en_text]) => {
    const elements = document.querySelectorAll(selector);
    if (elements[index]) {
      elements[index].innerHTML = lang === 'en' ? en_text : id_text;
    }
  });

  const btnId = document.getElementById('btn-lang-id');
  const btnEn = document.getElementById('btn-lang-en');
  if (btnId && btnEn) {
    if (lang === 'en') {
      btnEn.classList.add('active');
      btnEn.style.opacity = '1';
      btnEn.style.fontWeight = '700';
      btnId.classList.remove('active');
      btnId.style.opacity = '0.5';
      btnId.style.fontWeight = '500';
    } else {
      btnId.classList.add('active');
      btnId.style.opacity = '1';
      btnId.style.fontWeight = '700';
      btnEn.classList.remove('active');
      btnEn.style.opacity = '0.5';
      btnEn.style.fontWeight = '500';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnId = document.getElementById('btn-lang-id');
  const btnEn = document.getElementById('btn-lang-en');

  if (btnId) btnId.addEventListener('click', () => setLanguage('id'));
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
});
