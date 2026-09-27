const root = document.documentElement;
const languageButton = document.querySelector('.language-switch');
const languageLabel = document.querySelector('[data-lang-label]');

function setLanguage(language) {
  const isPersian = language === 'fa';
  root.dataset.lang = language;
  root.lang = language;
  root.dir = isPersian ? 'rtl' : 'ltr';
  languageLabel.textContent = isPersian ? 'EN' : 'FA';
  localStorage.setItem('piraye-language', language);
}

const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
setLanguage(['en', 'fa'].includes(requestedLanguage) ? requestedLanguage : (localStorage.getItem('piraye-language') || 'en'));
languageButton?.addEventListener('click', () => setLanguage(root.dataset.lang === 'en' ? 'fa' : 'en'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const map = document.querySelector('.system-map');
const clarify = document.querySelector('.clarify-button');
const problemButtons = document.querySelectorAll('.problem-options button');

problemButtons.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('active')));
  button.addEventListener('click', () => {
    problemButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    map?.classList.remove('is-clear');
  });
});

clarify?.addEventListener('click', () => {
  map?.classList.remove('is-clear');
  clarify.setAttribute('aria-pressed', 'false');
  requestAnimationFrame(() => {
    map?.classList.add('is-clear');
    clarify.setAttribute('aria-pressed', 'true');
  });
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
}
