'use strict';
const hashPassword = require('../helpers/hashPassword')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      username: 'admin',
      password: hashPassword('admin'),
      name: 'Tatang',
      age: 23,
      address: 'Jalan setapak',
      email: 'tatangfindOne@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    return queryInterface.bulkInsert('Admins', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
