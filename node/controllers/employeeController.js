const express = require('express');
var router = express.Router();
const multer = require('multer');
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');
var app = express();


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null,`${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })

//    localhost:8081/phonebook/
router.get('/',(req, res)=>{
    Employee.find((err,docs) => {
        if (!err){res.send(docs);}
        else {console.log('Error in Retriving Employees :' +JSON.stringify(err,undefined,2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No Record with given ID : ${req.params.id}');
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else{ console.log('Error in Retriving Employee:' + JSON.stringify(err,undefined,2));}
    });
});

router.post('/', upload.single('photo'),(req, res) => {
    var emp = new Employee({
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        mobileNumber: req.body.mobileNumber,
        alternativeNumber: req.body.alternativeNumber,
        emailId: req.body.emailId,
        address: req.body.address,
    });
    
    emp.save((err, doc) => {
        if(!err){ res.send(doc); }
        else {
             console.log('Error is Employee save:' + JSON.stringify(err,undefined,2)); 
            }
    });
});

router.put('/:id', upload.single('photo'),(req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given ID : ${req.params.id}');

var emp = {};
    if(req.body.firstName) {
        emp.firstName = req.body.firstName
    }
    if(req.body.lastName) {
        emp.lastName = req.body.polastNamesition
    }
    if(req.body.mobileNumber) {
        emp.mobileNumber = req.body.mobileNumber
    }
    if(req.body.alternativeNumber) {
        emp.alternativeNumber = req.body.alternativeNumber
    }
    if(req.body.emailId) {
        emp.emailId = req.body.emailId
    }
    if(req.body.address) {
        emp.address = req.body.address
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in Employee update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record found : ${req.params.id}');

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;