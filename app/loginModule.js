(function(){

	"use strict";

	var loginModule = angular.module("loginModule", []);

	loginModule.controller("LoginController", function($scope, $http, $location, $rootScope){

		$scope.login = function() {

			// These varables are made of the user entered email and password to login
			var loginEmail = $scope.loginEmail;
			var loginPassword = $scope.loginPassword;

			// console.log("From login controller" + "\nEmail: " + loginEmail + "\nPassword: " + loginPassword);

			// Here we make an object of the login and password
			var loginDetails = {
				"email":loginEmail,
				"password":loginPassword
			}

			// console.log("Login Object: " + JSON.stringify(loginDetails));

			// In the http request to the server we send over the user details object
			$http({
				method:"POST",
				url:"/login",
				headers:{ 'Content-Type': 'application/json'  },
				data:loginDetails
			})

			// In response from the server we get a confimation if the user is registered or not
			.then(function(response){
				var status = response.data[0].registered;
				var name = response.data[0].name;
				var id = response.data[0].id;

				// console.log(status);
				// console.log(name);
				// console.log(email);

				$rootScope.usersName = name;
			
				if(status === true){
					//If the user logs in we set a session token with the users name
					sessionStorage.setItem('user',JSON.stringify(name));
					sessionStorage.setItem('id',id);

					$location.path("/profile");
				}

			});


		}

	});

})();