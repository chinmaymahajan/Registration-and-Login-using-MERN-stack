const express = require('express');
const registrationRoutes = express.Router();
const bcrypt = require('bcryptjs');
let Registration = require('./schema/User');
let RouteNames = require("./constants/constants");
const Joi = require('joi')

//Joi user request data validation
const Schema = Joi.object({
    first_name: Joi.string().required().min(1).max(30),
    last_name:  Joi.string().required().min(1).max(60),
    user_name: Joi.string().required().alphanum().min(3).max(30),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})


//NOTE  Registration route
registrationRoutes.route(RouteNames.register).post(function(req, res) {
    const {error} = Schema.validate(req.body)
    if (!error){
        let register = new Registration(req.body);
        register.save()
            .then(reg => {
                res.sendStatus(200);
            })
            .catch(err => {
                res.status(400).send("Failed to store to database");
            });
    }
    res.status(400).send(error.message)

});

// Login Router
registrationRoutes.route(RouteNames.login).post(function(req, res) {
    Registration.findOne({ user_name: req.body.user_name })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});

// Username validation Router
registrationRoutes.route(RouteNames.validate)
    .post(function(req, res) {
        Registration.findOne({ user_name: req.body.user_name })
            .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
    });

// Get allData
registrationRoutes.route(RouteNames.data).get(function(req, res) {
    Registration.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

module.exports = registrationRoutes;