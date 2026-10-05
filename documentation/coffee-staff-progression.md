# Coffee Empire — progression et salaires

Cette page décrit l’étape 06 consacrée à l’étudiant. L’étape 07 ajoute une deuxième employée et des paies individuelles dans une caisse commune : voir [la barista chaleureuse](coffee-warm-barista.md).

## Choix et portée

Nour demande des personnages évolutifs, avec salaires, tenues et statistiques propres. Il choisit de suspendre le travail jusqu’au paiement en cas de caisse insuffisante. Cette étape développe uniquement l’étudiant déjà validé ; aucun autre personnage n’est inventé ou ajouté.

Les valeurs ci-dessous sont proposées par l’assistant pour tester la mécanique, pas des salaires réels ni un équilibrage validé.

| Palier | Tenue | Service automatique | Bonus sur ses ventes | Salaire / 60 s actives |
| --- | --- | --- | --- | --- |
| Débutant | Chemise crème, pull brun | 1 café / 3 s | +0 % | 3 $ |
| Impliqué | Pull vert sombre, cravate | 1 café / 2,5 s | +5 % | 6 $ |
| Expérimenté | Chemise, veste bleu sombre | 1 café / 2 s | +10 % | 12 $ |

L’embauche reste à 30 $ fictifs et limitée à un employé. Le bonus s’applique au prix courant du jeu pour les ventes de cet employé seulement, arrondi au centime. Les clics restent au prix affiché. Les recettes passées ne sont jamais recalculées.

## Règles de paiement

- Première paie 60 secondes actives après l’embauche ; prélèvement ensuite toutes les 60 secondes actives.
- Une augmentation verse immédiatement le nouveau salaire (6 ou 12 $). Elle débloque la tenue et les nouvelles statistiques, puis recommence les cycles de paie et de service. Le cycle partiel précédent est clos sans remboursement ni autre débit.
- À l’échéance, une caisse insuffisante suspend le travail. Une seule paie reste à régler : aucun service, aucune nouvelle dette et aucune possibilité d’augmenter le salaire pendant cet impayé.
- Les cafés manuels restent disponibles. Disposer de l’argent ne reprend pas automatiquement le travail : utiliser « Régler le salaire ». Ce paiement débite la paie due une seule fois et redémarre les deux cycles.
- Quand service et paie sont dus au même instant, la paie est traitée en premier. En cas d’impayé, ce service n’est pas réalisé.
- Fermer IA ou cacher l’onglet met les deux horloges en pause. Les fractions déjà travaillées sont conservées, contrairement à la version de l’étape 05 qui recommençait un service complet après chaque pause. Aucun gain ou salaire hors ligne.
- Aucun état de partie n’est sauvegardé : un rechargement remet caisse, embauche et évolution à zéro. Le cache du cours Arabica reste indépendant.

Avec l’équilibrage actuel, les recettes automatiques couvrent normalement les salaires. La suspension est une protection pour les évolutions futures de l’économie, pas une difficulté ajoutée artificiellement à cette première boucle.

## Architecture et logique de prompts

Le module pur `js/components/coffee-staff.js` sépare le profil (tenues, salaire, cadence, bonus) des opérations (embaucher, promouvoir, avancer l’horloge, payer). Un futur personnage pourra utiliser son propre profil ; il n’est pas implémenté dans cette étape.

`coffee-counter.js` conserve l’interface et une seule horloge monotone fondée sur `performance.now()`. Les clics, paiements et changements de cours règlent d’abord le temps actif écoulé : pas de report du service à chaque clic, pas de vente passée au nouveau cours et pas de timers concurrents par palier. Le compte à rebours n’annonce pas chaque seconde aux lecteurs d’écran. Les boutons désactivés rendent le focus à une commande de préparation.

Découpage de la demande :
1. Conserver le personnage validé ; changer uniquement son habillement.
2. Rendre l’évolution lisible : tenue + cadence + bonus + salaire.
3. Définir l’échec avant de coder : impayé, arrêt, action explicite de règlement, aucune dette accumulée.
4. Séparer règles pures, rendu et horloge pour tester les échéances sans attendre une heure.
5. Tester les limites et l’intégration existante avant d’ajouter de nouveaux personnages.

## Images et prompts exacts

Skill imagegen utilisée : deux éditions du PNG approuvé `assets/images/coffee-student-v1.png`, avec le générateur intégré, fond transparent, sans CLI, bibliothèque externe ni retouche raster. Objectif : préserver l’identité, la pose et le pixel art du jeune étudiant, modifier seulement les vêtements. Les deux nouvelles tenues sont des propositions implémentées ; leur validation esthétique reste à Nour.

### Palier Impliqué

Prompt envoyé :

