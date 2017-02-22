(function(){

	"use strict";

	var loginModule = angular.module("loginModule", []);

	loginModule.controller("LoginController", function($scope, $http){

		$scope.login = function() {


			var loginEmail = $scope.loginEmail;
			var loginPassword = $scope.loginPassword;

			console.log("From login controller" + "\nEmail: " + loginEmail + "\nPassword: " + loginPassword);

			var loginDetails = {
				"email":loginEmail,
				"password":loginPassword
			}

			console.log("Login Object: " + JSON.stringify(loginDetails));

			$http({
				method:"POST",
				url:"/login",
				headers:{ 'Content-Type': 'application/json'  },
				data:loginDetails

			});

		}

	});

})();