'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let Comments = mongoose.model('Comments');
let { RESPONSE } = require('../../config.js');

let display = (req, res) => {
    let params = _.pick(req.params, ['_id']);
    Comments.find({ blogId: params._id }, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': error });
        }
        else {
            res.status(RESPONSE.OK).json({ 'response': data });
        }
    });
    return;
};

module.exports =
    {
        Comments: display
    };