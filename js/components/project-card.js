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
  description.textContent = project.description;
  button.className = "project-card__button";
  button.type = "button";
  button.dataset.projectOpen = project.id;
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

export function renderProjectCards(projects, onProjectOpen) {
  if (!projectsContainer) throw new Error("Le conteneur des projets est introuvable.");
  projectsContainer.replaceChildren(...projects.map(createProjectCard));

  projectsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project-open]");
    if (!button) return;
    const project = projects.find((item) => item.id === button.dataset.projectOpen);
    if (project) onProjectOpen(project, button);
  });
}
