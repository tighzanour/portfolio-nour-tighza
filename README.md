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

## Section IA

Les commandes du café sont regroupées dans une barre fixe au bas de l’écran : caisse, préparation, recrutement, évolution et règlement des salaires selon l’état de chaque personnage. Les fiches détaillées restent consultables sans perdre l’accès aux commandes. Voir [l’interface sans défilement pour les actions](documentation/coffee-controls.md).

La section accessible depuis le menu **IA** présente **Coffee Empire** : cliquer sur la tasse ou « Préparer un café » sert un café au prix affiché. Souris, Entrée et Espace sont pris en charge. Deux employés peuvent travailler ensemble : l’étudiant (embauche 30 $, trois tenues/paliers, services de 3 à 2 secondes et bonus de 0 à 10 %) et la barista chaleureuse (embauche 60 $, un café / 4 secondes, bonus de 25 % sur ses propres ventes). Salaires étudiants : 3/6/12 $ ; barista : 6 $, toutes les 60 secondes actives. Une hausse étudiante verse la nouvelle paie immédiatement. Les prochaines tenues de la barista restent à définir.

Caisse commune, statistiques et paies individuelles : un impayé suspend seulement la personne concernée jusqu’à un règlement explicite, sans dette supplémentaire. Les clics manuels restent disponibles. Hors IA/onglet visible, toutes les horloges sont en pause, sans gains hors ligne. Valeurs fictives et provisoires, une embauche par personnage. Voir [les règles et prompts de l’étudiant](documentation/coffee-staff-progression.md) et [la barista et l’horloge d’équipe](documentation/coffee-warm-barista.md).

Le prix fictif est indexé sur le cours Arabica fourni par l’API publique de Buon Ma Thuot Coffee, sans clé ni abonnement : 3 $ au cours de référence, avec 20 % du prix suivant les grains (modèle provisoire). Le panneau affiche la source cliquable, le cours en USD/lb, sa date et les états ancien/cache/indisponible. Ce sont les derniers prix de règlement disponibles, pas du temps réel. Appel à l’ouverture puis toutes les 30 minutes seulement lorsque IA et l’onglet sont visibles. Seul le cours est conservé localement ; la caisse et l’équipe repartent à zéro au rechargement. Le décor et le scarabée du portfolio restent inchangés. Voir [la démarche](documentation/coffee-empire.md) et [la connexion au marché](documentation/coffee-market.md).

**Lancer :** ouvrir `index.html` dans VS Code puis **Go Live**. Aucun build, clé API ou dépendance à installer. Internet est nécessaire pour vérifier le cours. Sans cours ni cache utilisable, le jeu conserve un prix de secours fictif de 3 $, explicitement non connecté au marché.

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
  components/           Cartes, modale, détails, hero, livre et laboratoire
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
