# Instructions pour GitHub Copilot — Portfolio

- Projet one-pager en HTML/CSS/JS vanilla, aucun framework.
- Noms des fichiers de code, classes, variables et fonctions en anglais ; contenu et commentaires en français.
- Convention BEM pour les nouveaux composants ; conserver les noms existants lors des corrections.
- CSS : variables communes dans `css/variables.css`, base dans `css/base.css`, disposition générale dans `css/layout.css`, un fichier par composant dans `css/components/`.
- Lier chaque CSS séparément dans le HTML, variables en premier. Aucun `@import`.
- JavaScript : `js/main.js` coordonne, `js/data.js` charge et valide les données, `js/components/` contient la logique des composants.
- `js/components/modal.js` contient uniquement l’ouverture et la fermeture ; le contenu des fiches est géré dans `project-details.js`.
- HTML sémantique et interactions accessibles au clavier ; respecter `prefers-reduced-motion`.
- Les projets sont définis dans `data/projects.json`. Ne pas inventer des résultats ou des médias.
- Documentation uniquement dans `documentation/`, sans copies à la racine.
- Conserver les captures PNG réellement exportées depuis Figma dans `exports-composants/`, nommées comme les CSS correspondants.
- Ne jamais ajouter de bibliothèque externe sans demande explicite.
- Ne pas faire de commit ou de push automatiquement, ni toucher à la branche `beta`.
