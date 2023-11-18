var generalRecipe = localStorage.getItem("general-selected");
var veganID = localStorage.getItem("vegan-selected");

var veganTitle;
var veganImage;
var veganIngredient;
var veganInstruction;

if (generalRecipe !== null) {
    generalRecipe = JSON.parse(generalRecipe);

    $(`#food-name`).text(generalRecipe[1]);

    var image = generalRecipe[2];
    var imageLink = image.substring(image.indexOf('(') + 1, image.lastIndexOf(')'));

    $(`#food-picture`).attr("src", imageLink);

    for (var i = 0; i < generalRecipe[3].length; i++) {
        var ingEl = $("<li></li>");
        var ing = generalRecipe[3][i].substring(generalRecipe[3][i].indexOf(':"') + 2, generalRecipe[3][i].lastIndexOf('"'));
        ingEl.text(ing);
        $(`#ing-list`).append(ingEl);
    };

    for (var n=0; n < generalRecipe[4].length; n++) {
        var insEl = $("<li></li>");
        var ins = generalRecipe[4][n];
        insEl.text(ins);
        $(`#steps`).append(insEl);
    };
} else if (veganID !== null) {

    async function fetchVeganInfo(veganID) {
        const url = `https://the-vegan-recipes-db.p.rapidapi.com/${veganID}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3d22f37fb7msh06f140df3e4ecc2p150513jsn883326b6b241',
                'X-RapidAPI-Host': 'the-vegan-recipes-db.p.rapidapi.com'
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
        
            veganTitle = result.title;
            console.log(veganTitle)
            $(`#food-name`).text(veganTitle);

            veganImage = result.image;
            $(`#food-picture`).attr("src", veganImage);

            veganIngredient = result.ingredients;
            for (var i = 0; i < veganIngredient.length; i++) {
                var ingEl = $("<li></li>");
                var ing = veganIngredient[i];
                ingEl.text(ing);
                $(`#ing-list`).append(ingEl);
            };

            var fullInstructions = [];
            var veganFull = result.method;

            for (var i = 0; i < veganFull.length; i++) {
                var section = JSON.stringify(result.method[i]);
                section = section.substring(section.indexOf(':"') + 2, section.lastIndexOf('"'))
                section = section.split(". ");
                for (n = 0; n < section.length; n++) {
                    fullInstructions.push(section[n]);
                }
            }
            for (var n=0; n < fullInstructions.length; n++) {
                var insEl = $("<li></li>");
                var ins = fullInstructions[n];
                insEl.text(ins);
                $(`#steps`).append(insEl);
            };
        } catch (error) {
            console.error(error);
        }
    };
    fetchVeganInfo(veganID)
}