function getValues() {
    var tableau = document.getElementById("tabvar");
    if (!tableau) {
        console.error("[1.6, Tableau inexistant.]");
        return [1.6, "Tableau inexistant."];
    }

    var rows = tableau.rows;
    var values = [];

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var rowValues = [];

        for (var j = 0; j < row.cells.length; j++) {
            var cellValue = row.cells[j].innerText.trim();
            rowValues.push(cellValue);
        }

        values.push(rowValues);
    }

    return [2, values];
}

function compareValuesInRow(env) {
    try {
        // Vérifie si le module tabvar existe
        if (typeof tabvar === 'undefined') {
            console.error("[1.6, Module tabvar inexistant.]");
            return [1.6, "Module tabvar inexistant."];
        }

        var resultValues = getValues();
        if (resultValues[0] !== 2) {
            return resultValues; // Retourne l'erreur obtenue de getValues
        }

        var values = resultValues[1];
        var tableau = document.getElementById("tabvar");

        if (tableau != null) {
            for (var i = 0; i < values.length; i++) {
                for (var j = 0; j < values[i].length - 1; j++) {
                    var value1 = values[i][j];
                    var value2 = values[i][j + 1];

                    if (value1 !== "" && value2 !== "") {
                        var result = tabvar.compare_values(env, value1, value2)[1];
                        console.log(`Comparaison entre ${value1} et ${value2}: ${result}`);
                    } else {
                        console.warn(`Valeurs vides détectées à l'index ${j} dans la ligne ${i}.`);
                    }
                }
            }
            console.log([2, "Les valeurs ont été comparées."]);
        } else {
            console.error("[1.6, Élément inexistant.]");
        }
    } catch (error) {
        console.error("[1.9, Erreur interne, veuillez nous excuser!]", error);
    }
}