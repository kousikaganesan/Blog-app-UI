'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let { RESPONSE } = require('../../config.js');
let Genre = mongoose.model('Genre');

let create = (req, res) => {

    let newGenre = new Genre();
    _.assign(newGenre, _.pick(req.body, ['title', 'description', 'keyWords']));
    Genre.find({ title: newGenre.title }, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json(
                {
                    'Error': error
                });
        }
        else {
            if (data.length > 0) {
                res.status(RESPONSE.ERROR).json(
                    {
                        'Error': 'Genre already exists'
                    });
            }
            else {
                saveGenre(newGenre);
            }
        }
    });

    let saveGenre = (genre) => {
        genre.save((error, data) => {
            if (error !== null && error !== undefined) {
                res.status(RESPONSE.ERROR).json({ 'Error': error });
            }
            else {
                res.status(RESPONSE.CREATED).json(
                    {
                        'Success': 'Genre created successfully'
                    });
            }
        });
    }
    return;
};

module.exports =
    {
        Genre: create
    };