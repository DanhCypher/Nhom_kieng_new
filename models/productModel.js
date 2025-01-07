const mongoose = require('mongoose');

// Định nghĩa schema cho Product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Loại bỏ khoảng trắng đầu/cuối
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Giá không được âm
  },
  quantity: {
    type: Number,
    required: true,
    min: 0, // Số lượng không được âm
  },
  description: {
    type: String,
    required: false, // Không bắt buộc
    trim: true,
  },
  images: {
    type: [String], // Mảng chứa các đường dẫn (URL) hoặc tên file của hình ảnh
    required: true,
  },
  link: {
    type: [String], // chứa link sản phẩm
    required: true,
  },
  category: { // Thêm loại sản phẩm
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

// Tạo model Product từ schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
