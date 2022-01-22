const express = require("express");
const gameController = require("../api/controllers/game.controller");
const router = express.Router();
router.get('/games',gameController.getAll)
      .get('/games/:gameId',gameController.getOne)
      .post('/games',gameController.createOne)
      .put('/games/:gameId',gameController.fullUpdateOne)
      .patch('/games/:gameId',gameController.partialUpdateOne)
      .delete('/games/:gameId',gameController.deleteOne);

module.exports = router;