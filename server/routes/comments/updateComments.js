'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let User = mongoose.model('User');
let Blog = mongoose.model('Blog');
let Comments = mongoose.model('Comments');
let { RESPONSE } = require('../../config.js');

let update = (req, res) => {
    let newComment = new Comments();
    _.assign(newComment, _.pick(req.body, ['text', 'blogId', 'postedBy']));
    let params = _.pick(req.params, ['_id'])
    Comments.findOneAndUpdate({ _id: params._id },
        {
            $set: {
                text: newComment.text,
                blogId: newComment.blogId,
                postedBy: newComment.postedBy,
                modifiedDate: new Date()
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
        Comments: update
    };