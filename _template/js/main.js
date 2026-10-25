/* ============================================================
   PROFIO PORTFOLIO — Template JS
   Đọc comment TODO để biết chỗ cần tuỳ chỉnh
============================================================ */

/* ============================================================
   1. DARK MODE (Tiêu chí #14)
   Lưu preference vào localStorage
============================================================ */
const DarkMode = (() => {
  const STORAGE_KEY = 'profio-theme';
  const btn = document.getElementById('darkmode-toggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function init() {
    // Đọc theme đã lưu, fallback về light
    const saved = localStorage.getItem(STORAGE_KEY) || 'light';
    setTheme(saved);

    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  return { init };
})();

/* ============================================================
   2. LOADING SCREEN
============================================================ */
const LoadingScreen = (() => {
  function init() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        screen.classList.add('hidden');
        // Sau khi loading ẩn, khởi động GSAP intro
        if (typeof HeroAnimation !== 'undefined') HeroAnimation.play();
      }, 800);
    });
  }

  return { init };
})();

/* ============================================================
   3. NAVBAR — sticky + active link + hamburger
============================================================ */
const Navbar = (() => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.navbar__link');

  function initScrolled() {
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  function initHamburger() {
    if (!hamburger || !mobileMenu) return;
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Đóng menu khi click link trong mobile menu
    mobileMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Đóng menu khi click ngoài
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }

  function initActiveLink() {
    // Dùng IntersectionObserver để highlight link theo section đang nhìn thấy
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
  }

  function init() {
    initScrolled();
    initHamburger();
    initActiveLink();
  }

  return { init };
})();

/* ============================================================
   4. SCROLL PROGRESS BAR (Tiêu chí #19)
============================================================ */
const ScrollProgress = (() => {
  function init() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    }, { passive: true });
  }

  return { init };
})();

/* ============================================================
   5. CUSTOM CURSOR (Tiêu chí #19)
============================================================ */
const CustomCursor = (() => {
  function init() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor || !window.gsap) return;

    // TODO: Thay emoji/ký tự theo phong cách của bạn
    cursor.textContent = '⚙️';

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    // Scale khi hover interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-card, .project-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.6, duration: 0.2 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      });
    });
  }

  return { init };
})();

/* ============================================================
   6. AOS INIT
============================================================ */
const AOSInit = (() => {
  function init() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      once: true,
      duration: 700,
      easing: 'ease-out-back',
      offset: 60
    });
  }

  return { init };
})();

/* ============================================================
   7. TYPED.JS — Hero typewriter (Tiêu chí #12)
============================================================ */
const TypedInit = (() => {
  function init() {
    const el = document.getElementById('typed-role');
    if (!el || typeof Typed === 'undefined') return;

    // Lấy strings từ window.TYPED_STRINGS (định nghĩa trong index.html)
    const strings = window.TYPED_STRINGS || ['Developer', 'Designer'];

    new Typed(el, {
      strings,
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
      smartBackspace: true
    });
  }

  return { init };
})();

/* ============================================================
   8. GSAP HERO ANIMATION (Tiêu chí #12, #19)
============================================================ */
const HeroAnimation = (() => {
  let played = false;

  function play() {
    if (played || typeof gsap === 'undefined') return;
    played = true;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero__greeting', { y: 30, opacity: 0, duration: 0.5 })
      .from('.hero__name', { y: 40, opacity: 0, duration: 0.6 }, '-=0.2')
      .from('.hero__role', { y: 30, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero__bio', { y: 30, opacity: 0, duration: 0.5 }, '-=0.3')
      .from('.hero__cta .btn', { y: 20, opacity: 0, duration: 0.4, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.2')
      .from('.hero__visual', { x: 60, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, 0.2);
  }

  return { play };
})();

/* ============================================================
   9. GSAP SCROLL ANIMATIONS
============================================================ */
const ScrollAnimations = (() => {
  function initProgressBars() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.progress-bar__fill').forEach(bar => {
      const percent = bar.dataset.percent || '0';
      gsap.to(bar, {
        width: `${percent}%`,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          once: true
        }
      });
    });
  }

  function initSkillCards() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -6, scale: 1.04, duration: 0.25, ease: 'back.out(1.7)' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.25 });
      });
    });
  }

  function init() {
    initProgressBars();
    initSkillCards();
  }

  return { init };
})();

