'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 5,
        name: '阿禎',
        account: 'root',
        password: bcrypt.hashSync('passport', bcrypt.genSaltSync(10), null),
        role: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: 'user1',
        account: 'user1',
        password: bcrypt.hashSync('passport', bcrypt.genSaltSync(10), null),
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        name: 'user2',
        account: 'user2',
        password: bcrypt.hashSync('passport', bcrypt.genSaltSync(10), null),
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
