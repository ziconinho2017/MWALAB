require("dotenv").config();
require("./api/data/db");
const path = require("path")
const express = require("express")
const movieRoute = require("./routes")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/api',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','*');
    res.header('Access-Control-Allow-Headers',
        'Content-Type,X-Requested-With,cache-control,pragma')
        next();
})
app.use('/api',movieRoute);
const server = app.listen(process.env.PORT,function(){
    console.log(process.env.SERVER_MSG,server.address().port);
})

