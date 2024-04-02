import * as model from './model.js';
import 'core-js';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeViews.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


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

