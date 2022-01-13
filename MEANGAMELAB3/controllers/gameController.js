const gameData = require("../data/games.json");
module.exports.getAll = function(req,res){
    console.log("GET Received in Controller");
    res.status(200).json(gameData);
}