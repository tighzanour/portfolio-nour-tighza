const heroStage = document.querySelector(".hero-stage");

function createHeroButton(project, openProjectDialog) {
  const button = document.createElement("button");

  button.classList.add("hero-stage__button");
  button.type = "button";
  button.textContent = project.title;
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

  heroStage.replaceChildren(...heroButtons);
}
