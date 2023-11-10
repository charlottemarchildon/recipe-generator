var searchInput = "French Toast"

async function fetchData() {
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=6&tags=${searchInput}`;
    // const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=8138`;
    // const url = 'https://generate-a-recipe-based-on-an-ingredient.p.rapidapi.com/generate_recipe?ingredient=chicken';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c7274ee214msh7c69092222f1054p1d1942jsn85ff4436e42b',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            // 'X-RapidAPI-Key': '74c3277fc3msh2b0e661bb1bd376p14e8c4jsn45af05e0e755',
            // 'X-RapidAPI-Host': 'generate-a-recipe-based-on-an-ingredient.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // var name = data[0].name;
        // var 
    } catch (error) {
        console.error(error);
    }

}

fetchData();
