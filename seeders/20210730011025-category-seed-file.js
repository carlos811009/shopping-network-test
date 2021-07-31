'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories',
      ['3C', '廚房用品', '衛浴用品', '美食', '舒壓小物']
        .map((item, index) =>
        ({
          id: index * 10 + 5,
          name: item,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        ), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
