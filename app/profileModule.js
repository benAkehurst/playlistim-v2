(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location){

		$scope.addVideo = function(){
			var videoTitle = $scope.videoTitle;
			var videoCategory = $scope.videoCategory;
			var videoDescription = $scope.videoDescription;
			var videoLink = $scope.videoLink;

			console.log("From login controller" + "\nTitle: " + videoTitle + "\nCategory: " + videoCategory + "\nDescription: " + videoDescription + "\nLink: " + videoLink);

			// Here we make an object of the login and password
			var newVideo = {
				"title":videoTitle,
				"category":videoCategory,
				"description":videoDescription,
				"link":videoLink
			}

			console.log("New Video Object: " + JSON.stringify(newVideo));

			// In the http request to the server we send over the user details object
			$http({
				method:"POST",
				url:"/add",
				headers:{ 'Content-Type': 'application/json'  },
				data:newVideo
			})
		}

		$http.get("./videos.json").then(function(response){

				$scope.videos = response.data; // products = model (data type)

			}); // End of then

		// When the user logs out
		$scope.logout = function(){
			// The session storage is cleared
			sessionStorage.clear();
			// The user is redirected back to the homepage
			$location.path("/");
		}
		

	});

})();