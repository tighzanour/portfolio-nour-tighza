# Coffee Empire — identité, comptoir et évolution de l’étudiant

## Demande et périmètre

Brief fourni par Nour : clicker / tycoon, du petit café artisanal à un empire industriel, références illustrées aux formes facettées. Avancer étape par étape sous sa direction. Choix de départ confirmé : « palette et logo ».

Le logo pixel art généré a été validé par Nour (« parfait je valide »), puis intégré. Nour a choisi « un comptoir face au joueur », demandé de réduire la tasse et de replacer la soucoupe, puis validé le résultat (« parfait, on continue »). La palette n’a pas été validée séparément. La boucle manuelle est jouable et utilise désormais un prix indexé sur le dernier cours Arabica disponible via Buon Ma Thuot Coffee : base de 3 $ au cours de référence, 20 % du prix suivant les grains. Ce modèle reste provisoire. Nour a choisi un employé comme première amélioration : une embauche à 30 $ du jeu déclenche un service automatique toutes les 3 secondes lorsque le jeu est visible. Coût et cadence proposés par l’assistant, encore provisoires. Pas de sauvegarde de progression ; seul le dernier cours est conservé localement. Ce n’est pas un flux en temps réel.

## Traduction du brief

- Palette naturelle issue des valeurs suggérées : nuit, espresso, café, caramel, latte, crème et or. Les aplats, plutôt que les dégradés, reprennent la simplicité des références.
- Texte secondaire éclairci de `#9C938B` à `#B8ABA0`. Sauge et brique éclaircie réservées aux futurs états de l’interface. Caramel et latte sont des couleurs d’illustration, pas des couleurs de petit texte sur crème.
- Première exploration CSS/SVG : grain architectural et wordmark Special Elite/Manrope. Remplacée à l’écran après la nouvelle demande utilisateur ; l’ancien SVG est conservé uniquement comme brouillon récupérable, pas comme logo validé.
- Nouvelle direction explicitement demandée avec trois références : rendu pixel art, textures rétro, éclairage ambré, interfaces beige/café. Elle prend le relais de la première direction facettée sans pixel art.
- Logo généré via l’outil imagegen intégré : tasse, grain, vapeur en couronne et lettres « COFFEE EMPIRE ». L’image complète est intégrée telle que validée, sans retouche, recoloration ni nouvelle génération.
- Deux présentations du même PNG transparent sur fonds espresso et crème. Aucune icône/favicon simplifiée de ce nouveau logo n’a été créée. Le favicon du portfolio n’est pas remplacé.

## Composants réutilisables

Tokens `--coffee-*` centralisés dans `css/variables.css`, PNG local `assets/images/coffee-empire-logo-v1.png`, composant responsive `.coffee-brand__logo` et présentations dans `css/components/coffee-brand.css`. Copie binaire identique à l’original généré (SHA-256 : `B7D1A3D526E653F0984AF42FA917CB637445E6CD6C564563A00653E7383682A2`). L’identité est isolée des six projets du portfolio. Aucune dépendance ni police ajoutée.

## Logique de prompts réellement suivie

