// Get reference to form
var form = document.getElementById("recipe-form");

// Add submit event listener
form.addEventListener("submit", (e) => {
  // Prevent default form submission
  e.preventDefault();

  var recipeName = document.getElementById("recipe-name").value;
  console.log(recipeName);
  var recipeIngredients = document.getElementById("recipe-ingredients").value;
  console.log(recipeIngredients);
  var recipeInstructions = document.getElementById("recipe-instructions").value;
  console.log(recipeInstructions);
});

//Get form data
//Send form data to server
//Show sucess message
