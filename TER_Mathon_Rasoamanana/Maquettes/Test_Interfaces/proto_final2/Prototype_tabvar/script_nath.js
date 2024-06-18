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

    // Afficher les valeurs dans le conteneur prévu à cet effet dans une liste à puce
    document.querySelector(".box4").innerHTML = `
    <div class="box2">
        <ul>
            <li><label id="valuesContainer1"></label></li>
            <li><label id="valuesContainer2"></label></li>
            <li><label id="valuesContainer3"></label></li>
        </ul>
    </div>
    `;

   // Afficher les valeurs dans le conteneur prévu à cet effet dans une liste à puce
    document.getElementById("valuesContainer1").innerHTML = "Les valeurs de la première ligne sont : [" + values1.join(",") + "]";
    document.getElementById("valuesContainer2").innerHTML = "Les valeurs de l'avant-dernière ligne sont : [" + values2.join(",") + "]";
    document.getElementById("valuesContainer3").innerHTML = "Les valeurs de la dernière ligne sont : [" + values3.join(",") + "]";
    
    // Créer le bouton
    var button = document.createElement("button");
    button.setAttribute("id", "maj_contain_value");
    button.setAttribute("onclick", "showValues()");
    button.textContent = "?";
    button.classList.add("top-right-button"); // Ajoute une classe pour le positionnement

    // Sélectionner la balise <div> avec la classe "box1"
    var box1 = document.querySelector(".box1");

    // Ajouter le bouton à l'intérieur de la balise <div> avec la classe "box1"
    box1.appendChild(button);

}

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

// fonction qui permet d'afficher l'identité du bouton MoreLess
function toggleMore(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.moreLess');
    moreButton.innerText = value;
}

// fonction qui permet d'afficher l'identité du bouton Increase
function toggleIncrease(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.increase');
    moreButton.innerText = value;
}

// fonction qui permet d'afficher l'identité du bouton VI
function toggleVI(link, value) {
    var moreButton = link.closest('.dropdown').querySelector('.VI');
    moreButton.innerText = value;    
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

// Fonction pour ajouter des colonnes
function addColumn(button) {
    var table = document.getElementById("tabvar");
    var colNumber = 2; // Nombre de colonnes à ajouter
    var buttonCellIndex = button.parentNode.cellIndex;

    // Vérifier si le nombre total de colonnes est inférieur à 14
    if (table.rows[0].cells.length >= 14) {
        // Désactiver tous les boutons d'ajout de colonnes
        var addButtons = document.querySelectorAll('button.add-value');
        addButtons.forEach(function(btn) {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
        return; // Sortir de la fonction sans ajouter de nouvelles colonnes
    }

    // Ajouter des cellules pour chaque ligne
    for (var rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
        // Ne pas appliquer l'ajout de colonnes à la deuxième ligne (indice 1)
        if (rowIndex === 1) {
            continue;
        }

        var row = table.rows[rowIndex];

        for (var i = 0; i < colNumber; i++) {
            var newCell = createCell();

            if (rowIndex === 0) {
                // Première ligne
                if (i == 0) {
                /* 
                   var dropdownCell1 = createDropdownCell("div", "0", "value", function() { changeValue(this); }, `
                        <a href="#" onclick="changeValue(this)">Changer</a>     
                        <a href="#" onclick="deleteColumns(this)">Supprimer</a>
                    `);
                */
                    // Créer une nouvelle cellule éditable
                var editableCell1 = document.createElement("td");
                editableCell1.style.border = "none";
                editableCell1.contentEditable = true;

                // Valeur par défaut grise
                var defaultValue = "0";

                // Appliquer le style de fond et la valeur par défaut
                editableCell1.style.backgroundColor = "#ccc"; // Fond gris clair
                editableCell1.style.color = "#888"; // Texte gris plus clair
                editableCell1.textContent = defaultValue; // Valeur par défaut

                // Ajouter un gestionnaire d'événements pour effacer la valeur par défaut lors du focus
                editableCell1.addEventListener("focus", function() {
                    if (this.textContent === defaultValue) {
                        this.textContent = "";
                        this.style.color = "#000"; // Changer la couleur du texte en noir lorsque le contenu est édité
                    }
                });

                // Ajouter un gestionnaire d'événements pour restaurer la valeur par défaut si la cellule est laissée vide
                editableCell1.addEventListener("blur", function() {
                    if (this.textContent === "") {
                        this.textContent = defaultValue;
                        this.style.color = "#888";
                    }
                });

                // Ajouter la cellule éditable à newCell
                newCell.appendChild(editableCell1);

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
                    `);
                    newCell.appendChild(dropdownCell);
                }
            } else {
                // Toutes les autres lignes sauf la première, la deuxième et la dernière
                if (i == 0) {
                    var dropdownCell = createDropdownCell("button",
                        "|| 0 ∅",
                        "VI",
                        function() { toggleVI(this, this.innerText); },
                        `
                        <a href="#" onclick="toggleVI(this, '||')">Valeur Interdite</a>
                        <a href="#" onclick="toggleVI(this, '0')">Zéro</a>
                        <a href="#" onclick="toggleVI(this, '∅')">Vide</a>
                    `);

                    newCell.appendChild(dropdownCell);
                } else {
                    var dropdownCell = createDropdownCell("button",
                        "+-",
                        "moreLess",
                        function() { toggleMore(this, this.innerText); },
                        `
                        <a href="#" onclick="toggleMore(this, '-')">Négatif</a>
                        <a href="#" onclick="toggleMore(this, '+')">Positif</a>
                    `);
                    newCell.appendChild(dropdownCell);
                }
            }
            row.insertBefore(newCell, row.cells[buttonCellIndex + 1 + i]);
        }
    }
    // Mettre à jour le colspan de la cellule de la deuxième ligne (bouton d'ajout de ligne)
    var addRow = table.rows[1]; // Deuxième ligne du tableau
    var colspan = table.rows[0].cells.length; // Nombre total de colonnes de la première ligne
    addRow.cells[0].colSpan = colspan;
}

// fonction qui permet d'ajouter une nouvelle ligne (identique a la 3e ligne)
function addExtraRow() {
    var table = document.getElementById("tabvar");
    var secondRow = table.rows[2];
    var newRow = table.insertRow(3); // Insérer à la 4e ligne
 
    for (var i = 0; i < secondRow.cells.length; i++) {
        var newCell = newRow.insertCell(i);

        if (i === 0) {
            // Pour la première colonne, créer une cellule avec le contenu éditable
            newCell.setAttribute('contenteditable', 'true'); // Rendre le contenu éditable
            newCell.className = 'editable-cell first-cell'; // Ajouter la classe pour le style CSS
        }else {
            // Pour les autres colonnes, copier simplement le contenu de la cellule modèle
            newCell.innerHTML = secondRow.cells[i].innerHTML;
            newCell.className = 'additional-column'; // Ajouter la classe pour le style CSS
        }
    }
    
    // Copier les classes de la cellule modèle
    newCell.className = secondRow.cells[i].className;

        // Associer les événements de la souris et de clic appropriés aux éléments interactifs
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

// Fonction pour réactiver tous les boutons d'ajout de colonnes
function enableAddButtons() {
    var addButtons = document.querySelectorAll('button.add-value');
    addButtons.forEach(function(btn) {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });
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
    // Réactiver tous les boutons d'ajout de colonnes une fois une colonne supprimée
    enableAddButtons();
}