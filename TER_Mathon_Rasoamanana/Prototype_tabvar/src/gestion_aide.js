//-----------------------------------------------------------------------
//-----------------------GESTION DE LA PARTIE AIDE-----------------------
//-----------------------------------------------------------------------

//On Déclare une variable  tabvarMethods qui contient toutes les fonctions. 
//Ces fonctions seront proposées pour l'auto-complétion dans la zone dédiée lorsqu'un caractère est tapé. 
//Cette procédure nécessite l'utilisation de la bibliothèque JQueryUI (importée dans interface.html)
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

//Montrer l'aide quand on appuie sur la touche Enter
document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('command-input');

    inputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            showAide();
        }
    });
});

//Fonction qui permet de montrer les informations pour chaque fonction dans tabvarMethods
function showAide() {
    const newContent = document.createElement('div');
    let text_zone = document.getElementById("command-input").value.trim();
    let desc = [];
    let ent_th = [];
    let ent_th_arg = [];
    let ret_th = [];
    let ret_th_arg = [];
    let ent_ret_prat = [];
    let ret_err = [];

    switch (text_zone) {
        case "init()":
            desc.push("Permet d’initialiser le module 'tableau de variation'.");
            ent_th.push("init()");
            ent_th_arg.push("Pas d’argument");
            ret_th.push("→ [valid, new_env, message]");
            ret_th_arg.push("valid : indique l’état de la validation", "new_env : Nouvel environnement", "message : 'Require Import Tabvar.' pour indiquer l’importation de TabVar ou retourne 'Already initialised' si TabVar a déjà été importé.");
            ent_ret_prat.push("init()", "→ [ 2, env1, 'Require Import Tabvar.' ]");
            ret_err.push("2 si ok", "code erreur : déjà importé");
            break;
        case "function_definition()":
            desc.push("Permet de définir la fonction principale sur laquelle on se base pour remplir le tableau de variation. Permet aussi de définir la variable mise en paramètre (i.e pas besoin de définir la variable de la fonction principal grâce à la fonction suppose_var() ).");
            ent_th.push("function_definition(env, f, var, expr)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "f : Nom de la fonction.", "var : Le nom de l’argument de la fonction.", "Remarque : On ne peut pas utiliser x comme argument car c’est déjà déclaré comme variable globale.", "expr : Expression de la fonction.");
            ret_th.push("→ [valid, new_env , expr]");
            ret_th_arg.push("valid : indique l’état de la validation", "new_env : Nouvel environnement", "expr : retourne l’expression qui est maintenant définie");
            ent_ret_prat.push("function_definition(env, f, t,2*t*t-4*t+2)", "→ [ 2, env1, 'Definition f (t : real) := 2×t×t − 4×t + 2.']");
            ret_err.push("Non défini");
            break;
        case "validate()":
            desc.push("Permet de vérifier si une fonction est correctement écrite et ainsi elle peut être lisible par l’API.");
            ent_th.push("validate(env, expr)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "expr : Expression à valider.");
            ret_th.push("→ [ valid, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "message : (string) retourne l’expression si cette dernière est correcte, sinon retourne un message d’erreur.");
            ent_ret_prat.push("validate(env, '5*x+8')", "→ [ 2, '5×x + 8' ]");
            ret_err.push("validate(env, '5x+8')", "→ [ 1.5, 'Error: Parser error at line 1, character 3.']");
            break;
        case "deriv()":
            desc.push("Retourne une dérivée de la fonction mise en argument en fonction d’une variable.");
            ent_th.push("deriv(env, expr, var)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "expr : Expression à dériver.", "var : Variable qui permet de dériver l’expression en fonction d’elle.");
            ret_th.push("→ [valid, message]");
            ret_th_arg.push("valid : indique l’état de la validation.", "message :  (string) Affiche la dérivée de la fonction expr (argument en entrée).");
            ent_ret_prat.push("deriv(env, '5*x+6', 'x')", "→ [ 2, '5' ]");
            ret_err.push("Non défini");
            break;
        case "compare_values()":
            desc.push("Compare la valeur dans la première chaîne de caractère à la valeur de la seconde chaîne de caractère. Comparer expr1 à expr2 en retournant le résultat de comparaison qui peut être “<”, “>”, “=” ou “?”.");
            ent_th.push("compare_values(env, expr1, expr2)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "expr1 : Expression comparée.", "expr2 : Expression comparante.");
            ret_th.push("→ [valid, symb]");
            ret_th_arg.push("valid : indique l’état de la validation", "symb : symbole de comparaison de la première expression par rapport à la deuxième.");
            ent_ret_prat.push("compare_values(env, 'sqrt(1)+48', 'sin(42) - 2')", "→ [ 2, '>' ]");
            ret_err.push("Non défini");
            break;
        case "simplify()":
            desc.push("Simplifie une expression en une expression équivalente sur son domaine de définition.");
            ent_th.push("simplify(env, expr)");
            ent_th_arg.push("env : environnement actuel", "expr : correspond à une valeur ou à une fonction.");
            ret_th.push("→ [ valid, expr ]");
            ret_th_arg.push("valid : indique l’état de la validation", "expr : (string) expression simplifiée");
            ent_ret_prat.push("simplify(env, 'log(1)+1')", "→ [ 2, '1' ]");
            ret_err.push("Non défini");
            break;
        case "develop()":
            desc.push("Développer une expression arithmétique en une expression équivalente.");
            ent_th.push("develop(env, expr)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "expr : Expression à traiter.");
            ret_th.push("→ [ valid, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "message : (string) expression développée");
            ent_ret_prat.push("develop(env, '((a+b)*c)*d')", "→ [ 2, 'a×c×d + b×c×d' ]");
            ret_err.push("Non défini");
            break;
        case "interval()":
            desc.push("Détermine (une sur-approximation de) l'intervalle d'une expression.");
            ent_th.push("interval(env, expr)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "expr : Expression à traiter.");
            ret_th.push("→ [ valid, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "message : (string) intervalle dans laquelle l’expression est définie");
            ent_ret_prat.push("interval(env, '15*x-8')", "→ [ 2, ' ]–∞ ; +∞ [' ]");
            ret_err.push("Non défini");
            break;
        case "suppose_var()":
            desc.push("Déclare une variable.");
            ent_th.push("suppose_var(env, x)");
            ent_th_arg.push("env : correspond à l'environnement actuel.", "x : Variable à déclarer.");
            ret_th.push("→ [ valid, new_env, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "new_env : Nouvel environnement", "message : (string) indique que la variable x (argument en entrée) est bien un réel.");
            ent_ret_prat.push("suppose_var(env, 'x')", "→ [ 2, env1, 'Variable x : real.']");
            ret_err.push("Non défini");
            break;
        case "is_positive()":
            desc.push("Indique si le signe d'une expression est positif (zéro étant considéré positif).");
            ent_th.push("is_positive(env, e)");
            ent_th_arg.push("env : correspond à l'environnement actuel", "e : expression à traiter");
            ret_th.push("→ [ valid, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "message : (string) affiche true si l’expression e (en entrée) est positive, false si c’est négatif et “?” si on ne sait pas. ");
            ent_ret_prat.push("is_positive(env, '-9+5')", "→ [ 2, false]");
            ret_err.push("Non défini");
            break;
        case "print_env()":
            desc.push("Affiche l'environnement actuel (pour aider le débogage).");
            ent_th.push("print_env(env)");
            ent_th_arg.push("env : correspond à l'environnement actuel");
            ret_th.push("→ Array [ valid, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "message : (string) affiche tous les éléments de l'environnement.");
            ent_ret_prat.push("print_env(env)", "→ Array [ 2, 'x : real (]–∞ ; +∞[) ; '] ");
            ret_err.push("Non défini");
            break;
        case "defined()":
            desc.push("Indique si une expression est bien définie (y) dans l'environnement, si elle n'est pas définie (n), ou si on ne sait pas (?).");
            ent_th.push("defined(env, expr)");
            ent_th_arg.push("env : correspond à l'environnement actuel", "expr : Expression à traiter");
            ret_th.push("→ Array [ valid, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "message : (string) affiche “y” si l’expression est définie, “n” si elle n’y est pas et “?” si on ne     sait pas.");
            ent_ret_prat.push("defined(env, '12*x*x-6*x+15')", "→ Array [ 2, 'y' ]");
            ret_err.push("Non défini");
            break;
        case "suppose()":
            desc.push("Suppose une propriété comme étant vraie dans l'environnement.");
            ent_th.push("suppose(env, p)");
            ent_th_arg.push("env : correspond à l'environnement actuel", "p : propriété");
            ret_th.push("→ Array [ valid, new_env, message ]");
            ret_th_arg.push("valid : indique l’état de la validation", "new_env : Nouvel environnement", "message : (string) affiche la propriété ou l'hypothèse.");
            ent_ret_prat.push("suppose(env, 'x = 5')", "→ Array [ 2, env1, 'Hypothesis H : x = 5.' ]");
            ret_err.push("Non défini");
            break;
        case "proof_assistant()":
            desc.push("Exécute des commandes comme si on les avait données à l'assistant de preuve.");
            ent_th.push("proof_assistant(env, cmd)");
            ent_th_arg.push("env : correspond à l'environnement actuel", "cmd : (string) commande d’assistant de preuve à traiter ");
            ret_th.push("→ Array [ valid, new_env, mess ]");
            ret_th_arg.push("valid : indique l’état de la validation", "new_env : Nouvel environnement", "mess");
            ent_ret_prat.push("proof_assistant(env, 'Variable y : real. Hypothesis (H1 : y > 3) (H2 : y < 4). Lemma prop : (y > 2). Proof. Qed.')", "→ Array [ 2, env1, Array (4) ]");
            ret_err.push("Non défini");
            break;
        default:
            text_zone ="INVALIDE !";
            newContent.innerHTML = `[1.1, Erreur : Commande inexistante.]`;
            break;
        }

    // Structure de la sortie sur l'interface 
    newContent.innerHTML += `
        <h2>${text_zone}</h2>
        <ul>
            <li><label class="TitleApi">Description </label><br><p id="container1">${desc.length > 1 ? desc.join('<br>') : desc}</p></li>
            <li><label class="TitleApi">Entrée théorique </label><br><p id="container1">${ent_th.length > 1 ? ent_th.join('<br>') : ent_th}</p></li>
            <li><label class="TitleApi">Arguments de l'entrée </label><br><p id="container1">${ent_th_arg.length > 1 ? ent_th_arg.join('<br>') : ent_th_arg}</p></li>
            <li><label class="TitleApi">Retour théorique </label><br><p id="container1">${ret_th.length > 1 ? ret_th.join('<br>') : ret_th}</p></li>
            <li><label class="TitleApi">Arguments du retour</label><br><p id="container3">${ret_th_arg.length > 1 ? ret_th_arg.join('<br>') : ret_th_arg}</p></li>
            <li><label class="TitleApi">Cas pratique </label><br><p id="container1">${ent_ret_prat.length > 1 ? ent_ret_prat.join('<br>') : ent_ret_prat}</p></li>
            <li><label class="TitleApi">Retour d'erreur </label><br><p id="container1">${ret_err.length > 1 ? ret_err.join('<br>') : ret_err}</p></li>
        </ul>
    `;

    // Gestion de l'affichage de la sortie  
    // On veut un affichage unique pour chaque fonction. 
    // On supprime le dernier affichage à chaque fois qu'une nouvelle fonction est entrée et ajoute le nouvel affichage  
    const box4 = document.querySelector(".box4"); // Supprimer le dernier élément ajouté
    if (box4.lastChild) {
        box4.removeChild(box4.lastChild);
    }

document.querySelector(".box4").appendChild(newContent); // Ajouter le nouvel élément à la fin de .box4
}