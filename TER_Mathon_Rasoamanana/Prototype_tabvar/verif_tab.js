function mainFunction(){
    clearErrorMessage();
    var env = 0;
    ret = validation_funMain(env);
    if(ret.valid[0]=="2"){
        ret = validation_funDeriv(ret.env);
        if(ret.valid[0]=="2"){
            ret =  verification_funDeriv(ret.env);
            ret = validation_subFun(ret.env);
            compareExpressionsInRow(ret.env);
        }
        else{
            message = "La dérivée ne peut pas etre lue."
            messageInErrorMessage(message)
        }
    }
    else{
        message = "La fonction principale ne peut pas etre lue."
        messageInErrorMessage(message)
    }
}

// Fonction qui permet de nettoyé la zone de texte
function clearErrorMessage() {
    document.getElementById("error-message").innerHTML = "";
}

// Permet de verifier si l'expression de la fonction est valide par l'API
function validation_funMain(env){
    // Dans un premier temps valider puis definir la fonction principal
    var name_var_tabvar = document.getElementById("deriv-var").textContent  ; // Variable 
    var function_main = document.getElementById("function-expr").value ; // Expression de la fonction principal
    var supp_var = tabvar.suppose_var(env, name_var_tabvar);
    env = supp_var[1];
    var valid = tabvar.validate(env, function_main);
    message_error(valid);
    return {env, valid}; 
}

// Gestion des erreurs fait par l'utilisateur dans le tableau de variation
function message_error (message_tabvar_fun){
    if (message_tabvar_fun[0]=="2"){
        messageInErrorMessage("expression valide : " + message_tabvar_fun[message_tabvar_fun.length-1]);
    }
    else if(message_tabvar_fun[0]=="1.9"){
        messageInErrorMessage("Erreur interne, veuillez nous excuser.");
    }
    else{
        messageInErrorMessage(message_tabvar_fun[1]);
    }
}

// Fonction qui permet de retourner un message dans la zone "error-message"
function messageInErrorMessage(message) {
    var errorMessage = document.getElementById("error-message");
    var p = document.createElement("p");
    p.textContent = message;
    errorMessage.appendChild(p);
}

// Fonction pour comparer les valeurs dans la premiere ligne du tableau
function compareExpressionsInRow(env) {
    var values = getValues(1)[0];
    var cell = document.getElementById("tabvar").rows[0].cells[1];
    cell.style.backgroundColor = 'lightgreen'; // La premiere valeur est celle de reference donc toujours juste
     for (var i = 0; i < values.length; i = i+1 ) {
        var result = tabvar.compare_values(env, values[i], values[i+1])[1];
        cell = document.getElementById("tabvar").rows[0].cells[i*2+3];
        if(result == ">"){
            cell.style.backgroundColor = 'pink';
        }
        else if(result == "?"){
            cell.style.backgroundColor = 'yellow';
            /*Ajouter le retour de l'erreur dans la zone prévu*/ 
        }
        else if(result == "<"){
            cell.style.backgroundColor = 'lightgreen';
            /*Ajouter le retour de l'erreur dans la zone prévu*/
        }
        else if(result == "="){
            cell.style.backgroundColor = 'yellow';
            /*Ajouter le retour de l'erreur dans la zone prévu*/
        }
    }
}

function getColumnCount(tableId) {
    var table = document.getElementById(tableId);
    var firstRow = table.rows[0];
    return firstRow.cells.length;
}

// Gestion des erreurs fait par l'utilisateur dans le tableau de variation dan sle cas de la verification de la derivé
function message_compareValues (compare_values){
    if (compare_values[0]=="2"){
        if (compare_values[1]=="="){
            messageInErrorMessage("La dérivée est bonne!");   
        }
        else if(compare_values[1]=="?"){
            messageInErrorMessage("Impossible de vérifier la dérivée, veuillez nous excuser.");
        }
        else{
            messageInErrorMessage("La dérivée n'est pas bonne.");
        }  
    }
    else if(compare_values[0]=="1.9"){
        messageInErrorMessage("Erreur interne, veuillez nous excuser.");
    }
    else{
        messageInErrorMessage(compare_values[1]);
    }
}

// Permet de verifier si la dérivé de la fonction entré par l'utilisateur est validé par l'API
function validation_funDeriv(env){
    // Dans un second temps validation de l'expression de la derivé puis verification de la justesse de la derivé
    var fun_deriv_user = document.getElementById("function-derivation").value;
    var valid = tabvar.validate(env, fun_deriv_user);
    message_error(valid);
    return {env, valid}; 
}

// Permet de verifier si la dérivé de la fonction est correct par rapport a la fonction principale
function verification_funDeriv(env){
    // reprise de l'environnement apres validation de la fonction principale
    var name_var_tabvar = document.getElementById("deriv-var").textContent  ; // Variable 
    var function_main = document.getElementById("function-expr").value ; // Expression de la fonction principal
    var fun_deriv_user = document.getElementById("function-derivation").value;
    var fun_deriv_tabvar = tabvar.deriv(env, function_main, name_var_tabvar);
    var compare_deriv = tabvar.compare_values(env, tabvar.develop(env, fun_deriv_user)[1], fun_deriv_tabvar[1]);
    message_compareValues(compare_deriv);
    return env; 
}

// Permet de valider les sous fonctions existantes et de les mettre dans le tableau subFun
// Colori aussi les sous fonction en fonction de leur validité rose pour les fonctions non valides et vert les fonctions valides
function validation_subFun(env){
    // reprise de l'environnement apres validation de la fonction principale
    var name_var_tabvar = document.getElementById("deriv-var").textContent  ; // Variable 
    // Dans un troisieme temps enregistrer les sous fonctions si il y en a 
    // Faire valider les sous fonctions par l'API
    var tableau = document.getElementById("tabvar");
    var name_var_tabvar = document.getElementById("deriv-var").textContent  ; // Variable 
    env= tabvar.suppose_var(env,name_var_tabvar)[1];
    var subFun = []; // Tableau des sous fonctions
    var nb_subFun = tableau.rows.length-3;
    if (nb_subFun>0){
        for (i=1; i<nb_subFun+1; i+=1){
            var cell=tableau.rows[i].cells[0].innerText
            if (tabvar.validate(env, cell)[0]=="2"){
                colorCell = document.getElementById("tabvar").rows[i].cells[0];
                colorCell.style.backgroundColor = 'lightgreen';
                subFun.push(cell);
            }
            else{
                colorCell = document.getElementById("tabvar").rows[i].cells[0];
                colorCell.style.backgroundColor = 'pink'; 
            }
        }
    }else if(nb_subFun==0){
        var message ="Pas de sous fonction";
        messageInErrorMessage(message);
    }
    messageInErrorMessage(subFun);
return env;
}