var express = require("express");

var router = express.Router();
var job = require('../models/Job');
var notification = require('../models/Notification');
var userCompany = require('../models/UserCompany');
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
    var listJobsAccepted;
    job.updateMany(
        { _id: { $in: req.body.jobsAccepted } },
        { $set: { status:1 } }
    ).then(function(data) {
        return job.find({_id: { $in: req.body.jobsAccepted }}, {'companyId':1, '_id':1, 'title': 1});
    }).then(data => {
        listJobsAccepted = data;
        var notifications = [];
        for(let i=0; i<data.length; i++) {
            notifications.push({
                company_id: data[i].companyId,
                title: 'Công việc ' + data[i].title + ' được chấp nhận',
                is_read: 0,
                created_at: Date.now()
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
    }).then(data => {
        for (let i = 0; i < listJobsAccepted.length; i++) {
            userCompany.find({company_id: listJobsAccepted[i].companyId})
            .then(data => {
                if(data.length > 0) {
                    for (let j = 0; j < data.length; j++) {
                        let thongBao = {
                            user_id: data[j].user_id,
                            title: 'Công ty bạn theo dõi vừa có job mới.',
                            is_read: 0,
                            job_id: listJobsAccepted[i]._id,
                            created_at: Date.now(),
                            type: 5,
                            company_id: data[j].user_id
                        }
                        notification.create(thongBao).then;
                    }
                }
            })
        }
        
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