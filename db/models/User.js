const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    User.belongsToMany(models.Recipe, {
      through: models.UserFavorite,
      as: "favorites",
      foreignKey: "userId",
    });
  };
  return User;
};
