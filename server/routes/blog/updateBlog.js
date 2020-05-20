'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let Blog = mongoose.model('Blog');
let User = mongoose.model('User');
let { RESPONSE } = require('../../config.js');

let update = (req, res) => {
    let params = _.pick(req.params, ['_id']);
    let body = _.pick(req.body, ['title', 'creator', 'contributors', 'genre', 'articleBody']);
    Blog.findOneAndUpdate({ _id: params._id },
        {
            $set: {
                'title': body.title,
                'creator': body.creator,
                'contributors': body.contributors,
                'genre': body.genre,
                'articleBody': body.articleBody,
                'modifiedDate': new Date()
            }
        },
        { upsert: false, runValidators: true },
        (error, data) => {
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
        Blog: update
    };