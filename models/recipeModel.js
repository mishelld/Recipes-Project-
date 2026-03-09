const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../db/models");
const { Recipe } = require("../models");

async function getRecipes() {
  const [results, metadata] = await sequelize.query(`SELECT * FROM "Recipes";`);
  return results;
}

async function getRecipeById(id) {
  const recipes = await getRecipes();
  const recipe = recipes.find((r) => r.id === id);
  return recipe;
}

async function getRecipeById(id) {
  const [results] = await sequelize.query(
    `SELECT * FROM "Recipes" WHERE id = :id`,
    { replacements: { id } },
  );
  return results[0] || null;
}

async function addRecipe(newRecipe) {
  const query = `
    INSERT INTO "Recipes" 
      (title, description, ingredients, instructions, cookingTime, servings, difficulty, imageUrl, isPublic, "userId")
    VALUES 
      (:title, :description, :ingredients, :instructions, :cookingTime, :servings, :difficulty, :imageUrl, :isPublic, :userId)
    RETURNING *;
  `;

  const replacements = {
    title: newRecipe.title,
    description: newRecipe.description,
    ingredients: JSON.stringify(newRecipe.ingredients),
    instructions: JSON.stringify(newRecipe.instructions),
    cookingTime: newRecipe.cookingTime,
    servings: newRecipe.servings,
    difficulty: newRecipe.difficulty,
    imageUrl: newRecipe.imageUrl || null,
    isPublic: newRecipe.isPublic ?? true,
    userId: newRecipe.userId,
  };

  const [results] = await sequelize.query(query, { replacements });
  return results[0];
}

async function updateRecipe(id, updatedData) {
  const query = `
    UPDATE "Recipes"
    SET title = :title,
        description = :description,
        ingredients = :ingredients,
        instructions = :instructions,
        "cookingTime" = :cookingTime,
        servings = :servings,
        difficulty = :difficulty,
        "imageUrl" = :imageUrl,
        "isPublic" = :isPublic,
        "userId" = :userId,
        "updatedAt" = NOW()
    WHERE id = :id
    RETURNING *;
  `;

  const replacements = {
    id,
    title: updatedData.title,
    description: updatedData.description,
    ingredients: JSON.stringify(updatedData.ingredients),
    instructions: JSON.stringify(updatedData.instructions),
    cookingTime: updatedData.cookingTime,
    servings: updatedData.servings,
    difficulty: updatedData.difficulty,
    imageUrl: updatedData.imageUrl || null,
    isPublic: updatedData.isPublic ?? true,
    userId: updatedData.userId,
  };

  const [results] = await sequelize.query(query, { replacements });
  return results[0] || null;
}

async function deleteRecipe(id) {
  const query = `
    DELETE FROM "Recipes"
    WHERE id = :id
    RETURNING *;
  `;

  const [results] = await sequelize.query(query, { replacements: { id } });

  return results.length > 0;
}
async function getStatsRecipes() {
  const query = `
    SELECT 
      COUNT(*) AS "totalRecipes",
      COALESCE(AVG("cookingTime"), 0) AS "avgCookingTime",
      SUM(CASE WHEN difficulty = 'easy' THEN 1 ELSE 0 END) AS easy,
      SUM(CASE WHEN difficulty = 'medium' THEN 1 ELSE 0 END) AS medium,
      SUM(CASE WHEN difficulty = 'hard' THEN 1 ELSE 0 END) AS hard
    FROM "Recipes";
  `;

  const [results] = await sequelize.query(query);

  if (!results || results.length === 0) {
    return {
      totalRecipes: 0,
      avgCookingTime: 0,
      recipesByDifficulty: { easy: 0, medium: 0, hard: 0 },
    };
  }

  const row = results[0];
  return {
    totalRecipes: Number(row.totalRecipes),
    avgCookingTime: Number(row.avgCookingTime),
    recipesByDifficulty: {
      easy: Number(row.easy),
      medium: Number(row.medium),
      hard: Number(row.hard),
    },
  };
}

async function getRecipesByUser(userId) {
  const recipes = await Recipe.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });

  return recipes.map((r) => r.toJSON());
}

module.exports = {
  getRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getStatsRecipes,
  getRecipesByUser,
};
