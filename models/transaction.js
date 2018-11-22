'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    CatId: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Cat)
  };

  Transaction.afterUpdate((transaction, options) => {
    sequelize.models.Cat.update({
      sold: 1
    }, {
      where: {
        id: transaction.CatId
      }
    })
      .then((data) => {
        console.log(data, '=-0=-0=-0=--0')
      }).catch((err) => {
        console.log(err)
      });
  })
  return Transaction;
};