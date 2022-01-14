const express = require("express")
const mathController = require("../controllers/mathController");
const router = express.Router();
router.get('/:number1',mathController.multiply);
module.exports = router;