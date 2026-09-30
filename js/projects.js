const projectsContainer = document.querySelector("#projects-list");

function createProjectArticle(project) {
  const article = document.createElement("article");
  const category = document.createElement("p");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const button = document.createElement("button");

  article.classList.add("project-card");
  article.dataset.projectId = project.id;

  category.classList.add("project-card__category");
  category.textContent = project.category;

  title.classList.add("project-card__title");
  title.textContent = project.title;

  description.classList.add("project-card__description");
  description.textContent = project.description;

  button.classList.add("project-card__button");
  button.type = "button";
  button.dataset.projectOpen = project.id;
  button.textContent = "Découvrir le projet";

  article.append(category, title, description, button);

  return article;
}

export function renderProjects(projects) {
  if (!projectsContainer) {
    throw new Error("Le conteneur des projets est introuvable.");
  }

  const projectArticles = projects.map((project) => createProjectArticle(project));

  projectsContainer.replaceChildren(...projectArticles);

}
