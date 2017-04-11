(function(){

	"use strict";

	var editModule = angular.module("editModule", []);

	editModule.controller("EditController", function($scope, $http, $location, $rootScope, $window, $timeout){

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

				$scope.updateSuccess = "Details Updated!"

				if(response){
					$timeout(function() {
				      $location.path('/profile');;
				      }, 2000);
				}
			});
		}

		$scope.backToPlaylist = function(){
			$location.path("/profile");
		}
		
	});

})();