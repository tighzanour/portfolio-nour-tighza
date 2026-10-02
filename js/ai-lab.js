// Le laboratoire remplace temporairement la vue portfolio et garde sa position de lecture.
export function initAiLab() {
  const lab = document.querySelector('#ia');
  const openButton = document.querySelector('[data-open-ai]');
  const closeButton = document.querySelector('[data-close-ai]');
  const sections = [...document.querySelectorAll('#contenu > section:not(#ia)')];
  let portfolioScroll = 0;
  if (!lab || !openButton || !closeButton) return;
  const scene = lab.querySelector('[data-lab-scene]');
  const experiment = lab.querySelector('#lab-experiment');
  const screens = [...lab.querySelectorAll('[data-lab-slot]')];
  let activeScreen = null;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const parallaxAllowed = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 49rem)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rotatingWord = lab.querySelector('[data-ai-word]');
  const words = ['place', 'temps', 'chances'];
  let wordIndex = 0;
  let wordTimer = 0;
  let wordSwap = 0;

  // Une courte transition toutes les trois secondes, seulement dans la vue IA visible.
  function stopWords() {
    clearTimeout(wordTimer);
    clearTimeout(wordSwap);
    rotatingWord?.classList.remove('is-changing');
  }
  function startWords() {
    stopWords();
    if (!rotatingWord || lab.hidden || document.hidden || reducedMotion.matches) return;
    wordTimer = window.setTimeout(() => {
      rotatingWord.classList.add('is-changing');
      wordSwap = window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        rotatingWord.textContent = words[wordIndex];
      }, 210);
      wordTimer = window.setTimeout(startWords, 440);
    }, 3000);
  }
  document.addEventListener('visibilitychange', startWords);
  reducedMotion.addEventListener('change', startWords);

  function resetParallax() {
    scene?.classList.remove('is-returning');
    cancelAnimationFrame(frame);
    frame = 0;
    scene?.style.setProperty('--lab-x', '0px');
    scene?.style.setProperty('--lab-y', '0px');
  }

  // Un seul calcul par frame, aucun mouvement permanent au repos.
  scene?.addEventListener('pointermove', event => {
    if (!parallaxAllowed.matches || reducedMotion.matches) return;
    scene.classList.remove('is-returning');
    const bounds = scene.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      scene.style.setProperty('--lab-x', `${pointerX}px`);
      scene.style.setProperty('--lab-y', `${pointerY}px`);
      frame = 0;
    });
  });
  scene?.addEventListener('pointerleave', () => {
    resetParallax();
    if (!reducedMotion.matches) scene.classList.add('is-returning');
  });
  reducedMotion.addEventListener('change', resetParallax);
  parallaxAllowed.addEventListener('change', resetParallax);

  screens.forEach(screen => screen.addEventListener('click', () => {
    activeScreen = screen;
    screens.forEach(item => item.setAttribute('aria-expanded', String(item === screen)));
    experiment.hidden = false;
    lab.querySelector('[data-lab-number]').textContent = `Écran ${screen.dataset.labSlot} · En préparation`;
    lab.querySelector('#lab-experiment-title').textContent = `${screen.querySelector('small').textContent.replace(' · À venir', '')} à venir`;
    experiment.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    lab.querySelector('#lab-experiment-title').focus({ preventScroll: true });
  }));
  lab.querySelector('[data-close-experiment]')?.addEventListener('click', () => {
    experiment.hidden = true;
    screens.forEach(screen => screen.setAttribute('aria-expanded', 'false'));
    activeScreen?.focus();
  });

  function closeLab(restoreScroll = true) {
    if (lab.hidden) return;
    lab.hidden = true;
    stopWords();
    document.body.classList.remove('is-ai-lab');
    resetParallax();
    experiment.hidden = true;
    screens.forEach(screen => screen.setAttribute('aria-expanded', 'false'));
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
    startWords();
    document.body.classList.add('is-ai-lab');
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
