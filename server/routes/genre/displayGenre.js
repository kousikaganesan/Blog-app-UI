'use strict';
let mongoose = require('mongoose');

let Genre = mongoose.model('Genre');
let { RESPONSE } = require('../../config.js');

let display = (req, res) => {

    Genre.find({}, (error, data) => {
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
        Genre: display
    };