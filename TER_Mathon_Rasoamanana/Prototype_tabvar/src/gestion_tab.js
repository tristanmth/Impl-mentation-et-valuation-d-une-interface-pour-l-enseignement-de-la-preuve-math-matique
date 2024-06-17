///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES VALEURS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour ajuster la taille de l'input en fonction de son contenu
function adjustInputWidth(input) {
    input.style.width = ((input.value.length +1)*8) + 'px'; // Ajuster la largeur en fonction de la longueur du texte
}

// Fonction qui permet d'afficher les valeur qui se trouvent dans les lignes
function showValues() {
    // Erreur d'accès à l'élément lors de la récupération du tableau.
    var table = document.getElementById("tabvar");
    if (!table) {
        console.error("[1.6, Le tableau avec l'ID 'tabvar' n'existe pas.]");
        return;
    }

    // Erreur d'index. Vérifie si le tableau a au moins 3 lignes
    if (table.rows.length < 3) {
        console.error("[1.7, Le tableau doit contenir au moins 3 lignes.]");
        return;
    }

    // Récupère les lignes du tableau
    var firstRow = table.rows[0];
    var beforeLastRow = table.rows[table.rows.length - 2];
    var lastRow = table.rows[table.rows.length - 1];

    // Récupère les cellules de chaque ligne
    var cells1 = firstRow.cells;
    var cells2 = beforeLastRow.cells;
    var cells3 = lastRow.cells;

    // Initialise une variable pour stocker les valeurs
    var values1 = [];
    var values2 = [];
    var values3 = [];

    // Parcourt les cellules de la première ligne et récupère les valeurs
    for (let i = 1; i < cells1.length; i += 2) {
        if (cells1[i]) {
            values1.push(cells1[i].innerText);
        } else {
            console.error("[1.6, Cellule manquante dans la première ligne à l'index " + i + ".]");
        }
    }

    for (let i = 2; i < cells2.length - 1; i++) {
        if (cells2[i]) {
            switch (cells2[i].innerText) {
                case "||":
                    values2.push("VI");
                    break;
                case "∅":
                    values2.push("NI");
                    break;
                case "0":
                    values2.push("0");
                    break;
                case "+":
                    values2.push("pos");
                    break;
                case "-":
                    values2.push("neg");
                    break;
                default:
                    values2.push(cells2[i].innerText);
            }
        } else {
            console.error("[1.6, Cellule manquante dans l'avant-dernière ligne à l'index " + i + ".]");
        }
    }

    for (let i = 2; i < cells3.length; i += 2) {
        if (cells3[i]) {
            switch (cells3[i].innerText) {
                case "↘":
                    values3.push("down");
                    break;
                case "↗":
                    values3.push("up");
                    break;
                default:
                    values3.push(cells3[i].innerText);
            }
        } else {
            console.error("[1.6, Cellule manquante dans la dernière ligne à l'index " + i + ".]");
        }
    }

    return [[values1], [values2], [values3]];
}

//Récupération des valeurs spécifiques selon l'index fourni.
function getValues(index) {
    var values = showValues();
    var result;

    // Erreur de validité des valeurs retournées par showValues()
    if (!Array.isArray(values) || values.length !== 3) {
        console.error("[1.5, Les valeurs retournées par showValues() sont invalides.]");
        return;
    }

    switch (index) {
        case 1:
            result = values[0];
            break;
        case 2:
            result = values[1];
            break;
        case 3:
            result = values[2];
            break;
        default:
            // Erreur de paramètres. Si index est invalide.
            console.error("[1.7, Erreur paramètres : 1 pour valeurs de x, 2 pour signe de la dérivée, 3 pour variations de la fonction.]");
            return;
    }
    return result;
}

