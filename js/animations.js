const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopQuery = window.matchMedia("(min-width: 48rem) and (pointer: fine)");

export function initHeroParallax() {
  const stage = document.querySelector(".hero-stage");
  const objects = [...document.querySelectorAll(".hero-stage__button")];
  const foregroundChair = document.querySelector(".hero-stage__foreground-chair");

  if (!stage || objects.length === 0 || motionQuery.matches || !desktopQuery.matches) {
    return;
  }

  const depths = [0.55, 0.35, 0.7, 0.25, 0.85, 0.65];
  let pointerX = 0;
  let pointerY = 0;
  let scrollY = 0;
  let animationFrame = null;
  let returnFrame = null;

  function renderParallax() {
    stage.style.setProperty("--scene-x", `${pointerX * -0.5}rem`);
    stage.style.setProperty("--scene-y", `${(pointerY * -0.35) + scrollY}rem`);

    objects.forEach((object, index) => {
      const depth = depths[index] ?? 0.5;
      object.style.setProperty("--parallax-x", `${pointerX * depth}rem`);
      object.style.setProperty("--parallax-y", `${(pointerY * depth) + (scrollY * depth)}rem`);
    });

    if (foregroundChair) {
      foregroundChair.style.setProperty("--chair-x", `${pointerX * 0.9}rem`);
      foregroundChair.style.setProperty("--chair-y", `${(pointerY * 0.45) + (scrollY * 0.35)}rem`);
    }

    animationFrame = null;
  }

  function requestRender() {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(renderParallax);
    }
  }

  stage.addEventListener("pointermove", (event) => {
    window.cancelAnimationFrame(returnFrame);
    const bounds = stage.getBoundingClientRect();
    const targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 1.5;
    const targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 1.1;
    const startX = pointerX;
    const startY = pointerY;
    const start = performance.now();
    // Repart de la position affichée, même si le retour est encore en cours.
    function followPointer(now) {
      const progress = motionQuery.matches ? 1 : Math.min(1, (now - start) / 250);
      const eased = 1 - (1 - progress) ** 3;
      pointerX = startX + (targetX - startX) * eased;
      pointerY = startY + (targetY - startY) * eased;
      requestRender();
      returnFrame = progress < 1 ? window.requestAnimationFrame(followPointer) : null;
    }
    returnFrame = window.requestAnimationFrame(followPointer);
  });

  stage.addEventListener("pointerleave", () => {
    window.cancelAnimationFrame(returnFrame);
    const startX = pointerX;
    const startY = pointerY;
    const start = performance.now();
    // Retour amorti et limité à 900 ms : aucune boucle au repos.
    function easeBack(now) {
      const progress = motionQuery.matches ? 1 : Math.min(1, (now - start) / 900);
      const remaining = (1 - progress) ** 3;
      pointerX = startX * remaining;
      pointerY = startY * remaining;
      requestRender();
      returnFrame = progress < 1 ? window.requestAnimationFrame(easeBack) : null;
    }
    returnFrame = window.requestAnimationFrame(easeBack);
  });

  window.addEventListener(
    "scroll",
    () => {
      const bounds = stage.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const stageCenter = bounds.top + bounds.height / 2;
      scrollY = Math.max(-0.7, Math.min(0.7, (viewportCenter - stageCenter) / window.innerHeight));
      requestRender();
    },
    { passive: true },
  );
}
