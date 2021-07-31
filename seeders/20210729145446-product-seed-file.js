'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products',
      Array.from({ length: 50 }).map(d =>
      ({
        name: faker.commerce.productName(),
        image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        CategoryId: 5 + 10 * Math.floor(Math.random() * 5),
        createdAt: new Date(),
        updatedAt: new Date() // 加逗點
      })), {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
