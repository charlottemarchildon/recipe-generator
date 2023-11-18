let searchInput = document.querySelector("#search")
let recipeForm = document.getElementById("recipe-form")
let instructionButton = document.getElementById("instructionButton")
let clearSearchButton = document.getElementById("clearSearchButton")

var searchResults = {};

recipeForm.addEventListener("submit", async function (event) {

    event.preventDefault();
    let searchInput = document.querySelector(".typeahead").value.trim()

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
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
});

function displayData(data) {
    let results = document.querySelector("#search-results");
    results.innerHTML = "";
    for (let i = 0; i < data.d.length; i++) {
        console.log(data.d[i].Title);
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

        resultEl.appendChild(titleEl);
        resultEl.appendChild(recipeLink)
        recipeLink.appendChild(titleEl);
        recipeLink.appendChild(imageEl);
        recipeLink.appendChild(idEl);
        results.appendChild(resultEl);

        let recipeId = data.d[i].id;
        idEl.textContent = recipeId;
        titleEl.textContent = `${data.d[i].Title}`;
        recipeLink.href = `#`
        let imageLink = `url(${data.d[i].Image})`
        imageLink = imageLink.replace("//", "https://");
        imageEl.style.backgroundImage = imageLink;
        imageEl.textContent = ""

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

            let clickedRecipeTitle = recipeLink.textContent.match(/\d+/g);

            localStorage.setItem("selected", JSON.stringify(searchResults[recipeId]));

            if (clickedRecipeTitle !== null) {

                clickedRecipeTitle = Number(clickedRecipeTitle[0]);

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
}

document.addEventListener('DOMContentLoaded', async function () {
    const id = getLocalStorage("userRecipes");

    for (let i = 0; i < id.length; i++) {
        try {
            const data = await fetchData(id[i]);
            displayRecipe(data);
        } catch (error) {
            console.error(error);
        }
    }
});

function displayRecipe(data) {
    let results = document.querySelector("#search-results");
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

    resultEl.appendChild(titleEl);
    resultEl.appendChild(recipeLink);
    recipeLink.appendChild(titleEl);
    recipeLink.appendChild(imageEl);
    recipeLink.appendChild(idEl);
    results.appendChild(resultEl);

    let recipeId = data.d[0].id;
    idEl.textContent = recipeId;
    titleEl.textContent = `${data.d[0].Title}hello`;
    recipeLink.href = `#`;
    let imageLink = `url(${data.d[0].Image})`;
    imageLink = imageLink.replace("//", "https://");
    imageEl.style.backgroundImage = imageLink;
    imageEl.textContent = "";
}


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

clearSearchButton.addEventListener("click", function () {
    let results = document.querySelector("#search-results");
    results.innerHTML = "";
    clearSearchButton.setAttribute("class", "hidden");
    function setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    setLocalStorage("userRecipes", "")
})

function getLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}


var $input = $(".typeahead");
$input.typeahead({
    source: [
        "Corned Beef with Crispy Roasted Potatoes and Cabbage",
        "Slow Roast Beef",
        "Beef Rib Roast with Garlic and Rosemary",
        "Sunday Stash Braised Beef",
        "Instant Pot Beef and Sweet Potato Chili",
        "Cold Beef Tenderloin with Tomatoes and Cucumbers",
        "Hummus Dinner Bowls with Spiced Ground Beef and Tomatoes",
        "Beef Sliders with Provolone and Balsamic Onions",
        "Slow Cooker Corned Beef Brisket with Cabbage, Potatoes & Dill",
        "Beef Chili",
        "Instant Pot Beef Barbacoa Tacos",
        "Good Luck Beef and Korean Rice Cake Soup (Tteokguk)",
        "Thai Beef Salad",
        "Ground Beef Tacos",
        "Somali Beef Stew with Spiced Rice (Bariis Maraq)",
        "Grilled Beef Wrapped in Sesame Leaves (Bo La Lot)",
        "Mini Beef and Mushroom Patties",
        "Beef Pho",
        "Caesar Salad Roast Chicken",
        "Chicken and Rice With Leeks and Salsa Verde",
        "Chicken and Potato Gratin With Brown Butter Cream",
        "Chicken Pelau",
        "Braised Chicken Legs With Grapes and Fennel",
        "Maple Barbecue Grilled Chicken",
        "Dakgangjeong (닭강정 / Korean Sweet, Crunchy Fried Chicken)",
        "Chicken Thighs With Tomatoes and Feta",
        "Chicken Meatballs With Molokhieh, Garlic, and Cilantro",
        "Caribbean Smothered Chicken With Coconut, Lime, and Chiles",
        "Spring Chicken Dinner Salad",
        "Chicken Zucchini Burgers",
        "Chipotle Chicken and Cauliflower Tacos",
        "Cheesy Chicken Melt With All of the Onions Relish",
        "Chicken Spiedies (Marinated Chicken on a Bun)",
        "Instant Pot Lemon Chicken With Garlic and Olives",
        "Tangy Vinegar Chicken With Barberries and Orange",
        "Grilled Pizza",
        "Summer Pizza with Salami, Zucchini, and Tomatoes",
        "Salad Pizza",
        "Red Sauce for Pizza",
        "Steak Pizzaiola",
        "Breakfast Pizza with Sausage, Eggs, Spinach, and Cream",
        "White Pizza with Shaved Vegetables and Pesto",
        "Thanksgiving Skillet Pizza",
        "Cauliflower Pizzas With Mozzarella, Kale, and Lemon",
        "Zucchini Pizza Crust With Lemony Pea Pesto",
        "Trenton Tomato Pie Pizza",
        "Food Processor Pizza Dough",
        "Hot Sausage and Crispy Chard Pizza",
        "BBQ Chicken French Bread Pizzas with Smoked Mozzarella",
        "Caramel Apple Cupcakes",
        "Big Apple Crumble Cupcakes",
        "Lemon and Fig Cupcakes",
        "Spicy Larb with Cabbage Cups",
        "Muffin Cup Veggie Omelets",
        "Crab Louie Salad Lettuce Cups",
        "Cranberry Spice 'Turkey' Cupcakes with Vanilla Cream Cheese Frosting",
        "Whole Wheat Cranberry Orange Cupcakes",
        "Orange Cranberry Cupcakes",
        "Vegan Apple Cider Cupcakes",
        "Larry the Turkey Cupcakes",
        "Pumpkin Patch Cupcakes",
        "Pumpkin Spice Cupcakes",
        "Autumn Leaves Cupcake Wreath",
        "Cinnamon Apple Cupcakes",
        "Gingerbread Cupcakes with Lemony Frosting",
        "Avocado Cups with Pomegranate Salsa Verde",
        "Toasted Marshmallow Cupcakes",
        "St. Patrick's Day Cupcakes with White Chocolate and Pistachios",
        "Strawberry Shortcake Cupcakes",
        "Double Chocolate Cupcakes With Salted Chia Pudding Frosting",
        "Giant Chocolate Peanut Butter Cup",
        "Pumpkin Spice Cupcakes",
        "Spiced Lamb and Dill Yogurt Pasta",
        "Swiss Chard Pasta With Toasted Hazelnuts and Parmesan",
        "Melted Broccoli Pasta With Capers and Anchovies",
        "Burst Cherry Tomato Pasta",
        "Spicy Baked Pasta With Cheddar and Broccoli Rabe",
        "Pasta With Brown Butter, Whole Lemon, and Parmesan",
        "Kale Pesto With Whole Wheat Pasta",
        "Pesto Pasta Frittata",
        "Salad Pasta",
        "White Pesto Pasta",
        "Baked Pasta Shells with Sausage and Greens",
        "Brothy Pasta with Chickpeas",
        "Creamy Pasta with Crispy Mushrooms",
        "Perfect Pesto Pasta",
        "Pasta with Clams, Corn, and Basil Pesto",
        "Caramelized Onion Pasta",
        "Pasta with Sausage and Arugula",
        "Herby Pasta with Garlic and Green Olives",
        "Baked Pasta alla Norma",
        "Grilled Ratatouille Pasta Salad",
        "Romesco Pasta Salad with Basil and Parmesan",
        "Pantry Pasta with Garlic, Anchovies, and Parmesan",
        "Caesar Salad Roast Chicken",
        "Sour Cream and Onion Potato Salad",
        "Pork Meatballs and Cucumber Salad",
        "Fancy and Beautiful Tomato Salad",
        "Salad Ramen",
        "Tiger Fruit Salad",
        "Grilled Mushroom Antipasto Salad",
        "Creole Caesar Salad With Corn Bread Croutons",
        "Jerk Potato Salad",
        "Grilled Watermelon Salad With Lime Mango Dressing and Cornbread Croutons",
        "Watermelon Salad With Radishes and Mint",
        "Grilled Pork Shoulder Steaks With Herb Salad",
        "Spring Chicken Dinner Salad",
        "Sweet Pickle Potato Salad",
        "Pantry Dinner Salad With Polenta Croutons",
        "Carrot Ribbon Salad With Ginger, Parsley, and Dates",
        "Crunchy Pickle Salad",
        "Wood Ear and Cilantro Salad",
        "Pickle Potato Salad",
        "Fragrant Mixed Herb and Flatbread Salad (Domaaj)",
        "Ramen Noodles With Spring Onions and Garlic Crisp",
        "Golden Noodles With Chicken",
        "Bright and Spicy Shrimp Noodle Salad",
        "Almond Pad Thai With Shiritaki Noodles",
        "Pansit Palabok (Rice Noodles with Shrimp Sauce)",
        "Rice Noodles and Tofu in Peanut Sauce",
        "Soba Noodles with Crispy Kale",
        "Zucchini Noodles with Anchovy Butter",
        "Cold Soba Noodles with Miso and Smoked Tofu",
        "Cold Soba Noodles with Jammy Eggs and Peas",
        "Weeknight Steak and Rice Noodle Salad",
        "Brothy Noodle Bowl with Mushrooms and Chiles",
        "Liu Shaokun's Spicy Buckwheat Noodles with Chicken",
        "Kimchi and Miso Noodle Soup",
        "Pineapple Shrimp Noodle Bowls",
        "Meatballs and Noodle Soup (Almondigas)",
        "Peanut Rice Noodles with Pork and Collard Greens",
        "Rice Noodles al Pomodoro with Chili Oil",
        "Coconut Rice Noodles with Ginger and Turmeric",
        "Noodles with Chilled Tomato Broth",
        "Cold Sesame Noodles with Cucumber",
        "Turkey Shawarma With Crunchy Vegetables",
        "Cauliflower 'Shawarma'",
        "Turkey Shawarma with Tomato Relish and Tahini Sauce",
        "Vegetarian Spring Rolls",
        "Crispy Spring Rolls with Spicy Tofu, Vegetables, and Toasted Nuts",
        "Fresh Filipino Spring Rolls (Lumpia Sariwa)",
        "Chocolate Kumquat Spring Rolls",
        "Shrimp Spring Rolls with Hoisin Dipping Sauce",
        "Crispy Spring Rolls (Cha Gio)",
        "Vietnamese Fried Spring Rolls",
        "Veggie Sushi Hand Roll",
        "Sushi Sandwiches",
        "Quinoa Brown Rice Sushi",
        "Veggie Sushi Rolls",
        "Sushi Rice",
        "Springtime Sushi Nests",
        "Vegetarian Pho",
        "Beef Pho",
        "Classic Chicken Pho (Phở Gà)",
        "Turkey Pho Dip",
        "Detox Pho with Beef, Mushrooms, and Kale",
        "Quick Pork Pho",
        "Faux Pho",
        "Persephone",
        "Phoenician Honey Cookies (Biscuits)",
        "Pho",
        "Vietnamese 'Pho' Rice Noodle Soup with Beef"


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


