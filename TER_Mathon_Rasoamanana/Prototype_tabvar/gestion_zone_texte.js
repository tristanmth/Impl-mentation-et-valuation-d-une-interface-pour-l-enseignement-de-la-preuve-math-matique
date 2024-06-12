//------------------------------------------------------------------
//-------------------GESTION DE LA ZONE TEXTUELLE-------------------
//------------------------------------------------------------------

const tabvarMethods1 = [
    "init()",
    "function_definition(env, f, var, expr)",
    "validate(env, expr)",
    "deriv(env, var, expr)",
    "compare_values(env, expr1, expr2)",
    "simplify(env, expr)",
    "develop(env, expr)",
    "interval(env, expr)",
    "suppose_var(env, x)",
    "is_positive(env, expr)",
    "print_env(env)",
    "defined(env, expr)",
    "suppose(env, prop)",
    "proof_assistant(env, cmd)"
];

$(document).ready(function() {
    $("#command-textarea").on('input', function() {
        const cursorPos = this.selectionStart;
        const textBeforeCursor = this.value.substring(0, cursorPos);
        const tabvarPattern = /$/;

        if (tabvarPattern.test(textBeforeCursor)) {
            $("#command-textarea").autocomplete({
                source: tabvarMethods1,
                position: { my: "left top", at: "left bottom", of: this },
                select: function(event, ui) {
                    return false;
                }
            }).autocomplete("search", "");
        }
    });

    $("#command-textarea").on('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            onEnter(event);
        }
    });
});

function insertAtSecondLine(text) {
    const textarea = $("#command-textarea");
    const value = textarea.val();
    const lines = value.split('\n');

    if (lines.length < 2) {
        lines.push('');
    }
    
    lines.splice(1, 0, text);

    textarea.val(lines.join('\n'));

    const cursorPos = lines.slice(0, 2).join('\n').length;
    textarea[0].selectionStart = textarea[0].selectionEnd = cursorPos;
}

function onEnter(event) {
    const value = event.target.value.trim(); 
    if (Array.isArray(tabvarMethods1) && tabvarMethods1.includes(value.split('(')[0] + '()')) {
        ExecutApi(value);
    } else {
        alert("La commande n'existe pas dans les méthodes prédéfinies.");
    }
}

function ExecutApi(command) {
    console.log(`Executing API with command: ${command}`);
    
    const parsedFunction = parseFunctionString(command);

    if (parsedFunction) {
        const { functionName, params } = parsedFunction;

        const paramVariables = params.map((param, index) => `var param${index + 1} = '${param}'`).join('; ');
        eval(paramVariables);

        let result1 = "";
        if (functionName === "init") {
            result1 = tabvar.init();
        } else if (functionName === "function_definition") {
            result1 = tabvar.function_definition(...params);
        } else if (functionName === "validate") {
            result1 = tabvar.validate(...params);
        } else if (functionName === "deriv") {
            result1 = tabvar.deriv(...params);
        } else if (functionName === "compare_values") {
            result1 = tabvar.compare_values(...params);
        } else if (functionName === "simplify") {
            result1 = tabvar.simplify(...params);
        } else if (functionName === "develop") {
            result1 = tabvar.develop(...params);
        } else if (functionName === "interval") {
            result1 = tabvar.interval(...params);
        } else if (functionName === "suppose_var") {
            result1 = tabvar.suppose_var(...params);
        } else if (functionName === "is_positive") {
            result1 = tabvar.is_positive(...params);
        } else if (functionName === "print_env") {
            result1 = tabvar.print_env(...params);
        } else if (functionName === "defined") {
            result1 = tabvar.defined(...params);
        } else if (functionName === "suppose") {
            result1 = tabvar.suppose(...params);
        } else if (functionName === "proof_assistant") {
            result1 = tabvar.proof_assistant(...params);
        }
        insertAtSecondLine(result1);
    } else {
        //alert("La fonction n'est pas valide.");
    }
}

function parseFunctionString(funcStr) {
    const funcPattern = /^(\w+)\((.*)\)$/;
    const match = funcPattern.exec(funcStr);
    if (match) {
        const functionName = match[1];
        const params = match[2].split(',').map(param => param.trim());
        return { functionName, params };
    }
    return null;
}