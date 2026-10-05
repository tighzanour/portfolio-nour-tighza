# Coffee Empire — la barista chaleureuse

## Demande et validation

Nour choisit une barista « chaleureuse et energique », fournit une référence avec lunettes, cheveux foncés et tenue simple, et demande le même style que le premier personnage. Le portrait en buste est présenté avant toute intégration. Réponse de validation : « oui c’est bien ».

Le PNG approuvé est intégré tel quel, sans retouche ni nouvelle génération pendant cette étape. L’étudiant et ses trois tenues restent disponibles. La barista n’a pour le moment que sa tenue de départ : ses vêtements d’évolution seront proposés et validés dans une étape suivante. L’interface affiche clairement « Évolution à venir » ; aucune augmentation ne prétend débloquer une tenue absente.

## Première mécanique proposée

| Personnage / palier de départ | Embauche | Cadence | Bonus sur ses propres cafés | Salaire / 60 s actives |
| --- | --- | --- | --- | --- |
| Étudiant · Débutant | 30 $ | 1 café / 3 s | +0 % | 3 $ |
| Barista · Passionnée | 60 $ | 1 café / 4 s | +25 % | 6 $ |

Valeurs fictives proposées par l’assistant, encore provisoires ; ce n’est pas un équilibrage validé. La barista privilégie la valeur de chaque service, pas la vitesse. À un prix de base de 3 $, elle vend à 3,75 $, contre 3 $ pour l’étudiant débutant et les clics manuels. Son bonus n’améliore ni son collègue ni les clics.

Les deux personnages peuvent être embauchés dans n’importe quel ordre, une seule fois chacun. Ils travaillent simultanément et alimentent une caisse partagée. Embaucher, augmenter ou payer l’un ne recommence pas l’horloge de l’autre. L’étudiant conserve les paliers, salaires et tenues documentés dans [l’étape 06](coffee-staff-progression.md).

## Paies individuelles, horloge commune

Une seule boucle traite tous les événements dans l’ordre réel du temps actif. Faire avancer un employé pendant toute une minute, puis son collègue, aurait permis aux ventes futures du premier de financer une paie passée du second : ce raccourci est explicitement évité.

À chaque prochaine échéance :
1. Faire avancer les horloges des employés au travail jusqu’à cet instant.
2. Traiter toutes les paies dues avant les services dus au même instant.
3. Servir les cafés des employés toujours au travail.
4. Continuer jusqu’au temps actif effectivement écoulé.

Si les deux paies arrivent ensemble et que la caisse ne suffit pas pour toutes, priorité stable dans l’ordre des profils : étudiant, puis barista. Ce choix provisoire est documenté pour éviter une priorité dépendant du nombre de rafraîchissements.

Un impayé suspend seulement la personne concernée, sans dette supplémentaire. Son collègue peut continuer ; les cafés manuels restent disponibles. L’argent revenu en caisse ne règle pas automatiquement l’impayé : utiliser le bouton de règlement de la bonne carte. Ce paiement ne réinitialise que les horloges de cette personne.

Fermer IA ou cacher l’onglet suspend toutes les horloges, en conservant les fractions travaillées. Aucun gain ou salaire hors ligne. Au rechargement : caisse et équipe remises à zéro ; seul le dernier cours Arabica reste en cache.

## Intégration visuelle

La barista apparaît après son embauche, derrière le même calque de bois que l’étudiant. Si un seul personnage est embauché, il occupe la position précédente. Quand les deux sont présents, ils se répartissent de part et d’autre de la tasse ; des positions adaptées évitent leur chevauchement sur petits écrans. Pas d’animation ajoutée. Décor, tasse, logo, scarabée du portfolio et portraits de l’étudiant non modifiés.

Fichier : `assets/images/coffee-warm-barista-v1.png` — 1122 × 1402, alpha du coin 0.
SHA-256 : `B0A4A66AFE7F20A65FC1232AB58AE388880915D5380B96835B35F8ED848B5019`.

Sortie générée originale : `C:/Users/tighz/.codex/generated_images/01a068c3-f73d-7d23-a80b-c058febc8a7e/exec-69352da0-1f60-47e6-84b7-60184997dd38.png`.

## Prompt exact du portrait validé

Générateur intégré imagegen, fond transparent, sans CLI ni retouche. Références : PNG approuvé de l’étudiant pour le rendu et le cadrage ; image fournie de la femme pour lunettes, coiffure et chemise. La référence n’est pas suivie pour son sac, son cadrage en pied ou son inscription.

