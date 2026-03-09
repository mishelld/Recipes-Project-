const { User, Recipe } = require("../models");

async function addFavorite(userId, recipeId) {
  const user = await User.findByPk(userId);
  const recipe = await Recipe.findByPk(recipeId);

  if (!user || !recipe)
    throw { status: 404, message: "User or Recipe not found" };

  await user.addFavorite(recipe);

  return { recipeId };
}

async function removeFavorite(userId, recipeId) {
  const user = await User.findByPk(userId);
  const recipe = await Recipe.findByPk(recipeId);

  if (!user || !recipe)
    throw { status: 404, message: "User or Recipe not found" };

  await user.removeFavorite(recipe);

  return true;
}

async function getFavorites(userId) {
  const user = await User.findByPk(userId, { include: "favorites" });
  if (!user) throw { status: 404, message: "User not found" };

  return user.favorites.map((f) => f.toJSON());
}

module.exports = { addFavorite, removeFavorite, getFavorites };
