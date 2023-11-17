// sidebar.js

document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');

    
    function updateSidebarWithIngredients(ingredients) {
        var ul = document.createElement('ul');

        ingredients.forEach(function (ingredient) {
            var li = document.createElement('li');
            li.textContent = ingredient;
            ul.appendChild(li);
        });

        sidebar.innerHTML = '';
        sidebar.appendChild(ul);
    }

        async function fetchIngredientsFromAPI() {
        try {
            const response = await fetch('https://api.example.com/ingredients');
            const data = await response.json();

            // Do we have the list of ingredients?
            const ingredientsList = data.ingredients;

            updateSidebarWithIngredients(ingredientsList);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    }

        fetchIngredientsFromAPI();

        sidebar.addEventListener('click', function (event) {
        var selectedIngredient = event.target.textContent;

        if (selectedIngredient) {
            console.log('Selected Ingredient:', selectedIngredient);
            
        }
    });
});
