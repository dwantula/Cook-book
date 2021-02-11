var AddRecipeModule = (function() {
  var list = document.getElementById('ingredients-list');
  var addIngredientButton = document.getElementById('buttonAddIngredient');
  var recipeNameInput = document.getElementById('recipe-name');

  function addIngredient() {
    var point = document.createElement('li');
    var removePointButton = document.createElement('button');
    var text = document.createElement('p');
    removePointButton.addEventListener('click',  function() {
    list.removeChild(point);
    });
    removePointButton.innerHTML = 'X';
    removePointButton.classList.add('button-delete');
    var ingredientInput = document.getElementById('ingredient-input');
    var ingredientInputValue = ingredientInput.value;
    text.innerHTML = ingredientInputValue;
    text.classList.add('point-list');
    point.appendChild(text);
    point.appendChild(removePointButton);
    list.appendChild(point);
    ingredientInput.value = '';
  };

  addIngredientButton.addEventListener('click', addIngredient);

  var clearButton = document.getElementById('clear-button');

  function clear() {
    var allListPoints = document.querySelectorAll('li');
    recipeNameInput.value = '';
    for (i= 0; i < allListPoints.length; i++) {
      list.removeChild(allListPoints[i]);
    };
    var recipeNotes = document.getElementById('recipe-notes');
    recipeNotes.value = '';
    var recipeIngredient =document.getElementById('ingredient-input');
    recipeIngredient.value = '';
  };

  clearButton.addEventListener('click', clear);

  var saveRecipeButton = document.getElementById('save-recipe-button');

  function saveRecipe() {
    var allListPoints = document.querySelectorAll('p');
    var recipeName = recipeNameInput.value;
    var recipeNote = document.getElementById('recipe-notes').value;
    var recipeIngredients = [];
    for (i = 0; i < allListPoints.length; i++) {
      var ingredient = allListPoints[i].innerText;
      recipeIngredients.push(ingredient);
    };
    var recipe = {
      id: IdGeneratorModule.generateId('recipe'),
      name: recipeName,
      ingredients: recipeIngredients,
      note: recipeNote
    }

    var recipes = LocalStorageModule.getItemFromLocalStorage('recipes') || [];
    recipes.push(recipe);

    LocalStorageModule.saveItemInLocalStorage('recipes', recipes);
    NavigationModule.replaceLocation('../recipes-list/recipes-list.html');
  }

  saveRecipeButton.addEventListener('click', saveRecipe);

})();
