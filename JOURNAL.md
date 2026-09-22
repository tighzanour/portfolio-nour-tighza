# Journal de bord — Portfolio

---

## Bloc 1 — 28 août 2026

### 1. Qu'est-ce que j'ai accompli depuis le dernier bloc?

- J'ai créé le dépôt GitHub de mon portfolio.
- J'ai configuré le dépôt en privé et ajouté mon enseignante comme collaboratrice.
- J'ai cloné le dépôt sur mon ordinateur et je l'ai ouvert dans Visual Studio Code.
- J'ai appris à utiliser le panneau Source Control de VS Code pour faire mes commits et synchroniser mes modifications avec GitHub.
- J'ai commencé à réfléchir à l'identité visuelle et à la direction générale de mon portfolio.

### 2. Quelle a été ma principale difficulté et comment je l'ai surmontée?

- Ma principale difficulté était de comprendre comment relier correctement mon projet local dans Visual Studio Code avec mon dépôt GitHub.
- J'ai suivi les étapes une par une et vérifié que mes fichiers et mes commits apparaissaient bien sur GitHub après la synchronisation.

### 3. Qu'est-ce que j'ai appris que je ne savais pas avant?

- J'ai appris à gérer Git de façon plus efficace dans Visual Studio Code.
- J'ai mieux compris la différence entre enregistrer un fichier, faire un commit et envoyer les modifications sur GitHub avec la synchronisation.

### 4. Quelle est ma prochaine étape concrète?

- Ma prochaine étape est de poursuivre la planification de mon portfolio et de définir plus précisément son identité visuelle.
- Je vais ensuite commencer à organiser le contenu et la structure du site avant de créer les maquettes.

### 5. Est-ce que j'ai utilisé l'IA? Si oui, pour quoi et qu'est-ce que ça m'a appris?

- Oui. J'ai utilisé ChatGPT pour m'aider à comprendre les étapes de création du dépôt GitHub, sa connexion avec Visual Studio Code et le fonctionnement des commits.
- Je l'ai aussi utilisé comme aide pour organiser la structure de mon journal de bord.
- Cela m'a aidé à mieux comprendre le processus Git et à pouvoir refaire les différentes étapes moi-même.

---

## Bloc 2 — [2026-09-18]

### 1. Qu'est-ce que j'ai accompli depuis le dernier bloc?

- Arborescence + Structure HTML de base [2026-09-18]
- CSS de base + Header, Hero, Titre, + Projets avec JSON [2026-09-19]
-

### 2. Quelle a été ma principale difficulté et comment je l'ai surmontée?

-

### 3. Qu'est-ce que j'ai appris que je ne savais pas avant?

-

### 4. Quelle est ma prochaine étape concrète?

-

### 5. Prompts IA

- #### Générer le CSS de base en lien avec le thème de mon portfolio. [2026-09-19]

  _je fais manuellement un portfolio one-page en HTML, CSS, JavaScript. Génère uniquement la base de mon fichier css/base.css, sans modifier mon HTML. Fait des variables CSS dans :root pour les couleurs, typo, espacements, dimensions et rayons. un reset avec box-sizing et border-box. les styles de base de html, body, main et section. une hiérarchie pour les h1, h2, h3. les styles généraux des liens, boutons images et vidéos/placeholders. Direction visuelle : atelier créatif sombre, chaleureux et cinématographique. Utilise un fond presque noir légèrement vert, du texte crème et un accent doré. le contraste doit être lisible. les titres doivent s'adapter à l'écran. le focus clavier doit être visible._

- #### Ajouter le header, le hero, le titre et le conteneur. [2026-09-19]

  _crée une première version simple du header et du hero de mon portfolio. Le site est en HTML et CSS. Utilise les variables deja presentes dans base.css. le header doit contenir mon nom et les liens Projets, A propos, et Contact. il doit rester visible en haut de la page. Le hero doit prendre toute la hauteur de l'écran et contenir mon titre et un court texte d'introduction. Ajoute aussi un conteneur vide qui servira à afficher le décor intéractif plus tard. Écris les styles dans components.css Modifie uniquement le contenu necessaire dans la section #hero. de index.html. N'ajoute aucune image, animation, pour l'instant et garde le code simple puis explique ce que tu as ajouté._

