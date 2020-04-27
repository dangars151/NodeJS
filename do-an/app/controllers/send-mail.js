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

router.get('/', function(req, res) {
    res.render('send-mail');
});

router.post('/', function(req, res) {
    let mailOptions = {
        from: 'nodejsmailtest1501@gmail.com',
        to: 'hathedang1501@gmail.com',
        //to: req.session.user.email
        subject: req.body.subject,
        //text: req.body.content,
        html: req.body.content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        return res.json('Gửi mail thành công!')
    });
});

module.exports = router;