var express = require("express");

var router = express.Router();
var company = require('../models/Company');

router.get('/', function(req, res) {
    company.find().then(function(data) {
        res.render('manage-companies', { companies: data });
    })
});

module.exports = router;
