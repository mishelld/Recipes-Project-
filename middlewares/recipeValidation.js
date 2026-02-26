const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { recipeSchema } = require("../data/recipeSchema");
const { updateRecipeSchema } = require("../data/updateRecipeSchema");

const ajv = new Ajv();
addFormats(ajv);
const validateRecipe = ajv.compile(recipeSchema);
const validateRecipeUpdate = ajv.compile(updateRecipeSchema);

function Recipevalidater(req, res, next) {
  const recipe = req.body;
  const valid = validateRecipe(recipe);
  if (valid) {
    next();
  } else {
    const error = new Error("Recipe Validation Error");
    error.statusCode = 400;
    error.message = validateRecipe.errors[0].message;
    next(error);
  }
}
function RecipeUpdatevalidater(req, res, next) {
  const recipe = req.body;
  const valid = validateRecipeUpdate(recipe);
  if (valid) {
    next();
  } else {
    const error = new Error("Recipe Validation Error");
    error.statusCode = 400;
    error.message = validateRecipeUpdate.errors[0].message;
    next(error);
  }
}

module.exports = { Recipevalidater, RecipeUpdatevalidater };
