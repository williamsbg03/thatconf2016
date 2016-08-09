'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var customer = require('./routes/customer');
var customer = require('./routes/health');
var customer = require('./routes/doc');
var log = require('./utils/logger');
var basePath = '/api/v1/customers';
var app = express();

// Logging incoming request
app.use(function (req, res, next) {
    req.log = log.child({
        requestPath: req.url,
        correlationId: req.headers['x-nmlvhub-corid'],
        httpVerb: req.method,
        params: req.params,
        headers: req.headers
    });
    req.log.info('Request received');
    next();
});

//Body Parser module to allow easy access of json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(basePath + '/health', customer);
app.use(basePath + '/doc', customer);
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
    req.log.error(err);
    res.status(err.status || 500);
    return res.json({
        'msg': err.message
    });
});

module.exports = app;
