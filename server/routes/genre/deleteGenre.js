'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let { RESPONSE } = require('../../config.js');
let updateGenreCount = require('../service/updateCount');
let Genre = mongoose.model('Genre');
let Blog = mongoose.model('Blog');

let remove = (req, res) => {
    let params = _.pick(req.params, ['_id']);

    Genre.findByIdAndRemove(params._id
        , (error, data) => {
            if (error !== null && error !== undefined) {
                res.status(RESPONSE.ERROR).json({ 'Error': 'Blog not found' });
            }
            else {
                removeBlogsByGenre(data);
            }
        });
    let removeBlogsByGenre = (data) => {
        Blog.remove({ genre: data._id }
            , (error, data) => {
                if (error !== null && error !== undefined) {
                    res.status(RESPONSE.ERROR).json({ 'Error': error });
                }
                else {
                    updateGenreCount.Genre();
                    res.status(RESPONSE.OK).json({ 'Deleted': data });

                }
            });
    }

    return;
};

module.exports =
    {
        Genre: remove
    };