/* ============================================================
   10. LOTTIE ANIMATIONS (Tiêu chí #12, #19)
   TODO: Download Lottie JSON về ./assets/animations/ và cập nhật path
============================================================ */
const LottieInit = (() => {
  function loadAnimation(containerId, path, loop = true, autoplay = true) {
    const container = document.getElementById(containerId);
    if (!container || typeof lottie === 'undefined') return null;

    return lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop,
      autoplay,
      path
    });
  }

  function init() {
    // TODO: Thay path bằng file JSON thật của bạn
    // Hero animation
    loadAnimation('hero-lottie', './assets/animations/hero.json');

    // Loading screen animation (nếu muốn dùng Lottie thay spinner CSS)
    // loadAnimation('loading-lottie', './assets/animations/loading.json');
  }

  return { init, loadAnimation };
})();

/* ============================================================
   11. TABS — Education / Experience / Activities (Tiêu chí #14)
============================================================ */
const Tabs = (() => {
  function init() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('aria-controls');

        // Cập nhật buttons
        tabBtns.forEach(b => {
          b.classList.remove('tab-btn--active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('tab-btn--active');
        btn.setAttribute('aria-selected', 'true');

        // Cập nhật panels
        tabPanels.forEach(panel => {
          if (panel.id === target) {
            panel.removeAttribute('hidden');
            panel.classList.add('tab-panel--active');
            // Refresh AOS trong panel vừa hiện
            if (typeof AOS !== 'undefined') AOS.refreshHard();
          } else {
            panel.setAttribute('hidden', '');
            panel.classList.remove('tab-panel--active');
          }
        });
      });
    });
  }

  return { init };
})();

/* ============================================================
   12. SWIPER — Projects Carousel (Tiêu chí #14)
============================================================ */
const SwiperInit = (() => {
  function init() {
    if (typeof Swiper === 'undefined') return;

    new Swiper('.projects-swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      keyboard: { enabled: true },
      a11y: {
        prevSlideMessage: 'Dự án trước',
        nextSlideMessage: 'Dự án tiếp theo'
      }
    });
  }

  return { init };
})();

/* ============================================================
   13. PROJECT FILTER (Tiêu chí #14)
============================================================ */
const ProjectFilter = (() => {
  function init() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const slides = document.querySelectorAll('.projects-swiper .swiper-slide');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update buttons
        filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
        btn.classList.add('filter-btn--active');

        // Filter slides
        slides.forEach(slide => {
          const techs = slide.dataset.tech || '';
          const match = filter === 'all' || techs.includes(filter);

          if (match) {
            slide.style.display = '';
            gsap && gsap.fromTo(slide, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
          } else {
            slide.style.display = 'none';
          }
        });
      });
    });
  }

  return { init };
})();

