"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StartUp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Incubator, {
        foreignKey: "IncubatorId",
      });
    }
    get age() {
      // if (!this.dateFound) return null;
      const currentYear = new Date().getFullYear();
      const foundYear = new Date(this.dateFound).getFullYear();
      return currentYear - foundYear;
    }

    static async startUpFilterData(role) {
      const options = {
        include: {
          model: sequelize.models.Incubator,
          attributes: ["code"],
        },
      };

      if (role) {
        options.where = { roleOfFounder: role };
      }

      options.attributes = [
        "id",
        "startUpName",
        "founderName",
        "roleOfFounder",
        "IncubatorId",
        "dateFound",
        "valuation",
      ];

      return await this.findAll(options);
    }
  }

  StartUp.init(
    {
      startUpName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "StartUp name cannot be empty",
          },
          notNull: {
            msg: "StartUp name cannot be empty",
          },
        },
      },
      founderName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Founder name cannot be empty",
          },
          notNull: {
            msg: "Founder name cannot be empty",
          },
        },
      },
      dateFound: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Date Found must be a valid date",
          },
          isAtLeastFiveYears(value) {
            const currentDate = new Date();
            const fiveYearsAgo = new Date(
              currentDate.getFullYear() - 5,
              currentDate.getMonth(),
              currentDate.getDate()
            );
            if (new Date(value) > fiveYearsAgo) {
              throw new Error("The startup must be at least 5 years old");
            }
          },
        },
      },
      educationOfFounder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Education of Founder cannot be empty",
          },
          notNull: {
            msg: "Education of Founder cannot be empty",
          },
        },
      },
      roleOfFounder: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role of Founder cannot be empty",
          },
          notNull: {
            msg: "Role of Founder cannot be empty",
          },
          isHustler(value) {
            if (
              value === "Hustler" &&
              !["S2", "S3"].includes(this.educationOfFounder)
            ) {
              throw new Error("Hustler role requires at least S2 education");
            }
          },
        },
      },
      IncubatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "IncubatorId cannot be empty",
          },
          notNull: {
            msg: "IncubatorId cannot be empty",
          },
        },
      },
      valuation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StartUp",
    }
  );
  return StartUp;
};
