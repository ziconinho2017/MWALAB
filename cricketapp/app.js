require("dotenv").config();
require("./api/data/db");
const express = require("express");
const teamRouter = require("./routes/cricket.route");
const app = express();
app.use(express.json());
app.use("/api/teams",teamRouter);
const server = app.listen(process.env.PORT,function(){
    console.log(process.env.PORT_LISTEN_MSG + server.address().port);
})
