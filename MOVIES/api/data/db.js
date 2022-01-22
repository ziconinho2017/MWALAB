require("dotenv").config();
require('./movie-model');
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('connected',function(){
    console.log(process.env.CON_MSG);
})
mongoose.connection.on('disconnected',function(){
    consolee.log(process.env.DISCON_MSG);
})
mongoose.connection.on('error',function(error){
    console.log(process.env.CON_ERR_MSG,error)
})
