const projectsContainer = document.querySelector("#projects-list");

function createProjectCard(project) {
  const article = document.createElement("article");
  const image = document.createElement("img");
  const content = document.createElement("div");
  const category = document.createElement("p");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const button = document.createElement("button");

  article.className = "project-card";
  article.dataset.projectId = project.id;
  content.className = "project-card__content";

  if (project.image) {
    article.classList.add("project-card--with-image");
    image.className = "project-card__image";
    image.src = project.image;
    image.alt = project.imageCaption || `Aperçu du projet ${project.title}`;
    image.loading = "lazy";
    image.decoding = "async";
  }

  category.className = "project-card__category";
  category.textContent = project.category;
  title.className = "project-card__title";
  title.textContent = project.title;
  description.className = "project-card__description";
  description.textContent = project.shortDescription;
  button.className = "project-card__button";
  button.type = "button";
  button.dataset.projectOpen = project.id;
  button.setAttribute("aria-label", `Découvrir le projet ${project.title}`);
  button.setAttribute("aria-haspopup", "dialog");
  button.textContent = "Découvrir le projet";

  content.append(category, title, description);
  if (project.status) {
    const status = document.createElement("p");
    status.className = "project-card__status";
    status.textContent = project.status;
    content.append(status);
  }
  content.append(button);
  article.append(...(project.image ? [image, content] : [content]));
  return article;
}

function revealProjectCards(cards) {
  // Le contenu reste visible si les animations ne sont pas disponibles.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || !("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

  const revealed = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.animate([
        { opacity: 0, transform: "translateY(1rem)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 450, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" });
      revealed.add(entry.target);
      observer.unobserve(entry.target);
    }
    if (cards.every((card) => revealed.has(card))) observer.disconnect();
  }, { threshold: 0.12 });
  cards.forEach((card) => observer.observe(card));
}

export function renderProjectCards(projects, onProjectOpen) {
  if (!projectsContainer) throw new Error("Le conteneur des projets est introuvable.");
  const cards = projects.map(createProjectCard);
  projectsContainer.replaceChildren(...cards);
  revealProjectCards(cards);

  projectsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-open]");
    if (!button) return;
    const project = projects.find((item) => item.id === button.dataset.projectOpen);
    if (project) onProjectOpen(project, button);
  });
}
