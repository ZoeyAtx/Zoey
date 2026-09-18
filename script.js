const nav = document.getElementById('topNav');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');

function setMenu(open) {
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', String(open));
  mobileMenu.classList.toggle('open', open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
}

navToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) setMenu(false);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

function updateNavigation() {
  nav.classList.toggle('scrolled', window.scrollY > 24);

  const checkpoint = window.scrollY + window.innerHeight * 0.35;
  let activeId = '';
  sections.forEach(section => {
    if (checkpoint >= section.offsetTop) activeId = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

document.getElementById('year').textContent = new Date().getFullYear();
