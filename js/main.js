import { loadProjects } from "./projects.js";
import { createHeroButtons } from "./hero.js";
import { initHeroParallax } from "./animations.js";

const projectsContainer = document.querySelector("#projects-list");

const projectDialog = document.querySelector("#project-dialog");

const dialogTitle = document.querySelector("#dialog-title");

const dialogCategory = document.querySelector("#dialog-category");

const dialogDescription = document.querySelector("#dialog-description");

const closeDialogButton = document.querySelector("[data-close-dialog]");

let projects = [];
let lastProjectButton = null;

export function openProjectDialog(project, button) {
  if (!projectDialog || !dialogTitle || !dialogCategory || !dialogDescription) {
    return;
  }

  dialogTitle.textContent = project.title;
  dialogCategory.textContent = project.category;
  dialogDescription.textContent = project.description;

  lastProjectButton = button;

  projectDialog.showModal();
}

function closeProjectDialog() {
  if (!projectDialog) {
    return;
  }

  projectDialog.close();
}

try {
  projects = await loadProjects();
  createHeroButtons(projects, openProjectDialog);
  initHeroParallax();
} catch (error) {
  if (projectsContainer) {
    projectsContainer.textContent = "Impossible de charger les projets pour le moment.";
  }

  console.error(error);
}

projectsContainer?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-open]");

  if (!button) {
    return;
  }

  const project = projects.find((item) => item.id === button.dataset.projectOpen);

  if (project) {
    openProjectDialog(project, button);
  }
});

closeDialogButton?.addEventListener("click", closeProjectDialog);

projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    closeProjectDialog();
  }
});

projectDialog?.addEventListener("close", () => {
  lastProjectButton?.focus();
});
