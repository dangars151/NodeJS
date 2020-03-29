var express = require("express");

var router = express.Router();
var job = require('../models/Job');

router.get('/', function(req, res) {
    job.find().then(function(data) {
        res.render('manage-main', { jobs: data });
    })
});


module.exports = router;