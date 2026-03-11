const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserFavorite = sequelize.define(
    "UserFavorite",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "UserFavorites",
      timestamps: true,
    },
  );

  return UserFavorite;
};
