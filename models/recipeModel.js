const fs = require("fs");

async function getRecipes() {
  const data = await fs.promises.readFile("./data/recipes.json");
  return JSON.parse(data);
}
module.exports = { getRecipes };
