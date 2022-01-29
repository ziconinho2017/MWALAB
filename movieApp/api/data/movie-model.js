const mongoose = require("mongoose");
const movieSchema = mongoose.Schema({
    title : String,
    rating : Number,
    plot : String,
    directors : [String],
    realeased : Date,
    genres : String
})
module.exports = mongoose.model("Movies",movieSchema,"movies");