angular.module('customerApp')
.controller('mainCtrl', function($scope, $http, $filter){
	$scope.useStates = [
		{
			"stateName": "Alabama",
			"stateCode": "AL"
		},
		{
			"stateName": "Alaska",
			"stateCode": "AK"
		},
		{
			"stateName": "American Samoa",
			"stateCode": "AS"
		},
		{
			"stateName": "Arizona",
			"stateCode": "AZ"
		},
		{
			"stateName": "Arkansas",
			"stateCode": "AR"
		},
		{
			"stateName": "California",
			"stateCode": "CA"
		},
		{
			"stateName": "Colorado",
			"stateCode": "CO"
		},
		{
			"stateName": "Connecticut",
			"stateCode": "CT"
		},
		{
			"stateName": "Delaware",
			"stateCode": "DE"
		},
		{
			"stateName": "District Of Columbia",
			"stateCode": "DC"
		},
		{
			"stateName": "Federated States Of Micronesia",
			"stateCode": "FM"
		},
		{
			"stateName": "Florida",
			"stateCode": "FL"
		},
		{
			"stateName": "Georgia",
			"stateCode": "GA"
		},
		{
			"stateName": "Guam",
			"stateCode": "GU"
		},
		{
			"stateName": "Hawaii",
			"stateCode": "HI"
		},
		{
			"stateName": "Idaho",
			"stateCode": "ID"
		},
		{
			"stateName": "Illinois",
			"stateCode": "IL"
		},
		{
			"stateName": "Indiana",
			"stateCode": "IN"
		},
		{
			"stateName": "Iowa",
			"stateCode": "IA"
		},
		{
			"stateName": "Kansas",
			"stateCode": "KS"
		},
		{
			"stateName": "Kentucky",
			"stateCode": "KY"
		},
		{
			"stateName": "Louisiana",
			"stateCode": "LA"
		},
		{
			"stateName": "Maine",
			"stateCode": "ME"
		},
		{
			"stateName": "Marshall Islands",
			"stateCode": "MH"
		},
		{
			"stateName": "Maryland",
			"stateCode": "MD"
		},
		{
			"stateName": "Massachusetts",
			"stateCode": "MA"
		},
		{
			"stateName": "Michigan",
			"stateCode": "MI"
		},
		{
			"stateName": "Minnesota",
			"stateCode": "MN"
		},
		{
			"stateName": "Mississippi",
			"stateCode": "MS"
		},
		{
			"stateName": "Missouri",
			"stateCode": "MO"
		},
		{
			"stateName": "Montana",
			"stateCode": "MT"
		},
		{
			"stateName": "Nebraska",
			"stateCode": "NE"
		},
		{
			"stateName": "Nevada",
			"stateCode": "NV"
		},
		{
			"stateName": "New Hampshire",
			"stateCode": "NH"
		},
		{
			"stateName": "New Jersey",
			"stateCode": "NJ"
		},
		{
			"stateName": "New Mexico",
			"stateCode": "NM"
		},
		{
			"stateName": "New York",
			"stateCode": "NY"
		},
		{
			"stateName": "North Carolina",
			"stateCode": "NC"
		},
		{
			"stateName": "North Dakota",
			"stateCode": "ND"
		},
		{
			"stateName": "Northern Mariana Islands",
			"stateCode": "MP"
		},
		{
			"stateName": "Ohio",
			"stateCode": "OH"
		},
		{
			"stateName": "Oklahoma",
			"stateCode": "OK"
		},
		{
			"stateName": "Oregon",
			"stateCode": "OR"
		},
		{
			"stateName": "Palau",
			"stateCode": "PW"
		},
		{
			"stateName": "Pennsylvania",
			"stateCode": "PA"
		},
		{
			"stateName": "Puerto Rico",
			"stateCode": "PR"
		},
		{
			"stateName": "Rhode Island",
			"stateCode": "RI"
		},
		{
			"stateName": "South Carolina",
			"stateCode": "SC"
		},
		{
			"stateName": "South Dakota",
			"stateCode": "SD"
		},
		{
			"stateName": "Tennessee",
			"stateCode": "TN"
		},
		{
			"stateName": "Texas",
			"stateCode": "TX"
		},
		{
			"stateName": "Utah",
			"stateCode": "UT"
		},
		{
			"stateName": "Vermont",
			"stateCode": "VT"
		},
		{
			"stateName": "Virgin Islands",
			"stateCode": "VI"
		},
		{
			"stateName": "Virginia",
			"stateCode": "VA"
		},
		{
			"stateName": "Washington",
			"stateCode": "WA"
		},
		{
			"stateName": "West Virginia",
			"stateCode": "WV"
		},
		{
			"stateName": "Wisconsin",
			"stateCode": "WI"
		},
		{
			"stateName": "Wyoming",
			"stateCode": "WY"
		}
	];
	
	//clear all state
	$scope.resetState = function(){
		$scope.state = {
			addingCustomer: false,
			error: false,
			success: false,
			errorMessage: null,
			successMessage: null,
			loadingAddCustomer: false,
			customerDeleted: false,
			editingCustomer: false,
			editingCustomerId: null
		};
		$scope.createFields = {};
		if($scope.createForm){ $scope.createForm.$setPristine(); }
		for (var form in $scope.editForms) {
			if ($scope.editForms.hasOwnProperty(form) && $scope.editForms[form]) {
				$scope.editForms[form].$setPristine();
			}
		}
	};
	//initialize state
	$scope.resetState();
	
	//initialize data objects
	$scope.undoData = {};
	$scope.editForms = {};
	$scope.editFields = {
		firstName: {},
		lastName: {},
		address: {},
		city: {},
		state: {},
		zip: {},
		phone: {}
	};
	$scope.createForm = {};
	$scope.allCustomers = [];
	
	$scope.inProgress = function(){
		var state = $scope.state;
		return (state.addingCustomer || state.loadingAddCustomer || state.editingCustomer);
	};
	$scope.successMessage = function(message){
		$scope.state.successMessage = message;
		$scope.state.success = true;
	};
	$scope.errorMessage = function(message){
		$scope.state.errorMessage = message;
		$scope.state.error = true;
	};
	$scope.cancelAction = function(){
		$scope.resetState();
	}
	
	$scope.addCustomer = function(){
		$scope.resetState();
		$scope.state.addingCustomer = true;
	}
	
	$scope.saveCustomer = function(isValid, newCustomer){
		var customer = newCustomer ? newCustomer : $scope.createFields;
		if(isValid){
			$scope.state.loadingAddCustomer = true;
			$http.post('/customers', customer).then(function successCallback(response){
				if(response.data && response.data.customerId){
					var newCustomer = angular.extend({},response.data);
					$scope.allCustomers.push(newCustomer);
					$scope.resetState();
					$scope.successMessage('Customer added.');
				} else {
					$scope.resetState();
					$scope.errorMessage('Unable to add customer. Please reload and try again.');
				}
			}, function errorCallback(response){
				$scope.resetState();
				$scope.errorMessage('Unable to add customer. Please reload and try again.');
			});
		}
	};
	
	$scope.loadCustomers = function(){
		$http.get('/customers').then(function successCallback(response){
			var customerArray = response.data;
			if(customerArray){
				$scope.allCustomers = customerArray && customerArray.length ? customerArray.slice() : [];
				if($scope.allCustomers.length < 1){ $scope.state.addingCustomer = true; }
			} else {
				$scope.resetState();
				$scope.errorMessage('Unable to load customer information. Please wait a moment and reload.');
			}
		}, function errorCallback(response){
			$scope.resetState();
			$scope.errorMessage('Unable to load customer information. Please wait a moment and reload.');
		});
	};
	$scope.loadCustomers();
});