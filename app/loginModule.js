(function(){

	"use strict";

	var loginModule = angular.module("loginModule", []);

	loginModule.controller("LoginController", function($scope, $http){

		$scope.login = function() {


			var loginEmail = $scope.loginEmail;
			var loginPassword = $scope.loginPassword;

			var loginDetails = {
				"email":loginEmail,
				"password":loginPassword
			}

		}

	});

})();