1. Brief détaillé et références fournis par l’utilisateur.
2. Réduction du périmètre au choix utilisateur : « palette et logo ».
3. Interprétation proposée par l’assistant : tons café et grain architectural, sans mécanique.
4. Implémentation d’une planche de validation dans la section IA.
5. Nouvelle demande : « pour le logo, génère une image dans le style des image que je t’envoie, puis montre le moi avant de valider » ; trois références pixel art fournies.
6. Génération d’une seule proposition, montrée sans modification du site : tasse, vapeur en couronne et texte COFFEE EMPIRE, palette café/crème/ambre, fond transparent, rendu pixel art plutôt que logo vectoriel lisse. Les images sont des références stylistiques, pas des cibles à modifier.
7. Validation utilisateur : « parfait je valide ».
8. Intégration du PNG validé dans IA, remplacement de la proposition CSS/SVG à l’écran et maintien du scarabée du portfolio. Aucune nouvelle étape de gameplay lancée.
9. Proposition d’un écran purement visuel, puis choix utilisateur « un comptoir face au joueur ».
10. Génération séparée du café et de la tasse, puis composition avec une interface HTML/CSS : aucun texte ni HUD intégré aux images. Bouton de préparation explicitement désactivé, compteurs non implémentés, logo et palette conservés dans un volet.
11. Retour utilisateur illustré : tasse trop grosse et assiette mal placée. Ajustement CSS uniquement : largeur 22 % sur ordinateur / 30 % sur mobile et ancrage inférieur 27,5 %. Images conservées telles quelles.
12. Validation et demande de poursuivre : « parfait, on continue ». L’assistant annonce une étape limitée au premier clic, avec 3 $ par café à titre provisoire, sans amélioration ni automatisation.
13. Implémentation d’une seule action partagée par la tasse et le bouton : incrément des cafés servis et de la caisse, retour visuel discret à l’appui et message accessible. Vérifications de la boucle, du clavier et de la navigation avant la prochaine décision utilisateur.
14. Demande d’un prix influencé par le marché, puis contraintes Arabica et gratuité totale. Distinction du cours des grains et du prix de la tasse ; proposition d’un modèle de jeu à 80 % fixes / 20 % indexés. Les premières recherches de l’assistant ne trouvent pas de flux gratuit vérifié approprié.
15. Nour fournit la piste Buon Ma Thuot Coffee, avec API publique et dernier cours disponible. Vérification directe : JSON réel plat, CORS autorisé, 3,249 USD/lb daté du 27 septembre. La donnée est ancienne, même si le fournisseur emploie des termes « live ».
16. Connexion directe gratuite, attribution cliquable, âge affiché, indexation documentée, cache et pause lorsque le jeu est caché. Aucun faux mouvement du marché ajouté. La validation de la mécanique reste distincte de la vérification technique de l’API.
17. Après « parfait, on continue », choix demandé entre un moulin améliorant les clics et un employé automatisant le service. Réponse utilisateur : « Employé : sert des cafés automatiquement ».
18. Proposition annoncée : une embauche à 30 $ du jeu, un café toutes les 3 secondes au prix courant, pause hors IA/onglet caché et aucun gain hors ligne. Implémentation limitée à cette amélioration, sans nouveaux assets ni catalogue complet. Le choix d’un employé est confirmé, mais l’équilibrage chiffré reste à valider.
19. Prochaine étape choisie par Nour : « ajouter un barista ». Génération d’un sprite transparent assorti au café, puis affichage conditionnel après l’embauche. Le décor et la tasse ne sont pas retouchés ; un calque du décor masque le bas du tablier pour conserver la profondeur. Pas de nouvelle mécanique ou animation.
20. Nour rejette ce style et précise la nouvelle direction avec trois références : buste, pixel art, vêtements simples et élégants, jeune étudiant peu motivé mais attachant. Une première proposition est simplifiée en pixels plus gros, puis validée : « parfait! ». Le sprite affiché est remplacé par cette version sans modifier les règles ; [les deux prompts exacts](coffee-student-prompts.md) documentent cette itération.

## Étape 02 — maquette du comptoir

Deux assets originaux générés avec l’outil imagegen intégré, sans retouche des références ni du logo :

- `assets/images/coffee-counter-v1.png` : décor frontal, 1672 × 941, centre du comptoir laissé libre.
- `assets/images/coffee-cup-v1.png` : tasse et soucoupe sur fond transparent, 1402 × 1122, dessin inspiré de la tasse du logo validé.

Les PNG sont copiés à l’identique depuis les sorties générées. L’image de fond est recadrée au centre sur mobile, sans déformation ; la tasse reste un élément indépendant. Cette étape était une maquette BEM sans gameplay ; le composant a ensuite été rendu interactif à l’étape 03. Les fonds et textes utilisent les tokens café existants.

Les sources générées font environ 2,6 Mo au total. Une déclinaison optimisée des médias pourra être faite après validation visuelle ; cette étape ne prétend pas à une optimisation finale des assets.

Les deux prompts réellement envoyés et les empreintes des images sont conservés dans [les prompts du comptoir](coffee-counter-prompts.md). Aucun faux historique de prompts n’a été ajouté.

## Étape 03 — le premier café

`js/components/coffee-counter.js`, initialisé une seule fois depuis `js/main.js`, isole la logique du jeu des composants du portfolio. L’état commence à zéro ; `serveCoffee` produit un nouvel état et ajoute 300 centimes par café. Les sommes restent entières en centimes. Le symbole $ est une monnaie de jeu, pas une recette réelle ni un résultat commercial.

