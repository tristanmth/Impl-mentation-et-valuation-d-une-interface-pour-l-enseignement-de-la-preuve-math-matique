///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES VALEURS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour ajuster la taille de l'input en fonction de son contenu
function adjustInputWidth(input) {
    input.style.width = ((input.value.length +1)*8) + 'px'; // Ajuster la largeur en fonction de la longueur du texte
}

// fonction qui permet d'afficher les valeur qui se trouvent dans les lignes
function showValues(){
    // Récupére le tableau
    var table = document.getElementById("tabvar");
    // Récupére la première ligne du tableau
    var firstRow = table.rows[0];
    var beforLastRow = table.rows[table.rows.length -2];
    var lastRow = table.rows[table.rows.length -1];

    // Récupére les cellules de la première ligne
    var cells1 = firstRow.cells;
    var cells2 = beforLastRow.cells;
    var cells3 = lastRow.cells;

    // Initialise une variable pour stocker les valeurs
    var values1 = [];
    var values2 = [];
    var values3 = [];

    // Parcour les cellules de la première ligne et récupérer les valeurs
    for (var i = 1; i < cells1.length; i += 2) {
        values1.push(cells1[i].innerText);
    }
    for (var i = 2; i < cells2.length-1; i += 1) {
        if(cells2[i].innerText=="||"){
            values2.push("VI")
        } else if(cells2[i].innerText=="∅") {
            values2.push("NI")
        } else if(cells2[i].innerText=="0") {
            values2.push("0")
        } else if(cells2[i].innerText=="+"){
            values2.push("pos")
        } else if(cells2[i].innerText=="-") {
            values2.push("neg")
        } else {        
            values2.push(cells2[i].innerText);
        };
    }
    for (var i = 2; i < cells3.length; i += 2) {
        if(cells3[i].innerText=="↘"){
            values3.push("down")
        } else if(cells3[i].innerText=="↗") {
            values3.push("up")
        } else {        
            values3.push(cells3[i].innerText);
        }
    }
    return([[values1], [values2], [values3]]);
}

function getValues(index) {
    var values = showValues();
    var result;
    
    if (index == 1){
        result = values[0];
    } else if (index == 2 ){
        result = values[1];
    } else if (index == 3 ){
        result = values[2];
    } else {
        alert("Veuillez saisir 1 pour les valeurs de x, 2 pour la ligne de signe de la dérivée, et 3 pour les variations de la fonction");
        return;
    }

    // document.getElementById("values").innerText = "Toutes les valeurs: " + result;
    return result;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES EVENEMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// GESTION DE LA PREMIERE COLONNE //////////////////////////////////////////////////////////////////////////////////////////////////


// Fonction d'initialisation
function initializeTable() {
    // Définit une lettre par défaut pour la première cellule
    var defaultLetter = 'x';
    document.getElementById('tabvar').setAttribute('data-first-cell-letter', defaultLetter);
}

// Change le nom de la fonctionprincipal et de la variable
function changeVarFun(){
    // Récupére l'élément input pour le nom de la variable
    var varNameInput = document.getElementById("var-name");
    var functionNameInput = document.getElementById("function-name");
    
    // Ajoute un écouteur d'événements pour détecter les changements dans la zone de texte
    varNameInput.addEventListener("input", function() {
        // Récupére la valeur saisie dans la zone de texte
        var varName = varNameInput.value;
    
        // Met à jour le contenu de la cellule avec la nouvelle valeur
        var derivVar = document.getElementById("deriv-var");
        var firstCellSpan = document.getElementById("first-cell");
        var lastCellVar = document.getElementById("last-cell-var");
        var beforeLastCellVar = document.getElementById("before-last-cell-var");
        
        derivVar.textContent = varName;    
        firstCellSpan.textContent = varName;
        lastCellVar.textContent = varName;
        beforeLastCellVar.textContent = varName;
        adjustInputWidth(varNameInput);
    
    });
    // Ajout un écouteur d'événements pour détecter les changements dans la zone de texte
    functionNameInput.addEventListener("input", function() {
        // Récupére la valeur saisie dans la zone de texte
        var functionName = functionNameInput.value;

        // Met à jour le contenu de la cellule avec la nouvelle valeur
        var derivFun = document.getElementById("deriv-function");
        var lastCellFun = document.getElementById("last-cell-function");
        var beforeLastCellFun = document.getElementById("before-last-cell-function");
        
        derivFun.textContent = functionName;
        lastCellFun.textContent = functionName;
        beforeLastCellFun.textContent = functionName;
        adjustInputWidth(functionNameInput);
});
} 

///////////////////////////////////////////////////////// GESTION DES CELLULES DANS LE TABLEAU ////////////////////////////////////////////////////////////////////////////////////////////

// fonction qui permet d'afficher le menu deroulant (quand la souris est dessus)
function showDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "block";
}


