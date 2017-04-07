(function(){

	"use strict";

	var playModule = angular.module("playModule", []);

	playModule.controller("PlayController", function($scope, $http, $location, $rootScope){

		var videoToPlay = $rootScope.videoToPlay;
		console.log(videoToPlay);

		$scope.title = videoToPlay.title;
		$scope.cat = videoToPlay.category;
		$scope.description = videoToPlay.description;
		$scope.link = videoToPlay.link;

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