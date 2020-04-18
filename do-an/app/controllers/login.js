var express = require("express");

var user = require('../models/User');
var job = require('../models/Job');
var company = require('../models/Company');
var work = require('../models/Work');
var notification = require('../models/Notification');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('signin');
});

router.post('/', function(req, res) {
    var jobs;
    var fullJobs;
    var works = [];
    work.find().then(function(data) {
        data.forEach(function(item) {
            works.push(item);
        })
    })
    job.find({ status: 1 }).then(function(data) {
        jobs = data;
    })
    job.find().then(function(data) {
        fullJobs = data;
    })
    user.findOne({email: req.body.email, password: req.body.password}).then(function(data){
        if (data == null) {
            return res.render('signin', {data: 'Mật khẩu hoặc tên đăng nhập không đúng!'});
        }
        if (data.role == 'admin') {
            return res.render('manage-main', {jobs: fullJobs});
        }
        // if (data.role == 'company_user') {
        //     notification.find({
        //         company_id: data.companyId
        //     }).sort({created_at: -1}).then(notifications => {
        //         var countNotificationsIsNotRead = 0;
        //         for(let i = 0; i < notifications.length; i++){
        //             if(notifications[i].is_read == 0) countNotificationsIsNotRead++;
        //         }
        //         data.notifications = notifications;
        //         data.countNotificationsIsNotRead = countNotificationsIsNotRead;
        //         req.session.user = data;
        //         return res.render('main', {data: data, jobs: jobs, works: works});
        //     })
        // } else {
        req.session.user = data;
        return res.render('main', {data: data, jobs: jobs, works: works});
        //}
    })
});

module.exports = router;