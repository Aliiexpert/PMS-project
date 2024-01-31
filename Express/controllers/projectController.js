const projectService = require("../services/projectService");
const joi = require("joi");



const createProjectSchema = joi.object().keys({
    instructorId:  joi.string().required().min(3).max(60),
    projectTitle: joi.string().required().min(3).max(20),
    description: joi.string().required().min(5).max(100),
    deadlineDate: joi.date().raw(),
    teamId: joi.string().min(5).max(100).required()
})

const updateProjectSchema = joi.object().keys({
    projectId:joi.string().required(),
    title: joi.string().min(3).max(20),
    description: joi.string().min(5).max(100),
    deadlineDate: joi.date().raw().required(),

})

const InsProjectSchema = joi.object().keys({
    instructorId: joi.string().required(),
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

module.exports = {
    createProject: async (req, res) => {
        try {
            const validate = await createProjectSchema.validateAsync(req.body);
            console.log("req.body")
            const project = await projectService.createProject(validate);
            if (project.error) {
                return res.send({
                    error: project.error,
                });

            }
            return res.send({
                response: project.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllProjects: async (req, res) => {
        try {
            // const validate = await paginationSchema.validateAsync(req.query);
            const projects = await projectService.getAllProjects(req.query);
            if (projects.error) {
                return res.send({
                    error: projects.error,
                });
            }
            return res.send({
                response: projects.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getInsProjects: async (req, res) => {
        try {


            const validate = await InsProjectSchema.validateAsync(req.query);
            const projects = await projectService.getInsProjects(validate);
            console.log(validate)
            if (projects.error) {
                return res.send({
                    error: projects.error,
                });

            }
            return res.send({
                response: projects.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },


    updateProject: async (req, res) => {
        console.log("check2")
        try {
            const validate = await updateProjectSchema.validateAsync(req.body);

            const project = await projectService.updateProject(validate);
            console.log("user", project)
            if (project.error) {
                return res.send({
                    error: project.error,
                });

            }
            return res.send({
                response: project.response,
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


            const users = await userService.getAllRequests();

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
    getTotalProjects: async (req, res) => {
        try {
            const projects = await projectService.getTotalProjects();
          if (projects.error) {
            return res.send({
              error: projects.error,
            });
          }
          console.log("bilawal2", projects.response)
          return res.send({
            response: projects.response.totalProjects,
          });
        } catch (error) {
          return res.send({
            error: error,
          });
        }},
        getInsProjects: async (req, res) => {
            try {
    
    
                const validate = await InsProjectSchema.validateAsync(req.query);
                const projects = await projectService.getInsProjects(validate);
                console.log(validate)
                if (projects.error) {
                    return res.send({
                        error: projects.error,
                    });
    
                }
                return res.send({
                    response: projects.response,
                });
    
            }
            catch (error) {
                return res.send({
                    error: error
                });
            };
        },
    
    
}