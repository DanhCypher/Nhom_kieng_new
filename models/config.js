const mongoose = require('mongoose');

// URL kết nối tới MongoDB (thay đổi theo cài đặt của bạn)
const mongoURI = 'mongodb://localhost:27017/nhom_kieng_khanh_trinh'; // 'mydatabase' là tên database

// Tùy chọn cho kết nối
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB() {
  try {
    // Thực hiện kết nối
    await mongoose.connect(mongoURI, options);
    console.log('Kết nối tới MongoDB thành công!');
  } catch (error) {
    console.error('Kết nối MongoDB thất bại:', error.message);
    process.exit(1); // Dừng chương trình nếu kết nối thất bại
  }
}

// Xuất hàm kết nối để sử dụng ở nơi khác
module.exports = connectDB;
