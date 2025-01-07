const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Route thêm sản phẩm mới (upload ảnh trực tiếp)
router.post('/', ProductController.createProduct);

// Route lấy danh sách sản phẩm
router.get('/', ProductController.getProducts);

// Route lấy chi tiết sản phẩm theo ID
router.get('/:id', ProductController.getProductById);

// Route xóa sản phẩm
router.delete('/:id', ProductController.deleteProduct);

// route update thông tin sản phẩm
// Route cập nhật thông tin sản phẩm
router.put('/:id', ProductController.updateProduct);


// lấy thông tin sản phẩm theo loại
router.get('/category/:category', ProductController.getProductsByCategory);


module.exports = router;
