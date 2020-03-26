var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/', function(req, res) {
    var titles = [];
    job.find().then(function(data){ 
        data.forEach(function(item) {
            titles.push(item.title);
        })
        return res.render('find-job', { jobs: data, titles: titles });
    })
});

router.post('/', function(req, res) {
    var titles = [];
    var jobs = [];
    job.find().then(function(data) {
        data.forEach(function(item) {
            titles.push(item.title);
        })
    })

    job.find({
        title: new RegExp(req.body.name || req.body.title)
    } ).then(function(data){
        data.forEach(function(item) {
            if (item.company.location.includes(req.body.location)) jobs.push(item);
        })
        if (req.session.user) {
            return res.render('find-job', { jobs: jobs, titles: titles, data: req.session.user });
        }
        return res.render('find-job', { jobs: jobs, titles: titles });
    })
})

module.exports = router;