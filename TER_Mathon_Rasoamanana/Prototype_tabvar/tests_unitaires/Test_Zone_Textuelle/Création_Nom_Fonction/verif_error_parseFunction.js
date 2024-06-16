function parseFunctionString(funcStr) {
    try {
        const funcPattern = /^(\w+)\((.*)\)$/;
        const match = funcPattern.exec(funcStr);
        if (match) {
            const functionName = match[1];
            const params = match[2].split(',').map(param => param.trim());
            return { functionName, params };
        } else {
            throw "[1.1, Erreur : Format de fonction invalide]";
        }
    } catch (error) {
        if (typeof error === 'string' && error.startsWith('[')) {
            console.error(error);
        } else {
            console.error("[1.9, Erreur interne : " + error.message + "]");
        }
        return null;
    }
}

function handleParseFunction() {
    const inputElement = document.getElementById('command-input');
    const command = inputElement.value.trim(); // Récupérer la valeur de l'input

    // Appeler parseFunctionString avec la valeur de l'input
    const parsedFunction = parseFunctionString(command);

    // Utiliser parsedFunction comme nécessaire
    console.log(parsedFunction); // À adapter selon vos besoins
}