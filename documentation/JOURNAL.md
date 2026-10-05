# Journal de bord — Portfolio

## Coffee Empire — barre de commandes fixe — 2026-10-05

**Demande :** préparer, payer et faire évoluer les personnages sans devoir descendre la page.

**Résultat :** commandes déplacées, sans doublons, dans une barre fixe : caisse, préparation, embauche/évolution/règlement par personnage, niveau et prochaine paie. Fiches et marché restent consultables en dessous. Barre masquée hors IA, hauteur mesurée et réservée pour ne pas couvrir le dernier contenu. Économie, portraits, tasse et décor inchangés ; aucune dépendance, nouvelle image, sauvegarde, publication ou commit.

**Validation :** suites existantes et harness avec boutons déplacés réussis, y compris impayé/règlement/focus/pauses en simulation. Navigateur : préparation, recrutements et évolution avec Entrée sans changer `scrollY = 0` ; viewports 320 × 480, 390 × 844, 820 × 480 et 1280 × 360 sans débordement, actions entièrement visibles et cibles d’au moins 44 px. Aucune erreur console ; arborescence 17 CSS / 10 imports / 6 projets. Détails et limites dans [coffee-controls.md](coffee-controls.md). Paiement en déficit non provoqué dans le navigateur ; pas de téléphone physique ou d’audit d’accessibilité exhaustif.

## Coffee Empire — barista chaleureuse et équipe — 2026-10-05

**Demande :** personnage chaleureux et énergique inspiré de la référence fournie, dans le style pixel art de l’étudiant. Portrait présenté seul puis validé : « oui c’est bien ».

**Résultat :** PNG validé intégré tel quel, deuxième carte et embauche indépendante. Réglages proposés : coût 60 $, salaire 6 $ par minute active, service toutes les 4 secondes, bonus de 25 % sur ses propres ventes. Étudiant conservé avec ses trois tenues. Deux personnages peuvent travailler ensemble, une caisse et une horloge communes mais cadences/paies/suspensions individuelles. Échéances traitées chronologiquement, paies avant services simultanés ; priorité provisoire étudiant puis barista si fonds limités. Évolution de la barista clairement annoncée à venir, sans inventer de tenues. Pas de sauvegarde, nouvelle image, dépendance, commit/push ou déploiement.

**Validation :** tests des deux profils, caisse, bonus/arrondis, paies simultanées, suspension individuelle, reprise et absence de financement par ventes futures réussis. DOM simulé deux cartes/focus/pauses/timer unique et anciennes suites clics/marché/progression réussis. Navigateur : achat barista seule avec Entrée, image chargée, ventes et paie réelle de 6 $ ; étudiant ajouté sans réinitialiser sa collègue. Pause commune conserve caisse/cafés/délais individuels. DOM 320/390/820 px sans débordement ni chevauchement, tasse inchangée. Aucune erreur console. Prompt, fichier et règles documentés dans [coffee-warm-barista.md](coffee-warm-barista.md). Déficits et onglet caché testés en simulation seulement ; chiffres encore provisoires, pas de téléphone réel ou d’équilibrage complet.

## Coffee Empire — évolution et salaires — 2026-10-05

**Demande :** personnages avec statistiques propres, hausse de salaire accompagnée d’une nouvelle tenue ; choix confirmé de suspendre le travail jusqu’au paiement en cas d’impayé.

**Résultat :** trois paliers pour l’étudiant seulement. Réglages provisoires annoncés : 3/6/12 $ fictifs toutes les 60 secondes actives, services à 3/2,5/2 secondes et bonus de 0/5/10 %. Nouvelle paie versée immédiatement à l’augmentation ; impayé unique, arrêt et bouton de règlement explicite, sans dette accumulée. Profils et opérations pures dans `coffee-staff.js`, une seule horloge dans le compteur. Pause sans gain hors ligne, fractions de temps conservées. Deux tenues générées avec imagegen depuis le portrait validé, sans remplacer le décor, la tasse ou le logo. Pas de sauvegarde, de dépendance, de commit/push ou de publication.

**Validation :** suites Node de progression, UI/horloge, marché et clics réussies, notamment suspension/paiement via fixture synthétique de 1 centime (jamais injectée dans le navigateur). Navigateur : paie après une minute réelle, passage des deux tenues, statistiques et hausse avec Entrée, focus rendu au bouton de préparation. Pause IA vérifiée avec caisse/cafés/temps restant conservés ; DOM 320/390/820 px sans débordement et tasse inchangée. Capture ordinateur du dernier palier, aucune erreur console. Impayé non provoqué dans le navigateur ; onglet caché testé en simulation seulement. Audit 16 CSS / 10 imports / 6 projets ; nouveaux PNG 1122 × 1402 avec alpha transparent. Prompts, règles, empreintes et limites dans [coffee-staff-progression.md](coffee-staff-progression.md). Les tenues dérivées attendent l’appréciation esthétique de Nour ; les chiffres ne sont pas un équilibrage final.

## Coffee Empire — intégrer l’étudiant validé — 2026-10-05

**Retour :** premier barista rejeté. Trois références précisent un personnage cadré au torse, pixel art, vêtements simples et élégants, jeune étudiant peu motivé et attachant. Première génération trop détaillée, puis simplification en gros pixels. Nour valide la seconde version : « parfait! ».

**Résultat :** copie transparente identique de la version validée dans `assets/images/coffee-student-v1.png`, remplaçant uniquement l’image affichée. Ancien barista conservé comme brouillon non affiché. Aucun changement de taille ou placement de la tasse, décor, logo, prix, coût d’embauche ou cadence de production. Personnage statique ; son attitude n’ajoute aucune pénalité de rendement. Prompts exacts de création et de simplification dans `coffee-student-prompts.md` ; aucune nouvelle génération après validation, commit ou push.

