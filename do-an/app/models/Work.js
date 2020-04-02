var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/do-an-test', {useNewUrlParser: true, useUnifiedTopology: true });

var WorkSchema = mongoose.Schema({
    name: String
})

var WorkModel = mongoose.model("work", WorkSchema);

// WorkModel.create([
//     { name: 'Lập trình phần mềm'},
//     { name: 'Truyền thông/Quảng cáo'},
//     { name: 'Bán hàng'},
//     { name: 'Kế toán'},
//     { name: 'Tài chính/Ngân hàng'},
//     { name: 'Thiết kế đồ họa'},
//     { name: 'Giảng dạy'},
//     { name: 'Kiểm thử phần mềm'},
//     { name: 'Sửa chữa/Lắp đặt'},
//     { name: 'An ninh mạng'}
// ]).then

module.exports = WorkModel;