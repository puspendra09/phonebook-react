const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',{
    firstName: { type: String},
    lastName: { type: String },
    mobileNumber: { type: String },
    alternativeNumber: { type: String },
    emailId: { type: String },
    address: { type: String }
});

module.exports = { Employee };