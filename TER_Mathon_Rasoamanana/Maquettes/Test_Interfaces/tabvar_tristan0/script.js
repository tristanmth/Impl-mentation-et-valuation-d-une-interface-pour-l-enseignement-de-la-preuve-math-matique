
function varTabvar(){
    // Récupérer le tableau
    var table = document.getElementById("tabvar");
    // Récupérer la première ligne du tableau
    var firstRow = table.rows[0];
    var secondRow = table.rows[1];
    // Récupérer les cellules de la première ligne
    var cells1 = firstRow.cells;
    var cells2 = secondRow.cells;

    // Initialiser une variable pour stocker les valeurs
    var values1 = [];
    var values2 = [];

    // Parcourir les cellules de la première ligne et récupérer les valeurs
    for (var i = 1; i < cells1.length; i += 2) {
        values1.push(cells1[i].innerText);
    }
    for (var i = 2; i < cells2.length-1; i += 1) {
        values2.push(cells2[i].innerText);
    }
    // Afficher les valeurs dans le conteneur prévu à cet effet
    document.getElementById("valuesContainer").innerText = "Les valeurs de la première ligne sont : " + values1;
    document.getElementById("valuesContainer").innerText = "Les valeurs de la seconde ligne sont : " + values2;

}

function showDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "block";
    varTabvar()
}

function hideDropdown(element) {
    var dropdownContent = element.querySelector('.dropdown-content');
    dropdownContent.style.display = "none";
}

function changeValue(option, link) {
    var newValue = prompt("Entrez la nouvelle valeur :");
    if (newValue !== null) {
        var button = link.parentElement.previousElementSibling; // Le bouton "value"
        button.innerText = newValue;
    }
    
}

function toggleMore(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.moreLess');
    moreButton.innerText = value;
}

function toggleIncrease(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.increase');
    moreButton.innerText = value;
}

function toggleVI(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.VI');
    moreButton.innerText = value;
    // if (value === '∅') {
    //     mergeCells(moreButton.closest('td'));
    // }
}


function createCell(){
    var cell = document.createElement("td");
    cell.className = "additional-column";
    return cell
}

function createDropdownCell(buttonText, buttonClass, buttonOnClick, contentHTML) {
    var dropdownCell = document.createElement("div");
    dropdownCell.className = "dropdown";
    dropdownCell.onmouseover = function() { showDropdown(this); };
    dropdownCell.onmouseleave = function() { hideDropdown(this); };

    var dropdownButton = document.createElement("button");
    dropdownButton.className = buttonClass;
    dropdownButton.type = "button";
    dropdownButton.innerText = buttonText;
    dropdownButton.onclick = buttonOnClick;

    var dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    dropdownContent.innerHTML = contentHTML;

    dropdownCell.appendChild(dropdownButton);
    dropdownCell.appendChild(dropdownContent);

    return dropdownCell;
}

function addColumn(button) {
    var table = document.getElementById("tabvar");
    var colNumber = 2; // Nombre de colonnes à ajouter
    var buttonCellIndex = button.parentNode.cellIndex; // Index de la cellule contenant le bouton cliqué
    //var totalColumns = table.rows[0].cells.length; // Nombre total de colonnes actuelles

    // Ajouter des colonnes supplémentaires juste à côté de la cellule contenant le bouton cliqué
    for (var i = 0; i < colNumber; i++) {
        var newCell = createCell();
        var newCell1 = createCell();
        var newCell2 = createCell();
        
        if (i == 0) {
            // Création de la cellule contenant le menu déroulant
            var dropdownCell1 = createDropdownCell("0", "value", function() { changeValue('Changer', this); }, `
                <a href="#" onclick="changeValue('Changer', this)">Changer</a>
                <a href="#" onclick="deleteColumns(this)">Supprimer</a>
                `);
            newCell.appendChild(dropdownCell1); // Ajouter la cellule contenant le menu déroulant à la première nouvelle colonne
        
            // Création du bouton "+" dans la deuxième nouvelle colonne
            
            var dropdownCell2 = createDropdownCell("|| 0 ∅", "VI", "", `
                <a href="#" onclick="toggleVI(this, '||')">Valeur Interdite</a>
                <a href="#" onclick="toggleVI(this, '0')">Zéro</a>
                <a href="#" onclick="toggleVI(this, '∅')">Vide</a>
            `);
            newCell1.appendChild(dropdownCell2);

        } else {            
            var clonedButton = button.cloneNode(true); // Cloner le bouton cliqué
            newCell.appendChild(clonedButton); // Ajouter le bouton cloné à la deuxième nouvelle colonne
       
            var dropdownCell3 = createDropdownCell("+-", "moreLess", "", `
                <a href="#" onclick="toggleMore(this, '-')">Négatif</a>
                <a href="#" onclick="toggleMore(this, '+')">Positif</a>
            `);
            newCell1.appendChild(dropdownCell3);

            var dropdownCell4 = createDropdownCell("\u2197 \u2198", "increase", "", `
                <a href="#" onclick="toggleIncrease(this, '&#8599')">Croissant</a>
                <a href="#" onclick="toggleIncrease(this, '&#8600')">Decroissant</a>
            `);
            newCell2.appendChild(dropdownCell4);
        }
        
        // Insertion des nouvelles cellules dans les lignes appropriées
        table.rows[0].insertBefore(newCell, table.rows[0].cells[buttonCellIndex + 1 + i]);
        table.rows[1].insertBefore(newCell1, table.rows[1].cells[buttonCellIndex + 1 + i]);
        table.rows[2].insertBefore(newCell2, table.rows[2].cells[buttonCellIndex + 1 + i]);
    }
    // varTabvar()
}

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



