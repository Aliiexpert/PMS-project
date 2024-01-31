const { response, query } = require("express");
const userService = require("../services/userService");
const joi = require("joi");


const createUserSchema = joi.object().keys({
  firstName: joi.string().required().min(3).max(40),
  lastName: joi.string().required().min(3).max(40),
  email: joi.string().required().email(),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: joi.ref("password"),
  role: joi.string().valid("instructor", "trainee", "admin"),
  cohort: joi.string().min(3).max(40),
});

const getByUserIdSchema = joi.object().keys({
  userId: joi.string().required(),
});

const updateProfilePictureSchema = joi.object().keys({
  userId: joi.string().required(),
  // Add validation for the profile picture here if needed
});

const updateUserSchema = joi.object().keys({
  userId: joi.string().required(),
  firstName: joi.string().min(3).max(40),
  lastName: joi.string().min(3).max(40),
  email: joi.string().email(),
  role: joi.string().valid("instructor", "trainee", "admin"),
  cohort:joi.string(),
  stack:joi.string(),
  isApproved:joi.boolean(),
  isBlocked:joi.boolean(),
})

const paginationSchema = joi.object().keys({
  pageNo: joi.number().default(1).greater(0),
  limit: joi.number().default(5).valid(5, 10),
  sortValue: joi
      .string()
      .valid("userId", "email", "role", "firstName", "lastName").default("firstName"),
  sortOrder: joi.valid("ASC", "DESC").default("ASC"),
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string(),
  role: joi.string().valid("instructor", "trainee"),
  lastName: joi.string(),
  userId: joi.string(),
  instructorId: joi.string(),
})

const onBoardingSchema = joi
  .object()
  .keys({
    userId: joi.string().required(),
    instructorId: joi.string().required(),
  })
  .unknown([false]);


module.exports = {
  createUser: async (req, res) => {
    try {
        const validate = await createUserSchema.validateAsync(req.body);
        const user = await userService.createUser(validate);
        if (user.error) {
            return res.send({
                error: user.error,
            })
        }
        return res.send({
            response: user.response,
        });

    }
    catch (error) {
        return res.send({
            error: error
        });
    };
},

getAllUsers: async (req, res) => {
    try {


        const validate = await paginationSchema.validateAsync(req.query);
        const users = await userService.getAllUsers(validate);
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
getAllRequests: async (req, res) => {
  try {
      const users = await userService.getAllRequests(req.query);
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
  deleteUser: async (req, res) => {
  try {
      const validate = await getByUserIdSchema.validateAsync(req.query);
      const user = await userService.deleteUser(validate);
    if(user.error){
      return res.send({
        error: user.error
      });
    }
    return res.send({
      response: user.response
    })
    
  } catch (error) {
    return res.send({
      error: error
    });
  }
  
  },
  updateUser: async (req, res) => {
    try {
      const validate = await updateUserSchema.validateAsync(req.body);
      const user = await userService.updateUser(validate);
      if (user.error) {
        return res.send({
          error: user.error
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  onBoarding: async (req, res) => {
    try {
      const validate = await onBoardingSchema.validateAsync(req.body);
      const user = await userService.onBoarding(validate);
      if (user.error) {
        return res.send({
          error: user.error,
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  getAllInstructor: async (req, res) => {
    try {
      // const validate = await paginationSchema.validateAsync(req.query);
        const users = await userService.getAllInstructor();
      if (users.error) {
        return res.send({
          error: users.error,
        });
      }
      return res.send({
        response: users.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }},
    getUserByUserId: async (req, res) => {
  
      try {

          const users = await userService.getUserByUserId(req.query);
        if (users.error) {
          return res.send({
            error: users.error,
          });
        }
        return res.send({
          response: users.response,
        });
      } catch (error) {
        return res.send({
          error: error,
        });
      }},
      getSession: async (req, res) => {
        try {
          const userId = req.cookies.auth.userId;
          const session = await authService.getSession(userId);
          if (session.error) {
            res.send({
              error: session.error,
            });
          }
          res.send({
            response: session.response,
          });
        } catch (error) {
          res.send({
            error: error,
          });
        }
      },
      getTotalTrainees: async (req, res) => {
        try {
            const users = await userService.getTotalTrainees(req.query);
          if (users.error) {
            return res.send({
              error: users.error,
            });
          }
          return res.send({
            response: users.response,
          });
        } catch (error) {
          return res.send({
            error: error,
          });
        }},

        createTeams: async (req, res) => {
          try {
              const team = await userService.createTeams(req.body);
              if (team.error) {
                  return res.send({
                      error: team.error,
                  })
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
    try {
      // const validate = await paginationSchema.validateAsync(req.query);
        const teams = await userService.getAllTeams();
      if (teams.error) {
        return res.send({
          error: teams.error,
        });
      }
      return res.send({
        response: teams.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    };
}
}
