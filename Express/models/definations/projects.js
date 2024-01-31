const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Projects extends Model {}

Projects.init(
  {
    projectId: {
      primaryKey: true,
      type: DataTypes.STRING(60),
    },
    projectTitle: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
      deadlineDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "projects",
  }
);

module.exports = Projects;