> Use case: identity-preserve. Edit target: the supplied approved young male student bust sprite. Preserve EXACTLY the face, half-lidded bored eyes, mouth, messy dark hair, skin color, head shape, age, silhouette, crop, shoulder position, pixel grid and genuinely transparent background. This is the SAME character in an upgraded outfit, not a new person. Keep coarse uniform square pixels, crisp dark stepped outlines, limited flat color clusters and no smooth gradients or painterly detailing. No hands, props, apron, coffee, text, frame, scenery or watermark. Change only the clothing below the neck. Replace the brown sleeveless V-neck knitted vest with a neatly fitted deep muted forest-green sleeveless V-neck knitted vest, keeping the ivory collared shirt beneath it. Add one simple neat narrow charcoal tie tucked inside the V-neck to make this second upgrade visually distinct. Preserve the shirt sleeves, neck and everything above the collar unchanged. Same portrait framing as original.

Sortie originale : `C:/Users/tighz/.codex/generated_images/01a068c3-f73d-7d23-a80b-c058febc8a7e/exec-b7a33c54-2851-4581-83c3-afa0a2d3d800.png`

Copie : `assets/images/coffee-student-level-2-v1.png` — 1122 × 1402, alpha du coin 0.
SHA-256 : `33D0AE2A378E348814157DDC718D636843A67295D99E6B392C5996CA60004F7D`.

### Palier Expérimenté

Prompt envoyé :

> Use case: identity-preserve. Edit target: the supplied approved young male student bust sprite. Preserve EXACTLY the face, half-lidded bored eyes, mouth, messy dark hair, skin color, head shape, age, silhouette, crop, shoulder position, pixel grid and genuinely transparent background. This is the SAME character in an upgraded outfit, not a new person. Keep coarse uniform square pixels, crisp dark stepped outlines, limited flat color clusters and no smooth gradients or painterly detailing. No hands, props, apron, coffee, text, frame, scenery or watermark. Change only the clothing below the neck. Replace the brown sleeveless sweater vest with an elegant, simple dark navy tailored blazer with visible notched lapels, worn over the same ivory collared shirt. No tie in this third outfit. The blazer is a clearly different silhouette from a sweater vest, suitable for an experienced café employee, not luxury attire. Keep both arms down and the original bust crop. Preserve all pixels above the collar, the exact facial expression and hairstyle. Same canvas and body alignment, transparent background.

Sortie originale : `C:/Users/tighz/.codex/generated_images/01a068c3-f73d-7d23-a80b-c058febc8a7e/exec-fbb070b1-863c-487f-a02d-dd6fe217a8a0.png`

Copie : `assets/images/coffee-student-level-3-v1.png` — 1122 × 1402, alpha du coin 0.
SHA-256 : `A0E6B1024F6D57B4E6FF02670AA75F04EE5871C2182D58B11DE65CA10DF332A6`.

Les fichiers du décor, de la tasse, du logo et du portrait de départ restent inchangés. Les portraits sont statiques, placés derrière le même calque de comptoir ; pas d’animation nouvelle.

## Vérifications — 5 octobre 2026

Tests Node des modules réels, sans dépendance installée : coût unique, refus de fonds insuffisants, trois paliers, avance à l’augmentation, paiements périodiques, bonus/arrondis, immutabilité, fractionnement du temps, priorité de la paie, suspension sans dette supplémentaire et reprise explicite. Un profil synthétique vérifie la séparation des statistiques.

Tests DOM/horloge simulés : portraits, textes, boutons, salaire périodique, pause partielle, un seul timer, clics et cours sans report du service. Pour tester les commandes d’impayé, le harness utilise un prix synthétique de 1 centime : 19 ventes avant la paie, état suspendu, paiement désactivé puis activé par les ventes manuelles, règlement unique et reprise. Ce prix n’a pas été injecté dans le navigateur, ni enregistré dans le jeu.

Les suites existantes de 10 000 clics exacts et du marché Arabica passent aussi. Audit des chemins : 19 fichiers attendus, 16 CSS liées séparément, 10 imports, 6 projets et 53 références médias préservés.

Navigateur local : embauche à 30 $, production et paie après plus d’une minute réelle. À 40 cafés (10 manuels avant achat, 30 automatiques), caisse de 87 $ : 90 $ de ventes moins une paie de 3 $. Évolutions observées, images chargées, statistiques mises à jour ; dernière augmentation avec Entrée, focus rendu à la préparation et palier maximum désactivé.

Fermeture/réouverture après la dernière évolution : 24 cafés, 26,40 $ et 44 secondes restantes conservés pendant la pause, sans perte du palier. Contrôles DOM à 320/390/820 px : aucune largeur débordante, panneau d’équipe sans débordement, personnage dans la scène et bas de la tasse inchangé à 72,5 %. Viewport restauré. Capture ordinateur du palier final réalisée ; aucune erreur console observée. La visibilité d’onglet et le déficit sont testés avec le DOM simulé, pas par un changement réel d’onglet ou une manipulation de la partie du navigateur.

L’impayé est validé en tests de logique et DOM simulé, pas par un déficit réel dans le navigateur. Pas de test sur téléphone physique, d’équilibrage complet, de sauvegarde de partie ni de déploiement distant.
