module.exports.getCustomer = getCustomer;
module.exports.getAllCustomers = getAllCustomers;
module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.deleteCustomer = deleteCustomer;

var customers = [
{
	'customerId': 1,
	'firstName': 'Jon',
	'lastName': 'Doe',
	'address': '123 Fake Street',
	'city': 'Detroit',
	'state': 'MI',
	'zip': '48226',
	'phone': '1234567890'
},
{
	'customerId': 2,
	'firstName': 'Sally',
	'lastName': 'Smith',
	'address': '456 Maple Ave',
	'city': 'Grand Rapids',
	'state': 'MI',
	'zip': '49507',
	'phone': '9876543210'
}
];
var availableId = 3;

function getCustomer(customerId, callback){
	var customerRecord = customers.find(function(obj){
		return obj.customerId === parseInt(customerId);
	});
	if(customerRecord){
		callback(null, customerRecord);
	} else {
		callback({ statusCode: 404, message: 'Customer not found'});
	}
}

function getAllCustomers(callback){
	callback(null,customers);
}

function addCustomer(customerObj, callback){
	customerObj.customerId = availableId;
	availableId++;
	customers.push(customerObj);
	callback(null, customerObj);
}

function updateCustomer(customerId, customerObj, callback){
	var customerIndex = customers.findIndex(function(obj){
		return obj.customerId === customerId;
	});
	if(customerIndex > -1){
		var valid = customerObj.firstName && customerObj.lastName && customerObj.address && customerObj.city && customerObj.state && customerObj.zip && customerObj.phone;
		if(valid){
			var newCustomerObj = Object.assign({},customerObj);
			newCustomerObj.customerId = customerId;
			customers[customerIndex] = newCustomerObj;
			callback(null, customers[customerIndex]);
		} else {
			callback({ statusCode: 400, message: 'Invalid request.'});
		}
	} else {
		callback({ statusCode: 404, message: 'Customer not found'});
	}
}

function deleteCustomer(customerId, callback){
	var customerIndex = customers.findIndex(function(obj){
		return obj.customerId === customerId;
	});
	if(customerIndex > -1){
		customers.splice(customerIndex,1);
		callback(null, 'Customer deleted.');
	} else {	
		callback({ statusCode: 404, message: 'Customer not found'});
	}
}