**Validation :** 1122 × 1402, alpha nul au coin et empreinte de la copie vérifiée. Tests clics/marché/employé et audit structure réussis : 16 CSS / 9 imports / 6 projets. Navigateur : masqué avant achat, embauche au clavier révèle le bon fichier chargé, production automatique et préparation avec Entrée fonctionnelles, rechargement masque le personnage, aucune erreur console. DOM 320/390/820 px sans débordement, personnage dans la scène et tasse inchangée. Pas de test sur téléphone réel ni publication distante.

## Coffee Empire — personnage du barista — 2026-10-05

**Demande :** « ajouter un barista », visible derrière le comptoir après l’embauche.

**Résultat :** sprite PNG transparent généré avec imagegen intégré, chemise crème, tablier brun et lumière ambrée. Original conservé, copie binaire sans retouche dans `assets/images/coffee-barista-v1.png`. Apparition liée à l’état réel `employeeHired`, sans nouvelle mécanique. Calque du décor existant pour occulter le bas du tablier ; tasse et message au premier plan, calques visuels non cliquables. Pas d’animation, nouveaux frais, sauvegarde, dépendance, commit ou push. Prompt exact et empreinte dans `coffee-barista-prompt.md`.

**Validation :** image 1145 × 1374, alpha nul au coin. Tests des clics, du marché et de l’employé réussis ; vérifications supplémentaires de l’image masquée avant achat et affichée après. Navigateur : embauche avec Entrée révèle le personnage, image chargée, rendu ordinateur observé/capturé, tasse toujours cliquable, personnage conservé à la réouverture et masqué au rechargement, aucune erreur console. DOM responsive 320/390/820 px sans débordement, personnage dans la scène, tasse inchangée. Arborescence 16 CSS / 9 imports / 6 projets et chemins valides. Pas de validation sur téléphone réel ni publication distante. Apparence en attente de validation utilisateur.

## Coffee Empire — premier employé — 2026-10-05

**Choix :** « Employé : sert des cafés automatiquement », comme première amélioration. Réglage annoncé par l’assistant et provisoire : une embauche à 30 $ du jeu, un café toutes les 3 secondes au prix courant. Pas de nouveaux personnages ou assets, sauvegarde ou économie complète.

**Résultat :** carte BEM séparée, fonds nécessaires affichés, embauche unique et déduction en centimes. Production automatique et clics partagent la même fonction ; le prix Arabica existant continue de s’appliquer sans réévaluer les recettes. Un seul timer, pause hors IA/onglet caché, reprise après 3 secondes sans rattrapage. Compteurs actualisés sans annonces vocales répétées ; après achat, focus rendu à la préparation. Au rechargement, caisse et employé repartent à zéro. Documentation des prompts et limites mise à jour ; aucun commit/push.

**Validation :** tests logique/DOM/horloge simulés réussis : fonds insuffisants, achat unique, coût exact, services à 3 secondes, clics simultanés, changement de prix, pause et reprise sans rattrapage. Tests des clics et du marché également réussis. Navigateur : 10 cafés / 30 $, embauche au clavier → zéro, premier service → 11 cafés / 3 $ ; fermeture conserve ces valeurs, réouverture sans gain immédiat, service puis clic → 13 cafés / 9 $. Focus clavier et retour à zéro au rechargement observés, aucune erreur console. DOM responsive 320/390/820 px sans débordement, tasse inchangée. Audit structure : 16 CSS / 9 imports / 6 projets. Visibilité d’onglet simulée seulement ; pas de test prolongé, sur téléphone réel ou de publication distante.

## Coffee Empire — API gratuite Arabica — 2026-10-05

**Demande :** cours influençant le prix de la tasse, Arabica uniquement et gratuité totale. Nour propose l’API publique Buon Ma Thuot Coffee, avec attribution et dernier cours disponible plutôt que tick par tick.

**Vérification avant intégration :** endpoint effectivement testé, HTTP 200 / JSON / CORS `*`, aucune clé. Réponse plate différente de l’enveloppe de la documentation. Arabica 3,249 USD/lb, daté du 27 septembre 2026 à 03:45 UTC, donc ancien le jour du test. Ne pas présenter cette réponse comme du temps réel ; exactitude non vérifiée indépendamment auprès d’ICE.

**Résultat :** `coffee-market.js` et CSS BEM séparé, attribution cliquable, source/date/unité/variation et avertissement d’ancienneté. Appel au premier accès et toutes les 30 minutes uniquement si IA et l’onglet sont visibles ; requêtes interrompues à la fermeture, délai maximal 8 secondes, limitation manuelle 15 secondes. Seul le cours est mis en cache. Modèle provisoire annoncé : 240 centimes fixes + 60 × cours / 3,249, arrondi ; caisse et ventes passées jamais réévaluées. Sans cours utilisable, secours fictif de 3 $ explicitement non connecté. Aucun abonnement, clé, serveur, bibliothèque, image, commit ou push ajouté.

**Validation :** test du vrai module avec DOM simulé : formats, valeurs/dates/unités invalides, 300/306/294 centimes, ventes à prix différents, cache/panne/HTTP 429/réponse antérieure, limitation et pause visibilité. Requête navigateur réellement réussie, cours/date/avertissement/source observés. Trois actions souris/Entrée/Espace donnent 3 cafés / 9,00 $ ; retour/réouverture conserve l’état et rechargement remet la caisse à zéro en conservant le cours. Aucune erreur console. Rendu ordinateur capturé, DOM responsive 320/390/820 px sans débordement, ancrage de la tasse conservé. Audit 15 CSS / 9 imports / 6 projets, syntaxe JS et `git diff --check` réussis. Pas de test sur téléphone réel, de panne navigateur réelle, de période réelle de 30 minutes ou de publication distante. Détails et limites dans `coffee-market.md`.

## Coffee Empire — première boucle manuelle — 2026-10-05

**Demande :** « parfait, on continue », après ajustement du placement de la tasse. Le visuel est ainsi validé ; poursuite annoncée limitée à la première action, avec un prix provisoire de 3 $ par café.

