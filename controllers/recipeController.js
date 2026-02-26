const { getRecipes } = require("../models/recipeModel");

async function getAllRecipes(req, res, next) {
  try {
    const recipes = await getRecipes();
    const { difficulty, maxCookingTime, search } = req.query;
    let filtered = recipes;
    if (difficulty) {
      filtered = recipes.filter((r) => r.difficulty === difficulty);
    }
    if (maxCookingTime) {
      filtered = recipes.filter((r) => r.maxCookingTime === maxCookingTime);
    }
    if (search) {
      filtered = recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase()),
      );
    }
    res.status(200).json(filtered);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllRecipes };
