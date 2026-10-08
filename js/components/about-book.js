export function initAboutBook() {
  const section = document.querySelector(".about-book-section");
  if (!section) return;
  const book = section.querySelector("[data-about-book]");
  const spreads = [...section.querySelectorAll("[data-book-spread]")];
  const previousButton = section.querySelector("[data-book-previous]");
  const nextButton = section.querySelector("[data-book-next]");
  const status = section.querySelector(".about-book__status");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileLayout = window.matchMedia("(max-width: 40rem)");
  let currentSpread = 0;
  let isTurning = false;

  function updateControls() {
    previousButton.disabled = isTurning || currentSpread === 0;
    nextButton.disabled = isTurning || currentSpread === spreads.length - 1;
  }

  function updateSpread(index) {
    currentSpread = index;
    spreads.forEach((spread, spreadIndex) => {
      const active = spreadIndex === index;
      spread.classList.toggle("is-active", active);
      spread.setAttribute("aria-hidden", String(!active));
      spread.inert = !active;
    });
    status.textContent = `Double page ${index + 1} sur ${spreads.length}`;
  }

  // Les copies servent au mouvement seulement, sans identifiants ni doublons accessibles.
  function copyPage(source) {
    const copy = source.cloneNode(true);
    copy.removeAttribute("id");
    copy.removeAttribute("data-book-spread");
    copy.removeAttribute("aria-hidden");
    copy.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
    copy.inert = true;
    return copy;
  }

  async function showSpread(index, trigger) {
    if (!book || isTurning || index < 0 || index >= spreads.length || index === currentSpread) return;
    const forward = index > currentSpread;
    const from = spreads[currentSpread];
    const to = spreads[index];
    const smallScreen = mobileLayout.matches;
    const restoreFocus = document.activeElement === trigger;

    // Sur téléphone, la navigation change les pages immédiatement, sans feuille animée.
    if (!smallScreen && !motionPreference.matches && typeof book.animate === "function") {
      isTurning = true;
      updateControls();
      book.setAttribute("aria-busy", "true");
      const stage = document.createElement("div");
      stage.className = `about-book__turn-stage${smallScreen ? " is-mobile" : ""}`;
      stage.setAttribute("aria-hidden", "true");
      stage.inert = true;
      const underneath = document.createElement("div");
      underneath.className = "about-book__turn-underneath";
      if (smallScreen) {
        underneath.append(copyPage(to));
      } else {
        // Suivant : ancienne page gauche + nouvelle page droite. Précédent : l'inverse.
        underneath.append(
          copyPage((forward ? from : to).querySelector(".about-book__page--left")),
          copyPage((forward ? to : from).querySelector(".about-book__page--right")),
        );
      }
      const leaf = document.createElement("div");
      leaf.className = `about-book__leaf${forward ? "" : " is-backward"}`;
      const front = document.createElement("div");
      const back = document.createElement("div");
      front.className = "about-book__leaf-face";
      back.className = "about-book__leaf-face about-book__leaf-face--back";
      front.append(copyPage(smallScreen ? from : from.querySelector(forward ? ".about-book__page--right" : ".about-book__page--left")));
      back.append(copyPage(smallScreen ? to : to.querySelector(forward ? ".about-book__page--left" : ".about-book__page--right")));

      const shadow = document.createElement("div");
      shadow.className = `about-book__turn-shadow${forward ? "" : " is-backward"}`;
      const frontShade = document.createElement("div");
      const backShade = document.createElement("div");
      frontShade.className = "about-book__leaf-shade";
      backShade.className = "about-book__leaf-shade";
      front.append(frontShade);
      back.append(backShade);
      leaf.append(front, back);
      stage.append(underneath, shadow, leaf);
      book.append(stage);

      // Le texte accompagne une seule feuille recto-verso, avec une légère flexion.
      const sign = forward ? -1 : 1;
      const timing = { duration: 1250, easing: "cubic-bezier(.42, 0, .18, 1)", fill: "both" };
      const turn = leaf.animate([
        { transform: "rotateY(0deg) skewY(0deg)", offset: 0 },
        { transform: `rotateY(${sign * 32}deg) skewY(${sign * 1.4}deg)`, offset: 0.25 },
        { transform: `rotateY(${sign * 92}deg) skewY(${sign * 2}deg)`, offset: 0.52 },
        { transform: `rotateY(${sign * 157}deg) skewY(${sign * 0.65}deg)`, offset: 0.8 },
        { transform: `rotateY(${sign * 180}deg) skewY(0deg)`, offset: 1 },
      ], timing);
      const effects = [
        shadow.animate([{ opacity: 0, transform: "scaleX(.15)" }, { opacity: 0.4, transform: "scaleX(1)", offset: 0.48 }, { opacity: 0, transform: "scaleX(.1)" }], timing),
        frontShade.animate([{ opacity: 0 }, { opacity: 0.25, offset: 0.5 }, { opacity: 0 }], timing),
        backShade.animate([{ opacity: 0.25 }, { opacity: 0.12, offset: 0.65 }, { opacity: 0 }], timing),
      ];
      const finish = () => turn.finish();
      window.addEventListener("resize", finish, { once: true });
      motionPreference.addEventListener("change", finish, { once: true });
      try {
        await turn.finished;
      } catch {
        // La navigation aboutit même si le navigateur annule le mouvement.
      } finally {
        updateSpread(index);
        stage.remove();
        [turn, ...effects].forEach((animation) => animation.cancel());
        window.removeEventListener("resize", finish);
        motionPreference.removeEventListener("change", finish);
        book.removeAttribute("aria-busy");
        isTurning = false;
      }
    } else {
      updateSpread(index);
    }
    updateControls();
    if (restoreFocus) {
      (trigger.disabled ? (forward ? previousButton : nextButton) : trigger).focus({ preventScroll: true });
    }
    // Les pages mobiles ont des hauteurs différentes : reprendre la lecture au début.
    if (smallScreen) book.scrollIntoView({ block: "start", behavior: "instant" });
  }

  previousButton?.addEventListener("click", () => showSpread(currentSpread - 1, previousButton));
  nextButton?.addEventListener("click", () => showSpread(currentSpread + 1, nextButton));
  updateSpread(0);
  updateControls();
  if (mobileLayout.matches || motionPreference.matches || !("IntersectionObserver" in window)) {
    section.classList.add("is-open");
    return;
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    section.classList.add("is-open");
    observer.disconnect();
  }, { threshold: 0.25 });
  observer.observe(section);
}
