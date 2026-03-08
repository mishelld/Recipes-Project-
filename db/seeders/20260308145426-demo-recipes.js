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
    const userIds = users[0];

    await queryInterface.bulkInsert("Recipes", [
      {
        id: uuidv4(),
        title: "Spaghetti Bolognese",
        description: "Classic Italian pasta dish.",
        ingredients: JSON.stringify([
          "spaghetti",
          "tomato",
          "beef",
          "onion",
          "garlic",
        ]),
        instructions: JSON.stringify([
          "Boil pasta",
          "Cook sauce",
          "Mix together",
        ]),
        cookingTime: 30,
        servings: 4,
        difficulty: "easy",
        imageUrl: "spaghetti.jpg",
        isPublic: true,
        userId: userIds[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: "Chicken Curry",
        description: "Spicy and creamy.",
        ingredients: JSON.stringify([
          "chicken",
          "curry powder",
          "onion",
          "cream",
        ]),
        instructions: JSON.stringify([
          "Cook chicken",
          "Add spices",
          "Simmer with cream",
        ]),
        cookingTime: 45,
        servings: 4,
        difficulty: "medium",
        imageUrl: "chicken_curry.jpg",
        isPublic: true,
        userId: userIds[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Recipes", null, {});
  },
};
