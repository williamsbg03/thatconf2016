'use strict';
var app = require('./app');
var https = require('https');
var http = require('http');
var fs = require('fs');
var log = require('./utils/logger');

var apiCerts =  {
    key: fs.readFileSync(__dirname + '/server.key.pem', 'utf8'),
    cert: fs.readFileSync(__dirname + '/server.cert.pem', 'utf8'),
    ca: fs.readFileSync(__dirname + '/root-ca.cert.pem', 'utf8'),
    requestCert: true,
    rejectUnauthorized: true
};
var httpListenerPort = 80;
var httpsListenerPort = 443;

var httpServer = http.createServer(app).listen(httpListenerPort, function () {
    log.info('app is listening at localhost:' + httpListenerPort);
});

var httpsServer = https.createServer(apiCerts, app).listen(httpsListenerPort, function () {
    log.info('app is listening at localhost:' + httpsListenerPort);
});

process.on('SIGTERM', function () {
    httpServer.close(function () {
        log.info('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
    httpsServer.close(function () {
        log.info('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
});