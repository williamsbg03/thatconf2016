'use strict';
var express = require('express');
var router = express.Router();
var os = require('os');

/* Health check for app. */
router.get('/', function (req, res) {
    return res.json({
        'Node Host': os.hostname()
    });
});

module.exports = router;
