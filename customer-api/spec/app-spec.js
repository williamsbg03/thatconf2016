'use strict';
var request = require('supertest');
var proxyquire = require('proxyquire');
var express = require('express');
var log = require('../utils/logger');
var fake = express.Router();
fake.use('/error', function (req, res, next) {
    next(new Error('test error'));
});
fake.use('/', function (req, res, next) {
    res.cookie('cookie', req.cookies);
    res.json({});
});
var app = proxyquire('../app', {
    './routes/customer': fake,
    './routes/doc': fake,
    './routes/health': fake
});

describe('the account application path', function () {
    it('should be registered for customers', function (done) {
        request(app)
            .get('/api/v1/customers')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should be registered for customers by id', function (done) {
        request(app)
            .get('/api/v1/customers/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should be registered for health', function (done) {
        request(app)
            .get('/api/v1/customers/health')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should be registered for health', function (done) {
        request(app)
            .get('/api/v1/customers/doc')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should set child logger on request with correlation id', function (done) {
        spyOn(log, 'child').andCallThrough();
        request(app)
            .get('/api/v1/customers/health')
            .set('x-nmlvhub-corid', 'test')
            .set('host', 'testHost')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err) {
                expect(log.child).toHaveBeenCalledWith({
                    requestPath: '/api/v1/customers/health',
                    correlationId: 'test',
                    httpVerb: 'GET',
                    params: {},
                    headers: { 'host': 'testHost', 'accept-encoding': 'gzip, deflate', 'user-agent': 'node-superagent/1.8.3', 'x-nmlvhub-corid': 'test', connection: 'close' }
                });
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should provide a 400 response for invalid paths', function (done) {
        request(app)
            .get('/api/v1/badaddress')
            .expect(400)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('should provide a 500 error when a route throws an error', function (done) {
        request(app)
            .get('/api/v1/customers/error')
            .expect(500)
            .end(function (err) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });  
});
