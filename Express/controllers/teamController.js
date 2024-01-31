const teamService = require("../services/teamService");
const joi = require("joi");



const createTeamSchema = joi.object().keys({
    teamsLeaderId: joi.string().required(),
    title:joi.string().required(),
    projectId: joi.string(),
    userId: joi.array().items(joi.string().uuid()).required(),
    instructorId: joi.string().required(),
})

const createTeamMembersSchema = joi.object().keys({
    teamsMemberId: joi.string().min(3).max(60),
    UsersId: joi.string().required().min(3).max(60),
    TeamsId: joi.string().required().min(3).max(60),

})

const updateTeamsMemberSchema = joi.object().keys({
    teamsMemberId: joi.string().required().min(3).max(60),
    userId: joi.string().required().min(3).max(60),
    teamsId: joi.string().min(3).max(60),
      
  })


const updateTeamSchema = joi.object().keys({
  teamsId:joi.string().required(),
    teamsLeader: joi.string().min(3).max(60),
    title: joi.string().min(3).max(60),
    instructorId: joi.string().min(3).max(60),
    
})

const TeamMemberpaginationSchema = joi.object().keys({
    pageNo: joi.number().greater(0).default(1),
    limit: joi.number().valid(5, 10).default(5),
    sortValue: joi
        .string()
        .default("teamsMemberId"),
    sortOrder: joi.valid("ASC", "DESC").default("ASC"),
    teamsMemberId: joi.string(),
})

const paginationSchema = joi.object().keys({
    pageNo: joi.number().greater(0).default(1),
    limit: joi.number().valid(5, 10).default(5),
    sortValue: joi
        .string()
        .default("title"),
    sortOrder: joi.valid("ASC", "DESC").default("ASC"),
    title: joi.string(),

})
const getTeamByProjectId = joi.object().keys({
    projectId: joi.string().required()
})

module.exports = {
    createTeam: async (req, res) => {
        try {
            console.log("body here", req.body)

            const validate = await createTeamSchema.validateAsync(req.body);
            console.log("here", validate)
            const team = await teamService.createTeam(validate);
            if (team.error) {
                return res.send({
                    error: team.error,
                });

            }
            return res.send({
                response: team.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

    getAllTeams: async (req, res) => {
        console.log(("controler",req.query))
        try {
            // const validate = await paginationSchema.validateAsync(req.query);
            const teams = await teamService.getAllTeams(req.query);
            if (teams.error) {
                return res.send({
                    error: teams.error,
                });
            }
            return res.send({
                response: teams.response,
            });
        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },


    updateTeam: async (req, res) => {
        try {
            const validate = await updateTeamSchema.validateAsync(req.body);

            const teams = await teamService.updateTeam(validate);
            console.log("user=====", validate)
            if (teams.error) {
                return res.send({
                    error: teams.error,
                });
            }
            return res.send({
                response: teams.response,
            });
        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },


    getAllRequests: async (req, res) => {
        try {


            const users = await teamService.getAllRequests(req.query);

            if (users.error) {
                return res.send({
                    error: users.error,
                });

            }
            return res.send({
                response: users.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getTotalTeam: async (req, res) => {
        try {
            const teams = await teamService.getTotalTeams(req.query);
          if (teams.error) {
            return res.send({
              error: teams.error,
            });
          }
          return res.send({
            response: teams.response.totalTeams,
          });
        } catch (error) {
          return res.send({
            error: error,
          });
        }},
        getTeamByProjectId: async (req, res) => {
            try {
                console.log("check1",req.query)
                const validate = await getTeamByProjectId.validateAsync(req.query);
                console.log("check2", validate)
    
                const members = await teamService.getTeamByProjectId(validate);
                // console.log("check3", members)
                if (members.error) {
                    return res.send({
                        error: members.error,
                    });
    
                }
                return res.send({
                    response: members.response,
                });
            }
            catch (error) {
                return res.send({
                    error: error
                });
            };
        },
        createTeamMembers: async (req, res) => {
            try {
                const validate = await createTeamMembersSchema.validateAsync(req.body);
                console.log("req.body", req.body)
                const teamMembers = await teamService.createTeamMembers(validate);
                if (teamMembers.error) {
                    return res.send({
                        error: teamMembers.error,
                    });
                }
                return res.send({
                    response: teamMembers.response,
                });
            }
            catch (error) {
                return res.send({
                    error: error
                });
            };
        },

        getAllMembers: async (req, res) => {
            try {
                // const validate = await getMembersSchema.validateAsync(req.query);
                const members = await teamService.getAllMembers(req.query);
                console.log("query here                  ", req.query)
                if (members.error) {
                    return res.send({
                        error: members.error,
                    });
    
                }
                return res.send({
                    response: members.response,
                });
    
            }
            catch (error) {
                return res.send({
                    error: error
                });
            };
        },
    
    
        updateTeamsMember: async (req, res) => {
            try {
                const validate = await updateTeamsMemberSchema.validateAsync(req.body);
    
                const teamsMember = await teamService.updateTeam(validate);
                console.log("user=====", teamsMember)
                if (teamsMember.error) {
                    return res.send({
                        error: teamsMember.error,
                    });
                }
                return res.send({
                    response: teamsMember.response,
                });
            }
            catch (error) {
                return res.send({
                    error: error
                });
            };
        },
        getTeamMembers: async (req, res) => {
            try {
                const validate = await getByTeamIdSchema.validateAsync(req.query);
                const members = await teamService.getTeamMembers(validate);
                if (members.error) {
                    return res.send({
                        error: members.error,
                    });
    
                }
                return res.send({
                    response: members.response,
                });
            }
            catch (error) {
                return res.send({
                    error: error
                });
            };
        }    
}