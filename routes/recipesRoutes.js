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

router.get("/", getAllRecipes);
router.get("/stats", getStatsRecipes);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