//Fonction de sauvegarde des valeurs du tableau (Pour les lignes : 1ère, avant dernière, dernière)
function saveValuesToJSON() {
    try {
        var values = showValues();
        if (!values) {
            console.error("[1.9, Erreur interne : Les valeurs retournées par showValues() sont invalides ou non définies]");
            return;
        }

        var jsonData = JSON.stringify(values, null, 2);

        var blob = new Blob([jsonData], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'tableValues.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error("[1.9, Erreur interne lors de la sauvegarde des valeurs en JSON] " + error.message);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES EVENEMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////// GESTION DE LA PREMIERE COLONNE //////////////////////////////////////////////////////////////////////////////////////////////////

function changeVarFun() {
    // Récupère les éléments input pour le nom de la variable et de la fonction
    var varNameInput = document.getElementById("var-name");
    var functionNameInput = document.getElementById("function-name");

    // Vérifier l'existence du champs d'entrée de nom de fonction et de variable
    if (!varNameInput || !functionNameInput) {
        console.error("[1.6, Erreur : Les éléments input avec les ID 'var-name' ou 'function-name' n'existent pas.]");
        return;
    }

    // Ajoute un écouteur d'événements pour détecter les changements dans la zone de texte pour le nom de la variable
    varNameInput.addEventListener("input", function() {
        // Récupère la valeur saisie dans la zone de texte
        var varName = varNameInput.value;

        // Vérifie que les éléments cibles existent
        var derivVar = document.getElementById("deriv-var");
        var firstCellSpan = document.getElementById("first-cell");
        var lastCellVar = document.getElementById("last-cell-var");
        var beforeLastCellVar = document.getElementById("before-last-cell-var");

        if (derivVar && firstCellSpan && lastCellVar && beforeLastCellVar) {
            // Met à jour le contenu de la cellule avec la nouvelle valeur
            derivVar.textContent = varName;
            firstCellSpan.textContent = varName;
            lastCellVar.textContent = varName;
            beforeLastCellVar.textContent = varName;
            adjustInputWidth(varNameInput);
        } else {
            console.error("[1.6, Erreur d'affichage : Un ou plusieurs éléments de destination pour 'var-name' n'existent pas.]");
        }
    });

    // Ajoute un écouteur d'événements pour détecter les changements dans la zone de texte pour le nom de la fonction
    functionNameInput.addEventListener("input", function() {
        // Récupère la valeur saisie dans la zone de texte
        var functionName = functionNameInput.value;

        // Vérifie que les éléments cibles existent
        var derivFun = document.getElementById("deriv-function");
        var lastCellFun = document.getElementById("last-cell-function");
        var beforeLastCellFun = document.getElementById("before-last-cell-function");

        if (derivFun && lastCellFun && beforeLastCellFun) {
            // Met à jour le contenu de la cellule avec la nouvelle valeur
            derivFun.textContent = functionName;
            lastCellFun.textContent = functionName;
            beforeLastCellFun.textContent = functionName;
            adjustInputWidth(functionNameInput);
        } else {
            console.error("[1.6, Erreur d'affichage : Un ou plusieurs éléments de destination pour 'function-name' n'existent pas.]");
        }
    });
}

function changeValue(link) {
    try {
        // Trouve le contenu du menu déroulant
        var dropdownContent = link.closest('.dropdown-content');
        if (!dropdownContent) {
            console.error("[1.6, Le contenu du menu déroulant n'a pas pu être trouvé.]");
            return;
        }

        // Trouve le bouton "value" associé
        var button = dropdownContent.parentElement.querySelector('.value');
        if (!button) {
            console.error("[1.6, Le bouton 'value' associé n'a pas pu être trouvé.]");
            return;
        }

        // Récupère la valeur actuelle
        var currentValue = button.innerText;
        if (typeof currentValue !== 'string') {
            console.error("[1.2, La valeur actuelle du bouton n'est pas une chaîne de caractères.]");
            return;
        }

        // Crée un élément input
        var input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;

        // Ajoute un gestionnaire d'événements pour détecter lorsque l'utilisateur clique à l'extérieur de la zone de texte
        input.addEventListener('blur', function() {
            try {
                if (this.parentElement) {
                    updateButtonValue(this.parentElement, this.value);
                    this.parentElement.removeChild(this);
                } else {
                    console.error("[1.6, Impossible de trouver le parent de l'élément input lors du blur.]");
                }
            } catch (error) {
                console.error("[1.9, Erreur lors de la gestion de l'événement blur : " + error.message + "]");
            }
        });

        // Ajoute un gestionnaire d'événements pour détecter lorsque la touche "Entrée" est pressée
        input.addEventListener('keydown', function(event) {
            try {
                if (event.key === 'Enter') {
                    if (this.parentElement) {
                        updateButtonValue(this.parentElement, this.value);
                        this.parentElement.removeChild(this);
                    } else {
                        console.error("[1.6, Impossible de trouver le parent de l'élément input lors de la touche Entrée.]");
                    }
                }
            } catch (error) {
                console.error("[1.9, Erreur lors de la gestion de l'événement keydown : " + error.message + "]");
            }
        });

        // Efface le contenu du bouton
        button.innerHTML = '';
        button.appendChild(input);
        input.focus(); // Met le focus sur l'input pour que l'utilisateur puisse commencer à saisir immédiatement
    } catch (error) {
        console.error("[1.9, Erreur générale dans la fonction changeValue : " + error.message + "]");
    }
}

// fonction qui permet d'afficher le menu deroulant (quand la souris est dessus)
function showDropdown(element) {
    try {
        var dropdownContent = element.querySelector('.dropdown-content');
        if (!dropdownContent) {
            console.error("[1.9, Erreur interne : Le contenu du menu déroulant n'a pas été trouvé]");
            return;
        }
        dropdownContent.style.display = "block";
    } catch (error) {
        console.error("[1.9, Erreur interne lors de l'affichage du menu déroulant] " + error.message);
    }
}


// fonction qui permet au menu deroulant de disparaitre (appeler quand la souris n'est plus dessus)
function hideDropdown(element) {
    try {
        var dropdownContent = element.querySelector('.dropdown-content');
        if (!dropdownContent) {
            console.error("[1.9, Erreur interne : Le contenu du menu déroulant n'a pas été trouvé]");
            return;
        }
        dropdownContent.style.display = "none";
    } catch (error) {
        console.error("[1.9, Erreur interne lors de la disparition du menu déroulant] " + error.message);
    }
}

// Fonction pour mettre à jour le texte du bouton avec la nouvelle valeur saisie
function updateButtonValue(button, newValue) {
    try {
        button.innerText = newValue;
    } catch (error) {
        console.error("[1.9, Erreur interne lors de la mise à jour de la valeur du bouton] " + error.message);
    }
}

// fonction qui permet d'afficher l'identiter du bouton MoreLess
function toggleMore(link, value) {
    try {
        var moreButton = link.closest('.dropdown').querySelector('.moreLess');
        if (!moreButton) {
            console.error("[1.9, Erreur interne : Le bouton 'MoreLess' n'a pas été trouvé]");
            return;
        }
        moreButton.innerText = value;
    } catch (error) {
        console.error("[1.9, Erreur interne lors du basculement du bouton 'MoreLess'] " + error.message);
    }
}

// fonction qui permet d'afficher l'identiter du bouton Increase
function toggleIncrease(link, value) {
    try {
        var increaseButton = link.closest('.dropdown').querySelector('.increase');
        if (!increaseButton) {
            console.error("[1.9, Erreur interne : Le bouton 'Increase' n'a pas été trouvé]");
            return;
        }
        increaseButton.innerText = value;
    } catch (error) {
        console.error("[1.9, Erreur interne lors du basculement du bouton 'Increase'] " + error.message);
    }
}

// fonction qui permet d'afficher l'identiter du bouton VI
function toggleVI(link, value) {
    try {
        var viButton = link.closest('.dropdown').querySelector('.VI');
        if (!viButton) {
            console.error("[1.9, Erreur interne : Le bouton 'VI' n'a pas été trouvé]");
            return;
        }
        viButton.innerText = value;
    } catch (error) {
        console.error("[1.9, Erreur interne lors du basculement du bouton 'VI'] " + error.message);
    }
}

// fonction qui permet de ne pas afficher "vide" dans l'avant derniere ligne du tableau
function toggleEmptySymbol() {
    try {
        var table = document.getElementById("tabvar");

        if (!table) {
            console.error("[1.6, Le tableau avec l'ID 'tabvar' n'existe pas]");
            return;
        }

        // Boucle à partir de la deuxième ligne jusqu'à l'avant-dernière ligne
        for (var j = 1; j < table.rows.length - 1; j++) {
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

        // Masque le bouton dans l'avant-dernière ligne (ligne des valeurs inconsistées)
        var lastRow = table.rows[table.rows.length - 1];
        var cellsLastRow = lastRow.cells;

        for (var i = 3; i < cellsLastRow.length; i += 2) {
            var dropdownContent = cellsLastRow[i].querySelector('.dropdown-content');

            if (dropdownContent) {
                var emptyButton = dropdownContent.querySelector('a[value="∅"]');

                if (emptyButton) {
                    // Masque le bouton contenant le symbole "∅"
                    emptyButton.style.display = "none";
                }
            }
        }
    } catch (error) {
        console.error("[1.9, Erreur interne lors du basculement du symbole vide] " + error.message);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES COLONNES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//fonction qui permet d'ajouter deux colonnes quand on clique sur le plus de la premiere ligne, la premiere colonne correspond a une colonne valeur et la seconde a un ajout
function addColumn(button) {
    var table = document.getElementById("tabvar");
    if (!table) {
        console.error("[1.6, Le tableau avec l'ID 'tabvar' n'existe pas.]");
        return;
    }

    var colNumber = 2; // Nombre de colonnes à ajouter
    var buttonCellIndex = button.parentNode.cellIndex;

    // Ajout des cellules pour chaque ligne
    for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        var row = table.rows[rowIndex];

        for (var i = 0; i < colNumber; i++) {
            var newCell = createCell();

            if (rowIndex === 0) {
                // Première ligne
                if (i == 0) {
                    var dropdownCell1 = createDropdownCell("div", "0", "value", function() { changeValue(this); }, `
                        <a href="#" onclick="changeValue(this)">Changer</a>
                        <a href="#" onclick="deleteColumns(this)">Supprimer</a>
                    `);
                    newCell.appendChild(dropdownCell1); // Ajout de la cellule contenant le menu déroulant à la première nouvelle colonne
                } else {
                    var clonedButton = button.cloneNode(true);
                    newCell.appendChild(clonedButton);
                }
            } else if (rowIndex === table.rows.length - 1) {
                // Dernière ligne
                if (i == 1) {
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
            } else {
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
    toggleEmptySymbol();
}

// fonction qui permet de créer une nouvelle celule
function createCell(){
    var cell = document.createElement("td");
    cell.className = "additional-column";
    return cell
}

// fonction qui est appeler dans la fonction addColumn afin de créer les nouveau élément et leur type

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

    if (buttonOrDiv === "button") {
        dropdownCell.appendChild(dropdownButton);
        dropdownCell.appendChild(dropdownContent);
    } else if (buttonOrDiv === "div") {
        dropdownCell.appendChild(dropdownDiv);
        dropdownCell.appendChild(dropdownContent);
    } else {
        console.error("[1.6, Type de bouton incorrect dans createDropdownCell]");
        return null;
    }

    return dropdownCell;
}

// fonction qui permet de supprimer la colonne choisit et celle de droite
function deleteColumns(link) {
    try {
        // Sélectionne la cellule contenant le lien cliqué
        var buttonCell = link.closest('td');
        if (!buttonCell) {
            console.error("[1.6, Cellule contenant le lien cliqué n'a pas été trouvée]");
            return;
        }

        var buttonCellIndex = buttonCell.cellIndex;
        var table = document.getElementById("tabvar");

        // Supprime les cellules à droite immédiates si elles existent
        for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[buttonCellIndex]) {
                table.rows[i].deleteCell(buttonCellIndex);
            }
        }

        // Supprime les cellules à droite suivantes (qui deviennent les nouvelles cellules immédiatement à droite) si elles existent
        for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[buttonCellIndex]) {
                table.rows[i].deleteCell(buttonCellIndex);
            }
        }
    } catch (error) {
        console.error("[1.9, Erreur interne lors de la suppression des colonnes] " + error.message);
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES LIGNES //////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour ajouter une nouvelle ligne avec des placeholders différents
function addExtraRow() {
    var table = document.getElementById("tabvar");
    if (!table) {
        console.error("[1.6, Le tableau avec l'ID 'tabvar' n'existe pas.]");
        return;
    }

    var secondRow = table.rows[1];
    if (!secondRow) {
        console.error("[1.6, La deuxième ligne du tableau n'existe pas.]");
        return;
    }

    var newRow = table.insertRow(1); // Insérer à la deuxième ligne

    // Crée une nouvelle ligne avec des placeholders différents pour chaque nouvelle ligne
    var placeholders = ['k(x)', 'l(x)', 'g(x)', 'h(x)', 'i(x)', 'j(x)']; // Liste des placeholders
    var placeholderIndex = (table.rows.length - 2) % placeholders.length; // Sélectionne le placeholder en fonction du nombre de lignes actuelles
    for (var i = 0; i < secondRow.cells.length; i++) {
        var newCell = newRow.insertCell(i);

        // Attribue le placeholder approprié à la première cellule de la nouvelle ligne
        if (i === 0) {
            var dropdownCell = createDropdownCell("div", "" + placeholders[placeholderIndex], 'value', function() { changeValue(this); }, `
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

    // Créer un nouvel élément input pour le nom de la fonction
    var newInput = document.createElement('input'); // Déclaration de newInput
    newInput.type = 'text';
    newInput.placeholder = placeholders[placeholderIndex];

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
    if (!table) {
        console.error("[1.6, Le tableau avec l'ID 'tabvar' n'existe pas.]");
        return;
    }

    var rowCount = table.rows.length;

    // Vérifie si le tableau contient au moins trois lignes
    if (rowCount < 3) {
        console.error("[1.7, Le tableau doit avoir au moins trois lignes pour effectuer cette opération.]");
        return;
    }

    // Supprime toutes les lignes sauf la première, l'avant-dernière et la dernière
    for (var i = rowCount - 3; i > 0; i--) {
        table.deleteRow(i);
    }
}

function deleteRow(link) {
    var row = link.closest('tr');
    if (!row) {
        console.error("[1.6, Impossible de trouver la ligne parente (tr) du lien fourni.]");
        return;
    }
    row.remove();
}
