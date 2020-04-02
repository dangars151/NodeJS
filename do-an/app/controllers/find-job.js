var express = require("express");

var router = express.Router();

var job = require('../models/Job');
var work = require('../models/Work');

router.get('/', function(req, res) {
    var titles = [];
    work.find().then(function(data){ 
        data.forEach(function(item) {
            titles.push(item);
        })
        job.find({ status: 1 }).then(function(data){
            if (req.session.user) {
                return res.render('find-job', { jobs: data, titles: titles, data: req.session.user });
            }
            return res.render('find-job', { jobs: data, titles: titles });
        })
    })
});

router.post('/', function(req, res) {
    var titles = [];
    var jobs = [];
    work.find().then(function(data) {
        data.forEach(function(item) {
            titles.push(item);
        })
    })

    job.find({
        name: new RegExp(req.body.title),
        status: 1,
        workId: new RegExp(req.body.name)
    } ).then(function(data){
        data.forEach(function(item) {
            if (item.companyLocation.includes(req.body.location)) jobs.push(item);
        })
        if (req.session.user) {
            return res.render('find-job', { jobs: jobs, titles: titles, data: req.session.user });
        }
        return res.render('find-job', { jobs: jobs, titles: titles });
    })
})

module.exports = router;