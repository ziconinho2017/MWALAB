const express = require("express");
const router = express.Router();
const movieController = require("../api/controllers/movies.controller");
router.get('/movies',movieController.getAll);
router.get('/movies/:movieId',movieController.getOne);
router.delete('/movies/:movieId',movieController.deleteOne);
module.exports = router;