export const state = {
    recipe:{},
}

export const loadRecipe = async function(id){
    try {
        const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
  
      const dataFetching = await res.json();
      const { data } = dataFetching;
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
  
      if (!res.ok) throw new Error(`${res.statusText}`);

    } catch (error) {
        alert("error here", error)
    }
    
  
}