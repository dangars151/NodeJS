var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var EventSchema = mongoose.Schema({
    creator_id: {
        type: String,
        ref: 'user'
    },
    title: String,
    time: String,
    date: Date,
    code: String,
    participants: [
        {
            user_id: String,
            status: Number,
            reason: String
        }
    ]
})

var EventModel = mongoose.model("event", EventSchema);

module.exports = EventModel;