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

# VOIR: documentation PLAN DE TEST
