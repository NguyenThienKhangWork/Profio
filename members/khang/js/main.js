

document.addEventListener('DOMContentLoaded', () => {

  CyberPreloader.init();

  Navbar.init();
  Tabs.init();

  ProjectSwiper.init();
  ProjectFilter.init();
  ProjectModal.init();

  ContactForm.init();

  initAOS();
  initGPABar();
  initTyped();

  CyberCursor.init();
  Tilt.init();

  initSkillHover();
  initSkillFilter();
  initSkillMeters();
  initCopyEmail();
});

function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    once:     true,
    duration: 650,
    easing:   'ease-out-back',
    offset:   50,
  });
}

function initTyped() {
  const el = Utils.getById('typed-role');
  if (!el || typeof Typed === 'undefined') return;

  new Typed(el, {
    strings:       window.TYPED_STRINGS || ['Developer'],
    typeSpeed:     60,
    backSpeed:     40,
    backDelay:     1800,
    loop:          true,
    smartBackspace: true,
  });
}

function initGPABar() {
  Utils.queryAll('.progress-bar__fill').forEach(bar => {
    Utils.onVisible(bar, () => {
      bar.style.width = `${parseFloat(bar.dataset.percent) || 0}%`;
    });
  });
}

function initSkillHover() {
  if (typeof gsap === 'undefined') return;

  Utils.queryAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, { y: -6, duration: 0.2, ease: 'back.out(2)', overwrite: 'auto' })
    );
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { y: 0,  duration: 0.2, overwrite: 'auto' })
    );
  });
}

function initSkillFilter() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.category;
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      cards.forEach(card => {
        const cardCat = card.dataset.category || '';
        const match = cat === 'all' || cardCat.split(' ').includes(cat);
        if (match) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, overwrite: 'auto' });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initSkillMeters() {
  const bars = document.querySelectorAll('.skill-card__meter-fill');
  if (!bars.length) return;

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = `${bar.dataset.progress || 80}%`;
          obs.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    bars.forEach(bar => obs.observe(bar));
  } else {
    bars.forEach(bar => { bar.style.width = `${bar.dataset.progress || 80}%`; });
  }
}

function initCopyEmail() {
  const btn = document.getElementById('btn-copy-email');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = 'khangnt2157@ut.edu.vn';
    navigator.clipboard.writeText(email).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'ĐÃ COPY! ✓';
      btn.style.color = '#10b981';
      btn.style.borderColor = '#10b981';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  });
}

const CyberPreloader = (() => {
  function init() {
    const preloader = document.getElementById('cyber-preloader');
    if (!preloader) return;

    const barFill   = document.getElementById('preloader-bar-fill');
    const percentEl = document.getElementById('preloader-percent');
    const statusEl  = document.getElementById('preloader-status');

    let currentProgress = 0;
    const startTime = performance.now();
    const minDisplayTime = 1100; // ms for immersive cyber experience

    const statusMessages = [
      { at: 0,  text: '[SYS_BOOT] KHỞI TẠO GIAO THỨC QUANTUM...' },
      { at: 25, text: '[NODE_01] KẾT NỐI MẠNG LƯỚI UTH TECH HUB...' },
      { at: 50, text: '[THREE_JS] KHỞI ĐỘNG 3D HOLOGRAPHIC REACTOR...' },
      { at: 75, text: '[SECURITY] CHUẨN BỊ RESTFUL APIS & DOCKER...' },
      { at: 92, text: '[ACCESS GRANTED] HỆ THỐNG SẴN SÀNG! ✓' },
    ];

    let isDocumentLoaded = false;
    if (document.readyState === 'complete') {
      isDocumentLoaded = true;
    } else {
      window.addEventListener('load', () => { isDocumentLoaded = true; });
    }

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      let targetProgress = Math.min((elapsed / minDisplayTime) * 100, 95);

      if (isDocumentLoaded && elapsed >= minDisplayTime) {
        targetProgress = 100;
      }

      if (currentProgress < targetProgress) {
        currentProgress += (targetProgress - currentProgress) * 0.2 + 0.8;
        if (currentProgress > targetProgress) currentProgress = targetProgress;
      }

      if (barFill) barFill.style.width = `${currentProgress}%`;
      if (percentEl) percentEl.textContent = `${Math.floor(currentProgress)}%`;

      if (statusEl) {
        for (let i = statusMessages.length - 1; i >= 0; i--) {
          if (currentProgress >= statusMessages[i].at) {
            statusEl.textContent = statusMessages[i].text;
            break;
          }
        }
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          preloader.classList.add('is-loaded');
          document.body.classList.add('page-loaded');
          setTimeout(() => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
          }, 700);
        }, 220);
      }
    }, 20);

    // Fallback safety timeout (ensure it always dismisses within 2.4s)
    setTimeout(() => {
      if (!preloader.classList.contains('is-loaded')) {
        clearInterval(timer);
        preloader.classList.add('is-loaded');
        document.body.classList.add('page-loaded');
        setTimeout(() => {
          if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 700);
      }
    }, 2400);
  }

  return { init };
})();
