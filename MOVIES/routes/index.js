const express = require("express");
const movieController = require("../api/controller/movies.controller")
const router = express.Router();
router.get('/movies',movieController.getAll)
      .get('/movies/:movieId',movieController.getOne);
module.exports = router;