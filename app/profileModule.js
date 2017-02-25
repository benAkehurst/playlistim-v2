(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http, $location){

		// When the user logs out
		$scope.logout = function(){
			// The session storage is cleared
			sessionStorage.clear();
			// The user is redirected back to the homepage
			$location.path("/");
		}
		

	});

})();