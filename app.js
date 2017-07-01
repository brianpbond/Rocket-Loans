var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('resources'));

var customers = require('./routes/customers');

app.use('/customers', customers);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(8081, function () {
  console.log('Listening on port 8081');
});