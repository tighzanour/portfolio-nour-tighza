# Mon Portfolio

Portfolio one-page réalisé dans le cadre du programme Techniques d’intégration multimédia au Collège Montmorency.

Le site présente mes projets dans un atelier interactif. Les objets du décor ouvrent des fiches de projet alimentées par un fichier JSON local. Une section en forme de livre présente mon profil et les outils que j’utilise.

## Fonctionnalités

- Hero immersif avec objets superposés et effet de parallaxe léger.
- Projets chargés depuis `data/projects.json` avec `fetch()`.
- Cartes et objets générés en JavaScript à partir des mêmes données.
- Fiches de projet ouvertes dans une modale accessible.
- Images principales, galeries, liens et vidéos facultatifs.
- Livre animé pour la section À propos.
- Mise en page responsive et prise en charge de `prefers-reduced-motion`.
- Médias adaptés au Web : images WebP/PNG et vidéos MP4 avec commandes de lecture.

## Données des projets

Les projets sont définis dans [`data/projects.json`](data/projects.json). Chaque projet utilise la même structure :

- `id`, `title`, `description`, `category`, `year` et `image`;
- `link`, `video` (intégration externe), `videos` (clips MP4) et `gallery` pour les médias facultatifs;
- `role`, `tasks` et `tools` pour les informations détaillées;
- `status` et `caseStudy` pour le statut et les sections de présentation facultatives;
- `imageCaption` et `galleryCaptions` pour contextualiser les visuels (le tableau des légendes suit l’ordre de `gallery`);
- `heroLabel` et `heroImage` pour son objet dans l’atelier;
- `videoHeading` et `clipsHeading` pour les titres des sections vidéo.

Le module [`js/data.js`](js/data.js) charge et valide ces données. Les composants d’affichage n’ont donc pas besoin d’être modifiés lorsqu’un projet est mis à jour.

## Structure principale

```text
README.md
index.html
css/
  variables.css         Variables communes, chargées en premier
  base.css              Base et accessibilité
  layout.css            Disposition générale
  components/           Un fichier par composant
js/
  main.js               Point d’entrée
  data.js               Chargement et validation JSON
  components/           Cartes, modale, détails, hero et livre
data/projects.json     Source locale des projets
assets/                 Images, icônes et vidéos
exports-composants/     Captures PNG exportées depuis Figma
.github/copilot-instructions.md
documentation/
  PLANIFICATION.md
  JOURNAL.md
  QUALITY.md            Rapport qualité à compléter
```

Les variables sont définies uniquement dans `css/variables.css`. Chaque feuille CSS est liée séparément dans le HTML, sans `@import`.
`js/components/modal.js` gère seulement l’ouverture et la fermeture ; `js/components/project-details.js` remplit les fiches, les galeries et les vidéos.

- [Planification](documentation/PLANIFICATION.md)
- [Journal de production](documentation/JOURNAL.md)
- [Rapport qualité à compléter](documentation/QUALITY.md)

## Contenu à terminer

- Confirmer l’année, les liens publics et l’avancement du prototype QLT. Sa présentation et une sélection de captures de progression sont intégrées.
- Ajouter les années, liens publics et vidéos intégrées lorsqu’ils seront disponibles.
- Ajouter les captures finales des composants dans `exports-composants/`.
- Remplacer le lien de déploiement ci-dessous après la publication.

## Liens

- [Portfolio en ligne](https://tighzanour.github.io/portfolio-nour-tighza/)
- [Maquette Figma](https://www.figma.com/design/dlfEIc3MznkaT1jzZFqKo1/DESIGN-PORTFOLIO?node-id=0-1&t=Hbw0ivkIGS6fTztN-1)

## Auteur

Nour Tighza<br>
Techniques d’intégration multimédia — Collège Montmorency<br>
[tighzanour@gmail.com](mailto:tighzanour@gmail.com)
