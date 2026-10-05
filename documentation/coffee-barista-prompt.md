# Coffee Empire — barista visible après embauche

Demande du 5 octobre 2026 : « ajouter un barista », après proposition d’un personnage pixel art visible derrière le comptoir une fois engagé. Génération via l’outil imagegen intégré, sans CLI, bibliothèque ou animation supplémentaire. Le décor existant a été inspecté pour guider la palette et le placement ; il n’a pas été retouché ni envoyé comme cible d’édition.

## Prompt réellement envoyé

```text
Use case: stylized-concept
Asset type: transparent character sprite for the 2D browser café clicker Coffee Empire.
Primary request: one friendly adult barista, facing the player, waist-up from the top of the hair to the hips, preparing a small cream ceramic coffee cup with both hands near waist level. Natural adult proportions, short dark slightly wavy hair, warm medium skin, cream rolled-sleeve shirt and plain espresso-brown apron. Calm focused expression, gaze slightly down at the cup.
Style/medium: richly shaded retro pixel art with crisp visible square pixel clusters, dark espresso outlines, restrained dithering, not smooth vector or photorealistic. Match an amber-lit wood café interior with cream plaster, caramel wood and dark brown details.
Composition/framing: single centered character, front-facing eye-level view, entire head, shoulders, elbows and waist visible, compact silhouette; portrait composition, small transparent margins, no cropped hands. The lower apron will be hidden by an existing foreground counter in HTML; do not draw the counter or any scenery.
Lighting/mood: warm golden overhead café light on the face and shirt, amber highlights, soft espresso shadows.
Constraints: genuinely transparent background with alpha. Only the barista and the small cup held in their hands. No background, floor, table, counter, chair, text, letters, UI, logo, watermark, duplicated characters or sprite sheet. Preserve clear silhouette suitable for display around 200 pixels tall.
```

## Intégration

PNG transparent : `assets/images/coffee-barista-v1.png`, 1145 × 1374, 1 076 830 octets. SHA-256 : `6C344A3919E1969597A0DC97106C61F074167983F557B678E948E02AF126A23D`. Original généré conservé ; copie binaire sans retouche dans le dépôt. Alpha nul au coin supérieur gauche vérifié. Le personnage reste une image statique, pas un cycle d’animation.

`data-coffee-barista` est masqué au départ et visible lorsque `employeeHired` vaut vrai. Le décor réutilisé dans un calque découpé à 65 % de la scène occulte le bas du tablier ; la tasse jouable et le message passent devant. Les calques visuels n’interceptent pas les clics. Largeur 22 % sur ordinateur / 30 % sur mobile ; placement de la tasse inchangé. La production reste un café toutes les 3 secondes, au prix courant, et ne dépend pas de l’image.

Cette première apparence a été rejetée par Nour. Le fichier reste conservé comme brouillon, sans être affiché. Il est remplacé par [l’étudiant validé](coffee-student-prompts.md), au même emplacement et avec les mêmes règles de jeu.
