//-----------------------------------------------------------------------
//-----------------------GESTION DE LA PARTIE AIDE-----------------------
//-----------------------------------------------------------------------

const tabvarMethods = ["init()", "function_definition()", "validate()", "deriv()", "compare_values()", "simplify()", "develop()", "interval()", "suppose_var()", "is_positive()", "print_env()", "defined()", "suppose()", "proof_assistant()"];

$(document).ready(function() {

    $("#command-input").on('input', function() {
        const cursorPos = this.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const tabvarPattern = /$/;

        if (tabvarPattern.test(textBeforeCursor)) {
            $(this).autocomplete({
                source: tabvarMethods,
                position: { my: "left top", at: "left bottom", of: this },
                select: function(event, ui) {
                    const insertionText = ui.item.value;
                    $("#command-input").val(insertionText);
                    this.selectionStart = this.selectionEnd = cursorPos + insertionText.length;
                    return false;
                }
            }).autocomplete("search", "");
        }
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('command-input');

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            showAide();
        }
    });
});

function showAide(){
    var text_zone = document.getElementById("command-input").value;
    var desc =[];
    var ent_th =[];
    var ent_th_arg =[];
    var ret_th =[];
    var ret_th_arg =[];
    var ent_ret_prat =[];
    var ret_err =[];

    if(text_zone == "init()"){
        desc.push("Permet d’initialiser le module 'tableau de variation'.");
        ent_th.push("init()");
        ent_th_arg.push("Pas d’argument");
        ret_th.push("→ [valid, new_env, message]");
        ret_th_arg.push("valid : indique l’état de la validation", "new_env : Nouvel environnement", "message : 'Require Import Tabvar.' pour indiquer l’importation de TabVar ou retourne 'Already initialised' si TabVar a déjà été importé.");
        ent_ret_prat.push("init()","→ [ 2, env1, 'Require Import Tabvar.' ]");
        ret_err.push("2 si ok", "code erreur : déjà importé");

    }else if (text_zone == "function_definition()") {
        desc.push("Permet de définir la fonction principale sur laquelle on se base pour remplir le tableau de variation. Permet aussi de définir la variable mise en paramètre (i.e pas besoin de définir la variable de la fonction principal grâce à la fonction suppose_var() ).");
        ent_th.push("function_definition( env, f, var, expr)");
        ent_th_arg.push("env : correspond à l'environnement actuel.","f : (string) Nom de la fonction.","var : (string) Le nom de l’argument de la fonction.","Remarque : On ne peut pas utiliser x comme argument car c’est déjà déclaré comme variable globale.","expr : (string) Expression de la fonction.");
        ret_th.push("→ [valid, new_env , expr]");
        ret_th_arg.push("valid : indique l’état de la validation","new_env : Nouvel environnement","expr : retourne l’expression qui est maintenant défini");
        ent_ret_prat.push("function_definition(env, 'f', 't','2*t*t-4*t+2')","→ Array[2, Array(6), 'Definition f (t : real) := 2×t×t − 4×t + 2.']");
        ret_err.push("Non défini");

    }else if (text_zone == "validate()"){
        desc.push("Permet de vérifier si une fonction est correctement écrite et ainsi elle peut être lisible par l’API. ");
        ent_th.push("validate( env , expr)");
        ent_th_arg.push("env : correspond à l'environnement actuel.","expr : (string) Expression à valider.");
        ret_th.push("→ [ valid, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","message : (string) retourne l’expression si cette dernière est correcte, sinon retourne un message d’erreur.");
        ent_ret_prat.push("validate(42, '5*x+8')","→ [ 2, '5×x + 8' ]");
        ret_err.push("validate(42, '5x+8')","→ [ 1.5, 'Error: Parser error at line 1, character 3.']");

    }else if (text_zone == "deriv()"){
        desc.push("Retourne une dérivé de la fonction mis en argument en fonction d’une variable");
        ent_th.push("deriv(env, expr, var)");
        ent_th_arg.push("env : correspond à l'environnement actuel.","expr : (string) Expression à dériver.","var : (string) Variable qui permet de dériver l’expression en fonction d’elle.");
        ret_th.push("→ [valid, message]");
        ret_th_arg.push("valid : indique l’état de la validation.","message :  (string) Affiche la dérivé de la fonction expr (argument en entrée).");
        ent_ret_prat.push("deriv(45,'5*x+6','x')","→ [ 2, '5' ]");
        ret_err.push("Non défini");

    }else if (text_zone == "compare_values()"){
        desc.push("Compare la valeur dans la première chaîne de caractère à la valeur de la seconde chaîne de caractère. Comparer expr1 à expr2 en retournant le résultat de comparaison qui peut être “<”, “>”, “=” ou “?”.");
        ent_th.push("compare_values(env, expr1, expr2)");
        ent_th_arg.push("env : correspond à l'environnement actuel.","expr1 : (string) Expression comparée.","expr2 : (string) Expression comparante.");
        ret_th.push("→ [valid, symb]");
        ret_th_arg.push("valid : indique l’état de la validation","symb : symbole de comparaison de la première expression par rapport à la deuxième ");
        ent_ret_prat.push("compare_values(42, 'sqrt(1)+48', 'sin 42 - 2')","→ [ 2, ">" ]");
        ret_err.push("Non défini");

    }else if (text_zone == "simplify()"){
        desc.push("Simplifie une expression en une expression équivalente sur son domaine de définition.");
        ent_th.push("simplify(env, expr)");
        ent_th_arg.push("env : environnement actuel","expr : (string) correspond a une valeur ou à une fonction ");
        ret_th.push("→ Array [ valid, expr ]");
        ret_th_arg.push("valid : indique l’état de la validation","expr : (string) expression simplifiée");
        ent_ret_prat.push("simplify(42, 'log(1)+1')","→ Array [ 2, '1' ]");
        ret_err.push("Non défini");

    }else if (text_zone == "develop()"){
        desc.push("Développer une expression arithmétique en une expression équivalente.");
        ent_th.push("develop(env, expr)");
        ent_th_arg.push("env : correspond à l'environnement actuel.","expr : (string) Expression à traiter.");
        ret_th.push("→ Array [ valid, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","message : (string) expression développée");
        ent_ret_prat.push("develop(42, '((a+b)*c)*d')","→ Array [ 2, 'a×c×d + b×c×d' ]");
        ret_err.push("Non défini");

    }else if (text_zone == "interval()"){
        desc.push("Détermine (une sur-approximation de) l'intervalle d'une expression.");
        ent_th.push("interval(env, expr)");
        ent_th_arg.push("env : correspond à l'environnement actuel","expr : (string) Expression à traiter");
        ret_th.push("→ Array [ valid, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","message : (string) intervalle dans laquelle l’expression est définie");
        ent_ret_prat.push("interval(env,'15*x-8')","→Array [2,  ' ]–∞ ; +∞ [' ]");
        ret_err.push("Non défini");

    }else if (text_zone == "suppose_var()"){
        desc.push("Déclare une variable.");
        ent_th.push("suppose_var(env, x)");
        ent_th_arg.push("env : correspond à l'environnement actuel","x : (string) Variable à déclarer");
        ret_th.push("→ Array [ valid, new_env, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","new_env : Nouvel environnement","message : (string) indique que la variable x (argument en entrée) est bien un réel.");
        ent_ret_prat.push("suppose_var(env, '5')","→ Array[2, Array(6), 'Variable 5 : real.'] ");
        ret_err.push("Non défini");

    }else if (text_zone == "is_positive()"){
        desc.push("Indique si le signe d'une expression est positif (zéro étant considéré positif).");
        ent_th.push("is_positive(env, e)");
        ent_th_arg.push("env : correspond à l'environnement actuel","e : (string) expression à traiter");
        ret_th.push("→ Array [ valid, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","message : (string) affiche true si l’expression e (en entrée) est positive, false si c’est négatif et “?” si on ne sait pas. ");
        ent_ret_prat.push("is_positive(env, '-9+5')","→ Array[2, false']");
        ret_err.push("Non défini");

    }else if (text_zone == "print_env()"){
        desc.push("Affiche l'environnement actuel (pour aider le débogage).");
        ent_th.push("print_env(env)");
        ent_th_arg.push("env : correspond à l'environnement actuel");
        ret_th.push("→ Array [ valid, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","message : (string) affiche tous les éléments de l'environnement.");
        ent_ret_prat.push("print_env(env)","→ Array[2, 'x : real (]–∞ ; +∞[) ; ']");
        ret_err.push("Non défini");

    }else if (text_zone == "defined()"){
        desc.push("Indique si une expression est bien définie (y) dans l'environnement, si elle n'est pas définie (n), ou si on ne sait pas (?).");
        ent_th.push("defined(env, expr)");
        ent_th_arg.push("env : correspond à l'environnement actuel","expr : (string) Expression à traiter");
        ret_th.push("→ Array [ valid, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","message : (string) affiche “y” si l’expression est définie, “n” si elle n’y est pas et “?” si on ne     sait pas.");
        ent_ret_prat.push("defined(env, '12*x*x-6*x+15')","→ Array[2, 'y']");
        ret_err.push("Non défini");

    }else if (text_zone == "suppose()"){
        desc.push("Suppose une propriété comme étant vraie dans l'environnement.");
        ent_th.push("suppose(env, p)");
        ent_th_arg.push("env : correspond à l'environnement actuel","p : (string) propriété");
        ret_th.push("→ Array [ valid, new_env, message ]");
        ret_th_arg.push("valid : indique l’état de la validation","new_env : Nouvel environnement","message : (string) affiche la propriété ou l'hypothèse.");
        ent_ret_prat.push("suppose(env, 'x = 5')","→ Array[2, Array(6), 'Hypothesis H : x = 5.']");
        ret_err.push("Non défini");

    }else if (text_zone == "proof_assistant()"){
        desc.push("Exécute des commandes comme si on les avait données à l'assistant de preuve.");
        ent_th.push("proof_assistant(env, cmd)");
        ent_th_arg.push("env : correspond à l'environnement actuel","cmd : (string) commande d’assistant de preuve à traiter ");
        ret_th.push("→Array[valid, new_env,  mess]");
        ret_th_arg.push("valid : indique l’état de la validation","new_env : Nouvel environnement","mess");
        ent_ret_prat.push("tabvar.proof_assistant (env, 'Variable y : real. Hypothesis (H1 : y > 3) (H2 : y < 4). Lemma prop : (y > 2). Proof. Qed.'')","→Array[2, Array(6), Array(4)]");
        ret_err.push("Non défini");
    }

    const newContent = document.createElement('div');

    // Ajouter le contenu HTML au nouvel élément
    newContent.innerHTML = `
        <h2>${text_zone}</h2>
        <ul>
            <li><label class="TitleApi">Description </label><br><p id="container1">${desc.length > 1 ? desc.join('<br>') : desc}</p></li>
            <li><label class="TitleApi">Entrée théorique avec les arguments </label><br><p id="container1">${ent_th.length > 1 ? ent_th.join('<br>') : ent_th}</p></li>
            <li><label class="TitleApi">Définition des arguments en entré </label><br><p id="container1">${ent_th_arg.length > 1 ? ent_th_arg.join('<br>') : ent_th_arg}</p></li>
            <li><label class="TitleApi">Retour théorique </label><br><p id="container1">${ret_th.length > 1 ? ret_th.join('<br>') : ret_th}</p></li>
            <li><label class="TitleApi">Définition des arguments en sortie</label><br><p id="container3">${ret_th_arg.length > 1 ? ret_th_arg.join('<br>') : ret_th_arg}</p></li>
            <li><label class="TitleApi">Cas pratiques </label><br><p id="container1">${ent_ret_prat.length > 1 ? ent_ret_prat.join('<br>') : ent_ret_prat}</p></li>
            <li><label class="TitleApi">Retour d'erreur </label><br><p id="container1">${ret_err.length > 1 ? ret_err.join('<br>') : ret_err}</p></li>
        </ul>
    `;

    // Supprimer le dernier élément ajouté
    const box4 = document.querySelector(".box4");
    if (box4.lastChild) {
        box4.removeChild(box4.lastChild);
    }

    // Ajouter le nouvel élément à la fin de .box4
    document.querySelector(".box4").appendChild(newContent);
}