var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('resources'));
app.use('/bower_components', express.static( path.join(__dirname, '/bower_components')));

var customers = require('./customers');
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/customers/:customerId', function(req, res){
	customers.getCustomer(parseInt(req.params.customerId), function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});

app.get('/customers', function(req, res){
	customers.getAllCustomers(function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});

app.post('/customers', function(req, res){
	customers.addCustomer(req.body, function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});

app.put('/customers/:customerId', function(req, res){
	if(req.body && req.params.customerId){
		var customerId = parseInt(req.params.customerId);
		customers.updateCustomer(customerId, req.body, function(err, response){
			if(err){
			res.status(err.statusCode).send(err.message);
			} else {
				res.send(response);
			}
		});
	} else {
		res.status(400).send('Invalid Request.');
	}
});

app.delete('/customers/:customerId', function(req, res){
	var customerId = parseInt(req.params.customerId);
	customers.deleteCustomer(customerId, function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});



app.listen(8081, function () {
  console.log('Listening on port 8081');
});