'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: '阿禎',
        account: 'root',
        password: 'password',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user1',
        account: 'user1',
        password: 'password',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user2',
        account: 'user2',
        password: 'password',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
