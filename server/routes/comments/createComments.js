'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let User = mongoose.model('User');
let Blog = mongoose.model('Blog');
let Comments = mongoose.model('Comments');
let { RESPONSE } = require('../../config.js');

let create = (req, res) => {
    let newComment = new Comments();
    _.assign(newComment, _.pick(req.body, ['text', 'blogId', 'postedBy']));
    newComment.save((error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': error });
        }
        else {
            res.status(RESPONSE.CREATED).json({ 'Success': 'Comments created successfully' });
        }
    });
    return;
};

module.exports =
    {
        Comments: create
    };