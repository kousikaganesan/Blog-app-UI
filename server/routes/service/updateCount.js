'use strict';
let mongoose = require('mongoose');
let _ = require('lodash');

let Blog = mongoose.model('Blog');
let Genre = mongoose.model('Genre');
let { RESPONSE } = require('../../config.js');

let updateCount = () => {

    let getAllBlogs = new Promise((resolve, reject) => {
        Blog.find({}).exec((err, data) => {
            if (!err && data) {
                let promiseArray = [];
                data.map((document) => {
                    findBlogByGenere(document.genre).then((data) => {
                        promiseArray.push(data);
                    }, (error) => {
                        if (error.Error) {
                            console.error(error);
                        }
                    })

                })
                resolve(Promise.all(promiseArray));
            } else {
                reject({ message: err });
            }
        });
    })

    let findBlogByGenere = (id) => {
        return new Promise((resolve, reject) => {
            Blog.find({
                'genre': id
            }
            ).exec((err, data) => {
                if (!err && data) {
                    let genre = { 'id': id, 'count': data.length };
                    updateCount(genre).then((data) => {

                    }, (error) => {
                        if (error.Error) {
                            console.error(error);
                        }
                    })
                    resolve(genre);
                } else {
                    reject({ message: err });
                }
            });
        })
    }


    let updateCount = (genre) => {
        return new Promise((resolve, reject) => {
            Genre.findOneAndUpdate({ '_id': genre.id },
                {
                    $set: {
                        'count': genre.count
                    }
                },
                { upsert: true },
                (error, data) => {
                    if (error !== null && error !== undefined) {

                        resolve({ 'updated': data });
                    }
                    else {
                        reject({ 'Error': error });
                    }
                });

        })
    }
    getAllBlogs.then((data) => {
    }).catch((error) => {
        res.status(RESPONSE.ERROR).json({ 'Error': error });
    })
    return;
};

module.exports =
    {
        Genre: updateCount
    };