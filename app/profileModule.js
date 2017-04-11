(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location, $rootScope, $window){

		// Create
		$scope.addVideo = function(){
			var videoTitle = $scope.videoTitle;
			var videoCategory = $scope.videoCategory;
			var videoDescription = $scope.videoDescription;
			var videoLink = $scope.videoLink;

			// console.log("From login controller" + "\nTitle: " + videoTitle + "\nCategory: " + videoCategory + "\nDescription: " + videoDescription + "\nLink: " + videoLink);

			var userID = localStorage.getItem('id');
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
			getVideos();
		}

		// Read
		var getVideos = function(){

			var userID = localStorage.getItem('id');
			// // console.log(userID);

			var userIdObj = {
				"userID":userID
			}
			// console.log(userIdObj);

			$http({
				method:"POST",
				url:"/getUserVideos",
				headers:{ 'Content-Type': 'application/json'  },
				data:userIdObj
			})
			
			.then(function(response){
				
				$scope.videos = response.data.videos; // products = model (data type)
				// console.log(response.data.videos);
			
			}); // End of get
		}

		// Delete
		$scope.removeVideo = function(item){
			
			var videoToRemove = item;

			var userID = localStorage.getItem('id');

			var videoToRemoveObj = {"userID":userID, "link":item.link}

			// console.log(JSON.stringify(videoToRemoveObj));

			$http({
				method:"DELETE",
				url:"/removeVideo",
				headers:{ 'Content-Type': 'application/json'  },
				data:videoToRemoveObj
			}).

			then(function(response){
				var status = response.data[0].status;

				if (status == false){
					$scope.notDeleted = "Not Deleted";
				}
			
				else {
					$scope.deleted = "Deleted";
				}
			});

			getVideos();
		}

		//Link to the edit page
		$scope.editDetails = function(item){
			$rootScope.videoDetailsToEdit = item;
			$location.path("/edit");
		}

		// Logout Function - Fires where user logs out
		$scope.logout = function(){
			// The session storage is cleared
			sessionStorage.clear();
			localStorage.clear();
			// The user is redirected back to the homepage
			$location.path("/");
		}

		// Play button opens new tab with youtube video playing
		$scope.redirectToYoutube = function(item){
			var link = item.link;
            $window.open(link, '_blank');
        };

		// Calls the users playlist on profile load
		var init = function(){
			getVideos();
			var usernameFromLogin = sessionStorage.getItem('user');
			$scope.usersName = usernameFromLogin;
		}
		//calls the init function when the controller is loaded
		init();
		
	});

})();