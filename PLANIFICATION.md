# Planification du portfolio — Nour Tighza

## 1. Objectif du projet

Ce portfolio a pour objectif de présenter mes projets, mes compétences et ma personnalité à des employeurs potentiels afin d’obtenir un premier stage dans le domaine du marketing numérique en priorité mais aussi du multimédia ou de la création de contenu.

Je souhaite créer une expérience interactive inspirée d’un atelier créatif. Le visiteur pourra explorer différents objets disposés dans le décor. Certains objets ouvriront une fiche présentant un projet et d'autres seront simplement des objets qui me représentent.

Le portfolio sera original et immersif, tout en permettant aux recruteurs de trouver rapidement

- mes projets
- mes compétences
- mon profil
- mes disponibilités de stage
- mes coordonnées.

## 2. Public cible

Le portfolio s’adresse principalement :

- aux agences web et créatives
- aux équipes de marketing numérique
- aux entreprises recherchant une personne polyvalente
- aux responsables de stages et de recrutement

Ces personnes disposent souvent de peu de temps. La navigation doit donc rester claire même si la direction artistique est immersive.

## 3. Architecture du site

Le portfolio sera un site one-pager. Les différentes sections seront accessibles à partir d’un menu fixe. Ce choix rejoint le fait que les recruteurs ont peu de temps et doivent avoir accès rapidement aux informations.

### Sections principales

1. **Accueil/Atelier interactif**
   - Présentation rapide de mon profil.
   - Décor composé de plusieurs objets.
   - Six objets interactifs associés à mes projets.
   - Effet de profondeur et de parallaxe.

2. **Projets**
   - Les projets seront représentés par les objets de l’atelier.
   - Un clic sur un objet ouvrira une fenêtre de détails.
   - La fenêtre contiendra éventuellement une image principale, une description, mes responsabilités, les outils utilisés et un lien vers le projet.

3. **Transition**
   - Section ''Toujours curieux. Mais perfectionniste.''
   - Elle servira de transition entre les projets et la présentation personnelle.

4. **À propos et compétences**
   - Cette section prendra la forme d’un livre.
   - Le livre sera fermé à son arrivée dans la fenêtre.
   - Il s’ouvrira progressivement pendant le défilement.
   - Les pages présenteront mon profil, mes compétences et mes outils.

5. **Contact**
   - Disponibilités de stage.
   - Adresse courriel.
   - Liens professionnels.
   - Bouton permettant de revenir en haut de la page.

## 4. Gestion des données

Les informations des projets seront conservées dans un fichier JSON local :

`data/projects.json`

Le fichier contiendra:

- l’identifiant du projet;
- le titre;
- la catégorie;
- la description;
- les technologies utilisées;
- les images et vidéos;
- les liens externes;
- les textes alternatifs des médias.

Le fichier sera chargé de façon asynchrone avec `fetch()` en JavaScript.

`js/data.js` exporte `loadProjects()`, qui retourne un tableau sans modifier le HTML.
`js/projects.js` affiche les cartes et `js/main.js` utilise les mêmes données pour les objets du hero et la modale.
Un changement de source ne nécessitera de modifier que `data.js`.

Chaque projet utilise les propriétés communes `id`, `title`, `description`, `category`,
`year`, `image`, `link`, `video` et `gallery`. Les propriétés supplémentaires
`heroLabel` et `heroImage` servent uniquement aux objets de l'atelier.
`image` est l'image principale du projet, différente de l'objet décoratif `heroImage`.
`gallery` est un tableau de chemins d'images ; `video` sera une URL d'intégration
YouTube ou Vimeo, pas une URL de page de visionnement.

À compléter : les années et les images principales (obligatoires pour la remise),
ainsi que les liens, vidéos et galeries disponibles. Pour le moment, leurs valeurs
sont vides ; les six projets existants sont conservés sans duplication fictive.

Raisons du choix:

- séparer les données du HTML;
- éviter de répéter le même code pour chaque projet;
- faciliter l’ajout ou la modification d’un projet;
- générer automatiquement les fiches de projet.

## 5. Choix des technologies

### HTML

Le HTML sera utilisé pour structurer le contenu avec des éléments comme:

- `header`;
- `nav`;
- `main`;
- `section`;
- `article`;
- `dialog`;
- `footer`.

Cette structure facilitera la compréhension du contenu, améliorera l'accessibilité et m'est familière.

### CSS

Le CSS sera utilisé pour :

- construire la mise en page responsive
- créer l’identité visuelle
- positionner les objets sur le décor
- produire les effets de survol
- gérer éléments interactifs

Les styles seront organisés dans plusieurs fichiers pour faciliter leur modifications.

### JavaScript vanilla

JavaScript servira à:

- charger les projets depuis le fichier JSON;
- générer les boutons et les fiches de projet;
- ouvrir et fermer les fenêtres de détails;
- gérer le parallaxe;
- contrôler certaines animations;
- améliorer la navigation au clavier.

J’utilise JavaScript vanilla afin de démontrer et pratiquer ma compréhension des bases sans dépendre d’un framework.

### Anime.js

Anime.js sera utilisé pour les animations complexes, comme:

- le déplacement en profondeur du décor;
- l’ouverture du livre;
- l’apparition progressive de certaines sections quand on scroll;
- les transitions pour les objets.

J'ai choisit Anime.js parceque c'est légé et ça permet de controler les animations de façon précise.
Les effets simples, comme les survols des boutons, resteront en CSS car j'y suis habitué.
