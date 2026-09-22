const heroStage = document.querySelector(".hero-stage");

function createHeroButton(project, index, openProjectDialog) {
  const button = document.createElement("button");
  const objectName = document.createElement("span");
  const projectLabel = document.createElement("span");
  const statusDot = document.createElement("span");

  button.classList.add("hero-stage__button");
  button.type = "button";
  button.dataset.projectId = project.id;
  button.setAttribute("aria-label", `${project.heroLabel} : ouvrir le projet ${project.title}`);

  objectName.classList.add("hero-stage__object-name");
  objectName.textContent = project.heroLabel;

  projectLabel.classList.add("hero-stage__project-label");
  projectLabel.textContent = `Projet ${String(index + 1).padStart(2, "0")}`;

  statusDot.classList.add("hero-stage__status");
  statusDot.setAttribute("aria-hidden", "true");
  projectLabel.prepend(statusDot);

  const buttonContent = [];

  if (project.heroImage) {
    const objectImage = document.createElement("img");

    objectImage.classList.add("hero-stage__object-image");
    objectImage.src = project.heroImage;
    objectImage.alt = "";
    objectImage.draggable = false;
    button.classList.add("hero-stage__button--with-image");
    buttonContent.push(objectImage);
  }

  buttonContent.push(objectName, projectLabel);
  button.append(...buttonContent);
  button.addEventListener("click", () => {
    openProjectDialog(project, button);
  });

  return button;
}

export function createHeroButtons(projects, openProjectDialog) {
  if (!heroStage) {
    throw new Error("Le conteneur du hero est introuvable.");
  }

  const heroButtons = projects.slice(0, 6).map((project, index) => createHeroButton(project, index, openProjectDialog));

  heroStage.replaceChildren(...heroButtons);
}
