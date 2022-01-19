require("dotenv").config();
const mongoose = require("mongoose");
const Team = require("../data/models/teams-model");
const getAll = function(req,res){
    let count = parseInt(process.env.DEFAULT_TEAM_COUNT);
    let offset = 0;
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }
    const response = {
        status : 200,
        message : ""
    }
    if (isNaN(offset) || isNaN(count)) {
        response.status = 400;
        response.message = {"message":process.env.COUNT_OFFSET_VALIDATION_MSG};
        res.status(response.status).json(response.message);
        return;
    }else if(count > parseInt(process.env.MAX_TEAM_COUNT)){
        response.status = 400;
        response.message = {"message":process.env.COUNT_MAX_ERR_MSG};
        res.status(response.status).json(response.message);
        return;
    }else{
        Team.find().skip(offset).limit(count).exec(function(err,teams){
            const response = {
                status : 200,
                message : teams
            }
            if(err){
                response.status = 500;
                response.message = err;
            }
            console.log(process.env.TEAMS_FOUND_MSG, teams.length);
            res.status(response.status).json(response.message);
        })
    }
    
}
const getOne = function(req,res){
    let teamId = req.params.teamId;
    if(!mongoose.isValidObjectId(teamId)){
        res.status(400).json({"message":process.env.TEAM_OBJECT_ID_INVALID});
        return;
    }
    Team.findById(teamId).exec(function(err,team){
        const response = {
            status : 200,
            message : team
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        console.log(process.env.TEAM_FOUND_MSG, team);
        res.status(response.status).json(response.message);
    })
}

const createOne = function(req,res){
    const team = {
        rank : req.body.rank,
        name : req.body.name,
        matchplayed : req.body.matchplayed
    }
    Team.create(team,function(err, team){
        const response = {status : 201, message : team};
        if(err){
            response.status = 500;
            response.message = err;
        }
        console.log(process.env.TEAM_CREATED_MSG, team);
        res.status(response.status).json(response.message);
    })
}

const deleteOne = function(req,res){
    const teamId = {_id : req.params.teamId};
    if(!mongoose.isValidObjectId(teamId)){
        res.status(400).json({"message":process.env.TEAM_OBJECT_ID_INVALID});
        return;
    }
    Team.deleteOne(teamId).exec(function(err,deletedTeam){
        const response = {
            status : 200,
            message : deletedTeam
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        if(!deletedTeam){
            response.status = 404;
            response.message = {"message" : TEAM_NOT_FOUND_MSG+teamId};
        }
        console.log(process.env.TEAM_DELETED_MSG, teamId);
        res.status(response.status).json(response.message);
    })
}

const fullUpdateOne = function(req,res){
    console.log("full update Controller");
    updateOne(req,res,_fullUpdateOne);
}

const partialUpdateOne = function(req,res){
    console.log("partial update Controller");
    updateOne(req,res,_partialUpdateOne);
}

const updateOne = function(req,res,updateCallback){
    let teamId = req.params.teamId;
    Team.findById(teamId).exec(function(err,team){
        const response = {
            status : 204,
            message : team
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        if(!team){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG};
        }
        if(response.status !== 204){
            console.log("error in update");
            res.status(response.status).json(response.message);
        }else{
            console.log("callback called");
            updateCallback(req,res,team,response);
        }
    })
}

function _fullUpdateOne(req,res,team,response){
    team.rank = req.body.rank;
    team.name = req.body.name;
    team.matchplayed = req.body.matchplayed;
    team.players = [];
    saveTeam(res,team,response);
}
function _partialUpdateOne(req,res,team,response){
    if(req.body.rank){team.rank = req.body.rank;}
    if(req.body.name){team.name = req.body.name;}
    if(req.body.matchplayed){team.matchplayed = req.body.matchplayed;}
    if(req.body.rank){team.players = req.body.players;}
    saveTeam(res,team,response);
}
function saveTeam(res,team,response){
    team.save(function(err,updatedGame){
        response.status = 200;
        response.message = updatedGame;
        if(err){
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })
}

/*const updateOne = function(req,res){
    const teamId = req.params.teamId;
    if(!mongoose.isValidObjectId(teamId)){
        res.status(400).json({"message":process.env.TEAM_OBJECT_ID_INVALID});
        return;
    }
    let query = {$set : {}};
    for(let key in req.body){
        query.$set[key] = req.body[key];
    }
    Team.updateOne({_id : teamId},query).exec(function(err,team){
        const response = {
            status : 200,
            message : team
        }
        if(err){
            response.status = 500;
            response.message = err;
        }
        if(!team){
            response.status = 404;
            response.message = {"message" : process.env.TEAM_NOT_FOUND_MSG+TeamId}
        }
        console.log(process.env.TEAM_UPDATED_MSG, teamId);
        res.status(response.status).json(response.message);
    })
}*/

module.exports = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}