'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');
let jwt = require('jsonwebtoken');
let passwordHash = require('password-hash');

let User = mongoose.model('User');
let { SECRET } = require('../../config.js');
let { RESPONSE } = require('../../config.js');

let login = (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.findOne({ 'email': body.email }, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': 'email not found' });
        }
        else {
            if (passwordHash.verify(body.password, data.password)) {
                let token = jwt.sign(body.email, SECRET);
                res.status(RESPONSE.OK).json({ 'Success': 'logined!', 'token': token });
            }
            else {
                res.status(401).json({ 'Error': 'login failed !!!' });
            }
        }
    });
    return;
};

module.exports =
    {
        User: login
    };