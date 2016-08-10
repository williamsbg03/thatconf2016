'use strict';
var express = require('express');
var router = express.Router();
var _max = require('lodash/max');
var _merge = require('lodash/merge');
var storage = require('node-persist');
storage.initSync();

router.get('/', function (req, res) {
    var customers = storage.values();
    return res.json(customers);
});

router.get('/:id', function (req, res) {
    var customer = storage.getItem(req.params.id);
    if (!customer) {
        return res.sendStatus(404);
    }
    return res.json(customer);
});

router.delete('/:id', function (req, res) {
    var customer = storage.getItem(req.params.id);
    if (!customer) {
        return res.sendStatus(404);
    }
    storage.removeItem(req.params.id);
    return res.sendStatus(204);
});

router.post('/', function (req, res) {
    var customer = req.body;
    var max = parseInt(_max(storage.keys()));
    customer.id = max + 1;
    storage.setItem(customer.id.toString(), customer);
    res.status(201);
    return res.json(customer);
});

router.put('/:id', function (req, res) {
    var customer = storage.getItem(req.params.id);
    if (!customer) {
        return res.sendStatus(404);
    }
    var updatedCustomer = req.body;
    customer = _merge(customer, updatedCustomer);
    return res.sendStatus(204);
});

module.exports = router;
