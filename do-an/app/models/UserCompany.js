var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var UserCompanySchema = mongoose.Schema({
    user_id: String,
    company_id: String
})

var UserCompanyModel = mongoose.model("user-company", UserCompanySchema);

module.exports = UserCompanyModel;