// fonction qui permet au menu deroulant de disparaitre (appeler quand la souris n'est plus dessus)
function hideDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "none";
}


// fonction qui permet de rentrer une valeur dans le bouton value
function changeValue(link) {
    var dropdownContent = link.closest('.dropdown-content'); // Trouve le contenu du menu déroulant
    var button = dropdownContent.parentElement.querySelector('.value'); // Trouve le bouton "value" associé

    var currentValue = button.innerText; // Récupére la valeur actuelle
    var input = document.createElement('input'); // Cré un élément input
    input.type = 'text'; // Défini le type de l'input
    input.value = currentValue; // Pré-rempli l'input avec la valeur actuelle
    
    // Ajoute un gestionnaire d'événements pour détecter lorsque l'utilisateur clique à l'extérieur de la zone de texte
    input.addEventListener('blur', function() {
        updateButtonValue(this.parentElement, this.value); // Mett à jour le texte du bouton avec la nouvelle valeur saisie
        this.parentElement.removeChild(this); // Supprime l'élément input une fois que l'utilisateur a terminé de saisir la nouvelle valeur
    });

    // Ajoute un gestionnaire d'événements pour détecter lorsque la touche "Entrée" est pressée
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            updateButtonValue(this.parentElement, this.value); // Met à jour le texte du bouton avec la nouvelle valeur saisie
            this.parentElement.removeChild(this); // Supprime l'élément input une fois que l'utilisateur a appuyé sur "Entrée"
        }
    });
    
    button.innerHTML = ''; // Efface le contenu du bouton
    button.appendChild(input); // Ajoute l'élément input au bouton
    input.focus(); // Met le focus sur l'input pour que l'utilisateur puisse commencer à saisir immédiatement
}

// Fonction pour mettre à jour le texte du bouton avec la nouvelle valeur saisie
function updateButtonValue(button, newValue) {
    button.innerText = newValue;
}

// fonction qui permet d'afficher l'identiter du bouton MoreLess
function toggleMore(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.moreLess');
    moreButton.innerText = value;
}

// fonction qui permet d'afficher l'identiter du bouton Increase
function toggleIncrease(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.increase');
    moreButton.innerText = value;
}

// fonction qui permet d'afficher l'identiter du bouton VI
function toggleVI(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.VI');
    moreButton.innerText = value;
}

