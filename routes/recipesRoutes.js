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
  validateRecipe,
  validateRecipeUpdate,
} = require("../middlewares/recipeValidation");

router.get("/", getAllRecipes);
router.get("/stats", getStatsRecipes);
router.get("/:id", getRecipeById);
router.post("/", validateRecipe, addRecipe);
router.put("/:id", validateRecipeUpdate, updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
