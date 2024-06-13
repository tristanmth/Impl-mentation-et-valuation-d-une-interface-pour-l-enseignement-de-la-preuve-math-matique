//------------------------------------------------------------------
//-------------------GESTION DE LA ZONE TEXTUELLE-------------------
//------------------------------------------------------------------

const tabvarMethods1 = [
    "init()",
    "function_definition()",
    "validate()",
    "deriv()",
    "compare_values()",
    "simplify()",
    "develop()",
    "interval()",
    "suppose_var()",
    "is_positive()",
    "print_env()",
    "defined()",
    "suppose()",
    "proof_assistant()"
];

$(document).ready(function() {
    $("#command-textarea").on('input', function(event) {
        const cursorPos = this.selectionStart;
        const lines = this.value.split('\n');
        
        if (lines.length > 1) {
            const firstLine = lines[0];
            $(this).val(firstLine); // Rétablit seulement la première ligne
            this.selectionStart = this.selectionEnd = cursorPos > firstLine.length ? firstLine.length : cursorPos;
        }
    });

    $("#command-textarea").on('keydown', function(event) {
        const cursorPos = this.selectionStart;
        const lines = this.value.split('\n');

        if (event.key === 'Enter') {
            event.preventDefault(); // Empêche l'ajout d'une nouvelle ligne
            onEnter(event);
        } else if (lines.length > 1 && cursorPos > lines[0].length) {
            event.preventDefault(); // Empêche la modification en dehors de la première ligne
        }
    });

    $("#command-textarea").on('paste', function(event) {
        event.preventDefault();
        const pasteData = (event.originalEvent || event).clipboardData.getData('text');
        const cursorPos = this.selectionStart;
        const currentText = this.value;

        const newText = currentText.substring(0, cursorPos) + pasteData + currentText.substring(cursorPos);
        const firstLine = newText.split('\n')[0];

        $(this).val(firstLine);
        this.selectionStart = this.selectionEnd = cursorPos + pasteData.length > firstLine.length ? firstLine.length : cursorPos + pasteData.length;
    });

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
        alert("La commande n'existe pas.");
    }
}

function ExecutApi(command) {
    console.log(`Executing API with command: ${command}`);
    
    const parsedFunction = parseFunctionString(command);

    if (parsedFunction) {
        const { functionName, params } = parsedFunction;

        let result1 = "";

        const checkParams = (expectedCount) => {
            if (!params || params.length < expectedCount) {
                return `Erreur: Paramètres manquants.`;
            }
            return null;
        };

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
                    result1 = checkParams(1);
                } else {
                    result1 = tabvar.validate(...params);
                }
                break;
            case "deriv":
                if (checkParams(3)) {
                    result1 = checkParams(1);
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
                    result1 = checkParams(1);
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
                result1 = `Erreur: Nom de fonction invalide '${functionName}'.`;
        }
        insertAtSecondLine(result1);
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