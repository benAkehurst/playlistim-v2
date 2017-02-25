(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location){

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