// ---------- Theme toggle (light/dark) ----------
// Grabbing the button once so we don't have to query for it on every click.
const themeToggle = document.getElementById('themeToggle');

// If the user picked dark mode on an earlier visit, remember it and
// re-apply it now so the page doesn't flash back to light every reload.
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  // classList.toggle() adds the class if it isn't there and removes it
  // if it is, and it hands back true/false depending on the new state.
  const isDark = document.body.classList.toggle('dark-theme');

  // swap the icon so it always shows the theme you'd switch TO next
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

  // save the choice so it sticks around after a refresh
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Terminal typing effect ----------
const typedOutput = document.getElementById('typedOutput');
const roles = [
  'AI & Web Development Enthusiast',
  'B.Tech Student — AI & Data Science',
  'Building AI agents and web apps'
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLoop(){
  if (prefersReducedMotion) {
    typedOutput.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick(){
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typedOutput.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      typedOutput.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(tick, deleting ? 35 : 55);
  }

  tick();
}

typeLoop();

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll(
  '.timeline-item, .project-card, .edu-card, .stat-card, .skill-group, .contact-link'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
