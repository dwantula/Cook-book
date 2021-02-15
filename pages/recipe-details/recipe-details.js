var DetailsRecipeModule  = (function() {
  var exitButton = document.querySelector('#exit-button');
  exitButton.addEventListener('click', function() {
    NavigationModule.replaceLocation('../recipes-list/recipes-list.html');
  });
  function getRecipesFromLocalStorage() {
    var detalis = LocalStorageModule.getItemFromLocalStorage('details');
    return detalis;
  }
  var detalisValue = getRecipesFromLocalStorage();
      
  var recipeName = document.getElementById('details-name');
  recipeName.innerText = detalisValue.name;

  var recipeNotes = document.getElementById('details-notes')
  recipeNotes.innerText = detalisValue.note;

  var ingredientsList  = document.getElementById('details-ingredients');

  function displayIngredient() {
    var ingredients = detalisValue.ingredients;
    for (i = 0; i <ingredients.length; i++) {
      var listItem = document.createElement('li');
      var text = document.createElement('p');
      text.innerText = ingredients[i];
      listItem.appendChild(text);
      ingredientsList.appendChild(listItem);
    }
  }
  displayIngredient()
})();
