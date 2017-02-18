// All the dependencies required for the app
var express = require("express");
var fs = require("fs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var crypto = require("crypto");

// Makes a variable out of express
var app = express();

// Makes allows express to access the webpage body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Sets index.html to the homepage
app.use(express.static(__dirname));

// Using mongoose to connect to the database
mongoose.connect("mongodb://localhost:27017/playlistimDB", function(err){
	if(err){
		console.log("Error: " + err);
	}
	else {
		console.log("Connected to MongoDB")
	}
});

// Sets up express to run on port 3000
app.listen(3000, function(){
	console.log("Running on http://localhost:3000");
});