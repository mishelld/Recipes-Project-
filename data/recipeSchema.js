const recipeSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: "string",
      minLength: 10,
      maxLength: 500,
    },
    ingredients: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
    },
    instructions: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
    },
    cookingTime: {
      type: "number",
      exclusiveMinimum: 0,
    },
    servings: {
      type: "integer",
      exclusiveMinimum: 0,
    },
    difficulty: {
      type: "string",
      enum: ["easy", "medium", "hard"],
    },
  },
  required: [
    "title",
    "description",
    "ingredients",
    "instructions",
    "cookingTime",
    "servings",
    "difficulty",
  ],
  additionalProperties: false,
};

module.exports = { recipeSchema };
