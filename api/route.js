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
registrationRoutes.route('/login').post(function (req, res) {
	Registration.findOne({"user_name": req.body.user_name, "password": req.body.password}, function(err, data) {
		if(data !== null) res.sendStatus(200);
		else res.sendStatus(204);
	});
});

// Get allData
registrationRoutes.route('/allData').get(function (req, res) {
	Registration.find(function(err, data) {
			if(err) res.status(400).send("Error occured");
			else res.json(data);
		});
});

module.exports = registrationRoutes;
