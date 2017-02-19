// Runs the modules that are installed
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Puts express in a variable
var app = express();

// Runs body parser and json access
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Sets index.html to the homepage
app.use(express.static(__dirname));

// Mongoose connets us to the MongoDB database called playlistimDB
mongoose.connect("mongodb://localhost:27017/playlistimDB", function(err){
	if(err){
		console.log("Error: " + err);
	}
	else {
		console.log("Connected to MongoDB")
	}
});

// Mongoose Schema - New User
var NewUser = mongoose.model("NewUser",{
	name:String,
	email:String,
	password:String
});

// Add a new user to the database
app.post("/register", function(request, response){
	var newUser = new NewUser(request.body);
	newUser.save();
	response.status(201);
});


// Sets up express to run on port 3000
app.listen(3000, function(){
	console.log("Running on http://localhost:3000");
});