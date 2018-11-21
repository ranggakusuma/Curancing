'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat = sequelize.define('Cat', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    pic: DataTypes.STRING
  }, {});
  Cat.associate = function(models) {
    // associations can be defined here
    Cat.belongsTo(models.Type)
    Cat.belongsToMany(models.User, {through: models.Transaction})
  };
  return Cat;
};