**Résultat :** tasse devenue bouton natif sans changer sa taille ni son ancrage ; commande « Préparer un café » activée, même gestionnaire pour les deux. Compteurs caisse/cafés réels et prix affiché. État isolé dans `coffee-counter.js`, calcul en centimes, message accessible, focus visible et effet d’appui compatible avec la réduction du mouvement. Aucune amélioration, automatisation, sauvegarde, dépendance, nouvelle image, commit ou publication.

**Validation :** test de la fonction réelle sur 10 000 services : 10 000 cafés et 3 000 000 centimes, état initial non muté. Navigateur local : 10 actions avec souris, Entrée et Espace = 10 cafés / 30 $ ; quitter puis réouvrir conserve la partie et le clic suivant donne 11 / 33 $, sans double comptage ; Échap rend le focus à IA ; rechargement remet les compteurs à zéro. Rendu ordinateur observé/capturé, pas d’erreur console. Géométrie DOM à 320/390/820 px sans débordement et placement conservé (bas à 72,5 %). Audit des chemins/arborescence réussi : 14 CSS, 8 imports et 6 projets. Syntaxe JS et `git diff --check` réussis. Pas de validation sur téléphone réel ni du réglage système de réduction des mouvements. Boucle et prix à tester/valider par Nour avant la prochaine étape.

## Coffee Empire — taille et appui de la tasse — 2026-10-05

**Demande :** réduire le café jugé trop gros et placer correctement la soucoupe sur le comptoir, à partir de la capture annotée fournie.

**Résultat :** largeur du sprite passée de 28 % à 22 % sur ordinateur et de 38 % à 30 % sur mobile (environ 21 % de réduction). Ancrage inférieur remonté de 23 % à 27,5 % : la soucoupe reste sur la zone claire du plateau, en retrait du rebord avant. Modification CSS uniquement, images et logo inchangés, cache de la feuille incrémenté ; aucune mécanique ajoutée.

**Validation :** rendu ordinateur observé et capturé ; bas du rectangle de l’image à 72,5 % de la scène, le bord opaque de la soucoupe étant encore légèrement au-dessus grâce à la marge transparente. Géométrie mobile vérifiée à 320 et 390 px : placement proportionnel conservé, largeurs défilables égales aux largeurs utiles (305 et 375 px). Aucune erreur console observée. Audit des chemins/arborescence et `git diff --check` réussis. Validation esthétique utilisateur en attente.

## Coffee Empire — premier comptoir statique — 2026-10-04

**Choix utilisateur :** après proposition d’un premier écran uniquement visuel, « un comptoir face au joueur ». Conserver le style pixel art du logo validé, sans commencer la mécanique du clicker.

**Résultat :** génération via imagegen de deux assets séparés : café frontal avec centre libre, puis tasse crème transparente inspirée du logo. Copie locale identique aux originaux et composition HTML/CSS responsive dans `coffee-counter.css`. Emplacements de caisse, cafés servis et production affichés avec tirets, valeurs accessibles « Non implémenté(e) ». Préparation désactivée avec mention explicite. Logo validé et palette conservés dans un volet accessible au clavier. Prompts exacts consignés dans `coffee-counter-prompts.md`. Aucun nouveau JS, économie, timer, sauvegarde, bibliothèque, commit ou changement de branche. Scène en attente de validation esthétique utilisateur.

**Validation :** images chargées avec dimensions correctes (décor 1672 × 941, tasse 1402 × 1122) ; hashes identiques aux sorties et alpha nul dans le coin de la tasse. Rendu ordinateur observé et capture sauvegardée. À 320/390/820 px, largeurs défilables égales aux largeurs utiles 305/375/805 px ; tasse à l’intérieur de la scène. Volet logo/palette ouvert puis fermé avec Entrée, bouton de préparation réellement disabled, retour bouton et Échap avec restitution du focus à IA et du fond du portfolio. Aucune erreur console observée. Audit structure/chemins réussi (14 CSS, 7 imports, 6 projets) et `git diff --check` réussi. Responsive contrôlé par géométrie DOM ; validation visuelle mobile et publication distante non réalisées. Images sources non encore optimisées pour la livraison finale.

## Coffee Empire — intégrer le logo validé — 2026-10-04

**Demande et validation :** générer un logo en image avec les trois nouvelles références pixel art, le montrer avant intégration ; retour utilisateur « parfait je valide ».

**Résultat :** copie du PNG généré et approuvé dans `assets/images/coffee-empire-logo-v1.png`, sans retouche ni nouvelle génération. Remplacement du logo CSS/SVG à l’écran, affichage sur fonds crème/espresso et styles responsive. Ancien SVG conservé comme brouillon récupérable, mais non utilisé dans la section. Documentation de la nouvelle direction rétro et de la validation ; palette non déclarée validée séparément. Scarabée et favicon du portfolio inchangés. Aucun gameplay, commit, push ou dépendance ajoutée.

**Validation :** SHA-256 identique entre original et copie ; PNG RGBA 1374 × 1145 avec alpha nul dans le coin. Trois images chargées dans le navigateur avec dimensions intrinsèques correctes et fond CSS transparent ; ancien wordmark absent du DOM. Rendu ordinateur observé et capturé. À 320 et 390 px, largeur défilable égale à la largeur utile (305 et 375 px) ; logo dans son conteneur. Échap ferme IA et rend le focus au bouton IA. Aucune erreur console observée. Audit des chemins et `git diff --check` réussis ; branche main conservée. Publication distante non testée.

## Coffee Empire — palette et logo — 2026-10-04

**Demande :** brief du clicker / tycoon Coffee Empire et deux références illustrées facettées, puis choix utilisateur « palette et logo ». Avancer étape par étape, sans gameplay.

**Résultat :** planche dans IA, palette naturelle et tokens `--coffee-*` isolés, emblème SVG monochrome grain/architecture, wordmark avec les polices locales Special Elite et Manrope. Variantes crème/espresso et emblème à 64, 32 et 16 px. Décisions et logique de prompts consignées dans `coffee-empire.md`. Aucun compteur, économie, bouton de production, dépendance, commit ou changement de branche ; favicon scarabée conservé. Proposition à valider par l’utilisateur.

