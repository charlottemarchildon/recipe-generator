var generalRecipe = localStorage.getItem("general-selected");
var veganRecipe = localStorage.getItem("vegan-selected");

if (generalRecipe !== null) {
    generalRecipe = JSON.parse(generalRecipe);
    console.log(generalRecipe);

    $(`#food-name`).text(generalRecipe[1]);

    var image = generalRecipe[2];
    var imageLink = image.substring(image.indexOf('(') + 1, image.lastIndexOf(')'));
    console.log(imageLink);

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
} else if (veganRecipe !== null) {
    veganRecipe = JSON.parse(veganRecipe);
    console.log(veganRecipe);

    $(`#food-name`).text(veganRecipe[1]);

    var image = veganRecipe[2];
    var imageLink = image.substring(image.indexOf('(') + 1, image.lastIndexOf(')'));
    console.log(imageLink);

    $(`#food-picture`).attr("src", imageLink);

    for (var i = 0; i < veganRecipe[3].length; i++) {
        var ingEl = $("<li></li>");
        var ing = veganRecipe[3][i].substring(veganRecipe[3][i].indexOf(':"') + 2, veganRecipe[3][i].lastIndexOf('"'));
        ingEl.text(ing);
        $(`#ing-list`).append(ingEl);
    };

    for (var n=0; n < veganRecipe[4].length; n++) {
        var insEl = $("<li></li>");
        var ins = veganRecipe[4][n];
        insEl.text(ins);
        $(`#steps`).append(insEl);
    };
}