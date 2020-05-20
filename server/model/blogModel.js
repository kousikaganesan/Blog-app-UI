'use strict';
let mongoose = require('mongoose');
let Blog = new mongoose.Schema({
    title: { type: String },
    creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now },
    genre: { type: mongoose.Schema.ObjectId, ref: 'Genre' },
    articleBody: { type: String },
    keyWords: []
});

module.exports = {
    Blog: Blog
};
