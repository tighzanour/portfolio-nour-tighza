import { loadProjects } from "./data.js?v=8";
import { renderProjectCards } from "./components/project-card.js?v=4";
import { initProjectDetails } from "./components/project-details.js?v=1";
import { createHeroButtons, initHeroParallax } from "./components/hero.js?v=3";
import { initAboutBook } from "./components/about-book.js?v=1";

// Point d’entrée : charge les données et initialise les composants.
initAboutBook();

try {
  const projects = await loadProjects();
  const { openProjectDialog } = initProjectDetails(projects);
  renderProjectCards(projects, openProjectDialog);
  createHeroButtons(projects, openProjectDialog);
  initHeroParallax();
} catch (error) {
  const container = document.querySelector("#projects-list");
  if (container) container.textContent = "Impossible de charger les projets pour le moment.";
  console.error(error);
}
