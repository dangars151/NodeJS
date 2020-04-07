var express = require("express");

var router = express.Router();
var job = require('../models/Job');
var notification = require('../models/Notification');
var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '977271',
    key: '9a681ec33ff0af53eae3',
    secret: '6a5f8fd2f02d916a8831',
    cluster: 'ap1'
});

router.get('/', function(req, res) {
    job.find({ status: 0 }).then(function(data) {
        res.render('manage-jobs', { jobs: data });
    })
});

router.post('/', function(req, res) {
    job.updateMany(
        { _id: { $in: req.body.jobsAccepted } },
        { $set: { status:1 } }
    ).then(function(data) {
        return job.find({_id: { $in: req.body.jobsAccepted }}, {'companyId':1, '_id':0, 'title': 1});
    }).then(data => {
        var notifications = [];
        for(let i=0; i<data.length; i++) {
            notifications.push({
                company_id: data[i].companyId,
                title: 'Công việc ' + data[i].title + ' được chấp nhận',
                is_read: 0
            });
        }
        return notification.create(notifications);
    }).then(data => {
        for(let i=0; i<data.length; i++) {
            pusher.trigger('NotifyCompany'+ data[i].company_id, 'my-event', {
                "notification": data[i].title
            });
        }
        job.find({ status: 0 }).then(function(data) {
            res.render('manage-jobs', { jobs: data });
        })
    })
});

// router.post('/search', function(req, res) {
//     job.find({
//         title: new RegExp(req.body.title),
//         companyName: new RegExp(req.body.company),
//         companyLocation: new RegExp(req.body.location),
//         status: 0
//     }).then(function(jobs) {
//         if (req.body.sort == 'outDate') {
//             jobs.sort(function(job1, job2) {
//                 return job2.out_date - job1.out_date;
//             });
//         } else if (req.body.sort == 'createdAt') {
//             jobs.sort(function(job1, job2) {
//                 return job1.created_at - job2.created_at ;
//             });
//         } else {
//             jobs.sort(function(job1, job2) {
//                 return  job2.created_at - job1.created_at;
//             });
//         }
//         return res.render('manage-jobs', { jobs: jobs });
//     })
// })

module.exports = router;