const recipesModel = require("../models/recipeModel");

async function getAllRecipes(req, res) {
  try {
    const recipes = await recipesModel.getRecipes();
    const { difficulty, maxCookingTime, search } = req.query;
    let filtered = recipes;
    if (difficulty) {
      filtered = filtered.filter((r) => r.difficulty === difficulty);
    }
    if (maxCookingTime) {
      filtered = filtered.filter((r) => r.cookingTime === maxCookingTime);
    }
    if (search) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase()),
      );
    }
    res.status(200).json(filtered);
  } catch (error) {
    throw { ...error, status: error.status || 500 };
  }
}

async function getRecipeById(req, res) {
  const recipeId = req.params.id;
  const recipe = await recipesModel.getRecipeById(recipeId);
  if (!recipe) {
    throw { ...new Error("recipe not found"), status: 404 };
  }
  res.status(200).json(recipe);
}

async function addRecipe(req, res) {
  const newRecipeDraft = req.body;
  const newRecipe = await recipesModel.addRecipe(newRecipeDraft);
  res.status(201).json(newRecipe);
}

async function updateRecipe(req, res) {
  const id = req.params.id;
  const RecipeDraft = req.body;
  const newRecipe = await recipesModel.updateRecipe(id, RecipeDraft);
  res.status(201).json(newRecipe);
}

async function deleteRecipe(req, res) {
  try {
    const id = req.params.id;
    const deleted = await recipesModel.deleteRecipe(id);
    if (!deleted) {
      throw { ...new Error("failed to delete recipe"), status: 404 };
    }
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
}
async function getStatsRecipes(req, res) {
  try {
    const stats = await recipesModel.getStatsRecipes();
    res.status(200).json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
}
module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatsRecipes,
};
