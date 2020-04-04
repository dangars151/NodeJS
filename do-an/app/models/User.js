var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

// var Schema = mongoose.Schema;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connect db thanh cong');
// });

var UserSchema = mongoose.Schema({
    email: String,
    password: String,
    role: String,
    fullname: String,
    image: String,
    description: String,
    companyId: String,
    jobsId: [String]
})

var UserModel = mongoose.model("user", UserSchema);
// UserModel.create([
//      {email: "admin@gmail.com", password: "1", role: "admin"},
    // {email: "company@gmail.com", password: "1", role: "company_user", company: {name: "abc"}},
    // {email: "candidate@gmail.com", password: "1", role: "candidate_user"}
    //{email: "dang", password: "4", role: "candidate_user", image: 'link'}
    // {email: "dang@gmail.com", password: "1", role: "company_user", 
    // company: {name: "ABC", website: "abc.vn", email: "abc@gmail.com", description: 'Công ty phát triển phần mềm chuyên nghiệp'}}
    //]).then

module.exports = UserModel;