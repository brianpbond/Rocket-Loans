var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var customers = require('./customers');
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
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
		if(err){
			res.status(500).send('Server Error');
		} else {
			res.send(response);
		}
	});
});

app.post('/customers', function(req, res){
	customers.addCustomer(req.body, function(err, response){
		res.send(response);
	});
});

app.use(express.static('resources'))

app.listen(8081, function () {
  console.log('Listening on port 8081');
});