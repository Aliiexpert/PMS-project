const sequelize = require ("../bin/dbConnection");
const Users = require("./definations/users");
const Team = require("./definations/team");
const Projects = require("./definations/projects");
const Tasks = require("./definations/tasks");
const TeamMembers = require("./definations/teamMembers");
const Sessions = require("./definations/sessions")


const models = { Sessions, Users, Projects, Team, Tasks, TeamMembers };


Users.hasMany(TeamMembers, { foreignKey: 'userId', onDelete: "CASCADE" });
TeamMembers.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE" });

Users.hasMany(Projects, { foreignKey: 'instructorId', onDelete: "CASCADE" });
Projects.belongsTo(Users, { foreignKey: 'instructorId', onDelete: "CASCADE" });

Team.hasMany(TeamMembers, { foreignKey: 'teamId', onDelete: "CASCADE" });
TeamMembers.belongsTo(Team, { foreignKey: 'teamId', onDelete: "CASCADE" });

Team.hasOne(Projects, { foreignKey: 'teamId', onDelete: "CASCADE" });
Projects.belongsTo(Team, { foreignKey: 'teamId', onDelete: "CASCADE" });

Projects.hasOne(Team, { foreignKey: 'projectId', onDelete: "CASCADE" });
Team.belongsTo(Projects, { foreignKey: 'projectId', onDelete: "CASCADE" });

Users.hasOne(Sessions, { foreignKey: 'userId', onDelete: "CASCADE" });
Sessions.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE" });

Projects.hasMany(Tasks, { foreignKey: 'projectId', onDelete: "CASCADE" });
Tasks.belongsTo(Projects, { foreignKey: 'projectId', onDelete: "CASCADE" });

TeamMembers.hasMany(Tasks, { foreignKey: 'teamMemberId', onDelete: "CASCADE" });
Tasks.belongsTo(TeamMembers, { foreignKey: 'teamMemberId', onDelete: "CASCADE" });

Users.hasMany(Tasks, { foreignKey: 'instructorId', onDelete: "CASCADE" });
Tasks.belongsTo(Users, { foreignKey: 'instructorId', onDelete: "CASCADE" });


Users.hasMany(Team, { foreignKey: 'instructorId' });
Team.belongsTo(Users, { foreignKey: 'instructorId' });

Users.hasMany(Users, {
    foreignKey: "instructorId",
    useJunctionTable: false,
});


const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models }