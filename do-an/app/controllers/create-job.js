var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/', function(req, res) {
    if (req.session.user) {
        res.render('create-job', { data: req.session.user });
    } else {
        res.redirect('/login');
    }
});

router.post('/', function(req, res) {
    var request = req.body;
    job.create([
        {
            title: request.title,
            salary_from: request.salaryFrom,
            salary_to: request.salaryTo,
            out_date: request.outDate,
            created_at: Date.now(),
            description: request.description,
            status: 0,
            company: {
                name: req.session.user.company.name,
                location: request.location
            }
        }
    ]).then(function(data) {
        
    })
});

module.exports = router;