var express = require("express");

var router = express.Router();

var event = require('../models/Event');

router.post('/', function(req, res) {
    event.updateOne({"_id": req.body.eventId, "participants.user_id": req.session.user._id}, {
        "participants.$.status": 1,
        "participants.$.reason": ""
    }).then(data => {
        return res.json('Bạn đã chấp nhận tham gia sự kiện thành công!')
    })
});

module.exports = router;