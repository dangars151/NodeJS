var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/', function(req, res) {
    job.find().then(function(data){
        if (req.session.user) {
            return res.render('main', { jobs: data, data: req.session.user });
        } else {
            return res.render('main', { jobs: data });
        }
    })
});

module.exports = router;