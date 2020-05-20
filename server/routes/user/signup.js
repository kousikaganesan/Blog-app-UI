'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');
let passwordHash = require('password-hash');

let User = mongoose.model('User');
let { RESPONSE } = require('../../config.js');

let signUp = (req, res) => {
    let newUser = new User();
    _.assign(newUser, _.pick(req.body, ['name', 'email', 'password']));
    newUser.password = passwordHash.generate(newUser.password);
    User.find({ email: newUser.email }, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json(
                {
                    'Error': 'Blog not found'
                });
        }
        else {
            if (data.length > 0) {
                res.status(RESPONSE.ERROR).json(
                    {
                        'Error': 'User already exists'
                    });
            }
            else {
                newUser.save((error, data) => {
                    if (error !== null && error !== undefined) {
                        res.status(RESPONSE.ERROR).json({ 'Error': error });
                    }
                    else {
                        res.status(RESPONSE.CREATED).json(
                            {
                                'Success': 'User created successfully'
                            });
                    }
                });
            }
        }
    });

    return;
};

module.exports =
    {
        User: signUp
    };