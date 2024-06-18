const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function compareValues(env, expression1, expression2) {
    // Remplacez cette ligne par votre logique de comparaison des expressions
    return `Comparing in environment ${env}: ${expression1} with ${expression2}`;
}

app.post('/execute', (req, res) => {
    const { command } = req.body;
    // Analyser la commande
    const regex = /tabvar\.compare_values\(([^,]+),\s*"([^"]+)",\s*"([^"]+)"\)/;
    const match = command.match(regex);

    if (match) {
        const env = match[1].trim();
        const expression1 = match[2].trim();
        const expression2 = match[3].trim();
        const result = compareValues(env, expression1, expression2);
        res.send(result);
    } else {
        res.status(400).send('Invalid command format');
    }
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
