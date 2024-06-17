document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('create-function-btn').addEventListener('click', function() {
        const functionInput = document.getElementById('function-input').value.trim();

        // Fonction pour extraire le nom de la fonction et les paramètres
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

        // Créer dynamiquement la fonction
        function createFunction(name, params) {
            const paramList = params.join(', ');
            const functionBody = `
                console.log("Function ${name} called with parameters:", ${paramList});
                // Ajoutez ici la logique de la fonction
                return ${paramList}; // Exemple de retour
            `;
            return new Function(...params.map((_, i) => `param${i + 1}`), functionBody);
        }

        const parsedFunction = parseFunctionString(functionInput);

        if (parsedFunction) {
            const { functionName, params } = parsedFunction;

            // Créer et appeler la fonction
            const dynamicFunction = createFunction(functionName, params);

            // Appeler la fonction avec les paramètres
            const result = dynamicFunction(...params);

            // Afficher le résultat
            document.getElementById('result').innerText = `Result: ${result}`;
            document.getElementById('result').innerText = `Result: ${dynamicFunction}`;

        } else {
            alert("La chaîne de fonction n'est pas valide.");
        }
    });
});