'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var customer = require('./routes/customer');
var basePath = '/api/v1/customers';
var app = express();

//Body Parser module to allow easy access of json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(basePath + '/', customer);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('InvalidUri or InvalidHttpVerb');
    err.status = 400;
    next(err);
});

// error handler
// sends empty body and 500 error
/*jshint unused: false */
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    return res.json({
        'msg': err.message
    });
});

module.exports = app;
