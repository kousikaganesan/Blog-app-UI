'use strict';
let mongoose = require('mongoose');
let User = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	otp: { type: String },
	address: { type: String }
});

module.exports = {
	User: User
};

