/* ============================================================
   LANDING PAGE JS — Profio Next-Gen Cyber Group Portfolio
============================================================ */

/* ── Dark Mode Controller ── */
(function () {
  var KEY  = 'profio-theme';
  var html = document.documentElement;

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
  }

  // Khởi tạo theme (ưu tiên theme đã lưu hoặc dark mode cho vibe cyber)
  apply(localStorage.getItem(KEY) || 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('darkmode-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = html.getAttribute('data-theme');
        apply(current === 'dark' ? 'light' : 'dark');
      });
    }
  });
})();

/* ── Navbar Scroll HUD effect ── */
document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  function handler() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', handler, { passive: true });
  handler();
});

/* ── Scroll Progress Bar ── */
document.addEventListener('DOMContentLoaded', function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
  }, { passive: true });
});

/* ── AOS Scroll Reveal ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-cubic',
    offset: 60
  });
});

/* ── GSAP Hero Entrance & 3D Interactive Card Tilt ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof gsap !== 'undefined') {
    var delay = 0.1;
    function animIn(sel, d) {
      var el = document.querySelector(sel);
      if (!el) return;
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, delay: delay, ease: 'power3.out',
          onInterrupt: function () { el.style.opacity = '1'; el.style.transform = 'none'; }
        }
      );
      delay += d || 0.15;
    }

    animIn('.hero__badge-top', 0.12);
    animIn('.hero__title',     0.16);
    animIn('.hero__subtitle',  0.14);
    animIn('.hero__cta-group', 0.14);
    animIn('.hero__stats',     0.12);
  }

  // 3D Perspective Card Tilt on Member Cards
  var cards = document.querySelectorAll('.member-card');
  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -10;
      var rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'none';
    });
  });
});

/* ── System Completion Tracker Animation ── */
document.addEventListener('DOMContentLoaded', function () {
  var fill = document.querySelector('.completion-bar__fill');
  if (!fill) return;

  var total = document.querySelectorAll('.member-card').length;
  var completed = document.querySelectorAll('.member-card--active').length;
  var pct = total > 0 ? (completed / total * 100) : 20;

  var label = document.getElementById('completion-count');
  if (label) {
    label.textContent = completed + ' / ' + total + ' Nodes kết nối (' + Math.round(pct) + '%)';
  }

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        fill.style.width = pct + '%';
        obs.disconnect();
      }
    }, { threshold: 0.2 });

    var tracker = document.querySelector('.completion-tracker');
    if (tracker) obs.observe(tracker);
  } else {
    fill.style.width = pct + '%';
  }
});

/* ── High-Tech Cyber Cursor ── */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot   = document.querySelector('.cursor-dot');
  var ring  = document.querySelector('.cursor-ring');
  var label = document.querySelector('.cursor-label');
  var pulse = document.getElementById('cyber-pulse-container');
  if (!dot || !ring) return;

  var calls = ['[LOCK_ON]', 'NODE_OK', 'SYNC_200', 'QUANTUM', 'SYSTEM_ACK'];

  document.addEventListener('mousemove', function (e) {
    dot.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0) translate(-50%, -50%)';

    if (typeof gsap !== 'undefined') {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out', overwrite: 'auto' });
    } else {
      ring.style.transform = 'translate3d(' + e.clientX + 'px, ' + e.clientY + 'px, 0) translate(-50%, -50%)';
    }
  }, { passive: true });

  var interactives = document.querySelectorAll('a, button, .member-card, .btn');
  interactives.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      ring.classList.add('is-hovering');
      var txt = '[SELECT]';
      if (el.classList.contains('member-card')) txt = '[ACCESS NODE]';
      else if (el.classList.contains('btn--primary')) txt = '[ACTIVATE]';
      else if (el.classList.contains('navbar__brand')) txt = '[HOME]';
      if (label) label.textContent = txt;
    });
    el.addEventListener('mouseleave', function () {
      ring.classList.remove('is-hovering');
      if (label) label.textContent = '';
    });
  });

  document.addEventListener('click', function (e) {
    ring.classList.add('is-clicking');
    dot.classList.add('is-clicking');
    setTimeout(function () {
      ring.classList.remove('is-clicking');
      dot.classList.remove('is-clicking');
    }, 160);

    if (pulse) {
      var ripple = document.createElement('div');
      ripple.className = 'cyber-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top  = e.clientY + 'px';
      pulse.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 650);

      var tag = document.createElement('div');
      tag.className = 'cyber-click-tag';
      tag.textContent = calls[Math.floor(Math.random() * calls.length)];
      tag.style.left = e.clientX + 'px';
      tag.style.top  = (e.clientY - 12) + 'px';
      pulse.appendChild(tag);
      setTimeout(function () { tag.remove(); }, 700);
    }
  });
});
