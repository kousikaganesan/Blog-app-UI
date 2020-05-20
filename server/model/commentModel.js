'use strict';
let mongoose = require('mongoose');
let Comments = new mongoose.Schema({
    text: { type: String },
    blogId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

module.exports = {
    Comments: Comments
};
