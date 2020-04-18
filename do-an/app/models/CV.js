var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var CVSchema = mongoose.Schema({
    user_id: String,
    file: String,
    status: Number
})

var CVModel = mongoose.model("cv", CVSchema);

// CVModel.create({
//     user_id: 'test',
//     job_id: 'test',
//     file: 'test',
//     status: 0
// }).then(data => {
//     console.log(data);
// })

module.exports = CVModel;