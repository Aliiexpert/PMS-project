    const authController = require("../controllers/authController");
    const router = require("express").Router();
    const { trainee, instructor, logout } = require("../middleware")

    router.post("/login", authController.login);
    router.post("/logout", authController.logout);
    router.post("/signUp", authController.signUp);
    router.get("/forgotPassword", authController.forgotPassword);
    router.get("/resetPassword", authController.resetPassword);
    router.get("/getsession", authController.getSession);


    module.exports = router;
