# Tests Unitaires

Ce document présente les tests unitaires pour différentes fonctionnalités du logiciel. 

## Création_Nom_Fonction

- **Identification**: Vérifier si le nom d'une fonction avec ses paramètres matche. 
- **Description**: Si on entre une chaîne de caractère dans une zone de texte on veut qu'il soit considérer comme une fonction. 
- **Contraintes**: 
- **Dépendances**:  
- **Procédure de Test**:
  1. Ouvrir le fichier .html 
  2. Ouvrir la console du navigateur pour voir les retours
  3. Taper une chaîne de caractère dans la zone de texte
  4. Il suffit que la chaîne ait une parenthèse avec ou sans éléments 

## Execution_Fonction

- **Identification**: Vérifier si la fonction saisie est executée. 
- **Description**: On souhaite que si la fonction saisie est une fonction du module tabvar avec les bon paramètres, alors elle est exécutée. 
- **Contraintes**: Doit utiliser le module tabvar. Doit utiliser la fonction de création de nom de fonction 'parseFunctionStr(). 
- **Dépendances**: Module tabvar.  
- **Procédure de Test**:
  1. Ouvrir le fichier .html 
  2. Ouvrir la console du navigateur pour voir les retours
  3. Taper une chaîne de caractère dans la zone de texte
  4. Il suffit que la chaîne ait une parenthèse avec ou sans éléments 
  5. Tests possibles:
     **Commande valide**
	ExecutApi("init()");
     **Commande avec paramètres manquants**
	ExecutApi("validate(param1)");
     **Commande avec fonction non reconnue**
	ExecutApi("unknown_function()");
     **Commande avec erreur interne (simulée par une fonction non définie)**
	ExecutApi("function_definition(param1, param2, param3, param4)");
     **Commande avec syntaxe invalide**
	ExecutApi("invalid_syntax");
     **Commande avec paramètres manquants pour une fonction non reconnue**
	ExecutApi("unknown_function(param1)");
     **Commande avec un nombre incorrect de paramètres**
	ExecutApi("develop(param1)");
     **Commande avec des paramètres vides**
	ExecutApi("print_env()");	

## test_ligne_commande

- **Identification**: Vérifie si la création de nom de fonction et l'execution de la foncion matche.
- **Description**: Quand la fonction est éxécutée, elle émet un retour dans la zone de texte à la 2e ligne. 
- **Contraintes**: Une liste au préalable de fonctions est contenus dans une variable pour guide l'utilisation. 
- **Dépendances**: Utilisation de bibliothèque pour auto-complétion de chaîne de caractères. Utilisation du module tabvar.
- **Procédure de Test**:
  1. Ouvrir le fichier .html 
  2. Ouvrir la console du navigateur pour voir les retours
  3. Taper une chaîne de caractère dans la zone de texte
  4. Tester les proposition de fonction
  5. Voir les différents retour possible directement dans la zone de texte

---
