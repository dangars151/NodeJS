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
    res.render('join-room');
});

router.post('/' , function(req, res) {
    let mailOptions = {
        from: 'nodejsmailtest1501@gmail.com',
        to: 'hathedang1501@gmail.com',
        //to: req.session.user.email
        subject: 'Mã code để join phòng',
        text: 'MÃ PHÒNG: '+ 'room' + Math.floor(Math.random() * 1000)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        return res.json('Tạo phòng thành công, hãy check mail để lấy mã vào phòng')
    });
})

module.exports = router;