'use strict';
var request = require('supertest');
var proxyquire = require('proxyquire');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var fakeNodePersist = {
    items: [
        {
            id: "1"
        },
        {
            id: "2"
        },
        {
            id: "3"
        }
    ],
    initSync: function () {
        return;
    },
    values: function() {
        return this.items;
    },
    keys: function() {
        return ["1","2","3"];
    },
    getItem: function(id) {
        return _.find(this.items, { id: id });
    },
    removeItem: function() {
        return;
    },
    setItem: function(key, item) {
        return;
    }
};

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var route = proxyquire
   .noCallThru()
   .load('../routes/customer.js', { 
    'node-persist': fakeNodePersist 
});
app.use(route);

describe('customer route', function () {
    it('should return all customers', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(fakeNodePersist.items);
                done();
            });
    });
    it('should return a specific customer', function (done) {
        request(app)
            .get('/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.body).toEqual(fakeNodePersist.items[0]);
                done();
            });
    });
    it('should return a 404 for a customer that doesnt exist', function (done) {
        request(app)
            .get('/4')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                done();
            });
    });
    it('should delete a specific customer', function (done) {
        request(app)
            .delete('/1')
            .expect(204)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should return a 404 for a customer that doesnt exist', function (done) {
        request(app)
            .delete('/4')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                done();
            });
    });
    it('should create a new customer', function (done) {
        var item = {
            firstName: 'testFirst',
            lastName: 'testLast',
            age: '31',
            address: {
                street: 'test street',
                city: 'testcity',
                state: 'WI',
                zip: '53202'
            }
        };
        request(app)
            .post('/')
            .send(item)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                item.id = 4;
                expect(res.body).toEqual(item)
                done();
            });
    });
    it('should update an existign customer', function (done) {
        var item = {
            id: "1",
            firstName: 'testFirst',
            lastName: 'testLast',
            age: '31',
            street: 'test street',
            city: 'testcity',
            state: 'WI',
            zip: '53202'
        };
        request(app)
            .put('/1')
            .send(item)
            .expect(204)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
    it('should return a 404 if a customer is not found', function (done) {
        var item = {
            id: "4",
            firstName: 'testFirst',
            lastName: 'testLast',
            age: '31',
            street: 'test street',
            city: 'testcity',
            state: 'WI',
            zip: '53202'
        };
        request(app)
            .put('/4')
            .send(item)
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function (err, res) {
                done();
            });
    });
});