'use strict';
let mongoose = require('mongoose');
let Genre = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    keyWords: [],
    count: { type: Number, default: 0 },
});

module.exports = {
    Genre: Genre
};
