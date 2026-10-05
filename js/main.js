import { loadProjects } from "./data.js?v=8";
import { renderProjectCards } from "./components/project-card.js?v=4";
import { initProjectDetails } from "./components/project-details.js?v=1";
import { createHeroButtons, initHeroParallax } from "./components/hero.js?v=2";
import { initAboutBook } from "./components/about-book.js?v=1";
import { initAiLab } from "./components/ai-lab.js?v=3";
import { initCoffeeCounter } from "./components/coffee-counter.js?v=8";
import { initCoffeeMarket, calculateCoffeePrice } from "./components/coffee-market.js?v=1";

// Point d’entrée : charge les données et initialise les composants.
initAboutBook();
initAiLab();
const coffeeCounter = initCoffeeCounter();
initCoffeeMarket({ onQuote: (quote) => coffeeCounter?.setPrice(calculateCoffeePrice(quote.value)) });

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
