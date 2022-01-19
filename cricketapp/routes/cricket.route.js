const express = require("express");
const teamController = require("../api/controllers/team.controller");
const playerController = require("../api/controllers/player.controller");
const router = express.Router();
router.get("/",teamController.getAll);
router.get("/:teamId",teamController.getOne);
router.post("/",teamController.createOne);
router.delete("/:teamId",teamController.deleteOne);
router.patch("/:teamId",teamController);
router.put("/:teamId",teamController.fullUpdateOne);

router.get("/:teamId/players",playerController.getAll);
router.get("/:teamId/players/:playerId",playerController.getOne);
router.post("/:teamId/players",playerController.createOne);
router.delete("/:teamId/players/:playerId",playerController.deleteOne);
router.patch("/:teamId/players/:playerId",playerController.updateOne);
router.put("/:teamId/players/:playerId",playerController.updateOne);
module.exports = router;

