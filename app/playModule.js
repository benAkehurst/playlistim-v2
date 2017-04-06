(function(){

	"use strict";

	var playModule = angular.module("playModule", []);

	playModule.controller("PlayController", function($scope, $http, $location, $rootScope){

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
		
	});

})();