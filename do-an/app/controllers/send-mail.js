var express = require("express");

var router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'nodejsmailtest1501@gmail.com',
        pass: 'dang1234'
    }
});

var user = require('../models/User');
var notification = require('../models/Notification');
var event = require('../models/Event');

router.get('/', function(req, res) {
    res.render('send-mail');
});

router.post('/', function(req, res) {
    //notification to user, create event
    var notifications = [];
    var participants = [];
    user.find({email: {$in: req.body.listEmails}})
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            notifications.push({
                company_id: data[i].companyId || data[i]._id,
                title: req.body.subject,
                is_read: 0,
                type: 4,
                created_at: Date.now(),
                user_id: data[i]._id
            });
            participants.push({
                user_id: data[i]._id,
                status: 0
            })
        }
        return event.create({
            creator_id: req.session.user._id,
            title: req.body.subject,
            time: req.body.time,
            date: req.body.date,
            participants: participants
        })
    }).then(data => {
        for (let i = 0; i < notifications.length; i++) {
            notifications[i].event_id = data._id;
        }
        return notification.create(notifications);
    }).then(data => {
        // sendmail
        let mailOptions = {
            from: 'nodejsmailtest1501@gmail.com',
            to: 'hathedang1501@gmail.com, nodejsmailtest1501@gmail.com',
            //to: req.session.user.email
            subject: req.body.subject,
            html: req.body.content
        };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return console.log(error.message);
        //     }
            return res.json('Tạo cuộc hẹn thành công!')
        //});
    })
});

module.exports = router;