const express = require("express");
const { authenticate } = require("../middlewares/authenticate");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoriteController");

const router = express.Router();

router.post("/:recipeId", authenticate, addFavorite);
router.delete("/:recipeId", authenticate, removeFavorite);
router.get("/", authenticate, getFavorites);

module.exports = router;
