require("dotenv").config();
const mongoose = require("mongoose");
const Game = require("../data/games-model");
const getAll = function(req,res){
    let count = parseInt(process.env.DEFAULT_GAME_LIMIT);
    let offset = 0;
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
        if(count > parseInt(process.env.MAX_GAME_LIMIT)){
            res.status(400).json({"message":process.env.MAX_GAME_LIMIT_EXCEED_MSG});
            return;
        }
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(isNaN(count) || isNaN(offset)){
        res.status(400).json({"message":process.env.COUNT_OFFSET_INVALID_MSG});
        return;
    }
    Game.find().skip(offset).limit(count).exec(function(err , games){
        const response = {
            status : 200,
            message : games
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        console.log("Games Found" + games.length);
        res.status(response.status).json(response.message);
    })
}
const getOne = function(req,res){
    let gameId = req.params.gameId;
    if(!mongoose.isValidObjectId(gameId)){
        res.status(400).json({"message":process.env.INVALID_GAME_ID_MSG});
        return;
    }
    Game.findById(gameId).exec(function(err, game){
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
const deleteOne = function(req,res){
    let gameId = req.params.gameId;
    if(!mongoose.isValidObjectId(gameId)){
        res.status(400).json({"message":process.env.INVALID_GAME_ID_MSG});
        return;
    }
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status : 200,
            message : game
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        if(!game){
            response.status = 400;
            response.message = {"message":process.env.INVALID_GAME_ID_MSG}
        }
        if(response.status !== 200){
            res.status(response.status).json(response.message);
        }else{
            deleteGame(res,game,response);
        }
    })
}
const deleteGame = function(res,game,response){
    game.deleteOne(gameId).exec(function(err, game){
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
const createOne = function(req,res){
    const newGame = {
        title : req.body.title,
        year : req.body.year,
        rate : req.body.rate,
        price : req.body.price,
        minPlayers : req.body.minPlayers,
        maxPlayers : req.body.maxPlayers,
        minAge : req.body.minAge,
        designers : [req.body.designer],
        publisher : {name : "noName"},
        reviews : []
    }
    Game.create(newGame, function(err, game){
        const response = {
            status : 201,
            message : game
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
const updateOne = function(req,res,updateGameCallback){
    const gameId = req.params.gameId;
    if(!mongoose.isValidObjectId(gameId)){
        res.status(400).json({"message":process.env.INVALID_GAME_ID_MSG});
        return;
    }
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status : 200,
            message : game
        }
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!game){
            response.status = 404;
            response.message = {"message" : process.env.INVALID_GAME_ID_MSG};
        }
        if(response.status != 200){
            res.status(response.status).json(response.message);
        }else{
            updateGameCallback(req,res,game,response);
        }
    })
}
const fullUpdateOne = function(req,res){
    updateOne(req,res,_fullUpdateOne);
}
const partialUpdateOne = function(req,res){
    updateOne(req,res,_partialUpdateOne);
}
const _fullUpdateOne = function(req,res,game,response){
    game.title = req.body.title;
    game.year = req.body.year;
    game.rate = req.body.rate;
    game.price = req.body.price;
    game.minPlayers = req.body.minPlayers;
    game.maxPlayers = req.body.maxPlayers;
    game.minAge = req.body.minAge;
    game.designers = req.body.designer;
    game.publisher = req.body.publisher;
    game.reviews = req.body.reviews;
    game.save(function(err,updatedGame){
        response.status = 200;
        response.message = updatedGame;
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
const _partialUpdateOne = function(req,res,game,response){
    if(req.body.title){game.title = req.body.title;}
    if(req.body.year){game.year = req.body.year;}
    if(req.body.rate){game.rate = req.body.rate;}
    if(req.body.price){game.price = req.body.price;}
    if(req.body.minPlayers){game.minPlayers = req.body.minPlayers;}
    if(req.body.maxPlayers){game.maxPlayers = req.body.maxPlayers;}
    if(req.body.minAge){game.minAge = req.body.minAge;}
    if(req.body.designers){game.designers = req.body.designers;}
    if(req.body.publisher){game.publisher = req.body.publisher;}
    if(req.body.reviews){game.reviews = req.body.reviews;}
    game.save(function(err,updatedGame){
        response.status = 200;
        response.message = updatedGame;
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}
module.exports = {
    getAll,
    getOne,
    createOne,
    fullUpdateOne,
    partialUpdateOne,
    deleteOne
}