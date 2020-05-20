'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');
let passwordHash = require('password-hash');
let randomstring = require('randomstring');

let User = mongoose.model('User');
let { RESPONSE } = require('../../config.js');

let verifyForgotPassword = (req, res) => {
    let body = _.pick(req.body, ['email', 'password', 'otp']);
    User.findOne({ 'email': req.body.email }, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': error });
        }
        else {
            // check for otp
            if (data.otp == body.otp) {
                User.findOneAndUpdate(
                    {
                        'email': body.email
                    },
                    {
                        $set:
                        {
                            'password': passwordHash.generate(body.password)
                        }
                    },
                    {
                        upsert: false
                    },
                    (error, data) => {
                        if (error !== null && error !== undefined) {
                            console.error(error);
                            res.status(RESPONSE.ERROR).json({ 'Error': error });
                        }
                        else {
                            //change the otp when password changed
                            let otp = randomstring.generate(8);
                            User.findOneAndUpdate(
                                {
                                    'email': body.email
                                },
                                {
                                    $set:
                                    {
                                        'otp': otp
                                    }
                                },
                                {
                                    upsert: false
                                },
                                (error, data) => {
                                    if (error !== null && error !== undefined) {
                                        console.error(error);
                                        res.status(RESPONSE.ERROR).json({ 'Error': error });
                                    }
                                });
                        }
                    })

                res.status(RESPONSE.OK).json({ 'Success': 'logined !!!' });
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
        User: verifyForgotPassword
    };