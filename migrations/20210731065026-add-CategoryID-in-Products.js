'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'CategoryId',
      { type: Sequelize.INTEGER });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products');
  }
};
