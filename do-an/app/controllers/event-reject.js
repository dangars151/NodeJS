var express = require("express");

var router = express.Router();

var event = require('../models/Event');

router.post('/', function(req, res) {
    event.updateOne({"_id": req.body.eventId, "participants.user_id": req.session.user._id}, {
        "participants.$.status": 2,
        "participants.$.reason": req.body.reason 
    }).then(data => {
        return res.json('Bạn đã từ chối tham gia sự kiện này!')
    })
});

module.exports = router;