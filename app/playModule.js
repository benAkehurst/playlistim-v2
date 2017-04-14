(function(){

	"use strict";

	var playModule = angular.module("playModule", []);

	playModule.controller("PlayController", function($scope, $http, $location, $rootScope, $window, $cookieStore){

		// Gets the specific video details from the play button
		var video = $rootScope.videoToPlay;
			
		// Takes the video title and makes it avaliable for the viewer
		$scope.title = video.title;

		// Strips out the specific ID from the youtube link
		var link = video.link;
		var youtubeClipID = getId(link);
		$scope.selectdVideoToPlay = youtubeClipID;
		
		// Enables the back button on the page
		$scope.backToPlaylist = function(){
			$location.path("/profile");
		}

	});

	// This function splits the url provided from the profile and splits the url at the point before the id
	function getId(link){
		var str = link;
	    var splitedValue = str.split("=");
	    return splitedValue[splitedValue.length-1];
	}

})();