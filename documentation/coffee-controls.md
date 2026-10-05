# Coffee Empire — commandes toujours accessibles

## Demande et choix d’interface

Nour demande de pouvoir jouer, payer et faire évoluer les personnages sans devoir descendre la page. Une barre fixe au bas de l’écran regroupe la caisse, la préparation manuelle et les commandes individuelles de l’étudiant et de la barista. Les boutons existants sont déplacés : aucun doublon et aucune deuxième logique de transaction.

Les fiches de statistiques, les descriptions, les conditions d’évolution et le panneau du marché restent consultables en descendant la page. La barre reste visible pendant cette consultation et disparaît au retour au portfolio. Cette étape ne transforme pas toute la page en écran unique sans défilement.

## États et règles conservés

- Avant recrutement : bouton d’embauche avec coût, désactivé si la caisse est insuffisante.
- Après recrutement : niveau et délai avant la prochaine paie, bouton d’évolution avec coût. L’évolution de la barista reste à venir, sans nouvelle tenue inventée.
- En cas d’impayé : mention « Travail suspendu » et bouton de règlement à la place de l’évolution ; il s’active lorsque la caisse permet de payer.
- Après recrutement ou paiement au clavier : le focus revient au bouton de préparation lorsqu’un bouton disparaît.
- Une caisse, une seule horloge et les règles existantes de salaire, de pause et de suspension individuelle. Aucun changement de prix, bonus, cadence ou coût.

## Réalisation

- `index.html` : une région « Commandes du café », deux groupes nommés pour l’équipe ; les commandes sont retirées des fiches détaillées.
- `css/components/coffee-dock.css` : grille de trois colonnes sur ordinateur ; préparation puis deux colonnes d’employés sur petit écran. Cibles d’au moins 44 px, contour de focus et espace réservé pour l’encoche inférieure.
- `js/components/coffee-counter.js` : mêmes opérations pures et même état, recherche des actions dans la barre associée au profil. Mise à jour de la caisse et des délais dans la barre.
- `ResizeObserver` mesure la hauteur effective de la barre. La variable `--coffee-dock-height`, déclarée dans `css/variables.css`, réserve cet espace au bas de la section et aux éléments ciblés pour éviter de masquer le dernier contenu.
- Aucune dépendance, image générée, sauvegarde de partie, commit ou publication ajoutée.

## Vérifications

Tests Node : anciennes suites clics, marché, progression et équipe réussies. Le harness d’interface est aussi exécuté avec `--dock`, où les boutons ne sont plus dans les fiches : embauche, évolution, affichage synchronisé de la caisse, impayé individuel, règlement, reprise, focus et pauses réussis. Le paiement impayé est vérifié en simulation, pas en forçant un faux cours dans le navigateur.

Navigateur local : préparation, embauche des deux personnages et évolution de l’étudiant avec Entrée, tout en conservant `scrollY = 0`. Les trois actions visibles restent intégralement dans le viewport. Tailles 320 × 480, 390 × 844, 820 × 480 et 1280 × 360 : aucun débordement horizontal, boutons d’au moins 44 px, hauteur réservée synchronisée (environ 195 px sur petit écran, 119 px sur ordinateur). Aucune erreur console. Il s’agit de viewports simulés, pas de tests sur des téléphones physiques ni d’un audit d’accessibilité exhaustif.

Audit d’arborescence : 17 feuilles CSS liées séparément, 10 imports locaux, 6 projets et 53 références de médias existantes. Les portraits, la tasse et le décor restent inchangés.
