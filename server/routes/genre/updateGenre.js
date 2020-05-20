'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let Genre = mongoose.model('Genre');
let { RESPONSE } = require('../../config.js');

let update = (req, res) => {
    let newGenre = new Genre();
    _.assign(newGenre, _.pick(req.body, ['title', 'description', 'keyWords']));
    let params = _.pick(req.params, ['_id']);
    Genre.findOneAndUpdate({ _id: req.params._id },
        {
            $set: {
                title: newGenre.title,
                description: newGenre.description,
                keyWords: newGenre.keyWords
            }
        }, (error, data) => {
            if (error !== null && error !== undefined) {
                console.error(error);
                res.status(RESPONSE.ERROR).json({ 'Error': error });
            }
            else {
                res.status(RESPONSE.OK).json({ 'Updated': data });
            }
        });

    return;
};

module.exports =
    {
        Genre: update
    };