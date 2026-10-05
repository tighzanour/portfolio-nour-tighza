# Coffee Empire — étudiant, premier employé

## Demande et validation

Nour rejette le style du premier barista et fournit trois références : cadrage torse et pixel art pour la première, vêtements simples et élégants pour la deuxième, faible motivation pour la troisième. Le personnage demandé est un jeune homme étudiant, attachant. L’assistant propose une chemise crème, un pull sans manches brun et un regard blasé.

Une première génération est montrée, puis simplifiée car trop détaillée. La deuxième version, en pixels plus gros, est validée par Nour : « parfait! ». Intégration de cette version uniquement, sans nouvelle génération ou retouche après validation.

## Première génération — prompt réellement envoyé

```text
Use case: stylized-concept
Asset type: single transparent bust portrait sprite, preview for a new recurring character in a 2D café game.
Primary request: an ORIGINAL likeable young adult male student, about 20 years old, a little unmotivated and sleepy, wearing simple elegant student clothes: an ivory collared shirt with sleeves and a plain warm brown knitted sleeveless V-neck sweater vest over it. No apron. Dark messy medium-short hair with uneven fringe. Clean-shaven youthful face, medium-light warm skin, dark half-lidded eyes, relaxed eyebrows, small flat mouth with a very subtle wry asymmetry. He feels mildly bored by his part-time job, quietly endearing, not angry, sinister, muscular or glamorous.
Style/medium: ACTUAL deliberately coarse pixel art game dialogue portrait, drawn as if on a roughly 128 x 160 pixel grid and enlarged with nearest-neighbor. Uniform large square pixels, visibly stair-stepped edges, bold dark outlines, crisp limited flat color clusters, only 2 or 3 shadow tones per material. Stylized anime-influenced face but restrained normal proportions, not chibi. The primary visual target is the graphic readable bust-portrait language of classic pixel RPG dialogue art, NOT high-detail pixel-painted illustration. The shirt-and-brown-vest design is simple smart casual; facial attitude is low-energy, heavy-lidded and deadpan.
Composition/framing: face directly towards the player, symmetrical bust view, head, neck, shoulders and entire chest visible, crop at lower torso just above the waist. Hair fully inside frame, small transparent margin above and at sides. Shoulders slightly slumped. Arms resting down; NO hands in the image. No held cup or utensil. Character fills most of the portrait canvas with a readable silhouette, head roughly upper 45 percent of bust.
Palette/lighting: muted charcoal-black hair, warm cream shirt, cocoa brown vest, tan skin, gentle simple warm highlights. Flat game sprite lighting, no cinematic rim light, no golden glowing shading.
Constraints: genuinely transparent alpha background outside the character; one character only, no scenery, floor, table, coffee cup, apron, UI, frame, text, name, logo or watermark. No photographic textures, smooth gradients, anti-aliased painted edges, intricate individual hair strands, semi-realistic rendering, glossy professional-barista styling or extremely tiny pixels. This is a first character design proposal, not a complete game screenshot.
```

## Simplification — prompt réellement envoyé

```text
Edit this student character portrait. Preserve exactly the young adult male student design, brown sleeveless V-neck sweater vest over cream shirt, dark tousled hair, bored half-lidded deadpan expression, bust crop, silhouette and transparent background. Change ONLY the rendering into significantly coarser, graphic, classic pixel RPG portrait art. Render as if hand-drawn on a low-resolution 96 x 128 pixel canvas, then enlarged using nearest-neighbor: large uniform square pixels, obvious hard stair steps, clean solid color clusters. Reduce the palette to about 20 colors total. Two or three flat shades per material. Remove painterly surface texture, tiny dithering, fine strands and smooth gradients. Face features expressed with a few strong rectangular pixel clusters; keep him likeable and mildly unmotivated, not hostile. Black charcoal outlines, muted brown vest and ivory shirt. No new objects, no hands, no props, no cup, no apron, no background, no frame, no text or watermark. Genuine transparent alpha outside the character.
```

Outil utilisé : imagegen intégré, pas CLI/API. Les références utilisateur ont guidé la description ; la simplification utilise la première image générée comme cible (`num_last_images_to_include: 1`, fond transparent).

## Asset intégré

`assets/images/coffee-student-v1.png` — 1122 × 1402, 951 922 octets, PNG avec transparence. SHA-256 `0A84DC84138EB4A2410B1A61FD060375CB090D35E2362C17AEE58AD1C3F95844`. Copie binaire de la deuxième sortie générée ; alpha nul au coin supérieur gauche. Les générations originales et l’ancien `coffee-barista-v1.png` restent conservés, mais seuls les pixels de la version validée sont affichés dans le jeu.

Le même emplacement `data-coffee-barista` est réutilisé. Le personnage apparaît après l’embauche et reste masqué avant, sans changer la production, les prix ou les pauses. Il est statique et sans accessoire ; le peu de motivation est exprimé visuellement, pas par une pénalité de rendement inventée. La tasse reste une action indépendante au premier plan. Aucun changement du décor, de la tasse ou du logo.

## Vérifications du 5 octobre 2026

Tests des clics, du marché et de l’employé réussis ; audit des chemins/arborescence : 16 CSS, 9 imports et 6 projets. Navigateur : image masquée avant achat, embauche avec Entrée, image chargée en 1122 × 1402 après achat et compteurs augmentant automatiquement. Préparation manuelle avec Entrée observée ; rechargement masque de nouveau l’étudiant. Aucune erreur console observée. Géométrie à 320, 390 et 820 px : personnage dans la scène, aucune largeur débordante, tasse toujours ancrée à 72,5 %. Pas de vérification visuelle sur téléphone réel ou de publication distante.
