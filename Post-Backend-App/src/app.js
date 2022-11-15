const express = require('express');
const app = express();


// Import routes
const postRoute = require('./routes/post');


//Router MIddlewares
app.use(express.json());
app.use('/', postRoute);

module.exports = app;
