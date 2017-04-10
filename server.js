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
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/playlistimDB", function(err){
	if(err){
		console.log("Error: " + err);
	}
	else {
		console.log("Connected to MongoDB")
	}
});

// Mongoose Schema - New User
var User = mongoose.model("User",{
	name:String,
	email:String,
	password:String,
	videos:[],
});

// Add a new user to the database
app.post("/register", function(request, response){
	// Using the User Schema, we make a new user with user supplied details
	var newUser = new User(request.body);
	// The user is saved to the DB
	newUser.save();
	response.status(201);
	response.send("Registered");
	// console.log(newUser);
});

// Checks if a user exists in the DB for login
app.post("/login", function(request, response){
	// We receive the $http request from the login
	// In the DB we look for the user provided UN and PW
	User.findOne({email:request.body.email, 
				  password:request.body.password})
		// If there is an error the program stops and the error is logged in the console
		.exec(function(err, user){
		if(err){
			console.log("Error: " + err);
		}
		// If there is no error
		else{
			// if there is no user
			if(user === null){
				// We send back to the controller an object with the value false
				var notRegistered = [{"registered":false}];
				response.send(JSON.stringify(notRegistered));
			}
			// If the user exists in the DB
			else{
				// We send back to the controller an object with the value true, the users name and email to be saved in session storage
				var registered = [{"registered":true, "name":user.name, "id":user._id}];
				response.send(JSON.stringify(registered));
			}
		}
	});
});

// Add a video
app.post("/addVideo", function(request,response){
	
	var newVideo = request.body;
	
	console.log(newVideo);

	User.update({_id:newVideo.userID}, 
				{$push:{ videos:newVideo }}, 
				{upsert:true}, 

		function(err){
		
		if(err){
			console.log("Error: " + err);
		}
		else {
			console.log("Added!");
		}
	});
});

// Gets all the videos in the DB accosiated with the user
app.get("/getUserVideos", function(request,response){

	User.findOne({},function(err,videos){
		response.send(videos);
		// console.log(videos);
	});
});

// Updates user provided details for specific video
app.patch("/updateVideoDetails",function(request,response){

});

// Delete a single video from the playlist: 
app.delete("/removeVideo", function(request, response){

	var videoToRemove = request.body;

	console.log(videoToRemove);

	User.update(

		{_id:videoToRemove.userID},
		{$pull:{videos:{link:videoToRemove.link}}},
		{safe:true}, 

		function(err){
		
		if(err){
			console.log("Error: " + err);
		}
		else {
			console.log("Deleted!");
		}
	});
});

// Sets up express to run on port 3000
app.listen(3000, function(){
	console.log("Running on http://localhost:3000");
});