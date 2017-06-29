var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var customers = require('./customers');
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/customers/:customerId', function(req, res){
	customers.getCustomer(req.params.customerId, function(err, response){
		if(err){
			res.send(err);
		} else {
			res.send(response);
		}
	});
});

app.get('/customers', function(req, res){
	customers.getAllCustomers(function(err, response){
		res.send(response);
	});
});

app.post('/customers', function(req, res){
	customers.postCustomer(req.body, function(err, response){
		res.send(response);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});