module.exports.getCustomer = getCustomer;
module.exports.getAllCustomers = getAllCustomers;
module.exports.addCustomer = addCustomer;
module.exports.updateCustomer = updateCustomer;
module.exports.deleteCustomer = deleteCustomer;

//initial customer data for 'getAllCustomers'
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
//unique customer id
var availableId = 3;

function getCustomer(customerId, callback){
	//find customer by customerId
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
	//shift customer id available upon adding a customer
	availableId++;
	customers.push(customerObj);
	callback(null, customerObj);
}

function updateCustomer(customerId, customerObj, callback){
	//finding the index allows us to replace the entire object for our PUT
	var customerIndex = customers.findIndex(function(obj){
		return obj.customerId === customerId;
	});
	if(customerIndex > -1){
		var valid = customerObj.firstName && customerObj.lastName && customerObj.address && customerObj.city && customerObj.state && customerObj.zip && customerObj.phone;
		if(valid){
			//create new object
			var newCustomerObj = Object.assign({},customerObj);
			//make sure customerId carries over
			newCustomerObj.customerId = customerId;
			//insert object into customer array in place of the old object
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
	//find index allows us to remove the customer
	var customerIndex = customers.findIndex(function(obj){
		return obj.customerId === customerId;
	});
	if(customerIndex > -1){
		//splice to remove customer
		customers.splice(customerIndex,1);
		callback(null, 'Customer deleted.');
	} else {	
		callback({ statusCode: 404, message: 'Customer not found'});
	}
}