**Validation :** audit des chemins/arborescence réussi (13 CSS, 7 imports, 6 projets), `git diff --check` réussi. Rendu ordinateur observé et capturé. Largeurs défilables égales aux largeurs utiles aux formats 320/390/820 px (305/375/805 px avec barre verticale), sans débordement horizontal. Volet des couleurs ouvert, fermeture Échap et bouton Retour vérifiés avec restitution du focus à IA et retour au fond du portfolio. Aucune erreur console observée. Contrastes calculés : textes et états prévus sur les trois fonds sombres de 5,05:1 à 16:1 ; logo espresso/crème 11,27:1. Le contrôle mobile porte sur la géométrie DOM ; la capture mobile a échoué après redimensionnement du navigateur. Capture ordinateur finale obtenue dans un nouvel onglet. Validation esthétique utilisateur et déploiement distant non réalisés.

## Remettre la section IA à zéro — 2026-10-04

**Prompt :** _Retirer complètement OVERLAY, effacer le contenu de la section IA et la préparer pour un nouveau mini-projet : un clicker avec une documentation montrant ma logique de prompts. Commencer seulement par le nettoyage._

**Résultat :** suppression des modules, styles, tests et documentation technique du comparateur ; retrait des écrans, décors, animations, parallaxe et anciens placeholders du labo. Seule reste une vue IA sobre avec titre, emplacement vide pour le prochain projet et retour au portfolio, sans API ni timer. README mis à jour. Le clicker et sa documentation ne sont pas encore créés. Copie vérifiée des fichiers retirés hors du dépôt dans `outputs/ia-retiree-20261004` du workspace Codex ; ancienne entrée ci-dessous conservée uniquement comme historique. Aucun commit ni changement de branche.

**Validation :** ouverture et retour testés dans le navigateur, fermeture avec Échap et restitution du focus au bouton IA, navigation Projets depuis IA. À 320 px, largeur défilable égale à la largeur utile (305 px avec barre verticale), aucun débordement horizontal. Emplacement du nouveau projet vide et aucun ancien écran dans le DOM. Aucune erreur console observée. Syntaxe JavaScript, audit d’arborescence/chemins (12 CSS, 7 imports, 6 projets) et `git diff --check` réussis ; aucune référence active à OVERLAY dans HTML/JS/CSS/README. Les anciennes mentions du journal sont historiques uniquement.

## OVERLAY — comparateur crypto dans le labo IA — 2026-10-04

**Statut historique :** projet retiré du portfolio à la demande de l’utilisateur le même jour. Le résultat et les tests ci-dessous décrivent la version antérieure, pas une fonctionnalité actuelle. Sa documentation technique a été archivée hors du dépôt puis retirée.

**Prompt :** _Concevoir et implémenter OVERLAY, un comparateur visuel de 2 à 5 actifs. Priorité à une V1 crypto fiable et légère : données réelles gratuites, performances normalisées, modes PRICE et RATIO, corrélation des rendements, divergence, volatilité, drawdown, simulation historique, cache, accessibilité, responsive et tests. Prévoir les actions sans faux cours ni clé frontend ; ne pas alourdir le portfolio._

**Résultat obtenu :** écran 03 du laboratoire et carte compacte pour essayer OVERLAY ; import dynamique à l’ouverture. SVG natif sans bibliothèque, six cryptos sur marchés Kraken/USD, six périodes jusqu’à 1Y. Adaptateur indépendant, clôtures UTC communes, bougie ouverte séparée du calcul, PRICE explicitement logarithmique. Métriques et méthodologie accessibles en texte, sélection 2–5, navigation des dates au clavier/touch, mise en évidence de la divergence. Cache 60 s, file espacée, timeout, abort, états erreur/quota/partiel sans données artificielles. Actions désactivées ; aucun LLM, clé, backend, installation, commit ou changement de branche.

**Validation :** 20 tests automatisés réussis, incluant rendements constants en virgule flottante ; accès public Kraken et CORS localhost vérifiés. BTC/ETH réels en 1M/3M/1Y, BTC/SOL, trois puis cinq actifs, toutes les six cryptos chargées. Passage rapide 1D → 7D sans réponse obsolète affichée ; 288 clôtures de 5 minutes en 1D, 168 horaires en 7D. Modes PRICE/RATIO, curseur clavier, clic sur graphique et divergence vérifiés ; ratio désactivé à trois actifs, sixième ajout interdit, état vide sous deux actifs. Formats 320/390 px sans débordement global après correction du `min-width` HTML préexistant (barre de défilement verticale prise en compte). Focus conservé sur le bouton divergence ; retour aux écrans, placeholder voisin et retour au portfolio vérifiés. Rechargements réussis et aucune erreur console observée. Cas panne, quota et historique incomplet testés avec fixtures exclusivement dans les tests, pas une panne réelle provoquée sur Kraken. Production distante non testée.

**Limites de cette ancienne version :** prix propres à Kraken, clôtures et non extrêmes intrabougie, fréquence non temps réel, volatilité non annualisée, aucune recommandation d’investissement. MAX, actions et périodes personnalisées étaient réservés à une V2 abandonnée.

## Header transparent et étiquettes de projets — 2026-10-04

**Prompt :** _Modifier le header pour qu’il soit transparent, placer les menus en haut à droite et ajouter sur les objets les titres des projets avec des cercles de couleur représentant leur état, en s’inspirant de la référence fournie._

**Précision confirmée :** Juicy, Avant la fin et Forward terminés (vert) ; QLT, Shopify et Réseaux sociaux en cours (ambre).

**Résultat obtenu :** header superposé au décor sans fond, texture, flou ni ombre de barre ; logo et identité à gauche, menu discret en haut à droite. Six étiquettes toujours visibles et cliquables, titre court, pastille et état écrit. Champs `heroTitle` et `progress` centralisés et validés dans les données JSON, sans remplacer les textes de contexte existants. Grille de trois colonnes sur tablette et deux sur mobile pour éviter les chevauchements ; positionnement dans le décor conservé sur ordinateur. Zoom et unique halo léger existants conservés, sans animation ajoutée aux pastilles. Arborescence respectée, aucun commit automatique.

