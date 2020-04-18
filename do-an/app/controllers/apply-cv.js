var express = require("express");

var router = express.Router();

var formidable = require('formidable');
var fs = require('fs');

var Pusher = require('pusher');
var pusher = new Pusher({
    appId: '977271',
    key: '9a681ec33ff0af53eae3',
    secret: '6a5f8fd2f02d916a8831',
    cluster: 'ap1'
});

var CVModel = require('../models/CV');
var JobModel =  require('../models/Job');
var NotificationModel = require('../models/Notification');

router.post('/', function(req, res) {
    var cvs = [], job;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.cv.path;
        var newpath = 'public/files/' + files.cv.name;
        fs.rename(oldpath, newpath, function (err) {
            console.log(err);
        });

        JobModel.findOne({_id: fields.jobId}).then(data => {
            cvs = data.cvs;
            //companyId = data.companyId; jobTitle = data.title;
            job = data;
            //cvs.push({file: newpath, status:0, user_id: req.session.user._id});
            return CVModel.create({
                user_id: req.session.user._id,
                file: newpath,
                status: 0
            })
        }).then(data => {
            cvs.push(data);
            return JobModel.updateOne({_id: fields.jobId}, {
                cvs: cvs
            })
        }).then(data => {
            return NotificationModel.create({
                title: 'Công việc ' + job.title + ' có người ứng tuyển',
                user_id: req.session.user._id,
                company_id: job.companyId,
                is_read: 0,
                job_id: fields.jobId,
                created_at: Date.now()
            })
        }).then(data => {
            pusher.trigger('NotifyCompany'+ job.companyId, 'my-event', {
                "notification": data.title
            });
        })
    })
});

module.exports = router;