module.exports.getCustomer = getCustomer;
module.exports.getAllCustomers = getAllCustomers;
module.exports.postCustomer = postCustomer;

var customers = [
{
	attr1: 'test',
	attr2: 'test2'
}
];

function getCustomer(customerId, callback){
	if(customers[customerId]){
		callback(null, customers[customerId]);
	} else {
		callback('Customer not found');
	}
}

function getAllCustomers(callback){
	callback(null,customers);
}

function postCustomer(customerObj, callback){
	customerObj.customerId = customers.length;
	customers.push(customerObj);
	callback(null, customerObj);
}