**Validation :** six fiches ouvertes et fermées au clavier, étiquette Forward testée au clic, navigation Projets et retour au hero vérifiés. Labo IA ouvert puis quitté sans chevauchement avec le header. Formats 320, 390, 820, 1050 et 1280 px contrôlés sans débordement horizontal ; les six étiquettes sont accessibles au point central sur tablette et ordinateur. Couleurs des trois états terminés et des trois états en cours confirmées. Aucune erreur console observée ; syntaxe des modules JS, audit des chemins et `git diff --check` réussis.

## Intégrer le logo scarabée-café — 2026-10-04

**Prompt :** _Parfait, utilise les._

**Résultat obtenu :** scarabée ajouté au lien d’accueil du header à côté du nom, avec la silhouette originale en masque CSS teinté par la couleur du texte pour le fond sombre. PNG réduit à 192 px pour ce masque. Favicons PNG 16 et 32 px et icône Apple 180 px issus de l’aperçu clair, sans régénérer ni redessiner le symbole. Originaux et ancien favicon conservés. Nom accessible du lien inchangé ; symbole décoratif masqué aux lecteurs d’écran. Aucun commit automatique.

**Validation :** symbole visible sur le header sombre à 1280 px ; rendu mobile contrôlé à 390 et 320 px sans débordement horizontal. Lien du logo testé au clavier et retour à `#hero` confirmé. Fichiers d’icônes servis en HTTP 200 avec le type PNG ; références 16/32/180 px présentes dans le document. PNG 16 et 32 px inspectés : silhouette identifiable, détails du grain naturellement plus petits à 16 px. Aucune erreur console observée. Audit de structure et `git diff --check` réussis.

## Générer un logo scarabée-café — 2026-10-04

**Prompt :** _Génère un logo du même style que ma référence : un scarabée avec une graine de café à la place du bas du corps, destiné au favicon et au logo principal du portfolio._

**Résultat obtenu :** symbole noir épuré généré avec l’outil d’image intégré, abdomen en grain de café à fente courbe, fond transparent et aperçu sur fond clair. Assets ajoutés dans `assets/icons/`, prompts consignés dans `documentation/logo-scarabee-prompt.md`. PNG principal 1254 × 1254 avec transparence confirmée. Le header et le favicon existants restent inchangés ; lisibilité à 16/32 pixels à vérifier lors de l’intégration. Aucun commit automatique.

## Remplacer DM Sans par Manrope — 2026-10-04

**Prompt :** _let's take manrope_

**Résultat obtenu :** Manrope remplace DM Sans pour les textes, la navigation, les titres secondaires et les légendes. Special Elite reste réservée aux grands titres h1/h2. Deux fichiers WOFF2 officiels sont intégrés localement avec les accents latins, les graisses de 400 à 700 et la licence OFL. Les passages italiques conservent leur style par synthèse du navigateur, Manrope ne proposant pas de vraie italique. Les fichiers DM Sans restent conservés, mais ne sont plus déclarés ni chargés. Arborescence par composants conservée, aucun commit automatique.

**Validation :** chargement de Manrope en 400, 600 et 700 confirmé avec les accents français ; Special Elite reste chargée sur les grands titres. Header vérifié à 1280 px, page et fiche Réseaux sociaux vérifiées à 390 et 320 px sans débordement horizontal. Aucune erreur console observée. Audit des chemins CSS, JS et médias réussi ; `git diff --check` sans erreur.

## Essayer Special Elite et DM Sans — 2026-10-04

**Prompt :** _Essayons Special Elite pour les grands titres et DM Sans pour le reste._

**Résultat obtenu :** Special Elite réservée aux titres h1/h2 ; DM Sans appliquée aux textes, à la navigation, aux titres secondaires et aux légendes. Polices officielles intégrées localement dans `assets/fonts/` au format WOFF2, avec les sous-ensembles latins, les accents et les licences d’origine. Graisses DM Sans de 400 à 700 et vraie italique ; Special Elite en 400. Variables centralisées, aucun `@import`, structure par composants conservée. Aucun commit automatique.

**Validation :** chargement réel des deux familles confirmé dans le navigateur, y compris les accents français. Header et textes vérifiés sur ordinateur ; fiche vérifiée à 390 px. À 320 px, tailles des titres longs ajustées et débordement du fond mobile corrigé : plus de défilement horizontal sur la page ou dans le texte de la fiche Réseaux sociaux. Chemins des fichiers CSS et des polices validés, aucune erreur console observée.

## Réorganiser le dépôt selon les consignes du cours — 2026-10-03

**Prompt :** _Voici les indications pour l’arborescence, ajuste svp._

**Résultat obtenu :** fusion des deux journaux en conservant les entrées propres à chacun, puis documentation regroupée dans `documentation/`. Variables CSS centralisées, styles et logique JavaScript répartis par composant. `main.js` devient le point d’entrée ; `modal.js` reste limité à l’ouverture et la fermeture. Liens CSS et imports mis à jour, aucun `@import`. Les captures Figma restent à exporter réellement. Aucun média supprimé, aucun commit automatique.

**Validation :** 19 éléments attendus présents, 12 feuilles CSS et 7 imports JS résolus, 53 références aux médias existantes. Syntaxe JS et CSS vérifiée. Dans le navigateur : six fiches, navigation, zoom, lecture vidéo et arrêt à la fermeture, laboratoire IA et changement de page du livre testés. Comparaison du rendu sur ordinateur et mobile : dispositions conservées. Aucune erreur console observée pendant ces tests. Le rapport qualité général et les captures Figma restent à compléter.

## Documenter les communautés de niche sur les réseaux sociaux — 2026-10-03

