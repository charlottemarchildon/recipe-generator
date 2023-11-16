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

  // Show success message
  showSuccessMessage();

  function showSuccessMessage() {
    var successMsg = document.createElement("div");
    successMsg.textContent = "Recipe submitted successfully!";
    successMsg.classList.add("success");

    form.appendChild(successMsg);
  }

  // Clear form after submission
  clearForm();
});

function clearForm() {
  document.getElementById("recipe-name").value = "";
  document.getElementById("recipe-ingredients").value = "";
  document.getElementById("recipe-instructions").value = "";
}
