module.exports.getCustomer = getCustomer;
module.exports.getAllCustomers = getAllCustomers;
module.exports.addCustomer = addCustomer;

let customers = [
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
let availableId = 3;

function getCustomer(customerId, callback){
	const customerRecord = customers.find(custObj => custObj.customerId === parseInt(customerId));
	if(customerRecord){
		callback(null, customerRecord);
	} else {
		callback('Customer not found');
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