export function initAboutBook() {
  const section = document.querySelector(".about-book-section");

  if (!section) {
    return;
  }

  const book = section.querySelector("[data-about-book]");
  const spreads = [...section.querySelectorAll("[data-book-spread]")];
  const previousButton = section.querySelector("[data-book-previous]");
  const nextButton = section.querySelector("[data-book-next]");
  const status = section.querySelector(".about-book__status");
  let currentSpread = 0;

  function showSpread(index) {
    if (!book || index < 0 || index >= spreads.length || index === currentSpread) {
      return;
    }

    book.dataset.direction = index > currentSpread ? "forward" : "backward";
    currentSpread = index;

    spreads.forEach((spread, spreadIndex) => {
      const isActive = spreadIndex === currentSpread;

      spread.classList.toggle("is-active", isActive);
      spread.setAttribute("aria-hidden", String(!isActive));
    });

    if (previousButton) {
      previousButton.disabled = currentSpread === 0;
    }

    if (nextButton) {
      nextButton.disabled = currentSpread === spreads.length - 1;
    }

    if (status) {
      status.textContent = `Double page ${currentSpread + 1} sur ${spreads.length}`;
    }
  }

  previousButton?.addEventListener("click", () => showSpread(currentSpread - 1));
  nextButton?.addEventListener("click", () => showSpread(currentSpread + 1));

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
