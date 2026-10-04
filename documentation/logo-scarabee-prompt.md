# Logo scarabée-café — 2026-10-04

Génération avec l’outil d’image intégré, référence fournie par l’utilisateur. PNG transparent conservé dans `assets/icons/scarabee-cafe-v1.png` ; aperçu sur fond clair dans `assets/icons/scarabee-cafe-v1-apercu.png`. Intégration ensuite autorisée par l’utilisateur : logo réduit à 192 px pour le header, favicons PNG 16/32 px et icône Apple 180 px. Les originaux sont conservés ; aucune nouvelle génération lors de l’intégration.

## Prompt de génération

```text
Use case: logo-brand.
Asset type: portfolio symbol, website logo and favicon master, single square transparent PNG.
Input image 1 is a STYLE AND CONCEPT REFERENCE, not an edit target. Create a new original mark closely inspired by its visual language.
Primary request: a front-facing heraldic scarab beetle whose entire lower abdomen is one large oval COFFEE BEAN with a clearly recognizable broad flowing S-shaped central cleft. The coffee bean must be part of the beetle's anatomy, not an object it carries.
Style: elegant bold black emblem, organic geometric curves, subtly vintage engraved/stencil character, like the reference. Preserve the reference's upright symmetrical silhouette, open crescent-like mandibles at the top, rounded thorax, curved claw-like legs and two short outward-spreading stylized wing shapes. Use balanced thick black masses and broad TRANSPARENT negative-space separations. Coffee bean is the main visual focus. Refine and simplify small texture and tiny lines so the silhouette and bean cleft remain recognizable at 32px. Flat solid black, crisp clean contours, no gradients or metallic shine, no realistic insect detail.
Composition: exactly ONE centered complete logo, top-down frontal view, all appendages visible, compact balanced square footprint with about 8 percent transparent padding. No typography, letters, border, circle container, additional coffee beans or extra symbols, no mockup, no cast shadow, no watermark. The background and all internal cutouts are genuinely transparent, NOT white. Deliver an isolated professional logo asset, not a presentation sheet.
```

## Prompt de l’aperçu

```text
Use case: background-extraction / logo preview. Edit target: Image 1, the already generated black scarab-coffee logo. Change ONLY the transparent background and transparent internal negative-space cutouts to a uniform solid warm white (#faf8f2) background for a visible preview. Preserve the exact black emblem, every contour, bean shape, wing shape, proportions, position and square canvas. No redesign, no added text, no shadows, no mockup, no cropping. Deliver the same logo on a plain light background.
```

## Vérifications

Le PNG principal mesure 1254 × 1254 pixels et possède un canal alpha (coin transparent confirmé). L’aperçu permet d’examiner la silhouette et le grain de café. Les formats Web sont obtenus par redimensionnement, pas par une nouvelle génération. Le header utilise la transparence comme masque CSS pour adapter la couleur au fond sombre ; les favicons gardent le fond clair de l’aperçu. Ce fichier est une image raster, pas un SVG vectoriel.
