(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location, $rootScope){

		// Get the videos from user profile in DB
		$scope.getVideos = function(){
			
			$http.get("/getUserVideos").then(function(response){
				
				$scope.videos = response.data.videos; // products = model (data type)
			
			}); // End of get
		}

		$scope.removeVideo = function(){
			

			var title = $scope.videoTitleInTable;

			console.log(title);

			var titleObj = {"title":title}

			console.log(JSON.stringify(titleObj));

			$http({
				method:"DELETE",
				url:"/removeVideo",
				headers:{ 'Content-Type': 'application/json'  },
				data:titleObj
			});


			$scope.getVideos();
		}

		// Adding a video
		$scope.addVideo = function(){
			var videoTitle = $scope.videoTitle;
			var videoCategory = $scope.videoCategory;
			var videoDescription = $scope.videoDescription;
			var videoLink = $scope.videoLink;

			// console.log("From login controller" + "\nTitle: " + videoTitle + "\nCategory: " + videoCategory + "\nDescription: " + videoDescription + "\nLink: " + videoLink);

			var userID = sessionStorage.getItem('id');
			// console.log(userID);

			// Here we make an object of the login and password
			var newVideo = {
				"userID":userID,
				"title":videoTitle,
				"category":videoCategory,
				"description":videoDescription,
				"link":videoLink
			}

			// console.log("New Video Object: " + JSON.stringify(newVideo));

			// In the http request to the server we send over the user details object
			$http({
				method:"POST",
				url:"/addVideo",
				headers:{ 'Content-Type': 'application/json'  },
				data:newVideo
			});

			// Each time the playlist has a video added, the playlist gets reloaded
			$scope.getVideos();
		} // End of adding a video

		// When the user logs out
		$scope.logout = function(){
			// The session storage is cleared
			sessionStorage.clear();
			// The user is redirected back to the homepage
			$location.path("/");
		}
		
	});

})();