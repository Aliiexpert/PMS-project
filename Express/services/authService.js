const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken")
const config = require("../config/config.json")
const bcrypt=require("bcryptjs")
const {v4: uuidV4}=require("uuid");
const sessionModel = require("../models/sessionModel");

module.exports = {
    login: async (body) => {
        try {
            const user = await authModel.login(body.email);
            if (user.error || !user.response){
                return {
                    error: "invalid credentials",
                };
            }
            const login = await bcrypt.compare(
                body.password,
                user.response.dataValues.password
            );
            if(!login){
                return{
                    error: "invalid credentials",
                };
            }
            const token = jwt.sign(user.response.dataValues, config.jwt.secret, {
                expiresIn: "1h"
            })
            const session = await sessionModel.getSessionByUserId(user.response.dataValues.userId);
            if(session.error) {return {error:"invalid user"}};
            const userId =  user.response.dataValues.userId
            const deleteSession = await sessionModel.deleteSession(userId)
            if(deleteSession.error){
                return {
                    error: error
                }}
                delete user.response.dataValues.password;

                const sessionId = uuidV4();

                const createSession = await sessionModel.createSession(
                sessionId,
                userId,
                token)

      if(createSession.error || !createSession.response){
        return { error: 'invalid user 234'}
      }

      const Session = createSession.response.dataValues;
      Session.role = user.response.dataValues.role;
      Session.isRequested = user.response.dataValues.isRequested;
      Session.isApproved = user.response.dataValues.isApproved;
      Session.isBlocked = user.response.dataValues.isBlocked;


            return {
                response: Session,
            };
         } catch (error){
                return {
                    error: error,
                };
            }
        },

        // logout: async (userId) => {
        //     try {
        //       const deleteSession = await sessionModel.deleteSession(userId);
        
        //       if (deleteSession.error) {
        //         return {
        //           error: deleteSession.error,
        //         };
        //       }
        //       return {
        //         response: "Logout successful",
        //       };
        //     } catch (error) {
        //       return {
        //         error: error,
        //       };
        //     }
        //   },
        logout: async (body) => {
            try {
                const logoutResponse = await authModel.logout(body);
                console.log("req body data", logoutResponse)
             
                if (logoutResponse.error) {
                    return {
                        error: "error",
                    };
    
                }
                return {
                    response: logoutResponse,
                };
            }
    
            catch (error) {
                return {
                    error: error,
                };
            }
        },
            signUp: async(body) => {
                try {
                    const signUpResponse =  authModel.signUp(body);
                    if (signUpResponse.error){
                        return {
                            error: signUpResponse.error,
                        };
                    }
                    return {
                        response: signUpResponse.response,
                    };
                 } catch (error){
                        return {
                            error: error,
                        };
                    }
                },
                forgotPassword: () => {
                    try {
                        const forgotPasswordResponse = authModel.forgotPassword();
                        if (forgotPasswordResponse.error){
                            return {
                                error: forgotPasswordResponse.error,
                            };
                        }
                        return {
                            response: forgotPasswordResponse.response,
                        };
                     } catch (error){
                            return {
                                error: error,
                            };
                        }
                    },
                    resetPassword: () => {
                        try {
                            const resetPasswordResponse = authModel.resetPassword();
                            if (resetPasswordResponse.error){
                                return {
                                    error: resetPasswordResponse.error,
                                };
                            }
                            return {
                                response: resetPasswordResponse.response,
                            };
                         } catch (error){
                                return {
                                    error: error,
                                };
                            }
                        },
                        getSession: async (userId) => {
                          try {
                            // console.log("serUserId  ",userId)
                            const session = await authModel.getSession(userId);
                            // console.log("ser",session.response)
                            if (session.error || !session.response) {
                              return {
                                error: session.error,
                              };
                            }
                            return {
                              response: session.response,
                            };
                          } catch (error) {
                            return {
                              error: error,
                            };
                          }
                        },
    }
