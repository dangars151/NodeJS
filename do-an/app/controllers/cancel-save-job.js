var express = require("express");

var router = express.Router();

var job = require('../models/Job');

router.get('/:id', function(req, res) {
    job.find({_id: {$in: req.session.user.jobsId}}).then(data => {
        return res.render('save-job', {jobs: data, data: req.session.user});
    })
});

module.exports = router;