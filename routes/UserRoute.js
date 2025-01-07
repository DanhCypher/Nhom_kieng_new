const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


// Route đăng ký
router.post('/register', UserController.register);

// Route đăng nhập
router.post('/login', UserController.login);

// Route tạo thông tin khách hàng
router.post('/info', UserController.createCustomer);

// Route hiển thị thông tin khách hàng
router.get('/allCustomers', UserController.getCustomers);

// Route xóa thông tin khách hàng
router.delete('/customers/:customerId', UserController.deleteCustomer);

module.exports = router;
