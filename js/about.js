export function initAboutBook() {
  const section = document.querySelector(".about-book-section");

  if (!section) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    section.classList.add("is-open");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      section.classList.add("is-open");
      observer.disconnect();
    },
    {
      threshold: 0.25,
    },
  );

  observer.observe(section);
}
