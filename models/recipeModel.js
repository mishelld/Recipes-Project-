const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
async function getRecipes() {
  const data = await fs.promises.readFile("./data/recipes.json");
  return JSON.parse(data);
}

async function getRecipeById(id) {
  const recipes = await getRecipes();
  const recipe = recipes.find((r) => r.id === id);
  return recipe;
}

async function addRecipe(newRecipe) {
  newRecipe.createdAt = new Date().toISOString();
  newRecipe.id = uuidv4();

  const recipes = await getRecipes();
  recipes.push(newRecipe);
  await fs.promises.writeFile("./data/recipes.json", JSON.stringify(recipes));
  return newRecipe;
}

async function updateRecipe(id, updatedData) {
  const recipes = await getRecipes();
  let index = recipes.findIndex((r) => r.id === id);
  if (index === -1) {
    return null;
  }
  recipes[index] = { ...recipes[index], ...updatedData };
  await fs.promises.writeFile("./data/recipes.json", JSON.stringify(recipes));
  return recipes[index];
}

async function deleteRecipe(id) {
  const recipes = await getRecipes();
  const updatedRecipes = recipes.filter((r) => r.id !== id);
  if (updatedRecipes.length === recipes.length) {
    return false;
  }
  await fs.promises.writeFile(
    "./data/recipes.json",
    JSON.stringify(updatedRecipes),
  );
  return true;
}
async function getStatsRecipes() {
  const recipes = await getRecipes();
  const totalRecipes = recipes.length;
  if (totalRecipes === 0) {
    return {
      totalRecipes: 0,
      avgCookingTime: 0,
      recipesByDifficulty: { easy: 0, medium: 0, hard: 0 },
    };
  }
  const avgCookingTime =
    recipes.reduce((sum, r) => sum + r.cookingTime, 0) / totalRecipes;

  const recipesByDifficulty = recipes.reduce(
    (acc, r) => {
      acc[r.difficulty] = (acc[r.difficulty] || 0) + 1;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 },
  );
  return {
    totalRecipes,
    avgCookingTime,
    recipesByDifficulty,
  };
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatsRecipes,
};
