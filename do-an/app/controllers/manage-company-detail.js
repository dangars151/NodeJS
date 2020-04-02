var express = require("express");

var router = express.Router();

var user = require('../models/User');
var job = require('../models/Job');

router.get('/:id', function(req, res) {
    var users;
    user.find({ companyId: req.params.id }).then(function(data) {
        users = data;
    }).then(function(data) {
        return job.find({ companyId: req.params.id });
    }).then(function(data) {
        return res.render('manage-company-detail', { jobs: data, users: users })
    })
});

module.exports = router;