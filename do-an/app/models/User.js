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
    company: {
        name: String,
        website: String,
        description: String,
        image: String,
        email: String
    }
})

var UserModel = mongoose.model("user", UserSchema);
//UserModel.create([
    // {email: "dang", password: "1", role: "admin"},
    //{email: "dang", password: "2", role: "company_user", company: {name: "abc"}},
    // {email: "dang", password: "3", role: "candidate_user"}
    //{email: "dang", password: "4", role: "candidate_user", image: 'link'}
    // {email: "dang@gmail.com", password: "1", role: "company_user", 
    // company: {name: "ABC", website: "abc.vn", email: "abc@gmail.com", description: 'Công ty phát triển phần mềm chuyên nghiệp'}}
    //]).then

module.exports = UserModel;