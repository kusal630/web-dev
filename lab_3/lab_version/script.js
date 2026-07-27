// ---------- Theme toggle (light/dark) ----------
// Lab version: no classList.toggle() here. We keep track of the current
// theme with a plain boolean flag and switch things by writing directly
// to the root element's style property.
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// same numbers that used to sit in style.css under :root
const lightTheme = {
  '--bg': '#F7F9F8',
  '--surface': '#FFFFFF',
  '--ink': '#10241F',
  '--ink-muted': '#56635E',
  '--accent': '#146C5C',
  '--accent-light': '#E4F2EE',
  '--amber': '#D89A3B',
  '--line': '#E1E7E4'
};

// what those same variables become in dark mode
const darkTheme = {
  '--bg': '#0F1614',
  '--surface': '#16211D',
  '--ink': '#EAF2EF',
  '--ink-muted': '#9FB3AC',
  '--accent': '#4FD1B0',
  '--accent-light': 'rgba(79,209,176,0.12)',
  '--amber': '#E8B34A',
  '--line': '#263630'
};

// tracks which theme we're on right now, starts false since the
// page loads in light mode by default
let isDarkMode = false;

// if the user switched to dark on an earlier visit, put them back
// into dark mode on load instead of resetting to light every time
if (localStorage.getItem('theme') === 'dark') {
  applyDarkMode();
}

themeToggle.addEventListener('click', () => {
  // plain if/else check on the flag instead of toggle()
  if (isDarkMode === false) {
    applyDarkMode();
  } else {
    applyLightMode();
  }
});

function applyDarkMode(){
  // walk through each dark theme value and set it directly on
  // the root element's style property
  for (const property in darkTheme) {
    root.style.setProperty(property, darkTheme[property]);
  }
  themeToggle.textContent = '☀️';
  themeToggle.setAttribute('aria-label', 'Switch to light mode');
  isDarkMode = true;
  localStorage.setItem('theme', 'dark');
}

function applyLightMode(){
  for (const property in lightTheme) {
    root.style.setProperty(property, lightTheme[property]);
  }
  themeToggle.textContent = '🌙';
  themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  isDarkMode = false;
  localStorage.setItem('theme', 'light');
}

// Mobile nav toggle 
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

// Terminal typing effect 
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

// Scroll reveal 
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

//Footer year 
document.getElementById('year').textContent = new Date().getFullYear();
