var recipeInfo = localStorage.getItem("selected");

recipeInfo = JSON.parse(recipeInfo);
console.log(recipeInfo);

$(`#food-name`).text(recipeInfo[1]);

var image = recipeInfo[2];
var imageLink = image.substring(image.indexOf('(') + 1, image.lastIndexOf(')'));
console.log(imageLink);

$(`#food-picture`).attr("src", imageLink);

for (var i = 0; i < recipeInfo.length; i++) {
    var ingEl = $("<li></li>");
    var ing = recipeInfo[3][i].substring(recipeInfo[3][i].indexOf(':"') + 2, recipeInfo[3][i].lastIndexOf('"'));
    ingEl.text(ing);
    $(`#ing-list`).append(ingEl);
};

for (var n=0; n < recipeInfo[4].length; n++) {
    var insEl = $("<li></li>");
    var ins = recipeInfo[4][n];
    insEl.text(ins);
    $(`#steps`).append(insEl);
};