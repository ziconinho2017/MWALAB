require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../data/movie-model");
const getAll = function(req,res){
    let count = process.env.DEFAULT_REQ_LIMIT;
    let offset = 0;
    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(count > parseInt(process.env.MAX_REQ_LIMIT)){
        res.status(400).json({"message":process.env.EXCEED_LIMIT})
        return;
    }
    if(isNaN(count) && isNaN(offset)){
        res.status(400).json({"message":process.env.INVALID_COUNT})
    }
    Movie.find().skip(offset).limit(count).exec(function(err,games){
        const response = {
            status : 200,
            message : games
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
const getOne = function(req,res){
    const movieId = req.params.movieId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"message":process.env.INVALID_ID})
        return;
    }
    Movie.findById(movieId).exec(function(err,game){
        const response = {
            status : 200,
            message : game
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports = {
    getAll,
    getOne
}