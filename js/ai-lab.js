// Le laboratoire remplace temporairement la vue portfolio et garde sa position de lecture.
export function initAiLab() {
  const lab = document.querySelector('#ia');
  const openButton = document.querySelector('[data-open-ai]');
  const closeButton = document.querySelector('[data-close-ai]');
  const sections = [...document.querySelectorAll('#contenu > section:not(#ia)')];
  let portfolioScroll = 0;
  if (!lab || !openButton || !closeButton) return;

  function closeLab(restoreScroll = true) {
    if (lab.hidden) return;
    lab.hidden = true;
    sections.forEach(section => { section.hidden = false; });
    openButton.setAttribute('aria-expanded', 'false');
    if (restoreScroll) {
      window.scrollTo({ top: portfolioScroll, behavior: 'instant' });
      openButton.focus({ preventScroll: true });
    }
  }

  openButton.addEventListener('click', () => {
    if (!lab.hidden) return;
    portfolioScroll = window.scrollY;
    sections.forEach(section => { section.hidden = true; });
    lab.hidden = false;
    openButton.setAttribute('aria-expanded', 'true');
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.querySelector('#ai-title')?.focus({ preventScroll: true });
  });
  closeButton.addEventListener('click', () => closeLab());
  document.querySelectorAll('.site-header a, .skip-link').forEach(link => {
    link.addEventListener('click', () => closeLab(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !lab.hidden) closeLab();
  });
}
