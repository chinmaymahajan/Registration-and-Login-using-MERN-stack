const express = require('express');
const registrationRoutes = express.Router();

let Registration = require('./schema');

// Registration route
registrationRoutes.route('/register').post(function (req, res) {
	let register = new Registration(req.body);
	register.save()
		.then(reg => {
			res.sendStatus(200);
		})
		.catch(err => {
			res.status(400).send("Failed to store to database");
		});
});

// Login Router
registrationRoutes.route('/auth').get(function (req, res) {
	Registration.find({"first_name": req.first_name, "last_name": req.last_name})
		.then(auth => {
			res.status(200).json({'Login': 'Login successfully'});
		})
		.catch(err => {
			res.status(400).send("Invalid credentials!!");
		});
});

// Get allData
registrationRoutes.route('/allData').get(function (req, res) {
	Registration.find(function(err, data){
	    if(err){
	      console.log(err);
	    }
	    else {
	      res.json(data);
	    }
	  })
});



module.exports = registrationRoutes;
