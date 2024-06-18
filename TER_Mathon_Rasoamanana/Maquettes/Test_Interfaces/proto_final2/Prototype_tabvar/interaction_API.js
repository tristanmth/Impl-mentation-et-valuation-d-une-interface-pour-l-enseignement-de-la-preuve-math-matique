//---------------------COMPARER LES VALEURS---------------------
//--------------------------------------------------------------
//--------------------------------------------------------------

function clear_node(n) {
    while (n.firstChild) {
        n.removeChild(n.lastChild);
    }
}

const ok = 2;

let r = tabvar.init();
if (r[0] !== ok) throw ("Problème d'initialisation : " + r[1]);
let env = r[1];

function getCellContent(tableId, rowIndex, cellIndex) {
    let table = document.getElementById(tableId);
    return table.rows[rowIndex].cells[cellIndex].textContent;
}

// Fonction pour comparer les expressions dans une ligne du tableau
function compareExpressionsInRow(rowIndex) {
    let comparisonResult = "";

    // Parcourir les cellules d'indice pair à partir de la deuxième cellule de la ligne
    let table = document.getElementById("tabvar");
    for (let i = 1; i < table.rows[rowIndex].cells.length - 1; i += 2) {
        let e1 = getCellContent("tabvar", rowIndex, i);  
        let e2 = getCellContent("tabvar", rowIndex, i + 2);  
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
}

//---------------------ZONE TEXTUELLE APPEL---------------------
//--------------------------------------------------------------
//--------------------------------------------------------------

const tabvarMethods = [
    "init()",
    "function_definition()",
    "validate()",
    "deriv()",
    "compare_values()",
    "simplify()",
    "develop()"	,
    "interval()",
    "suppose_var()",
    "is_positive()",
    "print_env()",
    "defined()",
    "suppose()",
    "proof_assistant()",
    "valeur_interdite()",
    "extremum_local()",
    "signe_deriv()",
    "roots()",
    "fresh()",
    "define_new_function()",
    "interesting_values()",
    "replace()"
];

$(document).ready(function() {
    $("#command-textarea").on('input', function() {
        const cursorPos = this.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const tabvarPattern = /tabvar\.$/;

        if (tabvarPattern.test(textBeforeCursor)) {
            const autoComplete = $("#command-textarea").autocomplete({
                source: tabvarMethods.map(method => `tabvar.${method}`),
                position: { my: "left top", at: "left bottom", of: this },
                select: function(event, ui) {
                    const insertionText = ui.item.value.substring("tabvar.".length);
                    $("#command-textarea").val(textBeforeCursor + insertionText );
                    this.selectionStart = this.selectionEnd = cursorPos + insertionText.length;
                    return false;
                }
            });
            autoComplete.autocomplete("search", "");
        }
    });
});