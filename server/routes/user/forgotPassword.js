'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');
let crypto = require('crypto');
let randomstring = require("randomstring");
let nodemailer = require('nodemailer');

let User = mongoose.model('User');
let { RESPONSE } = require('../../config.js');
let { PASSWORD } = require('../../config.js');
let { ALGORITHM } = require('../../config.js');
let { SECRET } = require('../../config.js');
let { MAIL_ID } = require('../../config.js');

let forgotPassword = (req, res) => {
    let otp = randomstring.generate(8);
    let params = _.pick(req.params, ['email']);

    let decrypt = (text) => {
        var decipher = crypto.createDecipher(ALGORITHM, SECRET)
        var decoded = decipher.update(text, 'hex', 'utf8')
        decoded += decipher.final('utf8');
        return decoded;
    }

    User.findOneAndUpdate({ 'email': params.email }, { $set: { 'otp': otp } }, { upsert: false, runValidators: true },
        (error, data) => {
            if (error !== null && error !== undefined) {
                console.error(error);
                res.status(RESPONSE.ERROR).json({ 'Error': error });
            }
            else {

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: MAIL_ID,
                        pass: decrypt(PASSWORD)
                    }
                });

                let mailOptions = {
                    from: MAIL_ID,
                    to: params.email,
                    subject: 'Password recovery',
                    text: 'Your OTP password:' + otp
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(RESPONSE.ERROR).json({ 'Error': error });
                    }
                });
                res.status(RESPONSE.OK).json({ 'Success': 'Mail sent to your email!' });
            }
        });

    return;
};

module.exports =
    {
        User: forgotPassword
    };