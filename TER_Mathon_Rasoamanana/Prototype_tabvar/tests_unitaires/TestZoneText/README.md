# COMMANDE DEPUIS LA ZONE TEXTUELLE

## Création d’une fonction pour exécution

- **Identification**: 
  - **Fonction**: `parseFunctionString()`
  - **Utilisation dans le programme**: Entrée d’une commande dans la zone textuelle.
  - **Utilisation dans le module de gestion interne**: Module de gestion de la manipulation de la gestion de la zone textuelle (voir documentation interne).

- **Description**: Vérifier si le nom d'une fonction avec ses paramètres matche. Si on entre une chaîne de caractères dans une zone de texte, on veut qu'elle soit considérée comme une fonction.

- **Contraintes**: Nécessite une fonction de récupération des données saisies dans le champ de texte dédié. Dans le programme, nous utilisons une fonction d’autocomplétion via une bibliothèque externe JQuery.

- **Dépendances**: 
  - Importation d’une bibliothèque externe dans le programme final.

- **A vérifier avec la console du navigateur**

## Exécution d’une fonction dans le module tabvar depuis une entrée textuelle

- **Identification**: 
  - **Fonction**: `parseFunctionString()`
  - **Utilisation dans le programme**: Exécution de la commande saisie dans la zone textuelle.
  - **Utilisation dans le module de gestion interne**: Module de gestion de la manipulation de la gestion de la zone textuelle (voir documentation interne).

- **Description**: On souhaite que si la fonction saisie est une fonction du module tabvar avec les bons paramètres, alors elle soit exécutée.

- **Contraintes**: Importation du module tabvar. Utilisation des fonctions du module tabvar. Doit utiliser la fonction de création de nom de fonction `parseFunctionStr()`.

- **Dépendances**: 
  - Importation du module tabvar. Utilisation des fonctions du module tabvar (celles dont on connaît le fonctionnement).

- **A vérifier avec la console du navigateur**
