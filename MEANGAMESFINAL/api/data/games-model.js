const mongoose = require("mongoose");
const publisherSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    country : String,
    established : Number,
    location : String
})
const reviewSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    review : {
        type : String,
        required : true
    },
    postDate : {
        type : Date,
        "default" : Date.now
    }
})
const gameSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    year : Number,
    rate : {
        type : Number,
        min : 1,
        max : 5,
        "default" : 1
    },
    Price : Number,
    minPlayers : {
        type : Number,
        min : 1,
        max : 10,
    },
    maxPlayers : {
        type : Number,
        min : 1,
        max : 10,
    },
    minAge : Number,
    designer : [String],
    publisher : publisherSchema,
    reviews : [reviewSchema]
})

module.exports = mongoose.model("Games", gameSchema,'games');