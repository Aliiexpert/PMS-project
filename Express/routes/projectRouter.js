const projectController = require("../controllers/projectController");
const router = require("express").Router();

router.post("/createProject", projectController.createProject);
router.get("/getAllProjects", projectController.getAllProjects);
router.get("/getInsProjects", projectController.getInsProjects);
router.put("/updateProject", projectController.updateProject);
router.get("/getTotalProjects", projectController.getTotalProjects);

module.exports = router;