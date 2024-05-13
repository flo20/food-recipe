import { API_URL, API_KEY, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const res = await getJSON(`${API_URL}${id}`);
    const { data } = res;
    const { recipe } = data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      cooking_time: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      source_url: recipe.source_url,
      image: recipe.image,
    };
  } catch (error) {
    throw error;
  }
};
export const loadSearchResults = async function (query) {
  try {
    const res = await getJSON(`${API_URL}?search=${query}?key=${API_KEY}`);
    const { data } = res;
    const { recipes } = data;
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
