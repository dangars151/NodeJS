var express = require("express");

var router = express.Router();

var event = require('../models/Event');
var notification = require('../models/Notification');

router.post('/', (req, res) => {
    event.findOneAndUpdate({_id: req.body.eventIdUpdated}, {
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        code: req.body.code
    }).then(data => {
        return notification.updateMany({event_id: req.body.eventIdUpdated}, {
            title: 'Sự kiện ' + data.title + ' đã bị thay đổi',
            is_read: 0,
            created_at: Date.now()
        })
    }).then(data => {
        return event.find({creator_id: req.session.user._id});
    }).then(data => {
        return res.render('events', {data: req.session.user, events: data})
    })
})

module.exports = router;