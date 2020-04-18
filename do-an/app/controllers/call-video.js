var express = require("express");

var router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '977271',
    key: '9a681ec33ff0af53eae3',
    secret: '6a5f8fd2f02d916a8831',
    cluster: 'ap1',
    useTLS: true
});

router.post('/', function(req, res) {
    res.render('call-video', {code: req.body.code});
});

router.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
  
    const user_id = req.cookies.user_id; 
  
    const presenceData = { user_id: user_id };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

module.exports = router;