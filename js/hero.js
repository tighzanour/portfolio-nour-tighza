const heroStage = document.querySelector(".hero-stage");

function createHeroButton(project, openProjectDialog) {
  const button = document.createElement("button");

  button.classList.add("hero-stage__button");
  button.type = "button";
  button.dataset.projectId = project.id;
  button.setAttribute("aria-label", `${project.heroLabel} : ouvrir le projet ${project.title}`);

  if (project.heroImage) {
    const objectVisual = document.createElement("span");
    const objectImage = document.createElement("img");

    objectVisual.classList.add("hero-stage__object-visual");
    objectImage.classList.add("hero-stage__object-image");
    objectImage.src = project.heroImage;
    objectImage.alt = "";
    objectImage.draggable = false;
    button.classList.add("hero-stage__button--with-image");
    objectVisual.append(objectImage);
    button.append(objectVisual);
  }

  button.addEventListener("click", () => {
    openProjectDialog(project, button);
  });

  return button;
}

export function createHeroButtons(projects, openProjectDialog) {
  if (!heroStage) {
    throw new Error("Le conteneur du hero est introuvable.");
  }

  const heroButtons = projects.slice(0, 6).map((project) => createHeroButton(project, openProjectDialog));
  const foregroundChair = document.createElement("img");

  foregroundChair.classList.add("hero-stage__foreground-chair");
  foregroundChair.src = "./assets/images/hero/foreground/foreground-chair.png";
  foregroundChair.alt = "";
  foregroundChair.draggable = false;
  foregroundChair.setAttribute("aria-hidden", "true");

  heroStage.replaceChildren(...heroButtons, foregroundChair);
}
