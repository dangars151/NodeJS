var express = require("express");

var router = express.Router();

var userCompany = require('../models/UserCompany');

router.post('/', function(req, res) {
    if (!req.session.user) return res.json("Bạn phải đăng nhập để thực hiện chức năng này!");
    var msg = '';
    userCompany.findOne({user_id: req.session.user._id, company_id: req.body.companyId})
    .then(data => {
        if (data) {
            msg = 'Bạn đã theo dõi công ty này rồi!';
            return msg;
        }
        return userCompany.create({
            user_id: req.session.user._id,
            company_id: req.body.companyId
        })
    }).then(data => {
        if (msg == '') msg = 'Theo dõi công ty thành công! Bạn sẽ nhận được thông báo khi công ty có job mới!';
        return res.json(msg);
    })
});

module.exports = router;