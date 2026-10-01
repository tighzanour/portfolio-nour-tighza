import { loadProjects } from "./data.js?v=4";
import { renderProjectCards } from "./components/project-card.js?v=3";
import { initModal } from "./components/modal.js?v=2";
import { createHeroButtons } from "./hero.js?v=5";
import { initHeroParallax } from "./animations.js";
import { initAboutBook } from "./about.js?v=4";

const projectsContainer = document.querySelector("#projects-list");

const dialogTitle = document.querySelector("#dialog-title");

const dialogCategory = document.querySelector("#dialog-category");

const dialogDescription = document.querySelector("#dialog-description");
const dialogDetails = document.querySelector("#dialog-details");
const dialogRoleRow = document.querySelector("#dialog-role-row");
const dialogRole = document.querySelector("#dialog-role");
const dialogTasksRow = document.querySelector("#dialog-tasks-row");
const dialogTasks = document.querySelector("#dialog-tasks");
const dialogToolsRow = document.querySelector("#dialog-tools-row");
const dialogTools = document.querySelector("#dialog-tools");
const dialogImage = document.querySelector("#dialog-image");
const dialogYear = document.querySelector("#dialog-year");
const dialogGallerySection = document.querySelector("#dialog-gallery-section");
const dialogGallery = document.querySelector("#dialog-gallery");
const dialogVideoSection = document.querySelector("#dialog-video-section");
const dialogVideo = document.querySelector("#dialog-video");
const dialogLink = document.querySelector("#dialog-link");

initAboutBook();
const projectModal = initModal();

export function openProjectDialog(project, button) {
  if (!dialogTitle || !dialogCategory || !dialogDescription) {
    return;
  }

  dialogTitle.textContent = project.title;
  dialogCategory.textContent = project.category;
  dialogDescription.textContent = project.description;

  if (
    dialogDetails &&
    dialogRoleRow &&
    dialogRole &&
    dialogTasksRow &&
    dialogTasks &&
    dialogToolsRow &&
    dialogTools
  ) {
    const hasRole = Boolean(project.role.trim());
    const hasTasks = project.tasks.length > 0;
    const hasTools = project.tools.length > 0;

    dialogRoleRow.hidden = !hasRole;
    dialogRole.textContent = hasRole ? project.role : "";

    dialogTasksRow.hidden = !hasTasks;
    const taskItems = project.tasks.map((task) => {
      const item = document.createElement("li");
      item.textContent = task;
      return item;
    });
    dialogTasks.replaceChildren(...taskItems);

    dialogToolsRow.hidden = !hasTools;
    const toolItems = project.tools.map((tool) => {
      const item = document.createElement("span");
      item.textContent = tool;
      return item;
    });
    dialogTools.replaceChildren(...toolItems);

    dialogDetails.hidden = !hasRole && !hasTasks && !hasTools;
  }

  if (dialogImage) {
    dialogImage.hidden = !project.image;
    dialogImage.src = project.image || "";
    dialogImage.alt = project.image ? `Aperçu du projet ${project.title}` : "";
  }

  if (dialogYear) {
    dialogYear.hidden = !project.year;
    dialogYear.textContent = project.year ? `Année : ${project.year}` : "";
  }

  if (dialogGallery && dialogGallerySection) {
    const galleryImages = project.gallery.map((source, index) => {
      const image = document.createElement("img");
      image.src = source;
      image.alt = `Vue ${index + 1} du projet ${project.title}`;
      image.loading = "lazy";
      return image;
    });
    dialogGallery.replaceChildren(...galleryImages);
    dialogGallerySection.hidden = galleryImages.length === 0;
  }

  if (dialogVideo && dialogVideoSection) {
    dialogVideoSection.hidden = !project.video;
    dialogVideo.src = project.video || "";
    dialogVideo.title = project.video ? `Vidéo du projet ${project.title}` : "Vidéo du projet";
  }

  if (dialogLink) {
    dialogLink.hidden = !project.link;
    dialogLink.href = project.link || "";
  }

  projectModal.open(button);
}

try {
  const projects = await loadProjects();
  renderProjectCards(projects, openProjectDialog);
  createHeroButtons(projects, openProjectDialog);
  initHeroParallax();
} catch (error) {
  if (projectsContainer) {
    projectsContainer.textContent = "Impossible de charger les projets pour le moment.";
  }

  console.error(error);
}

document.querySelector("#project-dialog")?.addEventListener("close", () => {
  if (dialogVideo) dialogVideo.src = "";
});
