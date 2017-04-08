(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location, $rootScope,$window){

		// Create
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

			
			// Set back to pristine.
			$scope.newVideoAddForm.$setPristine();
			// Since Angular 1.3, set back to untouched state.
			$scope.newVideoAddForm.$setUntouched();

			// Each time the playlist has a video added, the playlist gets reloaded
			getVideos();
		} // End of adding a video

		// Read
		var getVideos = function(){
			
			$http.get("/getUserVideos").then(function(response){
				
				$scope.videos = response.data.videos; // products = model (data type)
				// console.log(response.data.videos);
			
			}); // End of get
		}

		// Allows for redirecting to the play page
		$scope.redirect = function(item){

			$rootScope.videoToPlay = item;

			$location.path('/play');
		}

		// Logout Function - Fires where user logs out
		$scope.logout = function(){
			// The session storage is cleared
			sessionStorage.clear();
			// The user is redirected back to the homepage
			$location.path("/");
		}

		$scope.redirectToYoutube = function(item){
			var link = item.link;
            $window.open(link, '_blank');
        };

        // Delete
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
		}

		// Calls the users playlist on profile load
		var init = function(){
			getVideos();
		}

		//calls the init function when the controller is loaded
		init();
		
	});

})();