**Prompt :** _Documente le dernier projet : je repère des niches et des tendances, puis crée des comptes Instagram pour y rassembler une communauté. Ancien compte One Piece, compte chats à plus de 200K abonnés et deux comptes Marvel Rivals de moins de 10K abonnés avec des publications à 100K, 500K et parfois plus d’un million de vues. Les contenus ne sont pas toujours créés par moi : je sélectionne et republie aussi des contenus d’autres plateformes. Mon objectif est de comprendre les réactions de l’audience et le fonctionnement des plateformes, puis d’adapter ma méthode. J’ai également expérimenté sur YouTube. Utilise les trois captures fournies ; le profil à 257K est bien le compte chats._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** présentation centrée sur la veille, le positionnement, la sélection et la diffusion de contenus, l’analyse et l’adaptation. La republication est explicitement distinguée de la création originale. Les trois captures anonymisées sont intégrées sans modification ; les anciennes images restent conservées. Les abonnés, les vues et les comptes atteints ne sont ni confondus ni cumulés ; les instantanés historiques ne sont pas présentés comme des mesures actuelles. L’année et les résultats chiffrés de YouTube ne sont pas inventés. Les changements de règles de YouTube ne sont pas présentés comme une politique vérifiée. Aucun commit automatique.

## Présenter Forward, jeu de plateforme dans Godot — 2026-10-03

**Prompt :** _Le projet Platformer 2D est une création de jeu vidéo avec Godot et des assets gratuits sur itch.io, dans le cours d’Interactivité ludique. Plutôt qu’un simple platformer, j’ai imaginé un risque constant qui oblige le joueur à se dépêcher, avec une mécanique d’essais successifs jusqu’à réussir. Utilise le gameplay et les quatre GIF fournis. Le titre est « Forward » et la menace est un mur de feu qui poursuit le joueur._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** fiche centrée sur le concept, les mécaniques et l’intégration dans Godot. La création des sprites n’est plus attribuée à mon travail : les assets proviennent d’itch.io. Gameplay en premier, captures directes du jeu puis quatre extraits animés, dont deux séquences filmées sur ordinateur. Fichiers allégés, GIF convertis en MP4 et proportions 4:3 conservées sans couper la zone de jeu. Les critères du cours ne sont pas présentés comme des résultats validés ; performance, addons et crédits complets ne sont pas inventés. Originaux et anciennes images conservés ; aucun commit automatique.

## Présenter Avant la fin, projet d’animation 3D — 2026-10-03

**Prompt :** _Continue avec l’animation 3D du cours en Techniques d’intégration multimédia. Logiciels utilisés : Maya et CapCut. Utilise le montage final, la capture de marche dans Maya, le scénarimage et les deux GIF fournis. Le titre est « Avant la fin » ; je n’ai créé aucun modèle, ils viennent de Sketchfab. J’ai construit le décor et l’environnement, puis animé._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** fiche organisée autour du film final, du scénarimage, des rendus et des extraits de travail. Le rôle distingue explicitement la construction du décor et l’animation des modèles importés de Sketchfab. Les consignes du cours ne sont pas transformées en réalisations prouvées ; DaVinci n’est pas ajouté aux outils. Vidéos adaptées au Web, GIF convertis en MP4 sans son, lecteurs avec commandes et sans lecture automatique. Les originaux et les anciens médias restent conservés. Prompt consigné dans les deux journaux, sans commit automatique.

## Présenter les réalisations Shopify pour des clients — 2026-10-03

**Prompt :** _Continue avec Shopify : j’ai créé et designé plusieurs boutiques pour des clients ayant des comptes sociaux nichés et populaires, autour de One Piece, Marvel Rivals et des produits pour chats. J’ai configuré les produits et les paramètres Shopify, puis suivi les statistiques. Utilise les captures de boutique, de visites, de ventes et de commandes fournies._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** présentation centrée sur le besoin client, la création des boutiques et le suivi de leur activité. Six visuels sont intégrés sans modifier les originaux ; l’accueil Mugiwara ouvre la galerie et les données clients restent masquées. Les chiffres de captures différentes ne sont pas cumulés et aucune croissance n’est attribuée au design. Les anciennes images sont conservées. Les liens publics, les captures des autres boutiques et les périodes manquantes restent à préciser. Aucun commit automatique.

## Présenter Juicy, projet individuel WordPress — 2026-10-03

**Prompt :** _Présente Juicy comme QLT à partir des consignes de Web 4, de mon rôle et de mes captures. Projet individuel : j’ai tout réalisé et imaginé l’identité visuelle à partir du thème imposé des jus. Intègre le lien https://202173398.tim-momo.com/tp_final/ et les sept images fournies._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** résumé de carte, rôle, outils et récit en trois parties : mandat, direction visuelle et intégration. Sept captures sont intégrées et légendées, de l’accueil à l’éditeur Elementor ; les anciennes sont conservées. Le lien ouvre le site public, consulté en lecture seule. Aucune commande ni aucun message de formulaire n’a été envoyé. La présence d’un formulaire ne prouve pas la réception des messages ; les objectifs de SEO, sécurité, conformité, API et responsive ne sont pas présentés comme validés par ces captures. Aucun commit automatique.

## Remplir les cadres de la galerie — 2026-10-03

**Prompt :** _Les images qui ne cadrent pas bien dans les zones d’images doivent prendre l’espace complet._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** les images remplissent désormais les cadres fixes de la galerie sans déformation, avec recadrage des bords au besoin. Le zoom conserve l’image entière. Aucun commit automatique.

## Intégrer les nouveaux visuels de QLT — 2026-10-03

**Prompt :** _Pour l’instant, fais avec ces images._ Sept visuels fournis : sac actuel, recherche de marché, évolution du concept, observations terrain, extrait du techpack, essais de noms et de logos, exploration du packaging.

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** nouveaux fichiers intégrés sans modifier les originaux. Le sac noir devient la couverture de la carte et de la fiche ; les six autres images racontent la progression du projet. Les légendes distinguent les hypothèses, les rendus IA et les explorations de marque. L’extrait technique est identifié comme version 1.5, conformément au document fourni. Les anciennes captures sont conservées, mais retirées de la galerie active. Aucun commit automatique.

## Organiser le récit et les visuels de QLT — 2026-10-02

