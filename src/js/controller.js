import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

//const recipeContainer = document.querySelector('.recipe');

// Fetching and Loading data

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    //Loading spinner
    if (!id) return;
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //Loading spinner

    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (error) {
    resultsView.renderError();
  }
};

controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
