// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  const isOpen = mobileNav.classList.contains('open');
  hamburger.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  hamburger.querySelectorAll('span')[1].style.opacity  = isOpen ? '0' : '1';
  hamburger.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===========================
// DARK MODE TOGGLE
// ===========================
const darkModeBtn = document.getElementById('darkModeToggle');
let isLight = false;

darkModeBtn.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light-mode', isLight);
  darkModeBtn.textContent = isLight ? '🌙' : '☀️';
  darkModeBtn.title = isLight ? 'Chuyển dark mode' : 'Chuyển light mode';
  localStorage.setItem('lightMode', isLight);
});

// Load saved preference
if (localStorage.getItem('lightMode') === 'true') {
  isLight = true;
  document.body.classList.add('light-mode');
  darkModeBtn.textContent = '🌙';
}

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Staggered delay for siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 100;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

// ===========================
// SKILL BAR ANIMATION
// ===========================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width;
        }, i * 150);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBarsSection = document.querySelector('.skill-bars-section');
if (skillBarsSection) barObserver.observe(skillBarsSection);

// Also trigger on the skills grid
document.querySelectorAll('.skill-category').forEach(cat => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
          setTimeout(() => { bar.style.width = bar.dataset.width; }, i * 150 + 300);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(cat);
});

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category.includes(filter);
      card.style.transition = 'all 0.4s ease';
      if (match) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  });
});

// ===========================
// CONTACT FORM VALIDATION
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'formName',    errorId: 'errName',    msg: 'Vui lòng nhập họ tên.',    minLen: 2 },
      { id: 'formEmail',   errorId: 'errEmail',   msg: 'Vui lòng nhập email hợp lệ.', isEmail: true },
      { id: 'formMessage', errorId: 'errMessage', msg: 'Vui lòng nhập nội dung.', minLen: 10 },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errEl = document.getElementById(f.errorId);
      input.classList.remove('error');
      errEl.textContent = '';

      const val = input.value.trim();

      if (!val) {
        input.classList.add('error');
        errEl.textContent = f.msg;
        valid = false;
      } else if (f.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.classList.add('error');
        errEl.textContent = f.msg;
        valid = false;
      } else if (f.minLen && val.length < f.minLen) {
        input.classList.add('error');
        errEl.textContent = f.msg;
        valid = false;
      }
    });

    if (valid) {
      const btn = contactForm.querySelector('.btn-primary');
      btn.textContent = 'Đang gửi...';
      btn.disabled = true;

      setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'block';
        contactForm.reset();
        btn.textContent = '📤 Gửi tin nhắn';
        btn.disabled = false;
        setTimeout(() => {
          document.getElementById('formSuccess').style.display = 'none';
        }, 4000);
      }, 1500);
    }
  });

  // Real-time validation
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim()) {
        input.classList.remove('error');
        const errEl = document.getElementById('err' + input.id.replace('form', ''));
        if (errEl) errEl.textContent = '';
      }
    });
  });
}

// ===========================
// BACK TO TOP
// ===========================
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// ACTIVE NAV LINK (SCROLL SPY)
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active-link');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => spyObserver.observe(s));

// ===========================
// TYPING EFFECT (HERO)
// ===========================
const typingEl = document.getElementById('typingText');
if (typingEl) {
  const texts = ['Backend Developer', 'Software Engineer', 'Problem Solver', 'Tech Enthusiast'];
  let tIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = texts[tIdx];
    typingEl.textContent = deleting
      ? current.substring(0, cIdx--)
      : current.substring(0, cIdx++);

    let speed = deleting ? 60 : 100;

    if (!deleting && cIdx > current.length) {
      speed = 2000;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % texts.length;
      speed = 300;
    }

    setTimeout(type, speed);
  }
  type();
}

// ===========================
// MODAL
// ===========================
document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.modal);
    if (modal) modal.classList.add('open');
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal-overlay').classList.remove('open');
  });
});

// Keyboard: Escape closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ===========================
// ACTIVE LINK STYLE
// ===========================
const style = document.createElement('style');
style.textContent = '.nav-links a.active-link { color: var(--text-primary); }';
document.head.appendChild(style);

// ===========================
// ROCKET ORB PRELOADER
// ===========================
(() => {
  const p = document.getElementById('rocket-preloader');
  if (!p) return;
  const fill = document.getElementById('rocket-fill');
  const pct = document.getElementById('rocket-percent');
  const st = document.getElementById('rocket-status');
  let cur = 0;
  const start = performance.now(), minTime = 1000;
  const msgs = [
    { at: 0,  t: 'KHỞI ĐỘNG HỆ THỐNG BACKEND...' },
    { at: 30, t: 'NẠP DỊCH VỤ MICROSERVICES...' },
    { at: 65, t: 'KẾT NỐI HỒ SƠ HÀ MINH HIẾU...' },
    { at: 90, t: 'SẴN SÀNG CẤT CÁNH! 🚀' }
  ];
  let docLoaded = document.readyState === 'complete';
  if (!docLoaded) window.addEventListener('load', () => docLoaded = true);

  const t = setInterval(() => {
    const el = performance.now() - start;
    let tgt = Math.min((el / minTime) * 100, 95);
    if (docLoaded && el >= minTime) tgt = 100;
    if (cur < tgt) {
      cur += (tgt - cur) * 0.2 + 0.8;
      if (cur > tgt) cur = tgt;
    }
    if (fill) fill.style.width = cur + '%';
    if (pct) pct.textContent = Math.floor(cur) + '%';
    if (st) {
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (cur >= msgs[i].at) { st.textContent = msgs[i].t; break; }
      }
    }
    if (cur >= 100) {
      clearInterval(t);
      setTimeout(() => {
        p.classList.add('is-loaded');
        setTimeout(() => p.remove(), 600);
      }, 200);
    }
  }, 20);
  setTimeout(() => {
    if (!p.classList.contains('is-loaded')) {
      clearInterval(t);
      p.classList.add('is-loaded');
      setTimeout(() => p.remove(), 600);
    }
  }, 2400);
})();
