(function(){

	"use strict";

	var editModule = angular.module("editModule", []);

	editModule.controller("EditController", function($scope, $http, $location, $rootScope, $window, $timeout){

		// Allows placeholder in edit view to populate with the current details
		var detailsForDisplay = $rootScope.videoDetailsToEdit;
		$scope.titleToEdit = detailsForDisplay.title;
		$scope.categoryToEdit = detailsForDisplay.category;
		$scope.descriptionToEdit = detailsForDisplay.description;
		$scope.linkToEdit = detailsForDisplay.link;

		// Update
		$scope.updateDetails = function(){

			var detailsToEdit = $rootScope.videoDetailsToEdit;
			// console.log(detailsToEdit);

			var userID = detailsToEdit.userID;
			var videoToEdit = detailsToEdit.title;
			var updatedVideoTitle = $scope.updatedVideoTitle;
			var updatedVideoCategory = $scope.updatedVideoCategory;
			var updatedVideoDescription = $scope.updatedVideoDescription;
			var updatedVideoLink = $scope.updatedVideoLink;

			// console.log("User ID: " + userID + "\nVideo to be edited: " + videoToEdit + "\nTitle: " + updatedVideoTitle + "\nCategory: " + updatedVideoCategory + "\nDescription: " + updatedVideoDescription + "\nLink: " + updatedVideoLink);
			
			// Making the user submitted url into a variable for checking validity
			var updatedVideoLink = updatedVideoLink;
			// Call the function to check if url is valid
			var youtubeUrlIsValid = matchYoutubeUrl(updatedVideoLink);

			if (youtubeUrlIsValid == true){
				var editedDetails = {
					"userID":userID,
					"videoToEditTitle":videoToEdit,
					"title":updatedVideoTitle,
					"category":updatedVideoCategory,
					"description":updatedVideoDescription,
					"link":updatedVideoLink
				}

				// console.log("New Video Object: " + JSON.stringify(editedDetails));

				// In the http request to the server we send over the user details object
				$http({
					method:"PATCH",
					url:"/updateVideoDetails",
					headers:{ 'Content-Type': 'application/json'  },
					data:editedDetails
				})

				.then(function(response){
					// Clear the error message if a value exists
					$scope.youtubeUrlInvalid = "";

					$scope.updateSuccess = "Details Updated!"

					if(response){
						$timeout(function() {
					      $location.path('/profile');;
					      }, 2000);
					}
				});
			}
			else {
				// presents an error message if the youtube url is not valid
				$scope.youtubeUrlInvalid = "Please check the Youtube URL";
			}
		}

		$scope.backToPlaylist = function(){
			$location.path("/profile");
		}
		
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