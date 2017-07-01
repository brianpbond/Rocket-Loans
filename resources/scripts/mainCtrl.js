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
			editingCustomerId: null,
			loadingEditCustomer: false,
			loadingLookupCustomer: false,
			lookupError: false,
			lookupErrorMessage: null
		};
		$scope.createFields = {};
		if($scope.createForm){ $scope.createForm.$setPristine(); }
		for (var form in $scope.editForms) {
			if ($scope.editForms.hasOwnProperty(form) && $scope.editForms[form]) {
				$scope.editForms[form].$setPristine();
			}
		}
		$scope.customerLookupData = {};
		$scope.lookupIdValue = '';
		if($scope.customerLookupForm){ $scope.customerLookupForm.$setPristine(); }
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
		return (state.addingCustomer || state.loadingAddCustomer || state.editingCustomer || state.loadingLookupCustomer);
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
	
	$scope.getCustomerById = function(customerId){
		var customers = $scope.allCustomers;
		for(var i=0; i<customers.length; i++){
			if(customers[i].customerId === customerId){
				return customers[i];
			}
		}
		return false;
	};
	
	$scope.updateCustomer = function(customerId, customerObj){
		$scope.state.loadingEditCustomer = true;
		var customerResultDestination = $scope.getCustomerById(customerId);
		$http.put('/customers/' + customerId, customerObj).then(function successCallback(response){
			if(response.data && response.data.customerId === customerId){
				angular.extend(customerResultDestination, response.data);
				$scope.resetState();
				$scope.successMessage('Customer updated.');
			} else {
				$scope.resetState();
				$scope.errorMessage('Unable to update customer. Please reload and try again.');
			}
		}, function errorCallback(response){
			$scope.resetState();
			$scope.errorMessage('Unable to update customer. Please reload and try again.');
		});
	};
	
	$scope.editCustomer = function(currentCustomer){
		var customerId = currentCustomer.customerId;
		$scope.resetState();
		$scope.state.editingCustomer = true;
		$scope.state.editingCustomerId = customerId;
		$scope.editFields.firstName[customerId] = currentCustomer.firstName;
		$scope.editFields.lastName[customerId] = currentCustomer.lastName;
		$scope.editFields.address[customerId] = currentCustomer.address;
		$scope.editFields.city[customerId] = currentCustomer.city;
		$scope.editFields.state[customerId] = currentCustomer.state;
		$scope.editFields.zip[customerId] = currentCustomer.zip;
		$scope.editFields.phone[customerId] = currentCustomer.phone;
	};
	
	$scope.saveEditCustomer = function(valid, customerId){
		if(valid){
			var currentCustomer = $scope.getCustomerById(customerId);
			var newCustomerObj = {
				'firstName': $scope.editFields.firstName[customerId],
				'lastName': $scope.editFields.lastName[customerId],
				'address': $scope.editFields.address[customerId],
				'city': $scope.editFields.city[customerId],
				'state': $scope.editFields.state[customerId],
				'zip': $scope.editFields.zip[customerId],
				'phone': $scope.editFields.phone[customerId]
			};
			$scope.updateCustomer(customerId, newCustomerObj);
		}
	};
	
	$scope.removeCustomerFromList = function(customerId){
		var allCustomers = $scope.allCustomers;
		for(var i=0; i<allCustomers.length; i++){
			if(allCustomers[i].customerId === customerId){
				allCustomers.splice(i,1);
				break;
			}
		}
	};
	
	$scope.setCustomerDeleteUndo = function(address){
		$scope.undoData.customerDelete = address;
	};
	
	$scope.undoDeleteCustomer = function(){
		var address = $scope.undoData.customerDelete;
		if(address){
			$scope.saveCustomer(true, address);
		} else {
			$scope.resetState();
			$scope.errorMessage('Unable to undo delete.');
		}
	};
	
	$scope.deleteCustomer = function(customerId){
		$scope.resetState();
		var customerObj = $scope.getCustomerById(customerId);
		$http.delete('/customers/' + customerId).then(function successCallback(response) {
			$scope.resetState();
			if(customerObj){
				$scope.setCustomerDeleteUndo(customerObj);
			}
			$scope.state.customerDeleted = true;
			$scope.removeCustomerFromList(customerId);
		}, function errorCallback(response) {
			$scope.resetState();
			$scope.errorMessage('Unable to delete customer. Please reload and try again.');
		});
	};
	
	$scope.lookupCustomer = function(isValid){
		if(isValid){
			$scope.state.loadingLookupCustomer = true;
			$http.get('/customers/' + $scope.lookupIdValue).then(function successCallback(response){
				$scope.resetState();
				$scope.customerLookupData = response;
			}, function errorCallback(response){
				$scope.resetState();
				$scope.customerLookupData = {};
				$scope.state.lookupErrorMessage = response.data;
				$scope.state.lookupError = true;
			});
		}
	}
	
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