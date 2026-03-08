"use strict";

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`,
    );
    const recipes = await queryInterface.sequelize.query(
      `SELECT id FROM "Recipes";`,
    );

    const userIds = users[0];
    const recipeIds = recipes[0];

    await queryInterface.bulkInsert("UserFavorites", [
      {
        id: uuidv4(),
        userId: userIds[0].id,
        recipeId: recipeIds[1].id, // John favorites Jane's recipe
        createdAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: userIds[1].id,
        recipeId: recipeIds[0].id, // Jane favorites John's recipe
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserFavorites", null, {});
  },
};
