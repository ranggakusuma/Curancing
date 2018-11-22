'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cat = sequelize.define('Cat', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    TypeId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    pic: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Cat.associate = function(models) {
    // associations can be defined here
    Cat.belongsTo(models.Type)
    Cat.belongsToMany(models.User, {through: models.Transaction})
  };

  Cat.prototype.getPrice = function() {
    let num = this.price
    var array = num.toString().split('');
    var index = -3;
    while (array.length + index > 0) {
        array.splice(index, 0, ',');
        // Decrement by 4 since we just added another unit to the array.
        index -= 4;
    }
    return 'RP. '+array.join('');
  }
  return Cat;
};