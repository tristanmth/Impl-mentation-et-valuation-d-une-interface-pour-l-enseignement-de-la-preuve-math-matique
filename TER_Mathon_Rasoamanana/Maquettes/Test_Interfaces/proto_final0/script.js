
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES VALEURS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fonction qui permet d'afficher les valeur qui se trouvent dans les lignes
function showValues(){
    // Récupérer le tableau
    var table = document.getElementById("tabvar");
    // Récupérer la première ligne du tableau
    var firstRow = table.rows[0];
    var beforLastRow = table.rows[table.rows.length -2];
    var lastRow = table.rows[table.rows.length -1];

    // Récupérer les cellules de la première ligne
    var cells1 = firstRow.cells;
    var cells2 = beforLastRow.cells;
    var cells3 = lastRow.cells;

    // Initialiser une variable pour stocker les valeurs
    var values1 = [];
    var values2 = [];
    var values3 = [];

    // Parcourir les cellules de la première ligne et récupérer les valeurs
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

    // Afficher les valeurs dans le conteneur prévu à cet effet
    document.getElementById("valuesContainer1").innerText = "Les valeurs de la première ligne sont : " + values1;
    document.getElementById("valuesContainer2").innerText = "Les valeurs de l'avant derniere ligne sont : " + values2;
    document.getElementById("valuesContainer3").innerText = "Les valeurs de la derniere ligne sont : " + values3;
    toggleEmptySymbol()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES EVENEMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// GESTION DE LA PREMIERE COLONNE //////////////////////////////////////////////////////////////////////////////////////////////////

// Ajoute des écouteurs d'événements aux cellules de la première colonne
function addEventListenersToFirstColumn() {
    var table = document.getElementById('tabvar');
    var rows = table.rows;

    // Première cellule (doit contenir une seule lettre)
    rows[0].cells[0].querySelector('input').addEventListener('blur', function() {
        validateFirstCell(this);
    });
    // for (var rowIndex = 1; rowIndex < rows.length - 1; rowIndex++) {
    //     var row = rows[rowIndex];
    //     var firstCellInput = row.cells[0].querySelector('input');
    //     // Ajouter un écouteur d'événements à l'événement "blur" pour chaque cellule de la première colonne
    //     firstCellInput.addEventListener('blur', function() {
    //         validateOtherCell(tihs);
    //     });
    // }
    // L'avant dernière cellule (doit correspondre au format f'(x))
    rows[rows.length - 2].cells[0].querySelector('input').addEventListener('blur', function() {
        validateBeforeLastCell(this);
    });
    // Dernière cellule (doit correspondre au format f(x))
    rows[rows.length - 1].cells[0].querySelector('input').addEventListener('blur', function() {
        validateLastCell(this);
    });
}

// Fonction pour mettre à jour la dernière cellule avec la lettre x
function updateCellPlaceholder(letter) { 
    //var otherCellInput = document.getElementById('other-cell-input');
    var lastCellInput = document.getElementById('last-cell-input');
    var beforeLastCellInput = document.getElementById('before-last-cell-input');
    
    // if (otherCellInput) {
    //     otherCellInput.placeholder = `g(${letter})`;
    // }
    if (lastCellInput) {
        lastCellInput.placeholder = `f(${letter})`;
    }
    if (beforeLastCellInput) {
        beforeLastCellInput.placeholder = `f'(${letter})`;
    } 
}

// Fonction pour valider la première cellule (doit contenir une seule lettre)
function validateFirstCell(input) {
    var value = input.value;
    if (value.length !== 1 || !/^[a-zA-Z]$/.test(value)) {
        alert("La première cellule doit contenir une seule lettre.");
        input.value = ''; // Réinitialise la valeur si elle n'est pas valide
    } else {
        // Stocke la lettre dans un attribut data pour l'utiliser dans la dernière cellule
        document.getElementById('tabvar').setAttribute('data-first-cell-letter', value);
        // Mettre à jour la dernière cellule avec la nouvelle lettre x
        updateCellPlaceholder(value);
    }
}

// Fonction pour valider la dernière cellule (doit correspondre à f(x) avec f et x spécifiques)
// function validateOtherCell(input) {
//     var value = input.value;
//     var firstCellLetter = document.getElementById('tabvar').getAttribute('data-first-cell-letter');
//     var regex = new RegExp(`^[a-zA-Z]\\(${firstCellLetter}\\)$`);
    
//     if (!regex.test(value)) {
//         alert(`La cellule doit correspondre au format f(${firstCellLetter}) avec ${firstCellLetter} comme variable.`);
//         input.value = ''; // Réinitialise la valeur si elle n'est pas valide
//     }
// }

// Fonction pour valider la dernière cellule (doit correspondre à f(x) avec f et x spécifiques)
function validateBeforeLastCell(input) {
    var value = input.value;
    var firstCellLetter = document.getElementById('tabvar').getAttribute('data-first-cell-letter');
    var regex = new RegExp(`^[a-zA-Z]'\\(${firstCellLetter}\\)$`);

    if (!regex.test(value)) {
        alert(`L'avant dernière cellule doit correspondre au format f'(${firstCellLetter}) avec ${firstCellLetter} comme variable.`);
        input.value = ''; // Réinitialise la valeur si elle n'est pas valide
    }
}

// Fonction pour valider la dernière cellule (doit correspondre à f(x) avec f et x spécifiques)
function validateLastCell(input) {
    var value = input.value;
    var firstCellLetter = document.getElementById('tabvar').getAttribute('data-first-cell-letter');
    var regex = new RegExp(`^[a-zA-Z]\\(${firstCellLetter}\\)$`);

    if (!regex.test(value)) {
        alert(`La dernière cellule doit correspondre au format f(${firstCellLetter}) avec ${firstCellLetter} comme variable.`);
        input.value = ''; // Réinitialise la valeur si elle n'est pas valide
    }
}

// Fonction d'initialisation
function initializeTable() {
    addEventListenersToFirstColumn();
    }

document.addEventListener('DOMContentLoaded', initializeTable);

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
function changeValue( link) {
    var newValue = prompt("Entrez la nouvelle valeur :");
    if (newValue !== null) {
        var button = link.parentElement.previousElementSibling; // Le bouton "value"
        button.innerText = newValue;
    }
    
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
    // if (value === '∅') {
    //     mergeCells(moreButton.closest('td'));
    // }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES COLONNES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction qui permet d'ajouter deux colonnes quand on clique sur le plus de la premiere ligne, la premiere colonne correspond a une colonne valeur et la seconde a un ajout
function addColumn(button) {
    var table = document.getElementById("tabvar");
    var colNumber = 2; // Nombre de colonnes à ajouter
    var buttonCellIndex = button.parentNode.cellIndex;

    // Ajouter des cellules pour chaque ligne
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
                    newCell.appendChild(dropdownCell1); // Ajouter la cellule contenant le menu déroulant à la première nouvelle colonne
        
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
    // Sélectionner la cellule contenant le lien cliqué
    var buttonCell = link.closest('td');
    var buttonCellIndex = buttonCell.cellIndex;
    var table = document.getElementById("tabvar");

    // Supprimer les cellules à droite immédiates si elles existent
    for (var i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[buttonCellIndex]) {
            table.rows[i].cells[buttonCellIndex].remove();
        }
    }

    // Supprimer les cellules à droite suivantes (qui deviennent les nouvelles cellules immédiatement à droite) si elles existent
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

    // Créer une nouvelle ligne avec des placeholders différents pour chaque nouvelle ligne
    var placeholders = [ 'i(x)', 'j(x)', 'k(x)', 'l(x)','g(x)', 'h(x)']; // Liste des placeholders
    var placeholderIndex = table.rows.length % placeholders.length; // Sélectionner le placeholder en fonction du nombre de lignes actuelles
    for (var i = 0; i < secondRow.cells.length; i++) {
        var newCell = newRow.insertCell(i);

        // Attribuer le placeholder approprié à la première cellule de la nouvelle ligne
        if (i === 0) {
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = placeholders[placeholderIndex];
            newCell.appendChild(input);
        } else {
            // Copier le contenu de la cellule de la deuxième ligne
            newCell.innerHTML = secondRow.cells[i].innerHTML;
            newCell.className = secondRow.cells[i].className;

            // Réinitialiser les événements des boutons de la nouvelle ligne si nécessaire
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
}

// fonction qui permet de ne pas afficher "vide" dans l'avant derniere ligne du tableau
function toggleEmptySymbol() {
    var table = document.getElementById("tabvar");
    var beforeLastRow = table.rows[table.rows.length - 2];
    var cells = beforeLastRow.cells;

    for(var i = 3; i < cells.length; i += 2){
         // Sélectionner l'élément contenant le menu déroulant
        var dropdownContent = cells[i].querySelector('.dropdown-content');

        // Sélectionner le bouton ou l'élément contenant le symbole "∅"
        var emptyButton = dropdownContent.querySelector('a[value="∅"]');

        // Masquer le bouton contenant le symbole "∅"
        emptyButton.style.display = "none";
    }
       
}

// fonction qui permet de concatener la celule quand on clique sur "vide" avec celle de droite et de gauche
// function mergeCells(cell) {
//     var rowIndex = cell.parentNode.rowIndex;
//     var table = cell.closest('table');
//     var cellIndex = cell.cellIndex;

//     if (cellIndex > 0 && cellIndex < table.rows[rowIndex].cells.length - 1) {
//         var leftCell = table.rows[rowIndex].cells[cellIndex - 1];
//         var rightCell = table.rows[rowIndex].cells[cellIndex + 1];

//         leftCell.colSpan += 2; // Fusionner avec les cellules de gauche et de droite
//         rightCell.remove(); // Supprimer la cellule de droite

//         // // Supprimer les cellules correspondantes dans les autres lignes
//         // for (var i = 0; i < table.rows.length; i++) {
//         //     var row = table.rows[i];
//         //     if (row.cells[cellIndex]) {
//         //         row.deleteCell(cellIndex);
//         //     }
//         // }
//     }
// }
