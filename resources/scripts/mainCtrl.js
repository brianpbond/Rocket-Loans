angular.module('customerApp')
.controller('mainCtrl', function($scope){
	$scope.createForm = {};
	
	$scope.createCustomer = function(isValid){
		console.log('isValid',isValid);
	};
});