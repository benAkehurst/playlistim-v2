(function(){

	"use strict";

	var addModule = angular.module("addModule", []);
		
	addModule.controller("AddController", function($scope, $http, $location){


		var title = $scope.videoTitle;
		var category = $scope.videoCategory;
		var description = $scope.videoDescription;
		var link = $scope.videoLink;
		
		var newVideo = {
			"title":title,
		   	"category":category,
		   	"description":description,
		   	"link":link
		}

		$http({
				method  : 'POST',
				url     : '/addVideo',
				headers : { 'Content-Type': 'application/json'  },
				data    : newVideo
		});


		// Allows the button click to take you back to the profile
		$scope.redirectProfile = function() {
			window.location = ".#!/profile";
		}

	});

})();