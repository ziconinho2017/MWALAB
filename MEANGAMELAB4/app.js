require("dotenv").config();
require("./data/dbconnection").open();
const express = require("express");
const gameRoute = require("./routes/gameRouter");
const mathRoute = require("./routes/mathRouter");
const path = require("path");
const app = express();
app.use(express.json());
//app.use(express.static(path.join(__dirname,process.env.MSG_PUB_FOLDER)));
app.use('/',gameRoute);
app.use('/multiply',mathRoute);
const server = app.listen(process.env.PORT,function(){
    console.log(process.env.MSG_SERVER_START + server.address().port);
})
