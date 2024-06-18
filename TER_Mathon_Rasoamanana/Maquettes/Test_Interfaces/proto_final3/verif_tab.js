

function checkAll(){
    try{
        clearMessageBox2();
        var env = 0;
        ret = validation_funMain(env);
        env = ret[1];
        if(ret[0]=="2"){
            validation_funDeriv(env);
            if(ret[0]=="2"){
                verification_funDeriv(env);
                validation_subFun(env);
                compareValuesInRow(env);
            }
            else if(ret[0] == "1.1"){
                message = "Le carctère "+ (ret[3]-1) + " de la dérivée n'est pas correct.";
                messageDisplay(message);
            }
            else{
                message = env;
                messageDisplay(message);
            }
        }
        else{
            message = "La fonction principale ne peut pas etre lue !";
            messageDisplay(message);
        }
        return [2, "Vérification et validation : ok"];
    }
    catch(error){
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}

// Fonction qui permet de nettoyé la zone de texte
function clearMessageBox2() {
    try {
        var areaMessageElement = document.getElementById("messageBox2Area");
        if (areaMessageElement != null) {
            areaMessageElement.innerHTML = "";
            return [2 , "Element nettoyé."];
        } else {
            return [1.6, "Element inexistant."]; 
        }
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}

// Gestion des erreurs fait par l'utilisateur dans le tableau de variation
function messageValidExpr(message_tab){
    try {
            if (message_tab[0]=="2"){
                messageDisplay("Expression valide : " + message_tab[message_tab.length-1]);
            }
            else{
                messageDisplay("Expression invalide.");
            }
            return [2 , "Message expression : ok"];
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}  

// Fonction qui permet de retourner un message dans la zone "messageBox2Area"
function messageDisplay(message) {
    try {
        var messageBox2 = document.getElementById("messageBox2Area");
        if(messageBox2 != null){
            var p = document.createElement("p");
            p.textContent = message;
            messageBox2.appendChild(p);
            return [2 , "Création element et affichage : ok"];
        } else {
            return [1.6, "Element inexistant."]; 
        }
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}

// Permet de verifier si l'expression de la fonction est valide par l'API
function validation_funMain(env) {
    try {
        if(document.getElementById("deriv-var") != null || document.getElementById("function-expr") != null){
        var name_var_tabvar = document.getElementById("deriv-var").textContent;
        var function_main = document.getElementById("function-expr").value;
            var supp_var = tabvar.suppose_var(env, name_var_tabvar);
            env = supp_var[1];
            var valid = tabvar.validate(env, function_main);
            messageValidExpr(valid);
            if (valid[0] == "2") {
                return [2, env, valid[1]]; //retour de l'environnement car il a changé
            }else{
                return valid;
            }
        } else {
            return [1.6, "Element inexistant."]; 
        }
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}

// Permet de verifier si la dérivé de la fonction entré par l'utilisateur est validé par l'API
function validation_funDeriv(env) {
    try {
        if(document.getElementById("function-derivation") != null){
            var fun_deriv_user = document.getElementById("function-derivation").value;
            var valid = tabvar.validate(env, fun_deriv_user);
            messageValidExpr(valid);
            if (valid[0] == "2") {
                return [2, valid[1]]; // pas de retour de env car il n'a pas changé
            } else{
                return valid;
            }    
        } else {
            return [1.6, "Element inexistant."]; 
        }
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}

// Permet de verifier si la dérivé de la fonction est correct par rapport a la fonction principale
function verification_funDeriv(env){
    try {
        if(document.getElementById("deriv-var") != null || document.getElementById("function-expr") != null || document.getElementById("function-derivation") != null){
            var name_var_tabvar = document.getElementById("deriv-var").textContent;
            var function_main = document.getElementById("function-expr").value;
            var fun_deriv_user = document.getElementById("function-derivation").value;
            var fun_deriv_tabvar = tabvar.deriv(env, function_main, name_var_tabvar);
            var compare_deriv = tabvar.compare_values(env, tabvar.develop(env, fun_deriv_user)[1], fun_deriv_tabvar[1]);
            if (compare_deriv[0]=="2"){
                if (compare_deriv[1]=="="){
                    messageDisplay("La dérivée est bonne. ");   
                }
                else if(compare_deriv[1]=="?"){
                    messageDisplay("Nous ne pouvons pas verifier la dérivée.");
                }
                else{
                    messageDisplay("La dérivée n'est pas bonne.");
                }  
                return [2, "Dérivée vérifiée."];
            }
            else{
                messageDisplay(compare_deriv[1]);
                return compare_deriv;
            }
        } else {
            return [1.6, "Element inexistant."]; 
        }
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
}

// Permet de valider les sous fonctions existantes et de les mettre dans le tableau subFun
// Colori aussi les sous fonction en fonction de leur validité rose pour les fonctions non valides et vert les fonctions valides
function validation_subFun(env){
    try {
        var tableau = document.getElementById("tabvar");
        if( tableau!= null){
            var subFun = []; // Tableau des sous fonctions
            var nb_subFun = tableau.rows.length-3;
            if (nb_subFun>0){
                for (i=1; i<nb_subFun+1; i+=1){
                    var cell=tableau.rows[i].cells[0].innerText
                    colorCell = tableau.rows[i].cells[0];
                    if (tabvar.validate(env, cell)[0]=="2"){
                        colorCell.style.backgroundColor = 'lightgreen';
                        subFun.push(cell);
                    }
                    else{
                        colorCell.style.backgroundColor = 'pink'; 
                    }
                }
                messageDisplay(subFun);
                return [2, "Sous fonction(s) validée(s)."]
            }else if(nb_subFun==0){
                var message ="Pas de sous fonction.";
                messageDisplay(message);
                return [2, "Sous fonction(s) validée(s)."]
            }else{
                return [1.7, "Out of bound"] // est ce vraiement un out of bound? est utile de le mettre?
            }
        } else {
            return [1.6, "Element inexistant."]; 
        }
    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
    
}

// Fonction pour comparer les valeurs dans la premiere ligne du tableau
function compareValuesInRow(env) {
    try {
        var values = getValues(1)[0];
        tableau = document.getElementById("tabvar");
        if( tableau!= null){
            var cell = tableau.rows[0].cells[1];
            cell.style.backgroundColor = 'lightgreen'; // La premiere valeur est celle de reference donc toujours juste
            for (var i = 0; i < values.length; i = i+1 ) {
                var result = tabvar.compare_values(env, values[i], values[i+1])[1];
                cell = tableau.rows[0].cells[i*2+3];
                if(result == ">"){
                    cell.style.backgroundColor = 'pink';
                }
                else if(result == "?"){
                    cell.style.backgroundColor = 'yellow';
                }
                else if(result == "<"){
                    cell.style.backgroundColor = 'lightgreen';
                }
                else if(result == "="){
                    cell.style.backgroundColor = 'yellow';
                }
                else{
                    cell.style.backgroundColor = 'red';
                }
            }
            return [2, "Les valeurs ont été comparées."]
        } else {
            return [1.6, "Element inexistant."]; 
        }

    } catch (error) {
        return [1.9, "Erreur interne, veuillez nous excuser!"];
    }
    
}