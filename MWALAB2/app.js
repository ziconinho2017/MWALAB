const http = require("http");
const fs = require("fs");
const path = require("path");
const serveAllReq = function(req,res){
    if(req.method == 'POST'){
        res.setHeader("Content-type","application/json");
        res.writeHead(200);
        res.end("{'message':'JSON RESPONSE'}");
    }else{
        let statusCode;
        let fileBuffer;
        switch(req.url){
            case "/":
                res.setHeader("Content-type","text/html");
                fs.readFile(path.join(__dirname,"index.html"),function(err,buffer){
                    if(err){
                        statusCode = 404;
                        fileBuffer = "File Not Found";
                    }else{
                        statusCode = 200;
                        fileBuffer = buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                })
                break;
            case "/page1":
                res.setHeader("Content-type","text/html");
                fs.readFile(path.join(__dirname,"page1.html"),function(err,buffer){
                    if(err){
                        statusCode = 404;
                        fileBuffer = "File Not Found";
                    }else{
                        statusCode = 200;
                        fileBuffer = buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                })
                break;
            case "/page2":
                res.setHeader("Content-type","text/html");
                fs.readFile(path.join(__dirname,"page2.html"),function(err,buffer){
                    if(err){
                        statusCode = 404;
                        fileBuffer = "File Not Found";
                    }else{
                        statusCode = 200;
                        fileBuffer = buffer;
                    }
                    res.writeHead(statusCode);
                    res.end(fileBuffer);
                })
                break;
        }
    }
}
const server = http.createServer(serveAllReq);
server.listen(4343,"localhost",function(){
    console.log("Server is running on port 4343");
});