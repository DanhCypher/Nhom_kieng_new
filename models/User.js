const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Sử dụng bcrypt để mã hóa mật khẩu

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
});

// Hàm mã hóa mật khẩu trước khi lưu
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Hàm so sánh mật khẩu khi đăng nhập
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
