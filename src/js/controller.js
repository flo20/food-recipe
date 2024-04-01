const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=0e9551ed-f542-4f78-9e10-e9cf108846e2'
    );

    const dataFetching = await res.json();
    const { data } = dataFetching;

    if (!res.ok) throw new Error(`${res.statusText}`);
  } catch (error) {
    alert(error);
  }
};

showRecipe();
