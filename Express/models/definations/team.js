const {Model, DataTypes} = require ("sequelize");
const sequelize = require ("../../bin/dbConnection")

class Team extends Model {}

Team.init({
    teamsId: {
        primaryKey: true,
        type: DataTypes.STRING(60),
    },
    title: {
        type: DataTypes.STRING(60),
        allowNull: true,
        },
    teamsLeaderId: {
        type: DataTypes.STRING(60),
        allowNull: false,
        }
},{
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "Team"
})

module.exports = Team;