- #### Ajouter le chargement des projets avec JSON [2026-09-19]

  _ajoute une premiere version simple du chargement des projets de mon portfolio dans data/projects.json. crée 3 projets temporaires dans le fichier JSON. Chaque projet doit seulement avoir un identitifant, un titre, une catégorie et une description simple et courte. Dans js/projects.js crée une fonction async qui utilise fetch() pour charger le fichier JSON et afficher les projets dans #projets-list. chaque projet doit etre affiché dans un élément ''article'' avec un titre , catégorie, et description. dans js/main.js, importe et execute la fonction de chargement. affiche un message d'erreur si le chargement échoue. Pour le moment, n'ajoute pas de fenêtre de détails. n'ajoute pas d'image, d'animation ou de CSS. garde javascript simple et explique son fonctionnement._

- #### Rendre les projets cliquables avec des cartes de projet. [2026-09-19]

  _rends mes cartes de projets cliquables et affiche les infos du projet sélectionné dans dialog. modifie projects.js pour ouvrir le dialog avec le titre, la catégorie et la description du projet sélectionné. le dialog doit pouvoir etre fermé avec son bouton, la touche echap ou un clic à l'extérieur de la carte. ajoute dans components.css, un style simple et accessible pour les boutons, le dialog et le background du dialog. utilise seulement HTML, CSS et JavaScript. garde le code simple et explique moi tes modifications._

- #### Scène immersive [2026-09-19]

  _Transforme mon hero en une scène immersive en plein écran. Met les six projets comme des objets interactifs dans la scène, ajoute leurs noms dans le JSON et affiche un bouton “Projet 01”, “Projet 02”, etc. sous chaque objet. Garde des formes temporaires pour les visuels et assure toi que le hero fonctionne aussi sur mobile._

- #### Améliorer l’angle du background immersif [2026-09-21]

  _j'aime beaucoup le style, cependant j,aimerais quelque chose de plus immersif en terme d'angle de vue, là c'est trop plat, voici des exemples, il faut un pov comme si on était derriere la chaise de bureau_

- #### Générer le premier objet interactif [2026-09-22]

  _Use case: background-extraction. Asset type: separate transparent parallax object for an interactive website hero. Primary request: Create a clean isolated illustration of the user's open black gaming laptop, recognizable from the first reference: angular black chassis, full keyboard glowing red, large screen, slightly worn real-world feel. Input images: Image 1 is the real laptop and identity reference; Image 2 is a prior stylized rendering and lighting reference; Image 3 is the workshop background whose painterly style, amber lighting and camera perspective the object must match. Style/medium: painterly stylized digital concept art, simplified graphic forms, slightly low-poly shading, cohesive with Image 3, not photorealistic. Composition/framing: three-quarter front view of the open laptop, seen slightly from above as if resting naturally on the wooden desk in Image 3. Entire laptop visible with clean edges and a subtle contact shadow attached to the object. Screen: dark creative interface made only of abstract panels and shapes, no readable words, no logos. Lighting/mood: warm amber rim light from the room with a restrained red keyboard glow; deep brown-black shadows. Transparency: genuine transparent background with preserved alpha; no colored backdrop, no room, no table, no checkerboard pattern. Constraints: one laptop only, no extra objects, no hands, no cables, no text, no watermark. Preserve the transparent canvas around the complete object._

  **Résultat :** Un ordinateur illustré sur fond transparent a été généré à partir de la photo de référence. Il a été ajouté comme premier objet réel du hero, tandis que les cinq autres projets utilisent encore des formes temporaires. À reformuler ou compléter par Nour.
