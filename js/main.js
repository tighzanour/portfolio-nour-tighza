import { loadProjects } from "./data.js?v=4";
import { renderProjectCards } from "./components/project-card.js?v=3";
import { initModal } from "./components/modal.js?v=2";
import { createHeroButtons } from "./hero.js?v=5";
import { initHeroParallax } from "./animations.js";
import { initAboutBook } from "./about.js?v=4";
import { initAiLab } from "./ai-lab.js";

const projectsContainer = document.querySelector("#projects-list");
const projectDialog = document.querySelector("#project-dialog");
const dialogSpread = document.querySelector("#dialog-spread");

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
const dialogImageExpand = document.querySelector("#dialog-image-expand");
const dialogYear = document.querySelector("#dialog-year");
const dialogGallerySection = document.querySelector("#dialog-gallery-section");
const dialogGallery = document.querySelector("#dialog-gallery");
const dialogVideoSection = document.querySelector("#dialog-video-section");
const dialogVideo = document.querySelector("#dialog-video");
const dialogLink = document.querySelector("#dialog-link");
const dialogPrevious = document.querySelector("[data-project-previous]");
const dialogNext = document.querySelector("[data-project-next]");
const dialogProjectStatus = document.querySelector("#dialog-project-status");

let loadedProjects = [];
let currentProjectIndex = -1;

function setImageExpanded(isExpanded) {
  if (!dialogImageExpand) return;
  dialogImageExpand.classList.toggle("is-expanded", isExpanded);
  dialogImageExpand.setAttribute("aria-pressed", String(isExpanded));
  dialogImageExpand.setAttribute(
    "aria-label",
    isExpanded ? "Réduire l’image du projet" : "Agrandir l’image du projet"
  );

  const hint = dialogImageExpand.querySelector(".dialog-image-hint");
  if (hint) hint.textContent = isExpanded ? "Réduire ×" : "Agrandir ↗";
}

initAboutBook();
initAiLab();
const projectModal = initModal();

export function openProjectDialog(project, button) {
  if (!dialogTitle || !dialogCategory || !dialogDescription) {
    return;
  }

  dialogTitle.textContent = project.title;
  setImageExpanded(false);
  dialogCategory.textContent = project.category;
  dialogDescription.textContent = project.description;
  currentProjectIndex = loadedProjects.findIndex((item) => item.id === project.id);

  if (dialogProjectStatus) {
    const displayedIndex = currentProjectIndex >= 0 ? currentProjectIndex + 1 : 1;
    dialogProjectStatus.textContent = `Projet ${displayedIndex} sur ${loadedProjects.length}`;
  }

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

  const mediaSources = [project.image, ...project.gallery].filter(Boolean);
  const hasVisualMedia = mediaSources.length > 0 || Boolean(project.video);
  dialogSpread?.classList.toggle("dialog-spread--text-only", !hasVisualMedia);

  if (dialogImage) {
    const initialImage = mediaSources[0] || "";
    dialogImage.hidden = !initialImage;
    dialogImage.src = initialImage;
    dialogImage.alt = initialImage ? `Vue 1 du projet ${project.title}` : "";
    dialogImage.classList.remove("is-changing");
  }

  if (dialogYear) {
    dialogYear.hidden = !project.year;
    dialogYear.textContent = project.year ? `Année : ${project.year}` : "";
  }

  if (dialogGallery && dialogGallerySection) {
    const galleryButtons = mediaSources.map((source, index) => {
      const thumbnailButton = document.createElement("button");
      const image = document.createElement("img");

      thumbnailButton.className = "dialog-gallery__button";
      thumbnailButton.type = "button";
      thumbnailButton.setAttribute("aria-label", `Afficher la vue ${index + 1} du projet ${project.title}`);
      thumbnailButton.setAttribute("aria-current", index === 0 ? "true" : "false");

      image.src = source;
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      thumbnailButton.append(image);

      thumbnailButton.addEventListener("click", () => {
        if (!dialogImage || dialogImage.getAttribute("src") === source) return;

        dialogGallery.querySelectorAll("[aria-current]").forEach((item) => {
          item.setAttribute("aria-current", item === thumbnailButton ? "true" : "false");
        });

        dialogImage.classList.add("is-changing");
        const finishChange = () => dialogImage.classList.remove("is-changing");
        dialogImage.addEventListener("load", finishChange, { once: true });
        window.setTimeout(finishChange, 300);
        dialogImage.src = source;
        dialogImage.alt = `Vue ${index + 1} du projet ${project.title}`;
      });

      return thumbnailButton;
    });
    dialogGallery.replaceChildren(...galleryButtons);
    dialogGallerySection.hidden = galleryButtons.length < 2;
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

  if (!projectDialog?.open) projectModal.open(button);
}

function showAdjacentProject(direction) {
  if (loadedProjects.length < 2 || currentProjectIndex < 0) return;
  const nextIndex = (currentProjectIndex + direction + loadedProjects.length) % loadedProjects.length;
  openProjectDialog(loadedProjects[nextIndex], null);
}

dialogPrevious?.addEventListener("click", () => showAdjacentProject(-1));
dialogNext?.addEventListener("click", () => showAdjacentProject(1));
dialogImageExpand?.addEventListener("click", () => {
  if (!dialogImage || dialogImage.hidden) return;
  setImageExpanded(!dialogImageExpand.classList.contains("is-expanded"));
});

projectDialog?.addEventListener("cancel", (event) => {
  if (!dialogImageExpand?.classList.contains("is-expanded")) return;
  event.preventDefault();
  setImageExpanded(false);
});

try {
  const projects = await loadProjects();
  loadedProjects = projects;
  renderProjectCards(projects, openProjectDialog);
  createHeroButtons(projects, openProjectDialog);
  initHeroParallax();
} catch (error) {
  if (projectsContainer) {
    projectsContainer.textContent = "Impossible de charger les projets pour le moment.";
  }

  console.error(error);
}

projectDialog?.addEventListener("close", () => {
  setImageExpanded(false);
  if (dialogVideo) dialogVideo.src = "";
});
