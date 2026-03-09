const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },

    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  },
  {
    tableName: "Users",
    timestamps: true,
  },
);

User.associate = (models) => {
  // Many-to-Many with Recipe
  User.belongsToMany(models.Recipe, {
    through: "UserFavorites",
    as: "favorites",
    foreignKey: "userId",
  });
};

module.exports = User;
