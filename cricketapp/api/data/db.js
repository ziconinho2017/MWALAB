require("dotenv").config();
const mongoose = require("mongoose");
require("../data/models/teams-model");
mongoose.connect(process.env.DB_URL,{useNewUrlParser : true, useUnifiedTopology: true});
mongoose.connection.on("connected", function(){
    console.log(process.env.CON_CONNECT_MSG+process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function(){
    console.log(process.env.CON_DISCONNECT_MSG);
});
mongoose.connection.on("error", function(err){
    console.log(process.env.CON_ERROR_MSG + err);
});
process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MSG);
        process.exit(0);
    })
})
process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGTERM_MSG);
        process.exit(0);
    })
})
process.on("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MSG);
        process.kill(process.pid,"SIGUSR2");
    })
})