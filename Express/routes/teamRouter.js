const teamController = require("../controllers/teamController");
const router = require("express").Router();

router.post("/createteam", teamController.createTeam);
router.get("/getAllTeams", teamController.getAllTeams);
router.put("/updateTeam", teamController.updateTeam);
router.get("/getTotalTeam", teamController.getTotalTeam);
router.get("/getTeamByProjectId", teamController.getTeamByProjectId);
router.post("/createTeamMembers", teamController.createTeamMembers);
router.get("/getAllMembers", teamController.getAllMembers);
router.put("/updateTeamsMember", teamController.updateTeamsMember);
router.get("/getTeamMembers", teamController.getTeamMembers);

module.exports = router;