```text
Use case: stylized-concept.
Asset type: preview of one new female character bust sprite for the Coffee Empire browser game. Do not modify any existing project files.
Input images: Image 1 (young male student) is the PRIMARY rendering-style and bust-framing reference. Image 2 (woman with glasses) is a SECONDARY reference for the female character's hairstyle, glasses and simple elegant shirt, not for its full-body framing, handbag or lettering.
Primary request: create an original warm and energetic young adult female café worker who belongs to EXACTLY the same pixel-art character set as Image 1. Chest-up portrait, from the top of her hair to the lower chest, both shoulders visible, similar head-to-torso proportions and visual scale as the student. Straight-on three-quarter-subtle face turned only slightly, looking toward the player. Dark shoulder-length hair with a softly side-swept fringe; thick dark rectangular glasses through which her expressive eyes remain clearly visible. Friendly lively eyes, lightly raised eyebrows and a small genuine cheerful smile. Simple neatly fitted ivory collared button-up shirt, buttoned appropriately, without sweater vest. Upright relaxed welcoming posture, both arms down and hands outside the frame.
Style: Match Image 1's COARSE uniform square pixels, low-resolution sprite enlarged with nearest-neighbor appearance, bold stepped near-black outlines, angular flat color clusters, restrained 3-to-4 shades per material, anime-influenced face. Large readable pixel blocks, approximately the same apparent pixel scale as the male portrait. Warm cream and coffee-brown shading; muted dark brown hair with very subtle plum shadows inspired by Image 2. No glossy high-resolution anime illustration, no soft or painted gradients, no anti-aliasing or delicate micro-details.
Backdrop: genuinely transparent alpha, clean isolated sprite edges.
Composition: a single centered bust, complete hair silhouette inside the canvas, shoulders extending toward the sides like the approved student's portrait. No excessively large empty margins.
Avoid: handbag, accessories or props beyond glasses, coffee cup, apron, hats, jewelry, hands, full body, skirt or legs, café scenery, base or frame, drop shadow behind the sprite, text, signatures, PIXELPORTAL lettering or watermarks. Do not copy the bored male expression; her personality must be visibly warm and energetic while retaining the same graphic style.
```

## Vérifications — 5 octobre 2026

Tests Node des vrais modules :
- Profils distincts, achat unique, fonds insuffisants, invariants de l’étudiant et tenues existantes.
- Deux employés simultanés, caisse partagée, arrondis et bonus limités à chaque profil.
- Chronologie indépendante du fractionnement du temps ; aucune vente future pour payer une ancienne échéance.
- Exemple synthétique de 60 s, démarrage synchronisé à zéro après les achats : 20 cafés étudiant + 15 cafés barista, soit 116,25 $ de ventes moins 9 $ de salaires = 107,25 $.
- Suspension individuelle, collègues toujours productifs, paiement/refus/reprise, aucune dette accumulée.
- Deux cartes dans le DOM simulé : portraits, fonds manquants, prix, promotion étudiante sans effet sur la barista, focus rendu à la préparation, une seule horloge, pause IA/onglet.
- Suites précédentes clics, marché et progression réussies.

Navigateur local : portraits masqués avant achat ; 20 clics à 3 $ permettent l’embauche de la barista seule avec Entrée. Portrait chargé, gain affiché de 3,75 $. Après plus d’une minute réelle, 37 cafés (20 manuels puis 17 automatiques) et 57,75 $ : 63,75 $ de recettes moins une paie de 6 $. Achat de l’étudiant ensuite, deux portraits présents et deux prochaines paies différentes, sans remise à zéro de la barista.

Pause/réouverture : 87 cafés, 183 $ et délais de 56/34 secondes conservés. DOM à 320/390/820 px : page et cartes sans débordement, portraits dans la scène et séparés, bas de tasse toujours à 72,5 %. Viewport restauré, aucune erreur console observée.

Audit de structure : 16 CSS liées séparément, 10 imports, 6 projets et 53 références de médias projets préservés. Aucun framework, dépendance, compte payant, sauvegarde de partie, commit/push ou déploiement ajouté. Les déficits et la visibilité d’onglet sont validés en simulation, pas par manipulation de l’état du navigateur. Pas de test sur téléphone physique ou d’équilibrage global.
