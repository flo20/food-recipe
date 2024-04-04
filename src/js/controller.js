import * as model from './model.js';
import 'core-js';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');



// Fetching and Loading data

const controlRecipe = async function () {
  //Loading spinner
  recipeView.renderSpinner();

  try {
    const id = window.location.hash.slice(1)

    await model.loadRecipe(id);
    //const {recipe} = model.state;

    if(!id) return;

    
    // Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (error) {
    recipeView.renderError(error)
  }
};

const controlSearchResults = async function () {
  // //Loading spinner
  // recipeView.renderSpinner();
  const query = searchView.getQuery();
  if(!query) return;

  try {
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    
  } catch (error) {
    recipeView.renderError(error)
  }
};

controlSearchResults()

const init = function (){
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
}

init()