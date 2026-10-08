import { loadProjects } from "./data.js?v=9";
import { renderProjectCards } from "./components/project-card.js?v=6";
import { initProjectDetails } from "./components/project-details.js?v=1";
import { createHeroButtons, initHeroParallax } from "./components/hero.js?v=3";
import { initAboutBook } from "./components/about-book.js?v=3";
import { initScarab } from "./components/scarab.js?v=1";

// Point d’entrée : charge les données et initialise les composants.
initAboutBook();
initScarab();

try {
  // 1. Charger et vérifier la source commune des projets.
  const projects = await loadProjects();
  // 2. Préparer la fiche réutilisable et son action d'ouverture.
  const { openProjectDialog } = initProjectDetails(projects);
  // 3. Afficher les mêmes projets dans les cartes et dans l'atelier.
  renderProjectCards(projects, openProjectDialog);
  createHeroButtons(projects, openProjectDialog);
  initHeroParallax();
} catch (error) {
  const container = document.querySelector("#projects-list");
  if (container) container.textContent = "Impossible de charger les projets pour le moment.";
  console.error(error);
}
