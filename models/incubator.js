"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Incubator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.StartUp, { foreignKey: "IncubatorId" });
    }
  }
  Incubator.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      location: DataTypes.STRING,
      level: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          const levelMapping = {
            International: "1992-A",
            National: "1994-B",
            Province: "1996-C",
          };

          const categoryCode = levelMapping[instance.level];

          const timestamp = new Date().getTime();

          instance.code = `${categoryCode}-${timestamp}`;
          console.log(instance, "---- instancenyaa");
        },
      },
      sequelize,
      modelName: "Incubator",
    }
  );
  return Incubator;
};