// fonction qui permet de ne pas afficher "vide" dans l'avant derniere ligne du tableau
function toggleEmptySymbol() {
    var table = document.getElementById("tabvar");

    // Boucle à partir de la deuxième ligne jusqu'à l'avant-dernière ligne
    for (var j = 1; j < table.rows.length - 2; j++) {
        var cells = table.rows[j].cells;

        // Boucle à partir de la quatrième cellule (index 3) avec un pas de 2
        for (var i = 3; i < cells.length; i += 2) {
            // Sélectionne l'élément contenant le menu déroulant
            var dropdownContent = cells[i].querySelector('.dropdown-content');

            if (dropdownContent) {
                // Sélectionne le bouton ou l'élément contenant le symbole "∅"
                var emptyButton = dropdownContent.querySelector('a[value="∅"]');

                if (emptyButton) {
                    // Affiche le bouton contenant le symbole "∅"
                    emptyButton.style.display = "block";
                }
            }
        }
    }

    // Boucle spécifique pour masquer le bouton dans l'avant-dernière ligne
    var secondLastRow = table.rows[table.rows.length - 2];
    var cells = secondLastRow.cells;

    for (var i = 3; i < cells.length; i += 2) {
        var dropdownContent = cells[i].querySelector('.dropdown-content');

        if (dropdownContent) {
            var emptyButton = dropdownContent.querySelector('a[value="∅"]');

            if (emptyButton) {
                // Masque le bouton contenant le symbole "∅"
                emptyButton.style.display = "none";
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES COLONNES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction qui permet d'ajouter deux colonnes quand on clique sur le plus de la premiere ligne, la premiere colonne correspond a une colonne valeur et la seconde a un ajout
function addColumn(button) {
    var table = document.getElementById("tabvar");
    var colNumber = 2; // Nombre de colonnes à ajouter
    var buttonCellIndex = button.parentNode.cellIndex;

    // Ajout des cellules pour chaque ligne
    for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        var row = table.rows[rowIndex];

        for (var i = 0; i < colNumber; i++) {
            var newCell = createCell();

            if (rowIndex === 0 ) {
                // Première ligne ou dernière ligne
                if (i == 0) {
                    var dropdownCell1 = createDropdownCell("div", "0", "value", function() { changeValue(this); }, `
                    <a href="#" onclick="changeValue(this)">Changer</a>
                    <a href="#" onclick="deleteColumns(this)">Supprimer</a>
                    `);
                    newCell.appendChild(dropdownCell1); // Ajout la cellule contenant le menu déroulant à la première nouvelle colonne
                } else {
                    var clonedButton = button.cloneNode(true);
                    newCell.appendChild(clonedButton);
                }
            } 
            else if (rowIndex === table.rows.length - 1) {
                if(i==1){
                    var dropdownCell = createDropdownCell("button",
                        "\u2197 \u2198",
                        "increase",
                        function() { toggleIncrease(this, this.innerText); },
                        `
                        <a href="#" onclick="toggleIncrease(this, '&#8599')">Croissant</a>
                        <a href="#" onclick="toggleIncrease(this, '&#8600')">Decroissant</a>
                        `
                    );
                    newCell.appendChild(dropdownCell);
                }
            }
            else {
                // Toutes les autres lignes sauf la première et la dernière
                if (i == 0) {
                    var dropdownCell = createDropdownCell("button",
                        "|| 0 ∅",
                        "VI",
                        function() { toggleVI(this, this.innerText); },
                        `
                        <a href="#" onclick="toggleVI(this, '||')">Valeur Interdite</a>
                        <a href="#" onclick="toggleVI(this, '0')">Zéro</a>
                        <a href="#" value="∅" onclick="toggleVI(this, '∅')">Vide</a>
                        `
                    );
                    newCell.appendChild(dropdownCell);
                } else {
                    var dropdownCell = createDropdownCell("button",
                        "+-",
                        "moreLess",
                        function() { toggleMore(this, this.innerText); },
                        `
                        <a href="#" onclick="toggleMore(this, '-')">Négatif</a>
                        <a href="#" onclick="toggleMore(this, '+')">Positif</a>
                        `
                    );
                    newCell.appendChild(dropdownCell);
                }
            }
            row.insertBefore(newCell, row.cells[buttonCellIndex + 1 + i]);
        }
    }
    toggleEmptySymbol()
}

// fonction qui permet de créer une nouvelle celule
function createCell(){
    var cell = document.createElement("td");
    cell.className = "additional-column";
    return cell
}

// fonction qui est appeler dans la fonction adColumn afin de créer les nouveau élément et leur type
function createDropdownCell(buttonOrDiv, buttonText, buttonClass, buttonOnClick, contentHTML) {
    var dropdownCell = document.createElement("div");
    dropdownCell.className = "dropdown";
    dropdownCell.onmouseover = function() { showDropdown(this); };
    dropdownCell.onmouseleave = function() { hideDropdown(this); };

    var dropdownButton = document.createElement("button");
    dropdownButton.className = buttonClass;
    dropdownButton.type = "button";
    dropdownButton.innerText = buttonText;
    dropdownButton.onclick = buttonOnClick;

    var dropdownDiv = document.createElement("div");
    dropdownDiv.className = buttonClass;
    dropdownDiv.type = "button";
    dropdownDiv.innerText = buttonText;
    dropdownDiv.onclick = buttonOnClick;

    var dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    dropdownContent.innerHTML = contentHTML;

    if(buttonOrDiv=="button"){
        dropdownCell.appendChild(dropdownButton);
        dropdownCell.appendChild(dropdownContent);
    } else {
        dropdownCell.appendChild(dropdownDiv);
        dropdownCell.appendChild(dropdownContent);
    }

    return dropdownCell;
}

// fonction qui permet de supprimer la colonne choisit et celle de droite
function deleteColumns(link) {
    // Sélectionne la cellule contenant le lien cliqué
    var buttonCell = link.closest('td');
    var buttonCellIndex = buttonCell.cellIndex;
    var table = document.getElementById("tabvar");

    // Supprime les cellules à droite immédiates si elles existent
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[buttonCellIndex]) {
            table.rows[i].cells[buttonCellIndex].remove();
        }
    }

    // Supprime les cellules à droite suivantes (qui deviennent les nouvelles cellules immédiatement à droite) si elles existent
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[buttonCellIndex]) {
            table.rows[i].cells[buttonCellIndex].remove();
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES LIGNES //////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour ajouter une nouvelle ligne avec des placeholders différents
function addExtraRow() {
    var table = document.getElementById("tabvar");
    var secondRow = table.rows[1];
    var newRow = table.insertRow(1); // Insérer à la deuxième ligne

    // Cré une nouvelle ligne avec des placeholders différents pour chaque nouvelle ligne
    var placeholders = ['k(x)', 'l(x)', 'g(x)', 'h(x)', 'i(x)', 'j(x)']; // Liste des placeholders
    var placeholderIndex = (table.rows.length - 2) % placeholders.length; // Sélectionne le placeholder en fonction du nombre de lignes actuelles
    for (var i = 0; i < secondRow.cells.length; i++) {
        var newCell = newRow.insertCell(i);

        // Attribue le placeholder approprié à la première cellule de la nouvelle ligne
        if (i === 0) {
            var dropdownCell = createDropdownCell("div", ""+placeholders[placeholderIndex] , 'value' , function() { changeValue(this); }, `
                        <a href="#" onclick="changeValue(this)">Changer</a>
                        <a href="#" onclick="deleteRow(this)">Supprimer</a>
                    `);
            newCell.appendChild(dropdownCell);
        } else {
            // Copie le contenu de la cellule de la deuxième ligne
            newCell.innerHTML = secondRow.cells[i].innerHTML;
            newCell.className = secondRow.cells[i].className;

            // Réinitialise les événements des boutons de la nouvelle ligne si nécessaire
            var dropdown = newCell.querySelector('.dropdown');
            if (dropdown) {
                dropdown.onmouseover = function() { showDropdown(this); };
                dropdown.onmouseleave = function() { hideDropdown(this); };
            }

            var valueButton = newCell.querySelector('.value');
            if (valueButton) {
                valueButton.onclick = function() { changeValue('Changer', this); };
            }

            var moreLessButton = newCell.querySelector('.moreLess');
            if (moreLessButton) {
                moreLessButton.onclick = function() { toggleMore(this, moreLessButton.innerText); };
            }

            var increaseButton = newCell.querySelector('.increase');
            if (increaseButton) {
                increaseButton.onclick = function() { toggleIncrease(this, increaseButton.innerText); };
            }

            var viButton = newCell.querySelector('.VI');
            if (viButton) {
                viButton.onclick = function() { toggleVI(this, viButton.innerText); };
            }
        }
    }

    // Création d'une div afin de renseigner le nom de la fonction
    var newFunctionDiv = document.createElement('div');
    newFunctionDiv.classList.add('enter_function');

    // Ajuster la taille initiale de l'input et ajouter un écouteur d'événements
    newInput.style.width = ((newInput.placeholder.length + 1) * 8) + 'px';
    newInput.addEventListener('input', function() { adjustInputWidth(newInput); });

    // Créer un nouvel élément input pour le x
    var xInput = document.createElement('input');
    xInput.type = 'text';
    xInput.placeholder = 'x';

    // Ajuster la taille initiale de l'input et ajouter un écouteur d'événements
    xInput.style.width = ((xInput.placeholder.length + 1) * 8) + 'px';
    xInput.addEventListener('input', function() { adjustInputWidth(xInput); });

    // Ajouter les nouveaux éléments input à l'élément div
    newFunctionDiv.appendChild(document.createTextNode(placeholders[placeholderIndex].charAt(0) + '('));
    newFunctionDiv.appendChild(xInput);
    newFunctionDiv.appendChild(document.createTextNode(') = '));
    newFunctionDiv.appendChild(newInput);

    toggleEmptySymbol();
}

// supprime les lignes supplementaire
function removeMiddleRows() {  
    var table = document.getElementById("tabvar");
    var rowCount = table.rows.length;

    // Vérifie si le tableau contient au moins trois lignes
    if (rowCount < 3) {
        console.log("Le tableau doit avoir au moins trois lignes pour effectuer cette opération.");
        return;
    }

    // Supprime toutes les lignes sauf la première, l'avant-dernière et la dernière
    for (var i = rowCount - 3; i > 0; i--) {
        table.deleteRow(i);
    }
}

function deleteRow(link) {
    var row = link.closest('tr');
    row.remove();
} 