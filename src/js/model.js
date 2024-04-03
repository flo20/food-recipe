import {API_URL} from "./config.js"
import { getJSON } from "./helper.js";

export const state = {
    recipe:{},
}

export const loadRecipe = async function(id){
    try {
        const res = await getJSON(
        `${API_URL}${id}`
      );
      const { data } = res;
      const { recipe } = data;
      state.recipe = {
        id:recipe.id,
        title:recipe.title,
        cooking_time:recipe.cooking_time,
        servings:recipe.servings,
        ingredients:recipe.ingredients,
        publisher:recipe.publisher,
        source_url:recipe.source_url,
        image:recipe.image
      }
  
    } catch (error) {
        console.error(error)
    }
    
  
}