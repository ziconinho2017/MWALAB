require("dotenv").config();
require("./api/data/db");
const express = require("express");
const path = require("path");
const route = require("./routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,process.env.PUBLIC)));
app.use('/api',route);
const server = app.listen(process.env.PORT,function(){
    console.log(process.env.SERVER_PORT_MSG+server.address().port);
})