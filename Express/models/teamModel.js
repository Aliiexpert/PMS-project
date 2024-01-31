
const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    // createTeam: async (body, teamsId) => {
    //     try {
    //         const teams = await models.Team.create({
    //             teamsId,
    //             ...body
    //         })
    //         return {
    //             response: teams,
    //         };


    //     } catch (error) {
    //         return {
    //             error: error,
    //         };
    //     }

    // },

    createTeam: async (body, teamsId, membersArray) => {
        try {
            console.log("ahm", body, teamsId, membersArray)

            const iterations = 1;

            // const project = await models.Projects.update(
            //     {
            //         projectTag: 'Assigned',
            //         status: 'Pending'
            //     },
            //     {
            //         where: {
            //             projectId: body.projectId,
            //         }
            //     }
            // );
            // Create the team
            console.log("teamleaderid",body.teamsLeaderId)

            const teams = await models.Team.create({
                teamsId,
                title:body.title,

                teamsLeaderId: body.teamsLeaderId,
                userId: body.userId,
                projectId: body.projectId,
                instructorId: body.instructorId
            });
            console.log("check1", teams)
            // Update project status

            // console.log("check2", project)

            // Associate other members with the team
            if (membersArray && membersArray.length > 0) {
                const TeamMembers = await models.TeamMembers.bulkCreate(
                    membersArray.map(member => ({
                        teamsMemberId: member.teamsMemberId,
                        teamId: teams.teamsId,
                        userId: member.userId,
                        // ... any other fields
                    }))

                );
                console.log("check 3", TeamMembers)

            }
            return {
                response: teams,
            };
        } catch (error) {
            // If there's an error, attempt to undo changes

            return {
                error: error,
            };
        }
    },
    
    getTeamById: async (teamLeader) => {
        try {
            // Fetch user details from the Users table
            console.log("teamLeader", teamLeader)
            const user = await models.Users.findOne({
                where: {
                    userId: teamLeader  // Assuming teamLeaderId corresponds to id in the Users table
                },
                attributes: ['firstName', 'lastName']  // Specify the attributes you want from the Users table
            });

            // // Fetch project details from the Projects table
            // const project = await models.Projects.findOne({
            //     where: {
            //         projectId: projectId
            //     },
            //     attributes: ['projectTitle']  // Specify the attributes you want from the Projects table
            // });

console.log("check",user)
            return {
                response: {
                    userName: user ? user.firstName + " " + user.lastName : null,
                    // projectTitle: project ? project.projectTitle : null
                }
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    }
    ,
    getUserByEmail: async (userId) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    
    getAllTeams: async (query) => {
        try {
            // console.log("model", offset, query)
            const teams = await models.Team.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    instructorId: query.instructorId
                }
            })
            return {
                response: teams,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    deleteUser: async (userId) => {
        try {
            const user = await models.Users.destroy({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    updateTeam: async (body) => {
        try {
            const teams = await models.Team.update({
                ...body
            }, {
                where: {

                    teamsId: body.teamsId,
                }
            })
            return {
                response: teams,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },



    getAllRequests: async (query) => {
        try {
            const user = await models.Users.findAll({
                where: [
                    {
                        instrucorId: query.instrucorId
                    },
                    {
                        isRequested: true,
                        isApproved: false,
                        isBlocked: false
                    },
                ]
                
            });
            return {
                response: user,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getTotalTeams: async (query) => {
        console.log("check1", query)
        try {
          const teams = await models.Team.findAll({
              where: {
                instructorId: query,
              },
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
          });
          console.log(teams)
          const totalTeams = teams.length;
      
          return {
            response: {
                totalTeams: totalTeams,
              teamsList: teams,
            },
          };
      
        } catch (error) {
          return {
            error: error,
          };
        }
      },
      createTeamMembers: async (body, teamsMemberId) => {
        try {
            const teamsMember = await models.TeamMembers.create({
                teamsMemberId,
                ...body
            })
            return {
                response: teamsMember,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getMemberById: async (teammembers) => {
        try {
            let memberDetails = [];
            console.log("teammebers", teammembers.response.length)
            // Assuming teammembers.response is an array of objects

            for (let i = 0; i < teammembers.response.length; i++) {
                console.log(teammembers.response[i].dataValues.userId)
                // console.log("mmm", member);

                const userDetails = await models.Users.findOne({
                    where: {
                        userId: teammembers.response[i].dataValues.userId
                    },
                    attributes: ['firstName', 'lastName']
                });
                if (userDetails) {
                    console.log(userDetails.firstName)
                    memberDetails.push({
                        userId: teammembers.response[i].dataValues.userId,
                        firstName: userDetails.firstName,
                        lastName: userDetails.lastName
                    });
                }

            }


            return {
                response: memberDetails
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getAllMembers: async (query) => {
        try {
            // Step 1: Fetch all trainees from the Users table
            const trainees = await models.Users.findAll({
                where: {
                    role: 'trainee',
                    isBlocked: 'false',
                    isApproved: 'true',
                    instructorId: query.instructorId
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                }
            });

            // Step 2: Extract all userIds from the trainees
            const userIds = [];
            for (let i = 0; i < trainees.length; i++) {
                userIds.push(trainees[i].userId);
            }

            // Step 3: Fetch all userIds from the teamMembers table
            const teamMembers = await models.TeamMembers.findAll({
                where: {
                    userId: userIds
                },
                attributes: ['userId']
            });

            // Step 4: Extract all userIds from the teamMembers
            const teamMemberUserIds = [];
            for (let i = 0; i < teamMembers.length; i++) {
                teamMemberUserIds.push(teamMembers[i].userId);
            }

            // Step 5: Filter out the trainees whose userId exists in the teamMemberUserIds
            const filteredTrainees = [];
            for (let i = 0; i < trainees.length; i++) {
                if (!teamMemberUserIds.includes(trainees[i].userId)) {
                    filteredTrainees.push(trainees[i]);
                }
            }

            return {
                response: filteredTrainees,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },


    updateTeamsMember: async (body) => {
        try {
            const teamsMember = await models.TeamMembers.update({
                ...body
            }, {
                where: {

                    teamsId: body.teamsMemberId,
                }
            })
            return {
                response: teamsMember,
            };
        } catch (error) {
            return {
                error: error,
            };
        }

    },
getTeamByProjectId: async (query) => {
        try {
            console.log(query);

            const Projects = await models.Projects.findOne({
                where: {
                    projectId: query.projectId
                },
                attributes: ['teamId']
            });
        

            console.log("teams response", Projects.dataValues.teamId);

            const teamMembers = await models.TeamMembers.findAll({
                where: {
                    teamId: Projects.dataValues.teamId
                },
                attributes: ['teamsMemberId', 'userId']
            });

            const userResponses = [];

            for (let i = 0; i < teamMembers.length; i++) {
                console.log(teamMembers[i].dataValues.userId);

                const userMembers = await models.Users.findOne({
                    where: {
                        userId: teamMembers[i].dataValues.userId
                    },
                    attributes: ['firstName', 'lastName']
                });

                userResponses.push({
                    teamMemberId: teamMembers[i].dataValues.teamsMemberId,
                    firstName: userMembers.dataValues.firstName,
                    lastName: userMembers.dataValues.lastName
                });

                console.log(userMembers);
            }

            // Assuming you are using Express.js



            // memberDetails.push({
            //     userId: teammembers.response[i].dataValues.userId,
            //     firstName: userDetails.firstName,
            //     lastName: userDetails.lastName
            // });





            return {
                response: userResponses
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },
    getTeamMembers: async (query) => {
        try {

            const teamMembers = await models.TeamMembers.findAll({
                where: {
                    teamId: query.teamsId
                },
                attributes: ['userId', 'teamsMemberId']
            });
            console.log("model", teamMembers)
            return {
                response: teamMembers,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },
};