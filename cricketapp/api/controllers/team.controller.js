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

const updateOne = function(req,res){
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
}

module.exports = {
    getAll,
    getOne,
    createOne,
    deleteOne,
    updateOne
}