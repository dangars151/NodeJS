var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var NotificationSchema = mongoose.Schema({
    title: String,
    user_id: String,
    company_id: String,
    is_read: Number
})

var NotificationModel = mongoose.model("notification", NotificationSchema);

// NotificationModel.create({
//     title: 'test',
//     user_id: 'test',
//     company_id: 'test',
//     is_read: 0
// }).then(data => console.log(data));

module.exports = NotificationModel;