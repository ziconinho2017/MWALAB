require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../data/movie-model");
const getAll = function(req,res){
    let count = process.env.DEFAULT_COUNT;
    let offset = 0;
    Movie.find().skip(offset).limit(count).exec(function(err,movies){
        const response = {
            status : 200,
            message : movies
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
const getOne = function(req,res){
    let movieId = req.params.movieId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).json({"message":process.env.INVALID_OBJ_MSG})
        return;
    }
    Movie.findById(movieId).exec(function(err,movie){
        const response = {
            status :200,
            message:movie
        }
        if(err){
            response.status = 500;
            response.message={"message":err}
        }
        res.status(response.status).json(response.message);
    })
}
const deleteOne = function(req,res){
    let movieId = req.params.movieId;
    if(!mongoose.isValidObjectId(movieId)){
        res.status(400).message({"message":process.env.INVALID_OBJ_MSG})
        return
    }
    Movie.findByIdAndDelete(movieId).exec(function(err,result){
        const response = {
            status:200,
            message:result
        }
        if(err){
            response.status = 500;
            response.message = err
        }
        res.status(response.status).json(response.message);
    })
}
module.exports = {
    getAll,
    getOne,
    deleteOne
}