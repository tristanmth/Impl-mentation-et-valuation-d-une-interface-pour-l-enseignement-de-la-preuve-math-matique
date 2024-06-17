//Fonction de simulation d'exécution

function ExecutApi(command) {
    console.log(`Execution de la commande : ${command}`);
        // Vérifie si le module tabvar existe
        if (typeof tabvar === 'undefined') {
            console.error("[1.6, Module tabvar inexistant.]");
            return [1.6, "Module tabvar inexistant."];
        }

        const parsedFunction = document.getElementById('command-input') ;

        if (parsedFunction) {

            const { functionName, params } = parsedFunction;

            const checkParams = (expectedCount) => {
                if (!params || params.length < expectedCount) {
                    return `[1.1, Erreur: Paramètres manquants pour la fonction '${functionName}'.]`;
                }
                return null;
            };
        try {
            let result1 = "";
            switch (functionName) {
                case "init":
                    result1 = tabvar.init();
                    break;
                case "function_definition":
                    if (checkParams(4)) {
                        result1 = checkParams(4);
                    } else {
                        result1 = tabvar.function_definition(...params);
                    }
                    break;
                case "validate":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.validate(...params);
                    }
                    break;
                case "deriv":
                    if (checkParams(3)) {
                        result1 = checkParams(3);
                    } else {
                        result1 = tabvar.deriv(...params);
                    }
                    break;
                case "compare_values":
                    if (checkParams(3)) {
                        result1 = checkParams(3);
                    } else {
                        result1 = tabvar.compare_values(...params);
                    }
                    break;
                case "simplify":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.simplify(...params);
                    }
                    break;
                case "develop":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.develop(...params);
                    }
                    break;
                case "interval":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.interval(...params);
                    }
                    break;
                case "suppose_var":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.suppose_var(...params);
                    }
                    break;
                case "is_positive":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.is_positive(...params);
                    }
                    break;
                case "print_env":
                    if (checkParams(1)) {
                        result1 = checkParams(1);
                    } else {
                        result1 = tabvar.print_env(...params);
                    }
                    break;
                case "defined":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.defined(...params);
                    }
                    break;
                case "suppose":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.suppose(...params);
                    }
                    break;
                case "proof_assistant":
                    if (checkParams(2)) {
                        result1 = checkParams(2);
                    } else {
                        result1 = tabvar.proof_assistant(...params);
                    }
                    break;
                default:
                    result1 = `[1.1, Erreur: Nom de fonction invalide '${functionName}']`;
            }
            console.log(`Résultat de l'exécution : ${result1}`);
        } catch (error) {
            console.error("[1.9, Erreur interne : " + error.message + "]");
        }
    } else {
        console.error("[1.1, Erreur: Format de commande invalide]");
    }
}