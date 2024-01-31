const {models} = require ("./index");
const userModel = require("./userModel");

module.exports = {
      login: async (email) => {
        try{
          const user = await models.Users.findOne({
            where:{
              email:email,
            },attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            }
          });
          return {
              response: user,
          }
        }catch (error){
          return {
              error: error, 
        };
      }
      },
    logout:async (body) => {
      try {
          const user = await models.Sessions.destroy({
              where: {
                  userId: body.userId,
              },
          });
          console.log("this user", user)
         
          return {
              response: "session deleted successfully",
          };
      } catch (error) {
          return {
              error: error,
          };
      }

  },
      signUp: (body) => {
        try{
          return {
              response:body,
          }
        }catch (error){
          return {
              error: error, 
        };
      }
      },
      forgotPassword: () => {
        try{
          return {
              response: "Your new password",
          }
        }catch (error){
          return {
              error: error, 
        };
      }
      },
      resetPassword: () => {
        try{
          return {
              response: "Your password is reset",
          }
        }catch (error){
          return {
              error: error, 
        };
      }
      },
      getSession: async (userId) => {
        try {
          // console.log("mod  ",userId)
          
          const session = await models.Sessions.findOne({
            where: {
              userId: userId,
            },
          });

          return {
            response: session,
          };
        } catch (error) {
          return {
            error: error,
          };
        }
      },
}

