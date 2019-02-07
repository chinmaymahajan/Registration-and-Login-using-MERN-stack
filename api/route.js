const express = require('express');
const registrationRoutes = express.Router();
const bcrypt = require('bcryptjs');
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
	Registration.findOne({user_name: req.body.user_name})
	.then(user => {
		if(!user) res.sendStatus(204);
		else {
			bcrypt.compare(req.body.password, user.password)
			.then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
		}
	})
});

// Get allData
registrationRoutes.route('/allData').get(function (req, res) {
	Registration.find(function(err, data) {
			if(err) res.status(400).send("Error occured");
			else res.json(data);
		});
});

module.exports = registrationRoutes;
