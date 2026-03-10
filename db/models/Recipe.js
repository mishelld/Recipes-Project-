const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Recipe = sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      cookingTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      servings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.ENUM("easy", "medium", "hard"),
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "Recipes",
      timestamps: true,
    },
  );

  Recipe.associate = (models) => {
    Recipe.belongsToMany(models.User, {
      through: "UserFavorites",
      as: "favoritedBy",
      foreignKey: "recipeId",
    });
  };
  return Recipe;
};
