const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('#nav-links');
const navAnchors = document.querySelectorAll('.nav a[href^="#"]');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.timeline-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const content = trigger.nextElementSibling;
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

    trigger.setAttribute('aria-expanded', String(!isExpanded));
    content.hidden = isExpanded;
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skill-grid span');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    skillItems.forEach((item) => {
      const shouldShow = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: .18});

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const countTarget = document.querySelector('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const target = Number(countTarget.dataset.count);
    const duration = 900;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      countTarget.textContent = `${Math.floor(progress * target).toLocaleString()}+`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.disconnect();
  });
}, {threshold: .6});

if (countTarget) countObserver.observe(countTarget);

const sections = [...document.querySelectorAll('section[id]')];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, {rootMargin: '-35% 0px -55% 0px'});

sections.forEach((section) => navObserver.observe(section));
