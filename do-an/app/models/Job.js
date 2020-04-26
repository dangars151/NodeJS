var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);

var JobSchema = mongoose.Schema({
    title: String,
    name: String,
    salary_from: Number,
    salary_to: Number,
    out_date: Date,
    created_at: Date,
    description: String,
    status: Number,
    companyName: String,
    companyLocation: String,
    companyId: String,
    companyImage: String,
    workId: String,
    cvs: [Object]
})

var JobModel = mongoose.model("job", JobSchema);
//JobModel.create([
//     {title: "Kế toán", salary_from: 5, salary_to: 6, company: { name: 'ABC', location: 'Hà Nội' }},
//     {title: "Thiết kế website", salary_from: 8, salary_to: 10, company: { name: 'CDE', location: 'Hà Nội' }},
//     {title: "Tester", salary_from: 5, salary_to: 7, company: { name: 'FGH', location: 'TP Hồ Chí Minh' }},
//     {title: "Lập trình viên PHP", salary_from: 10, salary_to: 12, company: { name: 'XYZ', location: 'TP Hồ Chí Minh' }}
//  {title: "Nhân viên ngân hàng", salary_from: 10, salary_to: 12, created_at: Date.now(), company: { name: 'ABCDEF', location: 'TP Hồ Chí Minh' }}
// ]).then

// JobModel.updateOne({_id: '5e8357396351630dcc721ac7'}, {
//     title: 'Thu ngân',
//     name: 'Kế toán',
//     workId: '5e8461e693931725b8c5a21d'
// }).then(function(data) {
//     console.log(data);
// })

module.exports = JobModel;