var express = require("express");

var router = express.Router();

var formidable = require('formidable');
var fs = require('fs');

var CVModel = require('../models/CV');
var JobModel =  require('../models/Job');

router.post('/', function(req, res) {
    var cvs = [];
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.cv.path;
        var newpath = 'public/files/' + files.cv.name;
        fs.rename(oldpath, newpath, function (err) {
            console.log(err);
        });

        JobModel.findOne({_id: fields.jobId}).then(data => {
            cvs = data.cvs;
            cvs.push({file: newpath, status:0, user_id: req.session.user._id});
            // return CVModel.create({
            //     job_id: fields.jobId,
            //     user_id: req.session.user._id,
            //     file: newpath,
            //     status: 0
            // })
            return JobModel.updateOne({_id: fields.jobId}, {
                cvs: cvs
            })
        }).then(data => {
            //cvs.push({file: data.file, status: data.status});
            
        }).then(data => {
            console.log(data);
        })
    })
});

module.exports = router;