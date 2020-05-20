'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let Blog = mongoose.model('Blog');
let { RESPONSE } = require('../../config.js');

let display = (req, res) => {
    let params = _.pick(req.params, ['_id']);
    Blog.findOne({ _id: params._id }, (error, data) => {
        if (error) {
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
        Blog: display
    };