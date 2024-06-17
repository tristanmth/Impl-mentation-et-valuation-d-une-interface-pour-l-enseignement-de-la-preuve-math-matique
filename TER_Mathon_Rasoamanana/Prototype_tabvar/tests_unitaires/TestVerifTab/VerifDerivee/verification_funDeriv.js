function verification_funDeriv(env) {
    try {
        if (typeof tabvar === 'undefined') {
            console.error("[1.6, Module tabvar inexistant.]");
            return [1.6, "Module tabvar inexistant."];
        }

        if (document.getElementById("deriv-var") != null || document.getElementById("function-expr") != null || document.getElementById("function-derivation") != null) {
            var name_var_tabvar = document.getElementById("deriv-var").textContent;
            var function_main = document.getElementById("function-expr").value;
            var fun_deriv_user = document.getElementById("function-derivation").value;
            var fun_deriv_tabvar = tabvar.deriv(env, function_main, name_var_tabvar);
            var compare_deriv = tabvar.compare_values(env, tabvar.develop(env, fun_deriv_user)[1], fun_deriv_tabvar[1]);
            

            if (compare_deriv[0] == "2") {
                if (compare_deriv[1] == "=") {
                    console.log("La dérivée est bonne.");
                } else if (compare_deriv[1] == "?") {
                    console.error("Nous ne pouvons pas vérifier la dérivée.");
                } else {
                    console.error("La dérivée n'est pas bonne.");
                }
            } else {
                console.log(compare_deriv[1]);
                return;
            }
        } else {
            console.error("[1.6, Element inexistant.]");
        }
    } catch (error) {
        console.error("[1.9, Erreur interne, veuillez nous excuser!]", error);
    }
}