- Tasse et bouton utilisent le même gestionnaire ; commandes natives accessibles avec souris, Entrée et Espace.
- Prix provisoire affiché dans le troisième emplacement, à la place d’une production par seconde qui n’existe pas encore.
- Message `role="status"` / `aria-live="polite"` annonçant le service ; focus visible et petit effet d’appui désactivé avec `prefers-reduced-motion`.
- État uniquement en mémoire : quitter/réouvrir IA conserve la partie, recharger la page remet les compteurs à zéro. Aucun timer, stockage, réseau ou dépendance ajouté.
- La position validée n’est pas modifiée : l’effet d’appui porte sur l’image interne, pas sur l’ancrage de la soucoupe.

### Vérifications du 5 octobre 2026

Test de la fonction réelle : premier service, absence de mutation de l’état initial, 10 000 services = 10 000 cafés / 3 000 000 centimes, aucun timer ni stockage. Dans le navigateur local : 10 actions (tasse, Entrée, Espace, bouton) = 10 cafés / 30 $ ; retour et Échap restituent le focus à IA ; après réouverture, un clic donne 11 cafés / 33 $, sans double gestionnaire ; après rechargement, zéro. Aucune erreur console observée.

Rendu ordinateur observé et capturé. Géométrie contrôlée à 320, 390 et 820 px : aucune largeur débordante, tasse dans la scène et bas à 72,5 % de la hauteur comme avant. Le responsive est vérifié par DOM ; pas de validation visuelle complète sur téléphone réel. La réduction du mouvement est prévue dans le CSS, sans test du réglage système. Audit arborescence/chemins réussi : 14 feuilles CSS, 8 imports, 6 projets inchangés. Pas de publication distante effectuée.

## Étape 04 — connexion gratuite au marché

La source et l’intégration sont documentées dans [Coffee Empire — marché Arabica](coffee-market.md). L’API publique fonctionne dans le navigateur, sans clé ni serveur supplémentaire. Le cours reçu lors du test du 5 octobre est ancien : le panneau l’indique et conserve la date originale. Le prix du jeu est calculé par un modèle provisoire, pas assimilé au prix d’une tasse réellement vendue dans un café. Les contrôles de cache, réseau, visibilité et ventes à prix différents ont été testés sans ajouter de production automatique.

## Étape 05 — le premier barista

`hireEmployee` refuse l’achat si la caisse contient moins de 3 000 centimes ou si l’employé est déjà engagé. Sinon, il produit un nouvel état, déduit une seule fois le coût et conserve le total des cafés. La carte BEM dédiée (`coffee-staff.css`) affiche l’état, le rythme, le gain courant et le montant manquant. Cette première version n’ajoutait aucun personnage graphique ; son intégration est décrite ci-dessous.

La production utilise un seul `setTimeout` de 3 secondes, réarmé après chaque service. Elle appelle la même fonction `serveCoffee` que les clics, avec le prix courant. Un clic manuel ou une nouvelle cotation ne repousse pas le service ; les recettes antérieures ne sont jamais recalculées. Les services automatiques mettent à jour les compteurs sans répéter une annonce vocale toutes les 3 secondes. Après l’embauche, le focus revient au bouton de préparation puisque le bouton acheté devient désactivé.

Fermer IA ou cacher l’onglet supprime le timer. À la reprise, le premier service arrive après 3 secondes, sans compensation du temps écoulé. La partie reste uniquement en mémoire : quitter/réouvrir conserve caisse et employé, recharger les remet à zéro. Aucun calcul hors ligne, salaire récurrent, niveau supplémentaire ou sauvegarde de partie.

### Vérifications du 5 octobre 2026 — employé

Tests du module réel avec DOM et horloge simulés : fonds insuffisants, achat unique, déduction exacte, immutabilité, premier service à 3 secondes, clics simultanés, changement de prix sans réévaluation ni report du timer, pause IA/onglet, reprise sans rattrapage, initialisation unique et absence de stockage/réseau dans le composant. Les tests existants des clics et du marché passent également.

Dans le navigateur local : 10 cafés à 3 $ permettent l’embauche ; la caisse passe de 30 $ à zéro, puis à 3 $ après le premier service. Embauche avec Entrée et restitution du focus à la préparation vérifiées. Après fermeture, 11 cafés / 3 $ restent inchangés ; réouverture sans gain immédiat, puis service automatique et clic manuel donnent 13 cafés / 9 $. Rechargement : zéro et aucun employé. Aucune erreur console observée. Géométrie DOM à 320, 390 et 820 px sans débordement ; bas de la tasse toujours à 72,5 % de la scène. La visibilité d’onglet a été testée avec le DOM simulé, pas par un changement réel d’onglet. Pas de validation sur téléphone réel, de test prolongé ni de publication distante.

