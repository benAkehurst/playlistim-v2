(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location, $rootScope, $window, $cookieStore){

		// Create
		$scope.addVideo = function(){

			var videoTitle = $scope.videoTitle;
			var videoCategory = $scope.videoCategory;
			var videoDescription = $scope.videoDescription;
			var videoLink = $scope.videoLink;

			// console.log("From login controller" + "\nTitle: " + videoTitle + "\nCategory: " + videoCategory + "\nDescription: " + videoDescription + "\nLink: " + videoLink);

			// Making the user submitted url into a variable for checking validity
			var videoLinkFromClient = videoLink;
			// Call the function to check if url is valid
			var youtubeUrlIsValid = matchYoutubeUrl(videoLinkFromClient);

			// If the function returns true we make a new item
			if (youtubeUrlIsValid == true){

				// gets the users ID from the local storage
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

				// Clears form after submit
				$scope.videoTitle = "";
				$scope.videoCategory = "";
				$scope.videoDescription = "";
				$scope.videoLink = "";
    			
    			// Each time the playlist has a video added, the playlist gets reloaded
				getVideos();
				// Clear the error message if a value exists
				$scope.youtubeUrlInvalid = "";
			}
			else {
				// presents an error message if the youtube url is not valid
				$scope.youtubeUrlInvalid = "Please check the Youtube URL";
			}
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
			// If the user chooses to log out, all data stored is cleared
			sessionStorage.clear();
			localStorage.clear();
			$cookieStore.remove("user");
			// The user is redirected back to the homepage
			$location.path("/");
		}

		// Play button opens new tab with youtube video playing
		$scope.redirectToYoutube = function(item){
			// var link = item.link;
   //          $window.open(link, '_blank');
   			$rootScope.videoToPlay = item;
   			$location.path("/play");
        };

        // Calls the users playlist on profile load
		var init = function(){
			getVideos();
			var usernameFromLogin = localStorage.getItem('user');
			$scope.usersName = usernameFromLogin;
		}
        //calls the init function when the controller is loaded
		init();

	});

	// Function used for validating youtube url
	function matchYoutubeUrl(url) {
    	var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
   		var matches = url.match(p);
    	if(matches){
        	return true;
    	}
    	return false;
	}

})();