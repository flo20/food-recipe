import { API_URL, API_KEY } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
