const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatsRecipes,
} = require("../controllers/recipeController");
const {
  Recipevalidater,
  RecipeUpdatevalidater,
} = require("../middlewares/recipeValidation");

router.get("/", getAllRecipes);
router.get("/stats", getStatsRecipes);
router.get("/:id", getRecipeById);
router.post("/", Recipevalidater, addRecipe);
router.put("/:id", RecipeUpdatevalidater, updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
