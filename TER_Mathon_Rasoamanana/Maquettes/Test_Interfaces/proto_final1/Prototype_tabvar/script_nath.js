///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// GESTION DES VALEURS /////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fonction pour ajuster la taille de l'input en fonction de son contenu
function adjustInputWidth(input) {
    input.style.width = ((input.value.length +1)*8) + 'px'; // Ajuster la largeur en fonction de la longueur du texte
}

function showValues(){
    // Récupère le tableau
    var table = document.getElementById("tabvar");
    // Récupère la première ligne du tableau
    var firstRow = table.rows[0];
    var beforLastRow = table.rows[table.rows.length -2];
    var lastRow = table.rows[table.rows.length -1];

    // Récupère les cellules de la première ligne
    var cells1 = firstRow.cells;
    var cells2 = beforLastRow.cells;
    var cells3 = lastRow.cells;

    // Initialise une variable pour stocker les valeurs
    var values1 = [];
    var values2 = [];
    var values3 = [];

    // Parcourt les cellules de la première ligne et récupère les valeurs
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
            values2.push("na");
        };
    }
    for (var i = 2; i < cells3.length; i += 2) {
        if(cells3[i].innerText=="↘"){
            values3.push("down")
        } else if(cells3[i].innerText=="↗") {
            values3.push("up")
        } else {        
            values3.push("na");
        }
    }

    return([[values1], [values2], [values3]]);
}

function saveValuesToJSON() {
    var values = showValues();
    var jsonData = JSON.stringify(values, null, 2);

    var blob = new Blob([jsonData], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'tableValues.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}