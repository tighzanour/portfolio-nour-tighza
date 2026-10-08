# Contrôles qualité du portfolio

Vérifications du 8 octobre 2026. Ce rapport distingue les tests exécutés des éléments restant à confirmer ; ce n'est pas un audit complet.

## Contrôle reproductible

Depuis la racine du dépôt : `node scripts/check-projects.mjs` (Node.js, aucune dépendance externe).

Résultat exécuté : **9 contrôles réussis, 6 projets et 53 références de médias locaux**.

- Le chargeur réel accepte les données actuelles et les résumés courts.
- Un résumé absent se replie sur la description complète.
- Les résumés vides ou de mauvais type sont rejetés.
- Les identifiants dupliqués, un JSON qui n'est pas un tableau et une réponse HTTP en erreur sont rejetés.
- Les chemins de médias référencés restent dans le dépôt et les fichiers existent.

Le script simule `fetch` dans le test seulement. Il ne modifie ni le JSON ni les fichiers et ne remplace pas une vérification réseau dans le navigateur.

## Structure et navigateur

- Contrôle de structure local exécuté : 11 feuilles CSS liées individuellement, 7 imports JavaScript locaux et 53 références de médias vérifiés ; aucune utilisation de `@import` CSS.
- `git diff --check` : aucune erreur de whitespace.
- Aperçu navigateur à 1280px : six cartes de même hauteur (environ 481px), résumés courts affichés, pas de débordement horizontal de la page.
- À 390px : grille de deux colonnes, six cartes de même hauteur (environ 306px), pas de débordement horizontal.
- Forward : ouverture de la fiche testée sur ordinateur et mobile ; la description complète reste affichée.
- Fermeture avec Échap sur ordinateur : la fiche se ferme et le focus retourne au bouton de Forward.
- Livre à 390px : pages inactives en `display: none`, hauteur liée au contenu, passage à la double page 2 et retour en haut du livre vérifiés.
- Aucun message console d'erreur ou d'avertissement recueilli dans l'aperçu de test.

## Limites et vérifications avant le jury

- La lecture vidéo a signalé « Unable to play media » dans le navigateur intégré : elle n'est pas validée. Le gameplay et l'extrait du mur de feu sont en H.264 / yuv420p selon ffprobe ; cela ne suffit pas à garantir leur lecture. Tester avec Go Live dans Chrome ou Edge avant le jury et prévoir les captures du projet en secours.
- Le contrôle des chemins prouve l'existence des fichiers, pas la qualité visuelle, le décodage ou la pertinence de leurs crédits.
- Les captures PNG exportées depuis Figma restent absentes de `exports-composants/` ; aucun export fictif n'a été ajouté.
- Aucun audit WCAG complet, test de lecteur d'écran ou benchmark de performance n'a été exécuté ici.
- Le code source Godot de Forward n'est pas audité dans ce dépôt Web.
- Ces ajustements sont locaux : aucun commit, push ou déploiement GitHub Pages n'est effectué automatiquement.
