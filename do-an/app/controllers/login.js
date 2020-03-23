var express = require("express");

var user = require('../models/User');
var job = require('../models/Job');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('signin');
});

router.post('/', function(req, res) {
    var jobs;
    job.find().then(function(data) {
        jobs = data;
    })
    user.findOne({email: req.body.email, password: req.body.password}).then(function(data){
        if (data == null) {
            return res.render('signin', {data: 'Mật khẩu hoặc tên đăng nhập không đúng!'});
        }
        return res.render('main', {data: data, jobs: jobs});
    })
});

module.exports = router;