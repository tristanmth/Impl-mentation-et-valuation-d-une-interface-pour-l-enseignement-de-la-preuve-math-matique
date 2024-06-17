# VÉRIFICATION ET VALIDATION DU TABLEAU

## Comparer les valeurs d’une ligne de tableau

- **Identification**: 
  - **Fonction**: `compareValuesInRow()`
  - **Utilisation dans le programme**: Comparaison des valeurs de la première ligne du tableau de variation.
  - **Utilisation dans le module de gestion interne**: Module de vérification et de validation du tableau (voir documentation interne).

- **Description**: Vérifie que les valeurs d'une ligne sont comparées deux à deux.

- **Contraintes**: Importation du module tabvar. Utilisation des fonctions du module tabvar.

- **Dépendances**: 
  - Importation du module tabvar. Utilisation des fonctions du module tabvar.
  - Utilisation de la fonction `tabvar.compare_values()` du module tabvar.
  - Utilisation de la fonction `getValues()` du module de gestion du tableau (voir documentation interne) pour la récupération des valeurs nécessaires.

- **A vérifier avec la console du navigateur**

## Validation de la fonction principale

- **Identification**: 
  - **Fonction**: `validation_funMain()`
  - **Utilisation dans le programme**: Validation de la fonction saisie par l’utilisateur depuis la zone d’édition.
  - **Utilisation dans le module de gestion interne**: Module de vérification et de validation du tableau (voir documentation interne).

- **Description**: Vérifie si la fonction à traiter est correctement définie.

- **Contraintes**: Importation du module tabvar. Utilisation des fonctions du module tabvar.

- **Dépendances**: 
  - Importation du module tabvar. Utilisation des fonctions du module tabvar.
  - Utilisation de la fonction `tabvar.validate()` du module tabvar.
  - Utilisation de la fonction `tabvar.suppose_var()` du module tabvar.
  - Utilisation de la fonction `tabvar.function_definition()` du module tabvar.

- **A vérifier avec la console du navigateur**

## Vérification de la dérivée

- **Identification**: 
  - **Fonction**: `verificatio_funDeriv()`
  - **Utilisation dans le programme**: Vérification de l’expression de la dérivée saisie par l’utilisateur depuis la zone d’édition.
  - **Utilisation dans le module de gestion interne**: Module de vérification et de validation du tableau (voir documentation interne).

- **Description**: Vérifie que la dérivée saisie est bien une dérivée de la fonction principale.

- **Contraintes**: Importation du module tabvar. Utilisation des fonctions du module tabvar.

- **Dépendances**: 
  - Importation du module tabvar. Utilisation des fonctions du module tabvar.
  - Utilisation de la fonction `tabvar.deriv()` du module tabvar.
  - Utilisation de la fonction `tabvar.compare_values()` du module tabvar.
  - Utilisation de la fonction `tabvar.develop()` du module tabvar.

- **A vérifier avec la console du navigateur**

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

# VOIR: documentation PLAN DE TEST
