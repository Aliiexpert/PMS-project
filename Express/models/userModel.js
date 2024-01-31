const { models } = require ("./index");

module.exports = {
  createUser: async (body, userId) => {
    try {
        const user = await models.Users.create({
          userId,
            ...body
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
  getUserByEmail: async (email) => {
    try {     
      const user = await models.Users.findOne({
        where: {
          email: email,
      }
    });
    return{
      response: user
    }
    } catch (error) {
  
      return {
        error: error
      } 
    }
  },
  getUserByUserId: async (userId) => {
    try {     
      const user = await models.Users.findOne({
        where: {
          userId: userId,
      }
    });
    return{
      response: user
    }
    } catch (error) {
  
      return {
        error: error
      } 
    }
  },
  
  getAllUsers: async ( offset, query) => {
      try {
          console.log("model",offset, query)
          const pagination_info = query.limit == "all" || query?.limit ? {} : {
            offset: offset,
            limit: query.limit,
          }
          const users = await models.Users.findAll({
              // attributes : ["firstName", "lastName", "role", "email"]
              attributes: {
                  exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
              },
              where: [
                  {
                      ...(query?.firstName
                          ? { firstName: { [Op.substring]: query.firstName } }
                          : true),
                  },
                  {
                      ...(query?.lastName
                          ? { lastName: { [Op.substring]: query.lastName } }
                          : true),
                  },
                  {
                      ...(query?.email
                          ? { email: { [Op.substring]: query.email } }
                          : true),
                  },
                  {
                    ...(query?.role ? { role: query.role } : {}),
                  },
                  {
                    ...(query?.instructorId ? {instructorId: query.instructorId} : true)
                    
                },
              ],
              order: [[query.sortValue, query.sortOrder]],
              ...pagination_info
          })
          return {
              response: users,
          };
      } catch (error) {
      console.log(error)

          return {
              error: error,
          };
      }
  },
    deleteUser: async (query) => {
      try {
        const user = await models.Users.destroy({
          where:{
            userId: query.userId,
          }
        });
        return{
          response:user
        }
      } catch (error) {
        return{
          error: error
        }
      }
      },
      updateUser: async (body) => {
      try {
        const user = await models.Users.update({
          ...body
        },{
          where: {
            userId: body.userId,
          }
        });
        return{
          response: user, 
        }
      } catch (error) {
        return{
          error: error
        }
        
      }
      },
  onBoarding: async (userId, instructorId) => {
    
    try {
      const user = await models.Users.update(
        {
          isRequested: true,
          instructorId,
        },
        {
          where: {
            userId: userId,
          },
        }
      );

      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getAllInstructor: async () => {
    try {
      const users = await models.Users.findAll({
        // attributes : ["firstName", "lastName", "role", "email"]
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      },
      where: {
        role: 'instructor',
      },

    })
    return{
      response: users,
    };
      
    } catch (error) {
      return{
        error: error,
      }
    }
    },
    getAllRequests: async (query) => {

      try {
          
          const users = await models.Users.findAll({
              // attributes : ["firstName", "lastName", "role", "email"]
              attributes: {
                  exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
              },
              where:{
                isRequested:true,
                isApproved:false,
                isBlocked:false,
                instructorId: query.instructorId
              }
            })
            console.log("users",users)
          return {
              response: users,
          };
      } catch (error) {
          return {
              error: error,
          };
      }

  },
  getTotalTrainees: async (query) => {
    try {
      const trainees = await models.Users.findAll({
        where: {
          instructorId: query
        },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
        }
      });
  
      const totalTrainees = trainees.length;
  
      return {
        response: {
          totalTrainees: totalTrainees,
          traineeList: trainees,
        },
      };
  
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  createTeams: async (body, teamsId) => {
    try {
        const team = await models.Teams.create({
          teamsId,
            ...body
        })
        return {
          
            response: team,
            
        };
        
    } catch (error) {
        return {
            error: error,
        };
    }
},

getTeamByTeamId: async (teamsId) => {
  try {     
    const team = await models.Teams.findOne({
      where: {
        teamId: teamsId,
    }
  });
  return{
    response: team
  }
  } catch (error) {

    return {
      error: error
    } 
  }
},
  getAllTeams: async () => {
    try {
      const teams = await models.Users.findAll({
        attributes : ["teamsId","title","teamsLeader",]
      //   attributes: {
      //     exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      // },
      // where: {
      //   role: 'instructor',
      // },
    })
    return{
      response: teams,
    };
      
    } catch (error) {
      return{
        error: error,
      }
    }
    },


createTasks: async (body, tasksId) => {
    try {
        const tasks = await models.Tasks.create({
          tasksId,
            ...body
        })
        return {
          
            response: tasks,
            
        };
        
    } catch (error) {
        return {
            error: error,
        };
    }
},

getTasksByTasksId: async (tasksId) => {
  try {     
    const tasks = await models.Tasks.findOne({
      where: {
        tasksId: tasksId,
    }
  });
  return{
    response: tasks
  }
  } catch (error) {

    return {
      error: error
    } 
  }
},
  getAllTasks: async () => {
    try {
      const tasks = await models.Tasks.findAll({
        attributes : ["tasksId", "tasksTitle", "tasksDescription"]
      //   attributes: {
      //     exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
      // },
      // where: {
      //   role: 'instructor',
      // },
    })
    return{
      response: tasks,
    };
      
    } catch (error) {
      return{
        error: error,
      }
    }
    },
    isLoggedIn: async (email) => {
      try {
        const user = await models.Users.findOne({
          where: {
            email: email,
            isLoggedIn: true, // Check if the user is currently logged in
          },
          attributes: ['isLoggedIn'],
        });
  
        if (user) {
          return {
            response: true, // User is logged in
          };
        } else {
          return {
            response: false, // User is not logged in
          };
        }
      } catch (error) {
        return {
          error: error,
        };
      }
    },
}
