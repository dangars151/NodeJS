var express = require("express");

var router = express.Router();

var cv = require('../models/CV');
var job = require('../models/Job');
var user = require('../models/User');

router.post('/', function(req, res) {
    job.findOneAndUpdate({"_id": req.body.jobId, "cvs.user_id": req.body.userId}, {
        "cvs.$.status": 1
    }).then(data => {
        var cvId;
        for (let i = 0; i < data.cvs.length; i++) {
            if (data.cvs[i].user_id == req.body.userId) {
                cvId = data.cvs[i]._id;
            }
        }
        return cvId;
    }).then(data => {
        return cv.updateOne({_id: data}, {
            status: 1
        })
    }).then(data => {
        return user.findOne({_id: req.body.userId}, 'fullname');
    }).then(data => {
        return res.render('send-mail', {
            msg: 'Bạn đã chấp nhận cv của ứng viên thành công! Hãy nhanh tay tạo cuộc hẹn phỏng vấn nào!',
            fullname: data.fullname
        })
    })
});

module.exports = router;