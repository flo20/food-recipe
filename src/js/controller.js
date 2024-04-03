import * as model from './model.js';
import 'core-js';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeViews.js';

const recipeContainer = document.querySelector('.recipe');



// Fetching and Loading data

const controlRecipe = async function () {
  //Loading spinner
  recipeView.renderSpinner();

  try {
    const id = window.location.hash.slice(1)
    console.log("id",id);

    await model.loadRecipe(id);
    //const {recipe} = model.state;

    if(!id) return;

    
    // Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (error) {
    alert(error);
  }
};


['hashchange', 'load'].forEach(ev => window.addEventListener(ev,controlRecipe))

