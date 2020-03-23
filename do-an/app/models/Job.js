var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var JobSchema = mongoose.Schema({
    title: String,
    salary_from: Number,
    salary_to: Number,
    company: {
        name: String,
        image: String,
        location: String
    }
})

var JobModel = mongoose.model("job", JobSchema);
// JobModel.create([
//     {title: "Kế toán", salary_from: 5, salary_to: 6, company: { name: 'ABC', location: 'Hà Nội' }},
//     {title: "Thiết kế website", salary_from: 8, salary_to: 10, company: { name: 'CDE', location: 'Hà Nội' }},
//     {title: "Tester", salary_from: 5, salary_to: 7, company: { name: 'FGH', location: 'TP Hồ Chí Minh' }},
//     {title: "Lập trình viên PHP", salary_from: 10, salary_to: 12, company: { name: 'XYZ', location: 'TP Hồ Chí Minh' }}
// ]).then

module.exports = JobModel;