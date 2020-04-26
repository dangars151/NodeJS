var express = require("express");

var router = express.Router();

var user = require("../models/User");

router.post('/', function(req, res) {
    var companiesId = [];
    user.findOne({_id: req.session.user._id})
    .then(data => {
        if(data.companiesId.includes(req.body.companyId)) {
            return res.json('Bạn đã theo dõi công ty này rồi!');
        }
        companiesId = data.companiesId;
        companiesId.push(req.body.companyId);
        return user.updateOne({_id: req.session.user._id}, {
            companiesId: companiesId
        })
    }).then(data => {
        return res.json('Theo dõi công ty thành công, bạn sẽ nhận được thông báo khi công ty có job mới!');
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;