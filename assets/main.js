let searchInput = document.querySelector("#search")
let recipeForm = document.getElementById("recipe-form")
let instructionButton = document.getElementById("instructionButton")
let recipeCard = document.querySelector(".recipe");
let userInput = document.querySelector(".typeahead");
let recipePage = document.querySelector(".instruction");

var searchResults = {};

recipeForm.addEventListener("submit", async function (event) {
    
    event.preventDefault();
    console.log("click");
    let searchInput = document.querySelector(".typeahead").value.trim()
    console.log(searchInput)

    async function fetchData() {


        const url = `https://food-recipes-with-images.p.rapidapi.com/?q=${searchInput}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c7274ee214msh7c69092222f1054p1d1942jsn85ff4436e42b',
                'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            displayData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
});

document.addEventListener('DOMContentLoaded', function () {
    var instructionButton = document.getElementById('instructionButton');
    var collapseExample = new bootstrap.Collapse(document.getElementById('collapseExample'));
    collapseExample.show();
});

// Variable to hold search results

function displayData(data) {
    let results = document.querySelector("#search-results");
    results.innerHTML = "";
    for (let i = 0; i < data.d.length; i++) {
        console.log(data.d.length)
        let resultEl = document.createElement("div");
        resultEl.className = "recipe";
        let titleEl = document.createElement("p");
        titleEl.className = "titleEl";
        let idEl = document.createElement("p");
        idEl.className = "idEl";
        let imageEl = document.createElement("div");
        imageEl.className = "recipeImage";
        let recipeLink = document.createElement("a");
        recipeLink.className = "recipeLink";
        // Adding id to recipeLink which corresponds to it's index number
        resultEl.id = `${i}`;

        resultEl.appendChild(titleEl);
        resultEl.appendChild(recipeLink)
        recipeLink.appendChild(titleEl);
        recipeLink.appendChild(imageEl);
        recipeLink.appendChild(idEl);
        results.appendChild(resultEl);

        let recipeId = data.d[i].id;
        idEl.textContent = recipeId;
        titleEl.textContent = `${data.d[i].Title}`;
        // Connect to recipe page
        recipeLink.href = `recipe.html`;
        console.log(titleEl)
        let imageLink = `url(${data.d[i].Image})`
        console.log(imageLink);
        imageLink = imageLink.replace("//", "https://");
        imageEl.style.backgroundImage = imageLink;
        imageEl.textContent = ""
        console.log(data.d[i].Image);

        // Storing information of recipe
        // index 0 ID
        // index 1 Recipe Name
        // index 2 Image URL
        // index 3 Ingredients
        // index 4 Instructions

        searchResults[`${recipeId}`] = [];

        var ingredientList = JSON.stringify(data.d[i].Ingredients);
        var parsedList = ingredientList.split(`,"`);

        var instructionList = data.d[i].Instructions;
        instructionList = instructionList.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

        searchResults[`${recipeId}`].push(recipeId);
        searchResults[`${recipeId}`].push(`${data.d[i].Title}`);
        searchResults[`${recipeId}`].push(imageLink);
        searchResults[`${recipeId}`].push(parsedList);
        searchResults[`${recipeId}`].push(instructionList);
        console.log(searchResults);

        recipeLink.addEventListener("click", function () {
            console.log(recipeLink)
            let clickedRecipeTitle = recipeLink.textContent.match(/\d+/g);

            // var recipeInfo = searchResults
            localStorage.setItem("selected", JSON.stringify(searchResults[recipeId]));
            
            if (clickedRecipeTitle !== null) {
               
                clickedRecipeTitle = Number(clickedRecipeTitle[0]);
        
                console.log(clickedRecipeTitle);
            } else {
                console.log("No numeric values found");
                return; 
            }
        
            function getLocalStorage(key) {
                const storedData = localStorage.getItem(key);
                return storedData ? JSON.parse(storedData) : null;
            }
        
            function setLocalStorage(key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        
            const existingData = getLocalStorage('userRecipes') || [];
        
            if (!existingData.includes(clickedRecipeTitle)) {
                existingData.push(clickedRecipeTitle);
                setLocalStorage('userRecipes', existingData);
                console.log('Recipe title added to local storage:', clickedRecipeTitle);
            } else {
                console.log('Recipe title is already in local storage:', clickedRecipeTitle);
            }
        });
    }
};

instructionButton.addEventListener('click', async function () {

    const id = getLocalStorage("userRecipes");
    console.log(id[0], "hello");

    for (let i = 0; i < id.length; i++) {
        console.log(id[i]);
        try {
            const data = await fetchData(id[i]);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
});

async function fetchData(id) {
    const url = `https://food-recipes-with-images.p.rapidapi.com/?q=${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c7274ee214msh7c69092222f1054p1d1942jsn85ff4436e42b',
            'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function displayHistory() {
    
}

function getLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}


var $input = $(".typeahead");
$input.typeahead({
    source: [
        "Beef",
        "Veggie Sushi",
        "Avocado Carbonara",
        "Spaghetti Carbonara",
        "Chicken Alfredo",
        "Grilled Cheese Sandwich",
        "Chicken Noodle Soup",
        "Caesar Salad",
        "Fried Rice",
        "Mashed Potatoes",
        "Chocolate Chip Cookies",
        "Taco Salad",
        "Chicken Parmesan",
        "Beef Stir-Fry",
        "Baked Salmon",
        "French Toast",
        "BBQ Ribs",
        "Cesar Salad",
        "Chicken Tenders",
        "Tuna Salad",
        "Baked Ziti",
        "Chicken Fried Rice",
        "Chocolate Cake",
        "Cheeseburger",
        "Garden Salad",
        "Spinach Salad",
        "Greek Salad",
        "Club Sandwich",
        "Veggie Pizza",
        "Chicken Curry",
        "Egg Salad",
        "Chicken Tacos",
        "Beef Tacos",
        "Fish Tacos",
        "Veggie Stir-Fry",
        "Beef and Broccoli",
        "Chicken and Rice",
        "Chicken Pot Pie",
        "Tomato Soup",
        "Ham and Cheese Sandwich",
        "Shrimp Scampi",
        "Pulled Pork Sandwich",
        "Beef Stroganoff",
        "Eggplant Parmesan",
        "Beef and Rice",
        "Chicken Fajitas",
        "Chicken Quesadilla",
        "Mushroom Risotto",
        "Chicken and Broccoli",
        "Shrimp Alfredo",
        "Turkey Sandwich",
        "Veggie Burger",
        "Tofu Stir-Fry",
        "Egg Drop Soup",
        "Chicken Marsala",
        "Veggie Wrap",
        "Fish and Chips",
        "Tofu Scramble",
        "Chicken Kebabs",
        "Beef and Noodles",
        "Shrimp Stir-Fry",
        "Baked Chicken",
        "Tofu Tacos",
        "Ham and Cheese Omelette",
        "Veggie Omelette",
        "Beef and Peppers",
        "Chicken Enchiladas",
        "Turkey Burger",
        "Chicken Tenders",
        "Shrimp Scampi",
        "Beef and Rice",
        "Veggie Stir-Fry",
        "Chicken and Rice",
        "Shrimp Alfredo",
        "Mushroom Risotto",
        "Beef and Broccoli",
        "Chicken Fajitas",
        "Chicken Quesadilla",
        "Pulled Pork Sandwich",
        "Fish Tacos",
        "Turkey Sandwich",
        "Veggie Pizza",
        "Beef Tacos",
        "Veggie Wrap",
        "Chicken Curry",
        "Fish and Chips",
        "Tofu Stir-Fry",
        "Chicken and Broccoli",
        "Tofu Scramble",
        "Chicken Marsala",
        "Turkey Burger",
        "Beef Stroganoff",
        "Veggie Burger",
        "Veggie Omelette",
        "Chicken Kebabs",
        "Egg Drop Soup",
        "Egg Salad",
        "Chicken and Noodles",
        "Chicken Pot Pie",
        "Taco Salad",
        "Mashed Potatoes",
        "French Toast",
        "Greek Salad",
        "Chicken Tacos",
        "Ham and Cheese Omelette",
        "Beef and Peppers",
        "Veggie Burrito",
        "Mushroom Soup",
        "Shrimp and Rice",
        "Beef and Broccoli Stir-Fry",
        "Shrimp Scampi Pasta",
        "Chicken and Rice Casserole",
        "Veggie Stir-Fry",
        "Lemon Garlic Shrimp",
        "Chicken and Vegetable Stir-Fry",
        "Beef and Noodle Stir-Fry",
        "Garlic Butter Shrimp",
        "Chicken Fajita Bowl",
        "Beef and Mushroom Stir-Fry",
        "Spaghetti Bolognese",
        "Chicken and Broccoli Alfredo",
        "Shrimp and Asparagus Risotto",
        "Beef and Green Bean Stir-Fry",
        "Honey Garlic Shrimp",
        "Chicken and Mushroom Stir-Fry",
        "Teriyaki Beef and Broccoli",
        "Lemon Pepper Shrimp",
        "Chicken and Spinach Alfredo",
        "Shrimp and Snow Pea Stir-Fry",
        "Beef and Snow Pea Stir-Fry",
        "Creamy Mushroom Chicken",
        "Shrimp and Bell Pepper Stir-Fry",
        "Beef and Spinach Stir-Fry",
        "Baked Ziti",
        "Chicken Alfredo",
        "Beef and Rice",
        "Beef Tacos",
        "Veggie Wrap",
        "Chicken Curry",
        "Fish and Chips",
        "Tofu Stir-Fry",
        "Chicken and Broccoli",
        "Tofu Scramble",
        "Chicken Marsala",
        "Turkey Burger",
        "Beef Stroganoff",
        "Veggie Burger",
        "Veggie Omelette",
        "Chicken Kebabs",
        "Egg Drop Soup",
        "Egg Salad",
        "Chicken and Noodles",
        "Chicken Pot Pie",
        "Taco Salad",
        "Mashed Potatoes",
        "French Toast",
        "Greek Salad",
        "Chicken Tacos",
        "Ham and Cheese Omelette",
        "Beef and Peppers",
        "Veggie Burrito",
        "Mushroom Soup",
        "Shrimp and Rice",
        "Beef and Broccoli Stir-Fry",
        "Shrimp Scampi Pasta",
        "Chicken and Rice Casserole",
        "Lemon Garlic Shrimp",
        "Chicken and Vegetable Stir-Fry",
        "Beef and Noodle Stir-Fry",
        "Garlic Butter Shrimp",
        "Chicken Fajita Bowl",
        "Beef and Mushroom Stir-Fry",
        "Spaghetti Bolognese",
        "Chicken and Broccoli Alfredo",
        "Shrimp and Asparagus Risotto",
        "Beef and Green Bean Stir-Fry",
        "Honey Garlic Shrimp",
        "Chicken and Mushroom Stir-Fry",
        "Teriyaki Beef and Broccoli",
        "Lemon Pepper Shrimp",
        "Chicken and Spinach Alfredo",
        "Shrimp and Snow Pea Stir-Fry",
        "Beef and Snow Pea Stir-Fry",
        "Creamy Mushroom Chicken",
        "Shrimp and Bell Pepper Stir-Fry",
        "Beef and Spinach Stir-Fry",
    ],
    autoSelect: true,
});

$input.change(function () {
    var current = $input.typeahead("getActive");
    matches = [];

    if (current) {

        if (current.name == $input.val()) {
            matches.push(current.name);
        }
    }
});
