var express = require("express");

var router = express.Router();

var event = require('../models/Event');
var notification = require('../models/Notification');

router.post('/', (req, res) => {
    event.findOneAndDelete({_id: req.body.eventId})
    .then(data => {
        notification.updateMany({event_id: req.body.eventId}, {
            title: 'Sự kiện ' + data.title + ' đã bị hủy.',
            is_read: 0,
            created_at: Date.now()
        }).then(data => {
            //console.log(data);
        })
        return event.find({creator_id: req.session.user._id});
    }).then(data => {
        return res.render('events', {data: req.session.user, events: data})
    })
})

module.exports = router;