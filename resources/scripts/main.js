angular.module('customerApp', ['ui.mask','bc.TelephoneFilter'])
.directive('appMain', function(){
	return {
		restrict: 'E',
		templateUrl: '/templates/app-main.html',
		controller: 'mainCtrl'
	};
});