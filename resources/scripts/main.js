angular.module('customerApp', [])
.directive('appMain', function(){
	return {
		restrict: 'E',
		templateUrl: '/templates/app-main.html',
		controller: 'mainCtrl'
	};
});