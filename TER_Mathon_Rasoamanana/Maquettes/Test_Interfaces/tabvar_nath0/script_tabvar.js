function showActionsMenu(event) {
    event.preventDefault(); // Empêche l'ouverture du menu contextuel par défaut
    const actionsMenu = document.getElementById('actionsMenu');
    actionsMenu.style.display = 'block';
    actionsMenu.style.left = event.pageX + 'px';
    actionsMenu.style.top = event.pageY + 'px';

    // Ajoute un événement de clic pour masquer le menu lorsqu'on clique en dehors de celui-ci
    document.addEventListener('click', hideActionsMenu);
}

function performAction(action) {
    alert(action + ' exécuté.');
    hideActionsMenu();
}

function hideActionsMenu(event) {
    const actionsMenu = document.getElementById('actionsMenu');
    if (event) {
        // Ne cache le menu que si le clic est en dehors du menu d'actions
        if (!actionsMenu.contains(event.target)) {
            actionsMenu.style.display = 'none';
            document.removeEventListener('click', hideActionsMenu);
        }
    } else {
        actionsMenu.style.display = 'none';
        document.removeEventListener('click', hideActionsMenu);
    }
}

// Empêche le menu contextuel de disparaître lorsqu'on clique dedans
document.getElementById('actionsMenu').addEventListener('click', function(event) {
    event.stopPropagation();
});

function addColumn(button) {
    var table = document.getElementById("tabvar");
    var colNumber = 2; // Nombre de colonnes à ajouter
    var buttonCellIndex = button.parentNode.cellIndex; // Index de la cellule contenant le bouton cliqué

    // Parcourir toutes les lignes du tableau
    for (var i = 0; i < table.rows.length; i++) {
        // Pour chaque ligne, parcourir le nombre de colonnes à ajouter
        for (var j = 0; j < colNumber; j++) {
            // Créer une nouvelle cellule de tableau
            var newCell = document.createElement("td");
            newCell.className = "col2"; // Ajouter la classe "col2"

            // Rendre la première colonne éditable et la deuxième non éditable pour la première ligne
            if (i === 0) {
                if (j === 0) {
                    newCell.setAttribute("contenteditable", "true");
                } else {
                    newCell.setAttribute("contenteditable", "false");
                }
            } else {
                // Rendre toutes les autres colonnes éditables sauf la première ligne
                newCell.setAttribute("contenteditable", "true");
            }

            // Ajouter l'événement de clic pour afficher le menu contextuel à toutes les cellules éditables
            newCell.addEventListener("contextmenu", showActionsMenu);

            // Insérer la nouvelle cellule juste après la cellule contenant le bouton cliqué
            var currentRow = table.rows[i];
            currentRow.insertBefore(newCell, currentRow.cells[buttonCellIndex + 1 + j]);

            // Si c'est la première ligne et la deuxième colonne, ajouter le bouton
            if (i === 0 && j === 1) {
                var clonedButton = button.cloneNode(true);
                newCell.appendChild(clonedButton);
            }
        }
    }
}

//Afficher les contenus du tableau
function showContents() {
    const table = document.getElementById('tabvar');
    const rows = table.getElementsByTagName('tr');
    
    if (rows.length > 0) {
        let firstRowContents = [];
        let firstRowCells = rows[0].getElementsByTagName('td');
        for (let i = 1; i < firstRowCells.length; i++) {
            if (i % 2 !== 0) { // Vérifie si l'index est impair
                firstRowContents.push(firstRowCells[i].innerText);
            }
        }
        document.getElementById('resultLabel1').innerText = '[' + firstRowContents.join(', ')+']';
    }

    if (rows.length > 1) {
        let secondRowContents = [];
        let secondRowCells = rows[1].getElementsByTagName('td');
        for (let i = 1; i < secondRowCells.length; i++) {
            secondRowContents.push(secondRowCells[i].innerText);
        }
        document.getElementById('resultLabel2').innerText = '[' + secondRowContents.join(', ')+']';
    }

    if (rows.length > 2) {
        let thirdRowContents = [];
        let thirdRowCells = rows[2].getElementsByTagName('td');
        for (let i = 1; i < thirdRowCells.length; i++) {
            thirdRowContents.push(thirdRowCells[i].innerText);
        }
        document.getElementById('resultLabel3').innerText = '[' + thirdRowContents.join(', ')+']';
    }
}  