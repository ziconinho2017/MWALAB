const express = require("express");
const studentRouter = require("./routes/studentRouter");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/student',studentRouter);
app.use(function(req,res){
    console.log("Nothing is requested");
    res.status(200).end("Nothing is requested");
});
app.listen(process.env.PORT,function(){
    console.log("Listening to port " + process.env.PORT);
});