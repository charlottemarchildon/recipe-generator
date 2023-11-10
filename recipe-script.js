var searchInput = "French Toast"

async function fetchData() {
    // const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=6&tags=${searchInput}`;
    // const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=8138`;
    // const url = 'https://generate-a-recipe-based-on-an-ingredient.p.rapidapi.com/generate_recipe?ingredient=chicken';
    const url = 'https://food-recipes-with-images.p.rapidapi.com/?q=chicken%20soup';
    const options = {
        method: 'GET',
        headers: {
            // 'X-RapidAPI-Key': 'c7274ee214msh7c69092222f1054p1d1942jsn85ff4436e42b',
            // 'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            // 'X-RapidAPI-Key': '74c3277fc3msh2b0e661bb1bd376p14e8c4jsn45af05e0e755',
            // 'X-RapidAPI-Host': 'generate-a-recipe-based-on-an-ingredient.p.rapidapi.com'
            'X-RapidAPI-Key': '74c3277fc3msh2b0e661bb1bd376p14e8c4jsn45af05e0e755',
            'X-RapidAPI-Host': 'food-recipes-with-images.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // Image of Food
        var imageLink = data.d[0].Image;
        imageLink = imageLink.replace("//", "https://");
        $(`#food-picture`).attr("src", imageLink);

        // Name of Food
        var foodName = data.d[0].Title;
        $(`#food-name`).text(foodName);

        // Ingredients Used
        var ingredientList = JSON.stringify(data.d[0].Ingredients);
        var parsedList = ingredientList.split(`,"`);
        console.log(ingredientList);
        for (var i = 0; i < parsedList.length; i++) {
            var ingEl = $("<li></li>");
            var ing = parsedList[i].substring(parsedList[i].indexOf(':"') + 2, parsedList[i].lastIndexOf('"'));
            ingEl.text(ing);
            $(`#ing-list`).append(ingEl);
        }

        // Instructions
        var instructionList = data.d[0].Instructions;
        instructionList = instructionList.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
        console.log(instructionList);
        for (var i=0; i < instructionList.length; i++) {
            var insEl = $("<li></li>");
            var ins = instructionList[i];
            insEl.text(ins);
            $(`#steps`).append(insEl);
        }

    } catch (error) {
        console.error(error);
    }

}

fetchData();
