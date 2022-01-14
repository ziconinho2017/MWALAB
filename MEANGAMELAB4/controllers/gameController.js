const dbConnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;
module.exports.getAll = function(req,res){
    const db = dbConnection.get();
    const gameCollection = db.collection("games");
    let offset = 0;
    let count = 6;
    if(req.query && req.query.count){
        if(req.query.count < 9){
            count = parseInt(req.query.count,10);
        }
        count = 9;
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    console.log(count+"--"+offset)
    gameCollection.find().skip(offset).limit(count).toArray(function(err, games){
        if(err){
            console.log(err);
        }else{
            console.log("Found Games "+games);
            res.status(200).json(games);
        }
    })
}
module.exports.deleteOne = function(req,res){
    const db = dbConnection.get();
    const gameCollection = db.collection("games");
    const query = {_id:ObjectId(req.params.gameId)};
    gameCollection.deleteOne(query,function(err,result){
        if(err){
            console.log(err);
        }else{
            res.status(200).json(result);
        }
    })
}
module.exports.createOne = function(req,res){
    const db = dbConnection.get();
    const gameCollection = db.collection("games");
    if(req.body && req.body.title && req.body.price && req.body.minimumplayer && req.body.minimumage){
        if(req.body.minimumplayer < 1 || req.body.minimumplayer > 11){
            console.log("Invalid Player Size");
            res.status(200).json({error:"Minimum Players should be between 1-11"});
        }else if(req.body.minimumage < 6 || req.body.minimumage > 99){
            console.log("Invalid Player Age");
            res.status(200).json({error:"Minimum age should be between 6-99"});
        }else{
            const game = {
                "title" : req.body.title,
                "price" : req.body.price,
                "minPlayers" : req.body.minimumplayer,
                "minAge" : req.body.minimumage
            }
            gameCollection.insertOne(game,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    res.status(200).json(result);
                }
            })
        }

    }else{
        console.log("Incomplete data");
        res.status(400).json({error : "Required Data is missing from Post"});
    }
}