const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// collection and schema for Registration
let Registration = new Schema({
    first_name: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        required: [true, "can't be blank"],

    },
    last_name: {
        type: String,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        required: [true, "can't be blank"]

    },
    user_name: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'Registration'
});

module.exports = mongoose.model('Registration', Registration);