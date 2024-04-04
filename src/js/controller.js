import * as model from './model.js';
import 'core-js';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const recipeContainer = document.querySelector('.recipe');



// Fetching and Loading data

const controlRecipe = async function () {
 

  try {
    const id = window.location.hash.slice(1)

    await model.loadRecipe(id);
    //const {recipe} = model.state;

    //Loading spinner
    if(!id) return;
    recipeView.renderSpinner();

    
    // Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (error) {
    recipeView.renderError(error)
  }
};

const controlSearchResults = async function () {
  try {
  

  const query = searchView.getQuery();
  if(!query) return;
  //Loading spinner
  resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.results)
    
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