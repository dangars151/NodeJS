var express = require("express");

var router = express.Router();
var job = require('../models/Job');
var company = require('../models/Company');

router.get('/', function(req, res) {
    job.find().then(function(jobs) {
        res.render('manage-main', { jobs: jobs });
    })
});


module.exports = router;