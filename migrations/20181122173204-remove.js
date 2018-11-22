'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Transactions', 'noTrans')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Transactions', 'noTrans', {type: Sequelize.STRING})
  }
};
