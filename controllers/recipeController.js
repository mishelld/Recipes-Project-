const recipesModel = require("../models/recipeModel");

async function getAllRecipes(req, res, next) {
  try {
    const recipes = await recipesModel.getRecipes();
    const { difficulty, maxCookingTime, search } = req.query;
    let filtered = recipes;
    if (difficulty) {
      filtered = filtered.filter((r) => r.difficulty === difficulty);
    }
    if (maxCookingTime) {
      filtered = filtered.filter(
        (r) => r.cookingTime <= Number(maxCookingTime),
      );
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
    error.statusCode = error.statusCode || 500;
    next(error);
  }
}

async function getRecipeById(req, res, next) {
  try {
    const recipeId = req.params.id;
    const recipe = await recipesModel.getRecipeById(recipeId);
    if (!recipe) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
}

async function addRecipe(req, res, next) {
  try {
    const newRecipeDraft = req.body;
    const newRecipe = await recipesModel.addRecipe(newRecipeDraft);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
}

async function updateRecipe(req, res, next) {
  try {
    const id = req.params.id;
    const RecipeDraft = req.body;
    const newRecipe = await recipesModel.updateRecipe(id, RecipeDraft);
    if (!newRecipe) {
      const error = new Error("Recipe not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(newRecipe);
  } catch (error) {
    next(error);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    const id = req.params.id;
    const deleted = await recipesModel.deleteRecipe(id);
    if (!deleted) {
      const error = new Error("failed to delete recipe");
      error.statusCode = 404;
      return next(error);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
async function getStatsRecipes(req, res, next) {
  try {
    const stats = await recipesModel.getStatsRecipes();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
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
