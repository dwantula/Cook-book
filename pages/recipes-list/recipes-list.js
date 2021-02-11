var RecipesListModule = (function() {
  function getRecipesFromLocalStorage() {
    var recipes = LocalStorageModule.getItemFromLocalStorage('recipes');
    return recipes;
  }

  var recipesList = document.getElementById('recipes-list');
  
  function removeRecipe(recipeId) {
    var recipes = getRecipesFromLocalStorage();
    var newRecipes = recipes.filter(function(recipe) {
      if (recipe.id !== recipeId) {
        return recipe
      }
    });
    LocalStorageModule.saveItemInLocalStorage('recipes', newRecipes);
    recipesList.innerHTML = '';
    populateListWithRecipes();
  }

  function createRecipeRow(recipe) {
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', function() {
      removeRecipe(recipe.id);
    });
    deleteButton.innerHTML = 'X';
    deleteButton.classList.add('button-delete', 'button-delete-recipe' );
    var cellDetails = document.createElement('td');
    var detailsButton = document.createElement('button');
    detailsButton.addEventListener('click', function() {
      LocalStorageModule.saveItemInLocalStorage( 'details', recipe)
      NavigationModule.replaceLocation('../recipe-details/recipe-details.html')
    });
    detailsButton.innerHTML = 'details';
    detailsButton.classList.add('button', 'button-positive', 'button-details');
    var cellRecipeName = document.createElement('td');
    cellRecipeName.innerText = recipe.name;
    cellDetails.appendChild(detailsButton);
    row.appendChild(cellRecipeName);
    row.appendChild(cellDetails);
    row.appendChild(cell);
    cell.appendChild(deleteButton);
    return row;
  }

  function populateListWithRecipes() {
    var recipes = getRecipesFromLocalStorage();
    if (recipes) {
      for (i = 0; i <recipes.length; i++) {
        var recipeRow = createRecipeRow(recipes[i]);
        recipesList.appendChild(recipeRow);
      }
    }
  }

  populateListWithRecipes();

  var addRecipeButton = document.querySelector('#add-recipe-button');

  addRecipeButton.addEventListener('click', function() {
    NavigationModule.replaceLocation('../add-recipe/add-recipe.html')
  });
})();