**Prompt :** _À partir de mes dix étapes de création de QLT, ajuste le texte et l’ordre des images de la carte et de la fiche. Regroupe les étapes répétitives et indique exactement quelles images de qualité préparer._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** récit regroupé en cinq phases, de l’opportunité à la préparation du lancement. Le dossier technique V2 présente la direction actuelle en ouverture, puis la galerie retrace la recherche, les explorations, le choix du concept, le terrain, les pistes de boutique et le marketing. Les captures existantes sont conservées en attendant des exports de qualité. La recherche reste une hypothèse de marché ; les rendus IA ne sont pas présentés comme un produit fabriqué. Aucun commit automatique.

## Une fiche projet pensée comme une galerie de boutique — 2026-10-02

**Prompt :** _Revois l’affichage des images pour donner la priorité à l’expérience visuelle : une grille d’images à gauche et du texte à droite, comme dans une boutique en ligne. Empêche les changements de dimensions lorsqu’on passe d’une image à une autre._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** galerie de grandes images à deux colonnes, cadres à proportions fixes avec images entières, texte à droite et dimensions stables de la fiche. Le clic ouvre un zoom séparé, avec retour au clavier sur l’image sélectionnée. Les légendes et le style papier sont conservés ; sur mobile, les visuels passent avant le texte. Aucun commit automatique.

## Présenter QLT comme une démarche de marque — 2026-10-02

**Prompt :** _Analyse mes captures de progression de QLT et présente le projet dans sa carte et sa fiche : création d’une marque et d’un sac weekender de zéro, recherches assistées par ChatGPT, observations en boutique, explorations de matières et suivi dans Miro. Garde une présentation concise avec les informations utiles à un recruteur en marketing._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** présentation structurée autour du défi, de la recherche terrain, des choix créatifs et de la préparation du lancement. Sept captures fournies sont sélectionnées et légendées pour distinguer explorations IA, hypothèses et livrables. Le contenu reste dans le JSON local ; la galerie et les sections facultatives sont générées en JavaScript. Les années, liens et l’état du prototype restent à confirmer. Aucun résultat commercial ou test de fabrication n’est inventé.

**À relire :** formulation de mon rôle, état actuel du projet et choix des images. Aucun commit automatique.

## Donner au laboratoire IA un décor de Tokyo — 2026-10-01

**Prompt :** _Remplace le fond de la section IA par un hero inspiré des billboards de Tokyo, en utilisant les références fournies et le style artistique du portfolio._

**Outils utilisés :** ChatGPT / Codex et génération d’images intégrée.

**Prompt du décor :** _Intersection inspirée de Shibuya la nuit, grands panneaux lumineux cyan, magenta et violets, asphalte humide et reflets, architecture détaillée et perspective cohérente. Style illustré 3D cinématographique, écrans abstraits sans texte ni personnages et zone sombre pour le titre._

**Résultat obtenu :** nouveau décor Tokyo optimisé en JPEG, six zones interactives repositionnées selon les angles des billboards. Le parallaxe léger et le retour au portfolio sont conservés. La référence artistique du cône mentionnée n’était pas visible dans les pièces reçues; le style existant a servi de base.

## Transformer le bonus IA en laboratoire expérimental — 2026-10-01

**Prompt :** _Transforme la section IA en laboratoire expérimental caché, avec plein de télévisions et d’écrans qui accueilleront des mini-jeux, applications et outils. Utilise un hero avec un parallaxe léger, un thème complètement différent et le même style artistique que l’atelier._

**Outils utilisés :** ChatGPT / Codex et outil intégré de génération d’images.

**Prompt du décor :** _Créer un laboratoire caché avec un mur de télévisions CRT, des câbles et des surfaces usées. Garder le style illustré cinématographique de l’atelier, une perspective réaliste et une lumière cohérente. Utiliser des lueurs cyan et violettes, sans personnages, logos ou textes, avec de la place à gauche pour le titre._

**Résultat obtenu :** décor généré puis optimisé en JPEG (environ 336 Ko), thème violet/cyan activé uniquement dans la section IA, six zones interactives intégrées aux écrans, parallaxe discret au curseur et exploration horizontale sur mobile. Les expériences sont encore à créer. L’ouverture du labo, la sélection d’un écran et le retour au portfolio ont été testés dans le navigateur.

## Section bonus IA — 2026-10-01

**Prompt :** _Crée une section IA accessible uniquement depuis le menu IA du header, pour présenter mes futurs mini-jeux, applications et outils créés avec ChatGPT et montrer mon travail de prompting._

**Outil utilisé :** ChatGPT / Codex.

**Résultat obtenu :** ajout d’une vue bonus masquée par défaut, d’un accès dans le header et d’un retour au portfolio. Les expériences seront ajoutées progressivement avec leur idée, leurs prompts, leurs ajustements et leur résultat.

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

- #### Ajouter un effet de parallaxe au hero [2026-09-26]

  _ajoute un léger parallax au hero. le background et les six objets doivent bouger à des profondeurs différentes selon la position du curseur de la souris. garde les boutons cliquables, évite les mouvements trop rapides et désactive l’effet sur mobile et quand l'utilisateur souhaite désactiver les animations._

- #### Adapter le hero à toute la largeur de l’écran [2026-09-26]

  _modifie le hero pour qu’il occupe toute la largeur de l’écran, même sur un grand moniteur et avec le zoom du navigateur. adapte la taille des objets à l’espace disponible sans créer de chevauchements et conserve une disposition stable sur mobile._

- #### Corriger la perspective et la lumière des objets du hero [2026-09-26]

  _replace les objets du hero pour qu’ils reposent logiquement sur le bureau. corrige leur perspective et leurs ombres avec une lumière chaude venant de la gauche. retourne les ordinateurs, garde la souris à droite et ajoute une chaise séparée au premier plan par-dessus les objets._

- #### Séparer complètement la chaise du décor [2026-09-26]

  _retire la chaise intégrée dans l’image de fond en reconstruisant le bureau et le sol cachés. garde la chaise séparée dans le hero et empêche la de dépasser de la scène._

