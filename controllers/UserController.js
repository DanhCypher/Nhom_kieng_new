const User = require('../models/User');
const jwt = require('jsonwebtoken'); // Tạo JWT token
const Customer = require('../models/Customer');

// Đăng ký tài khoản mới
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng ký', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đăng nhập', error: error.message });
  }
};

// Tạo thông tin khách hàng
exports.createCustomer = async (req, res) => {
  const { name, email, phoneNumber, userId } = req.body;
  try {
    const newCustomer = new Customer({
      name,
      email,
      phoneNumber,
      userId,
    });

    await newCustomer.save();
    res.status(201).json({ message: 'Tạo khách hàng thành công', customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo khách hàng', error: error.message });
  }
};

// Hiển thị thông tin tất cả khách hàng
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin khách hàng', error: error.message });
  }
};


// Xóa thông tin khách hàng
exports.deleteCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    }
    res.status(200).json({ message: 'Xóa khách hàng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa khách hàng', error: error.message });
  }
};

