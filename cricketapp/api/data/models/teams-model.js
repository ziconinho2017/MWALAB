const mongoose = require("mongoose")
const playerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    }
})
const teamSchema = mongoose.Schema({
    rank : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    matchplayed : {
        type : Number,
        "default" : 0
    },
    players : [playerSchema]
})
module.exports = mongoose.model("Team",teamSchema,"teams");