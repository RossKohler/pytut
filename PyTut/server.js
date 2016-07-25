var express = require("express");
var parser = require("body-parser");
var pythonShell = require('python-shell');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var app = express();


app.use(parser.urlencoded({ extended : true }));
app.post("/yourpath", function (request, response) {
    
    if (request.body != null) {
        userId = request.body.userId;
        script = request.body.script;
        

        fs.writeFile(__dirname+"/TestScripts/"+userId+".py", script, function (err) {
            if (err) {
                return console.log(err);
            }
            var options = {
                scriptPath: __dirname + "/TestScripts/",
            };
            pythonShell.run(userId+".py", options, function (err, results) {
                if (err) return console.log(err);
                // results is an array consisting of messages collected during execution
                response.send(results);
                console.log('results: %j', results);
            });
            console.log("The file was saved!");
        }); 


    }
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
});

app.listen(8080);
