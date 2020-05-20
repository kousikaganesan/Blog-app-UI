'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let Comments = mongoose.model('Comments');
let { RESPONSE } = require('../../config.js');

let remove = (req, res) => {
    let params = _.pick(req.params, ['_id']);
    Comments.findByIdAndRemove(params._id, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': 'Comment not found' });
        }
        else {
            res.status(RESPONSE.OK).json({ 'Deleted': data });
        }
    });
    return;
};

module.exports =
    {
        Comments: remove
    };