- #### Corriger la perspective du dossier Shopify [2026-09-27]

  _recrée le dossier Shopify pour qu’il soit posé à plat sur le bureau. son côté gauche doit être plus proche et son côté droit doit remonter vers le fond en suivant la perspective de la table. conserve le contenu ecommerce et la lumière du hero._

- #### Ajouter un survol interactif aux objets [2026-09-27]

  _maintenant fait en sorte que les objets soient dynamiquement zoomés lorsqu'on hover dessus, et que l'effet de hover ne soit pas un rectangle jaune mais plutot un simple contour des objets si possible_

- #### Créer et animer le livre de la section À propos [2026-09-29]

  _continue avec la section à propos, j'aimerais que le livre soit fermé puis s'ouvre avec une animation lorsqu'on scroll, voici à quoi ressemblerait le livre fermé avant qu'il souvre: dessus un scarabée doré brodé, une texture de cuir/livre ancient et usé, utilise le même style que le hero et les objets evidemment._

- #### Ajouter des pages interactives au livre [2026-09-29]

  _maintenant continue, ajoute une page au livre avec une animation et un bouton pour la tourner et pouvoir revenir en arrière, sur les prochaines pages, il y aura les logiciels et applications que j'utilise selon la catégorie ou types de travail/projet_

- #### Améliorer l’animation des pages et ajouter les icônes [2026-09-30]

  _j'aimerais vraiment une animation de page qui tourne plutot que juste l'animaton actuelle. j'aimerais aussi les icones des logiciels/applications plutot que juste du texte._

- #### Affiner la rotation du livre et retirer les fonds des icônes [2026-09-30]

  _c'est pas assez bien, j'aimerais que ce soit encore mieux comme animation, plus réaliste et satisfaisant, et les icones sans fond en png_

- #### Stabiliser les dimensions du livre pendant la navigation [2026-09-30]

  _l'animation est bien, cependant lorsqu'on passe a la page suivante, l'affichage bug, regarde les screenshots, assures toi que la taille des pages et du livre ne change pas. fixe ça_

- #### Séparer le chargement JSON de l'affichage [2026-09-30]

  **(extraits, avec les consignes)** :_voici des instructions, ajuste au besoin, j'utilise JSON_ ; _je vais avoir des liens, videos et images_.

- #### Ajouter l'arborescence exigée sans retirer les fichiers existants [2026-10-01]

  **Prompt (extrait, accompagné de l'arborescence du cours) :** _respecte cette arborescence, assures toi notamment de ça pour les popups : `js/components/modal.js`, seulement pour un one-pager avec modale : la logique d'ouverture et de fermeture._

  **Résultat :** ajout des dossiers et fichiers demandés en conservant les fichiers déjà présents. La modale sépare maintenant le remplissage du contenu dans `main.js` de sa logique d'ouverture et de fermeture dans `js/components/modal.js`.

  **Texte conservé de la version racine :**

  **(extrait, 'arborescence du cours) :** _respecte cette arborescence, assures toi notamment de ça pour les popups : `js/components/modal.js`, seulement pour un one-pager avec modale : la logique d'ouverture et de fermeture._

- #### Afficher les médias facultatifs dans les fiches de projets [2026-10-01]

  **Prompt :** _c'est parti continuons, si besoin dis moi quoi t'envoyer_

  **Résultat :** la modale affiche maintenant l'image principale, l'année, une galerie, une vidéo et un lien seulement lorsque ces données existent dans le JSON. Trois captures déjà fournies servent à construire une première fiche Shopify. L'année, le lien public et la vidéo restent à confirmer.

- #### Repenser les fiches projets comme un livre [2026-10-01]

  **Prompt :** _j'aimerais revenir sur les pop ups, rends les du même style que les livres, et plus grands donc prenant plus d'espace, plus d'interactivité pour donner de l'importance aux projets._

  **Résultat :** les fiches projets deviennent de grandes doubles pages inspirées du livre de la section À propos. Elles proposent une galerie interactive, une navigation entre les projets et une présentation adaptée aux projets qui n'ont pas encore de médias.

- #### Enrichir le fond général avec une texture illustrée [2026-10-01]

  **Prompt :** _embelli la couleur de base du site, actuellement c'est simplement vert, utilise plutot cette image comme fond pour le header et la couleur de base du html etc, aussi fait en sorte que le header soit un peu glassy/transparent_

  **Résultat :** l’image fournie a été optimisée puis utilisée comme texture de fond générale. La palette verte est plus profonde et le header combine la texture avec une transparence, un flou léger et une bordure dorée discrète.

- #### Ajouter du contenue dans les cartes pour les projets et ajouter la section contact [2026-10-01]

  _Ajoute le contenue que je t'ai donné aux cartes et ajoute la section contact avec les éléments de base._

- #### Optimisation des fichiers [2026-10-01]

  _Optimise les fichiers._

- #### Ajout d'une section IA [2026-10-02]

  _Ajoute un menu IA qui dirigera vers une section où je placerais des mini-jeux,outils, et autres créés par IA_

- #### Ajustement du parallax [2026-10-02]

  _lorsque le curseur quitte et reviens sur le hero, l'effet de parallax reset de façon instantanée, fait en sorte que ce soit progressif._

- #### Ajustement de l'affichage des médias dans les modals. [2026-10-02]

  _j'aimerais revoir le format de l'affichage des images, actuellement c'est pas le mieux, j'aimerais que lorsqu'on clique sur un projet, on ait une expérience visuelle en priorité, comme si on allait acheter dans une boutique en ligne, donc on verrait une grille d'images sur la gauche et du texte à droite, aussi, actuellement lorsqu'on change d'images, la dimension aussi change et c'est pas satisfaisant pour la page._

- #### Modification du header et ajout des titres sur les objets. [2026-10-04]

  _parfait, maintenant on va modifier le header et ajouter des titres sur les objets pour faciliter l'expérience, le header doit être transparent donc comme si il y en avait pas, les titres des projets seront affichés avec des cercles de couleur représentant leur état (completé, en cours), en haut à droite les menus, inspires toi de la référence envoyée._
