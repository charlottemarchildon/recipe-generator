let searchInput = document.querySelector("#search")
let recipeForm = document.getElementById("recipe-form")

recipeForm.addEventListener("submit", async function(event){
    event.preventDefault();
    console.log("click");
    let searchInput = document.querySelector(".typeahead").value.trim()
    console.log(searchInput)

    async function fetchData() {
        const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=6&tags=${searchInput}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c7274ee214msh7c69092222f1054p1d1942jsn85ff4436e42b',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data.results);

            displayData(data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchData();
});

function displayData(data) {
    let results = document.querySelector("#search-results");
    results.innerHTML="";
    for (let i = 0; i < data.results.length; i++) {
        // console.log(data.results.length)
        // console.log(data.results[i].name, "hello")
        let resultEl = document.createElement("div");
        resultEl.className = "recipe";
        let titleEl = document.createElement("p");
        titleEl.className = "titleEl";
        let imageEl = document.createElement("div");
        imageEl.className = "recipeImage";
        let recipeLink = document.createElement("a");
        recipeLink.className = "recipeLink";


        resultEl.appendChild(imageEl);
        resultEl.appendChild(titleEl);
        resultEl.appendChild(recipeLink)
        recipeLink.appendChild(titleEl);
        results.appendChild(resultEl);


        titleEl.textContent = data.results[i].name;
        recipeLink.href = data.results[i].original_video_url
        imageEl.style.backgroundImage = `url(${data.results[i].thumbnail_url})`
        imageEl.textContent = ""
        console.log(data.results[i].original_video_url);
    }
}

// Initializes input( name of states) 
        // with a typeahead 
        var $input = $(".typeahead");
        $input.typeahead({
            source: [
                "Cup Cakes",
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
            ],
            autoSelect: true,
        });

        $input.change(function () {
            var current = $input.typeahead("getActive");
            matches = [];

            if (current) {

                // Some item from your input matches 
                // with entered data 
                if (current.name == $input.val()) {
                    matches.push(current.name);
                }
            }
        }); 


