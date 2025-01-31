'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StartUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StartUp.init({
    startUpName: DataTypes.STRING,
    founderName: DataTypes.STRING,
    dateFound: DataTypes.DATE,
    educationOfFounder: DataTypes.STRING,
    roleOfFounder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StartUp',
  });
  return StartUp;
};