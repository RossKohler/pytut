var express = require("express");
var parser = require("body-parser");
var pythonShell = require('python-shell');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var app = express();

var dbURL = 'mongodb://localhost:27017/test_cases';




function createTestCases(){
    MongoClient.connect(dbURL, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', dbURL);
            var collection = db.collection("test1");
            
            var doc1 = { 'inputs': [5, 6, 100, 9], 'output': 120 }
            var doc2 = { 'inputs': [0, 9, 50, 3, 90, 42], 'output': 194 }
            var doc3 = { 'inputs': [5, 6], 'output': "11" }
            var doc4 = { 'inputs': [5], 'output': 0 }
            var doc5 = { 'inputs': [5, 5, 5, 5, 5], 'output': 25 }
            
            collection.insert(doc1);
            collection.insert(doc2);
            collection.insert(doc3);
            collection.insert(doc4);
            collection.insert(doc5);
            
            var cursor = db.collection('test1').find();
            cursor.each(function (err, doc) {
                console.log("hello");
                assert.equal(err, null);
                if (doc != null) {
                    console.dir(doc);
                }
            });


            db.close();
        }
    });
}

//createTestCases();


app.use(parser.urlencoded({ extended : true }));
app.post("/yourpath", function (request, response) {
    
    if (request.body != null) {
        userId = request.body.userId;
        script = ""
        for (var i = 0; i < request.body.script.length; i++) {
            script += request.body.script[i] + "\n";
        }
        script = script.trim();
        name = request.body.name;

        fs.writeFile(__dirname+"/TestScripts/"+userId+".py", script, function (err) {
            if (err) {
                return console.log(err);
            }
            MongoClient.connect(dbURL, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                } else {
                    var cursor = db.collection(name).find();
                    var count = 0;
                    var totalCorrect = 0;
                    var finalResults = [];
                    cursor.each(function (err, doc) {
                        
                      
                        

                        assert.equal(err, null);
                        if (doc != null) {
                            var options = {
                                scriptPath: __dirname + "/TestScripts/",
                            };
                            if (doc.inputs) {
                                options.args = doc.inputs;
                            }
   
                            pythonShell.run(userId + ".py", options, function (err, results) {
                                

                                if (err) return console.log(err);
                                // results is an array consisting of messages collected during execution
                                //response.send(results);
                               // console.log('results: %j', results);
                                var test = {}
                                count += 1;
                                if (doc.output = results) {
                                    test.isCorrect = true;
                                    totalCorrect += 1;
                                }
                                else {
                                    test.isCorrect = false;
                                }
                                test.results = results;
                                finalResults.push(test);
                            });
                        }
                    });
                    console.log(finalResults);
                    db.close();
                }
            });
        }); 


    }
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)
});

app.listen(8080);
