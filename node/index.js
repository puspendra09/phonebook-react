const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var employeeController =require('./controllers/employeeController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors())
app.listen(8081,() => console.log('Server started at port: 8081'));

app.use('/phonebook', employeeController);