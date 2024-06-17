// Permet de vérifier si l'expression de la fonction est valide par l'API
function validation_funMain(env) {
    try {
        // Vérifie si le module tabvar existe
        if (typeof tabvar === 'undefined' || tabvar === null) {
            console.error("[1.6, Module tabvar inexistant.]");
            return;
        }

        // Vérifie si les éléments HTML nécessaires existent
        var functionNameElement = document.getElementById("function-name");
        var varNameElement = document.getElementById("var-name");
        var functionExprElement = document.getElementById("function-expr");

        if (functionNameElement != null && varNameElement != null && functionExprElement != null &&functionNameElement.value.trim() !== "" && varNameElement.value.trim() !== "" && functionExprElement.value.trim() !== "") {
            var name_function = functionNameElement.value;
            var name_var_tabvar = varNameElement.value;
            var function_main = functionExprElement.value;
            var supp_var = tabvar.suppose_var(env, name_var_tabvar);
            env = supp_var[1];
            var valid = tabvar.validate(env, function_main);
            var function_definition = tabvar.function_definition(0,name_function,name_var_tabvar,function_main)

            if (valid[0] == "2") {
                console.log(function_definition);
                return [function_definition];
            } else {
                console.error(valid);
                return valid;
            }
        } else {
            console.error("[1.6, Élément inexistant. Vérifiez que les éléments avec les id : function-name, var-name et function-expr existent.]");
            return [1.6, "Élément inexistant. Vérifiez que les éléments avec les id : function-name, var-name et function-expr existent."];
        }
    } catch (error) {
        console.error("[1.9, Erreur interne, veuillez nous excuser!]", error);
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}