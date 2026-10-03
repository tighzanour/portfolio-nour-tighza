// Seul ce module connaît la source des données. Il ne modifie pas le HTML.
export async function loadProjects() {
  const response = await fetch(new URL("../data/projects.json", import.meta.url), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Le chargement des projets a échoué (${response.status}).`);
  }

  const projects = await response.json();
  if (!Array.isArray(projects)) {
    throw new Error("Le fichier JSON doit contenir un tableau de projets.");
  }

  const ids = new Set();
  return projects.map((project, index) => {
    const label = `Projet ${index + 1}`;
    if (!project || typeof project !== "object" || Array.isArray(project)) {
      throw new Error(`${label} : un objet est attendu.`);
    }
    for (const key of ["id", "title", "description", "category", "year", "image"]) {
      if (typeof project[key] !== "string") {
        throw new Error(`${label} : le champ ${key} doit être une chaîne de texte.`);
      }
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) {
      throw new Error(`${label} : identifiant invalide ou déjà utilisé.`);
    }
    ids.add(project.id);
    for (const key of ["title", "description", "category"]) {
      if (!project[key].trim()) throw new Error(`${label} : ${key} est vide.`);
    }
    for (const key of ["link", "video"]) {
      if (project[key] !== undefined && typeof project[key] !== "string") {
        throw new Error(`${label} : ${key} doit être une chaîne de texte.`);
      }
    }
    const role = project.role ?? "";
    if (typeof role !== "string") {
      throw new Error(`${label} : role doit être une chaîne de texte.`);
    }
    const tasks = project.tasks ?? [];
    if (!Array.isArray(tasks) || tasks.some((task) => typeof task !== "string" || !task.trim())) {
      throw new Error(`${label} : tasks doit être un tableau de tâches.`);
    }
    const tools = project.tools ?? [];
    if (!Array.isArray(tools) || tools.some((tool) => typeof tool !== "string" || !tool.trim())) {
      throw new Error(`${label} : tools doit être un tableau de noms de logiciels.`);
    }
    const gallery = project.gallery ?? [];
    if (!Array.isArray(gallery) || gallery.some((image) => typeof image !== "string" || !image.trim())) {
      throw new Error(`${label} : gallery doit être un tableau de chemins d'images.`);
    }
    // Informations de présentation facultatives : les autres projets gardent leur format.
    const status = project.status ?? "";
    const imageCaption = project.imageCaption ?? "";
    if (typeof status !== "string" || typeof imageCaption !== "string") {
      throw new Error(`${label} : status et imageCaption doivent être du texte.`);
    }
    const galleryCaptions = project.galleryCaptions ?? [];
    if (!Array.isArray(galleryCaptions) || galleryCaptions.some((caption) => typeof caption !== "string") ||
        (galleryCaptions.length > 0 && galleryCaptions.length !== gallery.length)) {
      throw new Error(`${label} : galleryCaptions doit correspondre aux images de gallery.`);
    }
    const caseStudy = project.caseStudy ?? [];
    if (!Array.isArray(caseStudy) || caseStudy.some((section) => !section ||
        typeof section.title !== "string" || !section.title.trim() ||
        typeof section.text !== "string" || !section.text.trim())) {
      throw new Error(`${label} : caseStudy doit contenir des sections title et text.`);
    }
    // Les champs vides sont autorisés pendant la préparation du vrai contenu.
    return { ...project, link: project.link ?? "", video: project.video ?? "", role, tasks, tools, gallery,
      status, imageCaption, galleryCaptions, caseStudy };
  });
}
