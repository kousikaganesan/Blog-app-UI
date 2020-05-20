'use strict';

/*
 * Express Dependencies
 */

let express = require('express');
let _ = require('lodash');
let jwt = require('jsonwebtoken');

let { MONGO_URL } = require('./config.js');
let { SECRET } = require('./config.js');
let { PORT } = require('./config.js');
let { RESPONSE } = require('./config.js');

let app = express();


let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(MONGO_URL, {
  useMongoClient: true
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//modals
mongoose.model('User', require('./model/userModel').User);
mongoose.model('Blog', require('./model/blogModel').Blog);
mongoose.model('Comments', require('./model/commentModel').Comments);
mongoose.model('Genre', require('./model/genreModel').Genre);

// user routes
app.post('/user/signup', require('./routes/user/signup').User);
app.post('/user/login', require('./routes/user/login').User);
app.post('/user/forgot-password/:email', require('./routes/user/forgotPassword').User);
app.post('/user/verify-otp', require('./routes/user/verifyForgotPassword').User);
app.get('/user', require('./routes/service/updateCount.js').Genre);

let secureRoutes = express.Router();

secureRoutes.use((req, res, next) => {
  let headers = _.pick(req.headers, ['token']);
  let token = headers.token;
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(RESPONSE.NOT_AUTHORIZED).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

app.use('/blog', secureRoutes);
app.use('/comments', secureRoutes);
app.use('/genre', secureRoutes);

//blog routes
app.post('/blog/create', require('./routes/blog/createBlog').Blog);
app.put('/blog/:_id', require('./routes/blog/updateBlog').Blog);
app.delete('/blog/:_id', require('./routes/blog/deleteBlog').Blog);
app.get('/blog/:_id', require('./routes/blog/displayBlog').Blog);
app.get('/blog', require('./routes/blog/displayAllBlog').Blog);

//comments routes
app.post('/comments/create', require('./routes/comments/createComments').Comments);
app.put('/comments/:_id', require('./routes/comments/updateComments').Comments);
app.delete('/comments/:_id', require('./routes/comments/deleteComments').Comments);
app.get('/comments/:_id', require('./routes/comments/displayComments').Comments);

//genre routes
app.post('/genre/create', require('./routes/genre/createGenre').Genre);
app.put('/genre/:_id', require('./routes/genre/updateGenre').Genre);
app.delete('/genre/:_id', require('./routes/genre/deleteGenre').Genre);
app.get('/genre', require('./routes/genre/displayGenre').Genre);

app.set('view engine', 'handlebars');
app.listen(process.env.PORT || PORT);
console.log(`Express started on port ${PORT}`);
module.exports = app;