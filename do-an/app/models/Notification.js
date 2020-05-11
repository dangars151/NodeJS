var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var NotificationSchema = mongoose.Schema({
    title: String,
    user_id: String,
    company_id: String,
    is_read: Number,
    job_id: String,
    created_at: Date,
    type: Number,
    event_id: String
})

var NotificationModel = mongoose.model("notification", NotificationSchema);

// NotificationModel.create({
//     title: 'test',
//     user_id: 'test',
//     company_id: 'test',
//     is_read: 0,
//     job_id: 'test',
//     created_at: Date.now()
// }).then(data => console.log(data));

module.exports = NotificationModel;