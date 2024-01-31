const authService = require("../services/authService");
const joi=require("joi");

const loginSchema=joi.object().keys({
    email: joi.string().required().email().min(3).max(60),
    password: joi.string().required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
const logoutSchema = joi.object().keys({
  userId: joi.string().required().min(3).max(100),
});

const signUpSchema=joi.object().keys({
email:joi.string().required().email().min(3).max(30),
password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
repeat_password: joi.ref('password')
})

module.exports ={
    login: async (req, res) => {
        try {
          const validate = await loginSchema.validateAsync(req.body);
          const loginResponse = await authService.login(validate);
          if (loginResponse.error) {
            return res.send({
              error: loginResponse.error,
            });
          }
          res.cookie("auth", loginResponse.response, {
            maxAge: 60 * 60 * 1000,
          });
          // res.cookie("userId", loginResponse.response.userId, {
          //   maxAge: 60 * 60 * 1000,
          // });
          return res.send({
            response: loginResponse.response,
          });
        } catch (error) {
          return res.send({
            error: error,
          });
        }
      },
    //   logout: (req, res) => {
    //     try {
    //         const logoutResponse = authService.logout(req.body);
    //         if (logoutResponse.error) {
    //             res.send({
    //                 error: logoutResponse.error,
    //             });

    //         }
    //         res.send({
    //             response: logoutResponse.response,
    //         });
    //     }
    //     catch (error) {
    //         res.send({
    //             error: error,
    //         });
    //     };
    // },

    logout: async(req, res) => {
      try {
          const validate = await logoutSchema.validateAsync(req.body);

          const logoutResponse = authService.logout(validate);
          res.clearCookie("auth");
          // Check if the 'Set-Cookie' header is present
          if (res.get("Set-Cookie")) {
              console.log("Cookie deleted successfully");
          } else {
              console.log("Cookie deletion failed");
          }

          return res.send({
              response: "session deleted successfully",
          });
      }
      catch (error) {
          res.send({
              error: error,
          });
      };
  },
    
    signUp : async (req, res) => {
        try{
            const validate = await signUpSchema.validateAsync(req.body);
            const signUpResponse = await authService.signUp(validate);
            if(signUpResponse.error){
                res.send({
                    error: signUpResponse.error,
                });
            }
            res.send({
                response: signUpResponse.response,
            });
        }
        catch(error){
            res.send({
                error: error,
            });
        }
    },
    forgotPassword : (req, res) => {
        try{
            const forgotPasswordResponse = authService.forgotPassword();
            if(forgotPasswordResponse.error){
                res.send({
                    error: forgotPasswordResponse.error,
                });
            }
            res.send({
                response: forgotPasswordResponse.response,
            });
        }
        catch(error){
            res.send({
                error: error,
            });
        }
    },
    resetPassword : (req, res) => {
        try{
            const resetPasswordResponse = authService.resetPassword();
            if(resetPasswordResponse.error){
                res.send({
                    error: resetPasswordResponse.error,
                });
            }
            res.send({
                response: resetPasswordResponse.response,
            });
        }
        catch(error){
            res.send({
                error: error,
            });
        }
    },
    getSession: async (req, res) => {
      try {
        const userId = req.cookies.auth.userId;
        // console.log("contUserId  ",userId)
          const session = await authService.getSession(userId);
          if (session.error) {
            res.send({
              error: session.error,
            });
          }
          console.log("cot",session.response)

          res.send({
            response: session.response,
          });
        } catch (error) {
          res.send({
            error: error,
          });
        }
      },
};