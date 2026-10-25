

document.addEventListener('DOMContentLoaded', () => {

  
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
