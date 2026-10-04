import { initModal } from "./modal.js?v=2";

// Remplit la fiche, ses médias et sa navigation ; modal.js gère son ouverture et sa fermeture.
export function initProjectDetails(projects) {
  const projectDialog = document.querySelector("#project-dialog");
  const dialogSpread = document.querySelector("#dialog-spread");

  const dialogTitle = document.querySelector("#dialog-title");

  const dialogCategory = document.querySelector("#dialog-category");

  const dialogDescription = document.querySelector("#dialog-description");
  const dialogStatus = document.querySelector("#dialog-status");
  const dialogCaseStudy = document.querySelector("#dialog-case-study");
  const dialogImageCaption = document.querySelector("#dialog-image-caption");
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
  const dialogFilmSection = document.querySelector("#dialog-film-section");
  const dialogFilm = document.querySelector("#dialog-film");
  const dialogFilmTitle = document.querySelector("#dialog-film-title");
  const dialogClipsSection = document.querySelector("#dialog-clips-section");
  const dialogClips = document.querySelector("#dialog-clips");
  const dialogClipsTitle = document.querySelector("#dialog-clips-title");
  const dialogLink = document.querySelector("#dialog-link");
  const dialogPrevious = document.querySelector("[data-project-previous]");
  const dialogNext = document.querySelector("[data-project-next]");
  const dialogProjectStatus = document.querySelector("#dialog-project-status");

  const loadedProjects = projects;
  let currentProjectIndex = -1;
  let imageTrigger = null;

  function setImageExpanded(isExpanded) {
    if (!dialogImageExpand) return;
    dialogImageExpand.classList.toggle("is-expanded", isExpanded);
    dialogImageExpand.hidden = !isExpanded;
    // Pendant le zoom, seul son bouton de fermeture reste accessible au clavier.
    if (dialogSpread) dialogSpread.inert = isExpanded;
    projectDialog?.querySelectorAll(".dialog-header, .dialog-project-navigation").forEach((element) => {
      element.inert = isExpanded;
    });
    dialogImageExpand.setAttribute("aria-pressed", String(isExpanded));
    dialogImageExpand.setAttribute(
      "aria-label",
      "Fermer l’image agrandie"
    );

    const hint = dialogImageExpand.querySelector(".dialog-image-hint");
    if (hint) hint.textContent = "Fermer le zoom ×";
  }

  const projectModal = initModal();

  function stopProjectVideos() {
    projectDialog?.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    });
  }

  function createVideoFigure(clip, isMain = false) {
    const figure = document.createElement("figure");
    figure.className = "dialog-video-item";
    const video = document.createElement("video");
    video.className = "dialog-video";
    video.style.aspectRatio = clip.aspectRatio || "16 / 9";
    video.controls = true;
    video.playsInline = true;
    video.preload = isMain ? "metadata" : "none";
    video.src = clip.src;
    if (clip.poster) video.poster = clip.poster;
    video.setAttribute("aria-label", clip.title);
    // Pas d'autoplay : la lecture et le son restent sous le contrôle du visiteur.
    video.addEventListener("play", () => {
      projectDialog?.querySelectorAll("video").forEach((other) => {
        if (other !== video) other.pause();
      });
    });
    const caption = document.createElement("figcaption");
    caption.textContent = clip.caption ? `${clip.title} — ${clip.caption}` : clip.title;
    figure.append(video, caption);
    return figure;
  }

  function openProjectDialog(project, button) {
    if (!dialogTitle || !dialogCategory || !dialogDescription) {
      return;
    }

    stopProjectVideos();
    dialogTitle.textContent = project.title;
    setImageExpanded(false);
    imageTrigger = null;
    dialogCategory.textContent = project.category;
    dialogDescription.textContent = project.description;
    dialogSpread?.classList.toggle("dialog-spread--case-study", project.caseStudy.length > 0);
    if (dialogStatus) {
      dialogStatus.textContent = project.status;
      dialogStatus.hidden = !project.status;
    }
    if (dialogCaseStudy) {
      // Contenu éditorial issu du JSON, sans injecter de HTML dans la fiche.
      const sections = project.caseStudy.map((entry) => {
        const section = document.createElement("section");
        const heading = document.createElement("h3");
        const text = document.createElement("p");
        heading.textContent = entry.title;
        text.textContent = entry.text;
        section.append(heading, text);
        return section;
      });
      dialogCaseStudy.replaceChildren(...sections);
      dialogCaseStudy.hidden = sections.length === 0;
    }
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
    const mediaCaptions = [...(project.image ? [project.imageCaption] : []), ...project.gallery.map((_, index) => project.galleryCaptions[index] || "")];
    function setMediaCaption(index) {
      const caption = mediaCaptions[index] || "";
      if (dialogImageCaption) {
        dialogImageCaption.textContent = caption;
        dialogImageCaption.hidden = !caption;
      }
      if (dialogImage) dialogImage.alt = caption || `Vue ${index + 1} du projet ${project.title}`;
    }
    const hasVisualMedia = mediaSources.length > 0 || Boolean(project.video) || project.videos.length > 0;
    dialogSpread?.classList.toggle("dialog-spread--text-only", !hasVisualMedia);

    if (dialogImage) {
      const initialImage = mediaSources[0] || "";
      dialogImage.hidden = !initialImage;
      if (initialImage) dialogImage.src = initialImage;
      else dialogImage.removeAttribute("src");
      if (initialImage) setMediaCaption(0);
      else {
        dialogImage.alt = "";
        if (dialogImageCaption) dialogImageCaption.hidden = true;
      }
    }

    if (dialogYear) {
      dialogYear.hidden = !project.year;
      dialogYear.textContent = project.year ? `Année : ${project.year}` : "";
    }

    if (dialogGallery && dialogGallerySection) {
      const galleryButtons = mediaSources.map((source, index) => {
        const figure = document.createElement("figure");
        const thumbnailButton = document.createElement("button");
        const image = document.createElement("img");

        thumbnailButton.className = "dialog-gallery__button";
        thumbnailButton.type = "button";
        const thumbnailLabel = mediaCaptions[index] || `Vue ${index + 1} du projet ${project.title}`;
        thumbnailButton.setAttribute("aria-label", `Agrandir : ${thumbnailLabel}`);
        thumbnailButton.title = thumbnailLabel;
        thumbnailButton.setAttribute("aria-haspopup", "true");

        image.src = source;
        image.alt = "";
        image.loading = index < 2 ? "eager" : "lazy";
        image.decoding = "async";
        thumbnailButton.append(image);
        const hint = document.createElement("span");
        hint.className = "dialog-gallery__hint";
        hint.textContent = "Agrandir ↗";
        hint.setAttribute("aria-hidden", "true");
        thumbnailButton.append(hint);
        figure.className = "dialog-gallery__item";
        figure.append(thumbnailButton);
        if (mediaCaptions[index]) {
          const caption = document.createElement("figcaption");
          caption.textContent = mediaCaptions[index];
          figure.append(caption);
        }

        thumbnailButton.addEventListener("click", () => {
          if (!dialogImage) return;
          imageTrigger = thumbnailButton;
          dialogImage.src = source;
          setMediaCaption(index);
          setImageExpanded(true);
          dialogImageExpand?.focus({ preventScroll: true });
        });

        return figure;
      });
      dialogGallery.replaceChildren(...galleryButtons);
      dialogGallerySection.hidden = galleryButtons.length === 0;
      dialogGallery.classList.toggle("dialog-gallery--single", galleryButtons.length === 1);
    }

    if (dialogFilm && dialogFilmSection && dialogClips && dialogClipsSection) {
      const [mainClip, ...clips] = project.videos;
      if (dialogFilmTitle) dialogFilmTitle.textContent = project.videoHeading;
      if (dialogClipsTitle) dialogClipsTitle.textContent = project.clipsHeading;
      dialogFilm.replaceChildren(...(mainClip ? [createVideoFigure(mainClip, true)] : []));
      dialogFilmSection.hidden = !mainClip;
      dialogClips.replaceChildren(...clips.map((clip) => createVideoFigure(clip)));
      dialogClipsSection.hidden = clips.length === 0;
    }

    if (dialogVideo && dialogVideoSection) {
      dialogVideoSection.hidden = !project.video;
      if (project.video) dialogVideo.src = project.video;
      else dialogVideo.removeAttribute("src");
      dialogVideo.title = project.video ? `Vidéo du projet ${project.title}` : "Vidéo du projet";
    }

    if (dialogLink) {
      dialogLink.hidden = !project.link;
      dialogLink.href = project.link || "";
    }

    if (!projectDialog?.open) projectModal.open(button);
    // Le défilement d'une fiche fermée ne peut être réinitialisé qu'une fois visible.
    if (dialogSpread) dialogSpread.scrollTop = 0;
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
    setImageExpanded(false);
    imageTrigger?.focus({ preventScroll: true });
  });

  projectDialog?.addEventListener("cancel", (event) => {
    if (!dialogImageExpand?.classList.contains("is-expanded")) return;
    event.preventDefault();
    setImageExpanded(false);
    imageTrigger?.focus({ preventScroll: true });
  });

  projectDialog?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || dialogImageExpand?.hidden) return;
    // Échap ferme d’abord le zoom, pas la fiche qui se trouve derrière.
    event.preventDefault();
    event.stopPropagation();
    setImageExpanded(false);
    imageTrigger?.focus({ preventScroll: true });
  });

  projectDialog?.addEventListener("close", () => {
    setImageExpanded(false);
    stopProjectVideos();
    if (dialogVideo) dialogVideo.removeAttribute("src");
  });

  return { openProjectDialog };
}
