const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../db/models");
const { Recipe } = require("../db/models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function getRecipes() {
  const [results, metadata] = await sequelize.query(`SELECT * FROM "Recipes";`);
  console.log(results);
  return results;
}

async function getRecipeById(id) {
  const [results] = await sequelize.query(
    `SELECT * FROM "Recipes" WHERE id = :id`,
    { replacements: { id } },
  );
  return results[0] || null;
}

async function addRecipe(newRecipe, userId, filePath) {
  let cloudinaryURL = null;
  if (filePath) {
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath);
      cloudinaryURL = uploadResult.url;
    } finally {
      fs.promises.unlink(filePath);
    }
  }

  const createdRecipe = await Recipe.create({
    ...newRecipe,
    userId,
    imageUrl: cloudinaryURL,
    isPublic: newRecipe.isPublic ?? true,
  });
  return createdRecipe;
}
async function updateRecipe(id, updatedData) {
  const { id: _, userId: __, createdAt: ___, ...data } = updatedData;
  const [rowsUpdated, [updatedRecipe]] = await Recipe.update(data, {
    where: { id },
    returning: true,
  });

  return rowsUpdated ? updatedRecipe : null;
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
