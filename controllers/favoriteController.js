const favoritesModel = require("../models/favoritesModel");

async function addFavorite(req, res, next) {
  try {
    const userId = req.user.id;
    const recipeId = req.params.recipeId;

    const favorite = await favoritesModel.addFavorite(userId, recipeId);

    res.status(201).json({
      success: true,
      status: 201,
      message: "Recipe added to favorites",
      favorite,
    });
  } catch (err) {
    next({ status: err.status || 500, message: err.message });
  }
}

async function removeFavorite(req, res, next) {
  try {
    const userId = req.user.id;
    const recipeId = req.params.recipeId;

    await favoritesModel.removeFavorite(userId, recipeId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Recipe removed from favorites",
    });
  } catch (err) {
    next({ status: err.status || 500, message: err.message });
  }
}

async function getFavorites(req, res, next) {
  try {
    const userId = req.user.id;
    const favorites = await favoritesModel.getFavorites(userId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "User favorites retrieved successfully",
      favorites,
    });
  } catch (err) {
    next({ status: 500, message: err.message });
  }
}

module.exports = { addFavorite, removeFavorite, getFavorites };
