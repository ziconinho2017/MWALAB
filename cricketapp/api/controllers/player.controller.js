require("dotenv").config();
const mongoose = require("mongoose");
const Team = require("../data/models/teams-model");
const getAll = function(req,res){
    let teamId = req.params.teamId;
    Team.findById(teamId).select("players").exec(function(err,team){
        const response = {
            status : 200,
            message : team.players
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        if(!team.players){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG + teamId};
        }
        console.log(process.env.PLAYERS_FOUND_MSG + team.players);
        res.status(response.status).json(response.message);
    })
}

const getOne = function(req,res){
    let teamId = req.params.teamId;
    let playerId = req.params.playerId;
    Team.findById(teamId).select("players").exec(function(err,team){
        const response = {
            status : 200,
            message : team.players.id(playerId)
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        if(!team){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG + teamId};
        }
        console.log(process.env.PLAYER_FOUND_MSG + team.players.id(playerId));
        res.status(response.status).json(response.message);
    })
}

const createOne = function(req, res){
    console.log("");
    let teamId = req.params.teamId;
    Team.findById(teamId).exec(function(err,team){
        const response = {
            status : 200,
            status : team
        }
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!team){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG};
        }
        if(team){
            _addPlayer(req,res,team);
        }else{
            console.log(process.env.PLAYER_NOT_CREATED_MSG + response.message);
            res.status(response.status).json(response.message);
        }
    })
}

const deleteOne = function(req,res){
    let teamId = req.params.teamId;
    let playerId = req.params.playerId;
    Team.findById(teamId).exec(function(err,team){
        const response = {
            status : 200,
            message : team
        }
        if(err){
            response.status = 500;
            response.message = err;  
        }else if(!team){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG + teamId};
        }else{
            team.players.id(playerId).remove();
            team.save(function(err1){
                if(err){
                    response.status = 500;
                    response.message = err1;
                }
            })
        }
        console.log(process.env.PLAYER_DELETED_MSG + response.message);
        res.status(response.status).json(response.message);
    })
}

const updateOne = function(req,res){
    let teamId = req.params.teamId;
    Team.findById(teamId).exec(function(err,team){
        const response = {
            status : 200,
            status : team
        }
        if(err){
            response.status = 500;
            response.message = err;
        }else if(!team){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG};
        }
        if(team){
            _updatePlayer(req,res,team);
        }else{
            console.log(process.env.PLAYER_NOT_UPDATED_MSG + response.message);
            res.status(response.status).json(response.message);
        }
    })
}
function _updatePlayer(req,res,team){
    let playerId = req.params.playerId;
    console.log(req.body.name);
    console.log(req.body.age);
    team.players.id(playerId).name = req.body.name;
    team.players.id(playerId).age = req.body.age;
    team.save(function(saveerr,result){
        const response = {
            status : 200,
            message : result
        }
        if(saveerr){
            response.status = 500;
            response.message = saveerr;
        }
        console.log(process.env.PLAYER_UPDATED_MSG + response.message);
        res.status(response.status).json(response.message);
    })
}
function _addPlayer(req,res,team){
    const player = {
        name : req.body.name,
        age : req.body.age
    }
    team.players.push(player);
    team.save(function(err,result){
        const response = {
            status : 200,
            message : result
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        console.log(process.env.PLAYER_CREATED_MSG + response.message);
        res.status(response.status).json(result);
    })
}
module.exports = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    updateOne
}