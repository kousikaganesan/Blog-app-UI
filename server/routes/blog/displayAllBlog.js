'use strict';
let mongoose = require('mongoose');

let Blog = mongoose.model('Blog');
let { RESPONSE } = require('../../config.js');

let displayAll = (req, res) => {

    Blog.find({}, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': 'No Blogs found' });
        }
        else {
            res.status(RESPONSE.OK).json({ 'response': data });
        }
    });
    return;
};

module.exports =
    {
        Blog: displayAll
    };