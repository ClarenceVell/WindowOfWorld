'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.transaction, {
        as:"transaction",
        foreignKey: {
          name: "idUser"
        }
      })

      user.belongsToMany(models.book, {
        as:"book", 
        through: {
          model:"booklist",
          as: "bridge"
        },
        foreignKey: "idUser"
      })

    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    avatar: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};