/* ============================================================
   14. MODAL — Project Detail (Tiêu chí #14)
============================================================ */
const Modal = (() => {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  function open(projectId) {
    if (!overlay) return;

    // Lấy data từ window.PROJECTS_DATA
    const data = (window.PROJECTS_DATA || {})[projectId];
    if (!data) return;

    // Populate modal
    const setEl = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setEl('modal-title', data.title || '');
    setEl('modal-desc', data.desc || '');

    // Tags
    const tagsEl = document.getElementById('modal-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (data.tags || [])
        .map(t => `<span class="tag">${t}</span>`)
        .join('');
    }

    // Links
    const githubEl = document.getElementById('modal-github');
    const demoEl = document.getElementById('modal-demo');
    if (githubEl) {
      githubEl.href = data.github || '#';
      githubEl.hidden = !data.github;
    }
    if (demoEl) {
      demoEl.href = data.demo || '#';
      demoEl.hidden = !data.demo || data.demo === '#';
    }

    // Placeholder emoji
    const ph = document.getElementById('modal-img-placeholder');
    if (ph) ph.textContent = data.emoji || '🖥️';

    // Show overlay
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Play confetti Lottie (tuỳ chọn)
    // LottieInit.loadAnimation('modal-confetti', './assets/animations/confetti.json', false);

    // Focus management
    closeBtn && closeBtn.focus();
  }

  function close() {
    if (!overlay) return;
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function init() {
    if (!overlay) return;

    // Open modal buttons
    document.querySelectorAll('.project-card__detail-btn').forEach(btn => {
      btn.addEventListener('click', () => open(btn.dataset.project));
    });

    // Close button
    closeBtn && closeBtn.addEventListener('click', close);

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) close();
    });
  }

  return { init, open, close };
})();

/* ============================================================
   15. CONTACT FORM VALIDATION (Tiêu chí #15)
============================================================ */
const ContactForm = (() => {
  function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.add('is-error');
    if (field) field.classList.remove('is-valid');
    if (error) error.textContent = message;
  }

  function showValid(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (field) field.classList.remove('is-error');
    if (field) field.classList.add('is-valid');
    if (error) error.textContent = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate() {
    let valid = true;

    // Họ tên
    const name = document.getElementById('form-name');
    if (!name || name.value.trim().length < 2) {
      showError('form-name', 'error-name', 'Vui lòng nhập họ và tên (ít nhất 2 ký tự)');
      valid = false;
    } else {
      showValid('form-name', 'error-name');
    }

    // Email
    const email = document.getElementById('form-email');
    if (!email || !validateEmail(email.value.trim())) {
      showError('form-email', 'error-email', 'Vui lòng nhập địa chỉ email hợp lệ');
      valid = false;
    } else {
      showValid('form-email', 'error-email');
    }

    // Nội dung
    const message = document.getElementById('form-message');
    if (!message || message.value.trim().length < 10) {
      showError('form-message', 'error-message', 'Nội dung phải có ít nhất 10 ký tự');
      valid = false;
    } else {
      showValid('form-message', 'error-message');
    }

    return valid;
  }

  function init() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const successDiv = document.getElementById('contact-success');
    if (!form) return;

    // Real-time validation khi blur
    ['form-name', 'form-email', 'form-message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('blur', () => validate());
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text') &&
          (submitBtn.querySelector('.btn-text').hidden = true);
        submitBtn.querySelector('.btn-loading') &&
          (submitBtn.querySelector('.btn-loading').hidden = false);
      }

      // Giả lập gửi sau 1.5s
      setTimeout(() => {
        form.hidden = true;
        if (successDiv) {
          successDiv.removeAttribute('hidden');
          // Play Lottie success (nếu có)
          // LottieInit.loadAnimation('success-lottie', './assets/animations/success.json', false);
        }
      }, 1500);
    });
  }

  return { init };
})();

/* ============================================================
   16. KHỞI ĐỘNG TẤT CẢ
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  DarkMode.init();
  LoadingScreen.init();
  Navbar.init();
  ScrollProgress.init();
  AOSInit.init();
  TypedInit.init();
  LottieInit.init();
  ScrollAnimations.init();
  Tabs.init();
  SwiperInit.init();
  ProjectFilter.init();
  Modal.init();
  ContactForm.init();

  // CustomCursor chạy sau cùng để đảm bảo GSAP đã load
  window.addEventListener('load', () => {
    CustomCursor.init();
  });

  // Nếu không có loading screen (window.load không fire đúng lúc)
  setTimeout(() => {
    HeroAnimation.play();
  }, 1200);
});
