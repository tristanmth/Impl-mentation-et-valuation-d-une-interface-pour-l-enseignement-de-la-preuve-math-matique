function clear_node(n) {
    while (n.firstChild) {
        n.removeChild(n.lastChild);
    }
}

const ok = 2;

let r = tabvar.init();
if (r[0] !== ok) throw ("Problème d'initialisation : " + r[1]);
let env = r[1];

window.compareExpressionsInRow = function(xValues) {
    let comparisonResult = "";

    // Parcourir les cellules d'indice pair à partir de la deuxième cellule de la ligne
    for (let i = 0; i < xValues.length - 1; i++) {
        let e1 = xValues[i];  
        let e2 = xValues[i + 1];  

        let r = tabvar.compare_values(env, e1, e2);
        if (r[0] === ok) {
            comparisonResult += r[1] + " "; // Ajouter le symbole de comparaison au résultat
        } else {
            comparisonResult += "Erreur "; // En cas de problème de comparaison, ajouter un indicateur d'erreur
        }
    }

    // Afficher les symboles de comparaison dans l'élément de résultat
    let comparisonResultElement = document.getElementById("comparison_result");
    clear_node(comparisonResultElement);
    comparisonResultElement.appendChild(document.createTextNode("[" + comparisonResult.trim() +"]"));
};