const userController = require("../controllers/userController");
const { trainee, instructor, admin } = require("../middleware");
const router = require("express").Router();


router.post("/createUser", userController.createUser);
router.get("/getAllUsers",userController.getAllUsers);
router.get("/getUserByUserId",userController.getUserByUserId);
router.get("/getAllRequests",userController.getAllRequests);
router.get("/getAllInstructor", userController.getAllInstructor);
router.delete("/deleteUser", instructor, userController.deleteUser);
router.put("/updateUser",userController.updateUser);
router.post("/onbaording",  userController.onBoarding);
router.get("/getTotalTrainees",  userController.getTotalTrainees);



module.exports = router;