## Personnage du barista — après embauche

Un PNG transparent généré avec imagegen, sans CLI ni retouche, est intégré dans `assets/images/coffee-barista-v1.png`. Le [prompt exact et l’empreinte du fichier](coffee-barista-prompt.md) sont conservés pour montrer la démarche. Le personnage est statique : pas d’animation de préparation à cette étape. Il est absent avant l’achat, visible dès l’embauche et conservé à la réouverture ; au rechargement, il est de nouveau masqué comme l’employé non sauvegardé.

Le calque du personnage passe derrière une copie du décor découpée au niveau du comptoir. Cette copie utilise le même fichier, sans nouvel asset de fond. Tasse et message restent au premier plan ; les deux calques décoratifs ont `pointer-events: none`. Images du décor, de la tasse et du logo inchangées. Cette première apparence a ensuite été rejetée ; l’étudiant en buste `coffee-student-v1.png`, simplifié en gros pixels, est désormais la version validée et affichée. L’ancien sprite reste un brouillon conservé.

Vérifications du 5 octobre : alpha transparent au coin et copie identique à la sortie générée, tests logique/clics/marché réussis, personnage masqué avant achat et visible après embauche au clavier. Image chargée en dimensions natives 1145 × 1374, rendu ordinateur capturé, clic sur la tasse toujours fonctionnel, maintien à la réouverture et disparition au rechargement. Aucune erreur console observée. DOM à 320, 390 et 820 px : personnage dans la scène, aucune largeur débordante et tasse toujours ancrée à 72,5 %. Pas de validation visuelle sur téléphone réel ni d’animation testée puisqu’elle n’existe pas.

## Étape 06 — évolution et salaires

Nour demande des personnages avec statistiques propres et changement de vêtements lors d’une hausse de salaire. Il précise : « suspendre son travail jusquau paiement, continue ». L’étudiant obtient trois paliers ; les profils sont séparés des règles pour accueillir plus tard d’autres employés. Aucun second personnage n’est ajouté à cette étape.

Réglages proposés et provisoires : 3/6/12 $ par minute active, services à 3/2,5/2 secondes et bonus automatique de 0/5/10 %. Une hausse verse immédiatement la nouvelle paie et relance le cycle de 60 secondes. Si la caisse est insuffisante, une seule paie reste due ; les services s’arrêtent jusqu’au bouton de règlement, sans dette supplémentaire. Les deux horloges conservent désormais leur progression partielle pendant les pauses, sans temps hors ligne.

Les nouvelles tenues sont dérivées du buste validé : pull vert/cravate et veste sombre, transparents. Décor, tasse, logo et portrait de départ conservés. Les tests de logique, DOM/horloge, clics et marché passent ; paie périodique et changements visuels observés dans le navigateur. Les règles exactes, prompts, empreintes et limites sont détaillés dans [la documentation de progression](coffee-staff-progression.md). Les sections précédentes décrivent les versions historiques, avant l’ajout des salaires.

## Étape 07 — la barista chaleureuse

Nour choisit un deuxième personnage chaleureux et énergique, avec référence, puis valide le portrait : « oui c’est bien ». Le PNG est intégré tel quel. Première mécanique proposée : embauche 60 $, salaire 6 $ par minute active, service toutes les 4 secondes et bonus de 25 % sur ses cafés seulement. Sa tenue de départ est validée ; ses paliers suivants restent à définir.

Elle peut travailler avec l’étudiant. Deux cartes partagent une caisse et une horloge chronologique, mais conservent leurs propres paies, statistiques et suspensions. Les tenues et évolutions étudiantes sont préservées. Les tests de logique, DOM, marché, clics, pause et responsive sont exécutés ; paie barista observée après plus d’une minute réelle. Détails, prompt et limites dans [la documentation de la barista](coffee-warm-barista.md). Le périmètre « un seul employé » décrit plus haut est historique, avant cette étape.

Ce document décrit les décisions et tests réels ; il ne prétend pas à une économie équilibrée, à un flux en temps réel, un tycoon complet ou une validation de tous les futurs assets.
