require("dotenv").config()
require("./api/data/db")
const movieRoute = require("./routes")
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header',
                'Content-Type,X-Requested-With,cache-control,pragma')
    next();
})
app.use('/api',movieRoute);
const server = app.listen(process.env.PORT,function(){
    console.log(process.env.SERVER_MSG + server.address().port)
})