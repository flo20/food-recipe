import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksViews from './views/bookmarksViews.js';
import addRecipeView from './views/addRecipeView.js';

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

    resultsView.update(model.getSearchResultsPage());
    bookmarksViews.update(model.state.bookmarks);

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

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

controlSearchResults();

const controlPagination = function (goToPage) {
  //render new results when button is clicked
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render new pagination buttons after button is clicked
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update recipe servings in state
  model.updateServings(newServings);

  //update recipe view
  recipeView.update(model.state.recipe);
};

const controlBookMarks = function () {
  bookmarksViews.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksViews.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};

const init = function () {
  addRecipeView.addHandlerUpload(controlAddRecipe);
  bookmarksViews.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerBookmarkClick(controlAddBookmark);
};

init();
