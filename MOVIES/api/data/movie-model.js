const mongoose = require("mongoose");
const moviesSchema = mongoose.Schema({},{strict:false});
module.exports = mongoose.model("Movie",moviesSchema,"movies");