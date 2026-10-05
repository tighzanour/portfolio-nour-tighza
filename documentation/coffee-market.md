# Coffee Empire — connexion gratuite à l’Arabica

## Choix et limites

Nour demande d’abord un cours en temps réel, puis précise Arabica et gratuité totale. Il fournit ensuite la piste Buon Ma Thuot Coffee et accepte dans sa proposition le dernier cours disponible plutôt qu’un flux tick par tick. Ses recherches complètent celles de l’assistant : l’absence de solution trouvée auparavant ne prouvait pas l’absence de toute API gratuite.

[La documentation du fournisseur](https://buonmathuotcoffee.com/vietnam-coffee-data/api) annonce une API JSON publique, sans authentification, limitée à 60 requêtes/minute/IP. L’attribution cliquable à son site est requise et ajoutée dans le panneau du marché. Elle décrit des prix de règlement du contrat proche ; ne pas les présenter comme des cotations instantanées ni comme le prix de grains acheté localement.

Le site fournisseur est en bêta. Aucune vérification indépendante de ses chiffres auprès d’ICE ni garantie de gratuité/disponibilité future n’est établie. Aucun abonnement, création de compte, paiement ou accord signé par l’assistant.

## Vérification réelle — 5 octobre 2026

GET `https://buonmathuotcoffee.com/api/v1/coffee-price` : HTTP 200, `Content-Type: application/json`, `Access-Control-Allow-Origin: *`. Appel direct depuis le navigateur du portfolio confirmé, sans proxy ni clé.

Extrait réellement reçu, et non exemple de documentation :

```json
{
  "timestamp": "2026-09-27T03:45:04+00:00",
  "ice_arabica": {
    "value": 3.249,
    "unit": "USD/lb",
    "exchange": "ICE New York",
    "contract": "front_month",
    "change": 0,
    "change_pct": 0
  }
}
```

La réponse actuelle est plate, alors que la documentation montre une enveloppe `status/data`. Les deux formes sont traitées. Dans la forme enveloppée, le chemin est `payload.data.ice_arabica.value` ; dans la forme actuelle, `payload.ice_arabica.value`.

Le timestamp reçu a plus de 72 heures au jour du test : affichage « Cours ancien », jamais « live ». Le 27 septembre à 03:45 UTC est le 26 septembre à 23:45 à New York ; l’interface indique explicitement ce fuseau. Le champ `next_update` ne remplace jamais la date de la donnée. Actualiser une réponse ancienne ne la rend pas récente.

## Prix de la tasse : modèle provisoire annoncé

```text
prix en centimes = arrondi(240 + 60 × coursArabica / 3,249)
```

La référence 3,249 USD/lb est figée à la valeur réellement reçue, avec sa date documentée ; elle n’est pas redéfinie à chaque démarrage. Au cours de référence, la tasse vaut 300 centimes. Une hausse relative de 10 % donne 306 centimes, une baisse de 10 % donne 294 centimes. Les 80 % fixes et 20 % indexés restent une hypothèse de jeu annoncée par l’assistant, pas une estimation économique ni un équilibrage approuvé séparément.

Le $ du jeu est fictif : pas de conversion USD/CAD, pas de prix réel relevé dans un café. Le prix appliqué à chaque clic est celui affiché au moment de la vente ; les ventes passées restent inchangées. Calculs de caisse en centimes entiers et affichage à deux décimales.

## Fiabilité et périmètre

- `js/components/coffee-market.js` gère l’API, la validation, le cache et la visibilité ; `js/main.js` relie le cours au prix du clicker. Aucun autre projet du portfolio n’est modifié.
- Appel à la première ouverture d’IA ; vérification toutes les 30 minutes si le jeu et l’onglet sont visibles. Pas d’appels périodiques en arrière-plan ; une requête en cours est interrompue à la fermeture.
- Bouton « Actualiser le cours », garde-fou de 15 secondes entre essais, une seule requête à la fois et délai maximal de 8 secondes. Aucun appel par clic de café.
- Validation du prix numérique positif, de l’unité USD/lb lorsqu’elle est présente, de la date horodatée et absence de date future anormale. Une réponse antérieure ne remplace pas un cours plus récent déjà reçu. Valeurs affichées via `textContent`.
- `localStorage` conserve uniquement la dernière cotation validée (`coffee-empire:arabica:v1`), jamais la caisse ni les cafés. Stockage interdit ou cache invalide : l’interface reste utilisable.
- En cas de panne/erreur, le cours en mémoire ou cache reste visible, avec un avertissement explicite. Sans aucun cours, prix de secours fictif de 3 $, non relié au marché. Aucun prix inventé ne remplace une cotation manquante.
- Un cours de plus de 72 heures est signalé ancien ; ce seuil prudent n’est pas une preuve de la cadence réelle du fournisseur.

## Tests exécutés

Test automatisé du vrai code (DOM simulé pour la partie réseau) : JSON plat/enveloppé, prix et dates invalides, unité incorrecte, 300/306/294 centimes, caisse à 606 après deux prix différents, préservation des ventes passées, cours ancien, panne, HTTP 429, JSON invalide et réponse antérieure, limitation manuelle, pause IA/onglet caché et absence de sauvegarde de progression. Les scénarios +10 %/-10 % sont des données synthétiques de test, jamais des cours montrés comme réels au public.

Navigateur local : requête réellement aboutie, 3,249 USD/lb et timestamp exact, attribution visible, avertissement ancien ; trois actions souris/Entrée/Espace donnent 3 cafés et 9,00 $. Retour/réouverture conserve cette caisse ; rechargement remet la caisse à zéro tout en gardant le cours. Aucune erreur console observée. Rendu ordinateur observé et capturé. À 320/390/820 px, panneau dans la largeur utile, aucun débordement horizontal et placement validé de la tasse conservé (bas à 72,5 % de la scène). Responsive vérifié par DOM, pas sur téléphone réel. Audit de structure : 15 CSS, 9 imports, 6 projets inchangés.

La réponse future du fournisseur, une publication distante, une panne réseau réelle dans un navigateur et l’attente réelle de 30 minutes n’ont pas été validées ; les chemins panne/temporisation/visibilité ont été testés dans le DOM simulé.
