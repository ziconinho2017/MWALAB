const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();
router.get('/api/games',gameController.getAll);
router.get('/api/games/:gameId',gameController.deleteOne);
router.post('/api/games/',gameController.createOne);
module.exports = router;