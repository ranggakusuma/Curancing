  'use strict';
const hashedPassword = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUniqueUser(value) {
          return User.findOne({
            where: {
              username: value
            }
          })
            .then((data) => {
              if (data) {
                throw new Error ('Username telah digunakan')
              }
            }).catch((err) => {
              throw new Error (err)
            });
        }
      }
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail : {
          args: true,
          msg: 'email tidak Valid'
        },
        isUniqueEmail(value) {
          return User.findOne({
            where: {
              email: value
            }
          })
            .then((data) => {
              if (data) {
                throw new Error ('Email telah digunakan')
              }
            }).catch((err) => {
              throw new Error (err)
            });
        }
      }
    },
    gender: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Cat, {through: models.Transaction})
  };

  User.beforeCreate((user, options) => {
    user.password =  hashedPassword(user.password)
  });
  
  return User;
};