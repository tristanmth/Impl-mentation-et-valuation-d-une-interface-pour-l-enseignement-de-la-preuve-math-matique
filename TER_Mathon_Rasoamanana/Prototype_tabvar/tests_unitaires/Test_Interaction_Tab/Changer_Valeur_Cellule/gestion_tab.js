function changeValue(link) {
    try {
        // Trouve le contenu du menu déroulant
        var dropdownContent = link.closest('.dropdown-content');
        if (!dropdownContent) {
            console.error("[1.6, Le contenu du menu déroulant n'a pas pu être trouvé. La classe du div n'est pas : dropdown-content]");
            return;
        }

        // Trouve le bouton "value" associé
        var button = dropdownContent.parentElement.querySelector('.value');
        if (!button) {
            console.error("[1.6, Le bouton 'value' associé n'a pas pu être trouvé.]");
            return;
        }

        // Récupère la valeur actuelle
        var currentValue = button.innerText;
        if (typeof currentValue !== 'string') {
            console.error("[1.2, La valeur actuelle du bouton n'est pas une chaîne de caractères.]");
            return;
        }

        // Crée un élément input
        var input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;

        // Ajoute un gestionnaire d'événements pour détecter lorsque l'utilisateur clique à l'extérieur de la zone de texte
        input.addEventListener('blur', function() {
            try {
                if (this.parentElement) {
                    updateButtonValue(this.parentElement, this.value);
                    this.parentElement.removeChild(this);
                } else {
                    console.error("[1.6, Impossible de trouver le parent de l'élément input lors du blur.]");
                }
            } catch (error) {
                console.error("[1.9, Erreur lors de la gestion de l'événement blur : " + error.message + "]");
            }
        });


        // Ajoute un gestionnaire d'événements pour détecter lorsque la touche "Entrée" est pressée
        input.addEventListener('keydown', function(event) {
            try {
                if (event.key === 'Enter') {
                    if (this.parentElement) {
                        updateButtonValue(this.parentElement, this.value);
                        this.parentElement.removeChild(this);
                    } else {
                        console.error("[1.6, Impossible de trouver le parent de l'élément input lors de la touche Entrée.]");
                    }
                }
            } catch (error) {
                console.error("[1.9, Erreur lors de la gestion de l'événement keydown : " + error.message + "]");
            }
        });


        // Efface le contenu du bouton
        button.innerHTML = '';
        button.appendChild(input);
        input.focus(); // Met le focus sur l'input pour que l'utilisateur puisse commencer à saisir immédiatement
    } catch (error) {
        console.error("[1.9, Erreur générale dans la fonction changeValue : " + error.message + "]");
    }
}

// Fonction pour mettre à jour le texte du bouton avec la nouvelle valeur saisie
function updateButtonValue(button, newValue) {
    try {
        button.innerText = newValue;
    } catch (error) {
        console.error("[1.9, Erreur interne lors de la mise à jour de la valeur du bouton] " + error.message);
    }
}