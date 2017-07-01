//directive to show scope when items become visible
angular.module('customerApp').directive('showFocus', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $element, $attr) {
			if ($attr.showFocus){
				$scope.$watch($attr.showFocus, function(newValue){
					if(newValue){
						$timeout(function(){
							$element[0].focus();
						}, 0);
					}
				})
			}
		}
	};
});
