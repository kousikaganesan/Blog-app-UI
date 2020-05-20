'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let updateGenreCount = require('../service/updateCount');
let { RESPONSE } = require('../../config.js');
let Blog = mongoose.model('Blog');

let remove = (req, res) => {
    let params = _.pick(req.params, ['_id']);
    Blog.findByIdAndRemove(params._id
        , (error, data) => {
            if (error !== null && error !== undefined) {
                res.status(RESPONSE.ERROR).json({ 'Error': 'Blog not found' });
            }
            else {
                updateGenreCount.Genre();
                res.status(RESPONSE.OK).json({ 'Deleted': data });
            }
        });
    return;
};

module.exports =
    {
        Blog: remove
    };