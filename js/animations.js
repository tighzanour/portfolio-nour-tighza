const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const desktopQuery = window.matchMedia("(min-width: 48rem) and (pointer: fine)");

export function initHeroParallax() {
  const stage = document.querySelector(".hero-stage");
  const objects = [...document.querySelectorAll(".hero-stage__button")];

  if (!stage || objects.length === 0 || motionQuery.matches || !desktopQuery.matches) {
    return;
  }

  const depths = [0.55, 0.35, 0.7, 0.25, 0.85, 0.65];
  let pointerX = 0;
  let pointerY = 0;
  let scrollY = 0;
  let animationFrame = null;

  function renderParallax() {
    stage.style.setProperty("--scene-x", `${pointerX * -0.5}rem`);
    stage.style.setProperty("--scene-y", `${(pointerY * -0.35) + scrollY}rem`);

    objects.forEach((object, index) => {
      const depth = depths[index] ?? 0.5;
      object.style.setProperty("--parallax-x", `${pointerX * depth}rem`);
      object.style.setProperty("--parallax-y", `${(pointerY * depth) + (scrollY * depth)}rem`);
    });

    animationFrame = null;
  }

  function requestRender() {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(renderParallax);
    }
  }

  stage.addEventListener("pointermove", (event) => {
    const bounds = stage.getBoundingClientRect();
    pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 1.5;
    pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 1.1;
    requestRender();
  });

  stage.addEventListener("pointerleave", () => {
    pointerX = 0;
    pointerY = 0;
    requestRender();
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
