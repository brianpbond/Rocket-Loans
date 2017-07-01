module.exports.getCustomer = getCustomer;
module.exports.getAllCustomers = getAllCustomers;
module.exports.addCustomer = addCustomer;

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

function updateCustomer(customerObj, callback){
	var customerRecord = customers.find(function(obj){
		return obj.customerId === parseInt(customerObj.customerId);
	});
	if(customerRecord){
		Object.assign(customerRecord, customerObj);
		callback({ statusCode: 200, message: 'Customer updated.'});
	} else {
		callback({ statusCode: 404, message: 'Customer not found'});
	}
}