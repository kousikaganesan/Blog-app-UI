'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let updateGenreCount = require('../service/updateCount');
let { RESPONSE } = require('../../config.js');
let Blog = mongoose.model('Blog');
let User = mongoose.model('User');
let Genre = mongoose.model('Genre');

let create = (req, res) => {
    let newBlog = new Blog();
    let newGenre = new Genre();
    _.assign(newBlog, _.pick(req.body, ['title', 'creator', 'contributors', 'genre', 'articleBody', 'keyWords']));

    Genre.find({ _id: newBlog.genre }, (error, data) => {
        if (error !== null && error !== undefined) {
            res.status(RESPONSE.ERROR).json({ 'Error': 'No Blogs found' });
        }
        else {

            if (data.length > 0) {
                saveBlog(newBlog);
            }
            else {
                res.status(RESPONSE.ERROR).json({ 'Error': 'Genre not found' });
            }

        }
    });

    let saveBlog = (blog) => {
       blog.save((error, data) => {
            if (error !== null && error !== undefined) {
                res.status(RESPONSE.ERROR).json({ 'Error': error });
            }
            else {
                updateGenreCount.Genre();
                res.status(RESPONSE.CREATED).json({ 'Success': 'Blog created successfully' });
            }
        });
    }

    return;
};

module.exports =
    {
        Blog: create
    };