var express = require("express");

var router = express.Router();
const path = require('path');

var user = require('../models/User');
var job = require('../models/Job');

router.post('/', function(req, res) {
    if (!req.session.user) return res.json('Bạn phải đăng nhập để thực hiện chức năng này!');
    var jobsId = [];
    var msg = '';
    user.findOne({ _id: req.session.user._id }).then(function(data) {
        jobsId = data.jobsId;
        if (jobsId.includes(req.body.id)) {
            msg = 'Công việc này đã được lưu!';
            return jobsId;
        }
        msg = 'Lưu công việc thành công!';
        jobsId.push(req.body.id);
        return jobsId;        
    }).then(function(jobsId) {
        req.session.user.jobsId = jobsId;
        return user.updateOne({ _id: req.session.user._id }, {
            jobsId: jobsId
        })
    }).then(data => {
        return res.json(msg)
    })


    // }).then(function(data) {
    //     job.find({ _id: { $in: req.session.user.jobsId } }).then(function(data) {
    //         return res.sendFile('save-job-list', {data: req.session.user, jobs: data});
    //     })
    // })
    // user.updateOne({ _id: req.session.user._id }, {
    //     jobId: req.params.id
    // }).then(function(data) {
    //     console.log(data);
    // })
});

// router.get('/', function(req, res) {
//     job.find({ _id: { $in: req.session.user.jobsId } }).then(function(data) {
//         return res.render('save-job', {data: req.session.user, jobs: data});
//     })
// })

module.exports = router;