var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var CompanySchema = mongoose.Schema({
    name: String,
    website: String,
    description: String,
    image: String,
    email: String,
    location: String,
    jobsId: [String],
    usersId: [String]
})

var CompanyModel = mongoose.model("company", CompanySchema);
//CompanyModel.create([
//     {name: 'ABC', website: 'abc.vn', email: 'abc@gmail.com', description: 'Công ty phát triển phần mềm chuyên nghiệp', location: 'Bắc Ninh'},
//     {name: 'Hblab', website: 'hblab.vn', email: 'hblab@gmail.com', location: 'Hà Nội'},
//     {name: 'VCorp', website: 'vcorp.com.vn', email: 'dangars151@gmail.com', description: 'hahahahahahah', location: 'Hà Nội'},
 //   {name: 'ABCDEF', jobsId: ['abc', 'def']},
//     {name: 'Hà Thế Đăng', website: 'vcorp.vn', email: 'dang@gmail.com', description: 'hahahahahha', location: 'TP Hồ Chí Minh', image: 'public/images/giang.jpg'}
// ]).then

module.exports = CompanyModel;