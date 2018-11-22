'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [{
      name: 'Kucing Persia',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kucing Anggora',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kucing Maine Coon',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kucing Kampung',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kucing Himalaya',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kucing Shorthair',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Kucing Russian Blue',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    return queryInterface.bulkInsert('Types', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Types', null, {});
  }
};
