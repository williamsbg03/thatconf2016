'use strict';
var request = require('supertest');
var express = require('express');
var fs = require('fs');

var app = express();

var route = require('../routes/doc.js');
app.use(route);

describe('doc', function () {
    it('should return the swagger document for this service', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var swagger = fs.readFileSync('swagger.json').toString();
                expect(res.body).toEqual(JSON.parse(swagger));
                done();
            });
    });
});
