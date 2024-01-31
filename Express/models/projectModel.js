const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createProject: async (body, projectId) => {
        try {
            const project = await models.Projects.create({
                projectId,
                ...body
            })
            return {
                response: project,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getProjectById: async (instructorId) => {
        try {
            const project = await models.Projects.findOne({
                where: {
                    instructorId: instructorId,
                }
            })
            return {
                response: project,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getInsProjects: async (query) => {
        try {

            const projects = await models.Projects.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    instructorId: query.instructorId,
                    projectTag:query.projectTag
                }
            })
            return {
                response: projects,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getAllProjects: async (instructorId) => {
        try {
            const projects = await models.Projects.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                where: {
                    instructorId: instructorId  ,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                // where: [
                //     {
                //         ...(query.title
                //             ? { title: { [Op.substring]: query.title } }
                //             : true),
                //     },

                // ],
                // order: [[query.sortValue, query.sortOrder]],
                // offset: offset,
                // limit: query.limit,
            })
            
            return {
                response: projects,
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
    updateProject: async (body) => {
        try {
            const project = await models.Projects.update({
                ...body
            }, {
                where: {

                    projectId: body.projectId,
                }
            })
            return {
                response: project,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },



    getAllRequests: async () => {
        try {
            const user = await models.Users.findAll({
                where: {
                    isRequested: true,
                    isApproved: false,
                    isBlocked: false
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
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

    getTotalProjects: async () => {
        try {
          const projects = await models.Projects.findAll({
            attributes: {
              exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
            },
            // where: {
            //   role: 'trainee',
            // },
          });
      
          const totalProjects = projects.length;
      
          return {
            response: {
                totalProjects: totalProjects,
              projectsList: projects,
            },
          };
      
        } catch (error) {
          return {
            error: error,
          };
        }
      },
      getInsProjects: async (query) => {
        try {

            const projects = await models.Projects.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    instructorId: query.instructorId,
                }
            })
            return {
                response: projects,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

};