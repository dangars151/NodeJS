var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var work = require('../models/Work');

router.get('/', function(req, res) {
    var works = [];
    work.find().then(function(data) {
        data.forEach(function(item) {
            works.push(item);
        })
        job.find({ status: 1 }).then(function(data){
            if (req.session.user) {
                return res.render('main', { jobs: data, data: req.session.user, works: works });
            } else {
                return res.render('main', { jobs: data, works: works });
            }
        })
    })
});

module.exports = router;