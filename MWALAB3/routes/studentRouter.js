require("dotenv").config()
const studentController = require("../controllers/studentController");
const express = require("express");
const router = express.Router();
router.get('/',studentController.getAllStudents);
router.get('/:studentId',studentController.getOne);
module.exports = router;