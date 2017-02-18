(function(){

	"use strict";

	var profileModule = angular.module("profileModule", []);

	profileModule.controller("ProfileController", function($scope, $http){

		$http.get("videos.json").then(function(response){
			$scope.videos = response.data;
		});

		

	});

})();