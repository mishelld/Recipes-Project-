const express = require("express");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatsRecipes,
  getMyRecipes,
} = require("../controllers/recipeController");
const {
  Recipevalidater,
  RecipeUpdatevalidater,
} = require("../middlewares/recipeValidation");
const { checkRecipeOwnership } = require("../middlewares/checkRecipeOwnership");

router.get("/", getAllRecipes);
router.get("/stats", getStatsRecipes);
router.get("/my-recipes", authenticate, getMyRecipes);
router.get("/:id", getRecipeById);
router.post("/", authenticate, Recipevalidater, addRecipe);
router.put(
  "/:id",
  authenticate,
  checkRecipeOwnership,
  RecipeUpdatevalidater,
  updateRecipe,
);
router.delete("/:id", authenticate, checkRecipeOwnership, deleteRecipe);
module.exports = router;
