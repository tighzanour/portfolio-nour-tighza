import { loadProjects } from "./projects.js";

const projectsContainer = document.querySelector("#projects-list");

try {
  await loadProjects();
} catch (error) {
  if (projectsContainer) {
    projectsContainer.textContent = "Impossible de charger les projets pour le moment.";
  }

  console.error(error);
}
