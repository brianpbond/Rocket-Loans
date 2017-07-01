var express = require('express');
var router = express.Router();
var customerCtrl = require('../controllers/customerCtrl');

router.get('/', function(req, res){
	customerCtrl.getAllCustomers(function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});

router.get('/:customerId', function(req, res){
	customerCtrl.getCustomer(parseInt(req.params.customerId), function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});

router.post('/', function(req, res){
	if(req.body){
		customerCtrl.addCustomer(req.body, function(err, response){
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

router.put('/:customerId', function(req, res){
	if(req.body){
		customerCtrl.updateCustomer(parseInt(req.params.customerId), req.body, function(err, response){
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

router.delete('/:customerId', function(req, res){
	customerCtrl.deleteCustomer(parseInt(req.params.customerId), function(err, response){
		if(err){
			res.status(err.statusCode).send(err.message);
		} else {
			res.send(response);
		}
	});
});

module.exports = router;