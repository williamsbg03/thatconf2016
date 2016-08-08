'use strict';
var app = require('./app');
var http = require('http');
var httpListenerPort = 8080;

var httpServer = http.createServer(app).listen(httpListenerPort, function () {
    console.log('app is listening at localhost:' + httpListenerPort);
});

process.on('SIGTERM', function () {
    httpServer.close(function () {
        console.log('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
});
