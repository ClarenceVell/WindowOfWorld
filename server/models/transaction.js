'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser"
        }
      })

    }
  }
  transaction.init({
    transferProof: DataTypes.STRING,
    remainingActive: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userStatus: {
      type: DataTypes.STRING,
      defaultValue: "Not Active"
    },
    paymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "Pending"
    },
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};