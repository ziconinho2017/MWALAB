require("dotenv").config();
const express = require("express");
const path = require('path');
const app = express();
app.post('/',function(req,res){
    res.status(200).json("{response:JSON}");
})
app.use(express.static(path.join(__dirname,'public')))
app.listen(process.env.PORT);
