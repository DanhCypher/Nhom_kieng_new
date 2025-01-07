  const Product = require('../models/productModel');
  const multer = require('multer');
  const path = require('path');

  // Cấu hình Multer trực tiếp
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Thư mục lưu hình ảnh
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file duy nhất
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Chỉ chấp nhận file hình ảnh'), false);
      }
    },
  }).array('images', 5); // Hỗ trợ upload tối đa 5 ảnh

  // Thêm sản phẩm mới
  exports.createProduct = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Lỗi khi upload ảnh', error: err.message });
      }

      try {
        const { name, price, quantity, description, link, category } = req.body;
        const imagePaths = req.files.map(file => file.path); // Lấy đường dẫn file ảnh

        const newProduct = new Product({
          name,
          price,
          quantity,
          description,
          images: imagePaths,
          link,
          category,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Sản phẩm đã được tạo', product: newProduct });
      } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: error.message });
      }
    });
  };

  // Lấy danh sách sản phẩm
  exports.getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: error.message });
    }
  };

  // Lấy chi tiết sản phẩm
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: error.message });
    }
  };

  // Xóa sản phẩm
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }
      res.status(200).json({ message: 'Sản phẩm đã được xóa' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: error.message });
    }
  };

  // update thông tin sản phẩm 
  // Cập nhật thông tin sản phẩm
  exports.updateProduct = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Lỗi khi upload ảnh', error: err.message });
      }

      try {
        const { name, price, quantity, description, link, category } = req.body;
        const productId = req.params.id;

        // Tìm sản phẩm theo ID
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Cập nhật thông tin sản phẩm
        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.description = description || product.description;
        product.link = link || product.link;
        product.category = category || product.category;

        // Cập nhật hình ảnh nếu có upload mới
        if (req.files && req.files.length > 0) {
          const imagePaths = req.files.map(file => file.path);
          product.images = imagePaths;
        }

        await product.save();
        res.status(200).json({ message: 'Sản phẩm đã được cập nhật', product });
      } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: error.message });
      }
    });
  };


  // Lấy sản phẩm dựa trên loại sản phẩm
  exports.getProductsByCategory = async (req, res) => {
    try {
      const category = req.params.category;

      // Tìm sản phẩm theo loại
      const products = await Product.find({ category });

      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong loại này' });
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy sản phẩm theo loại', error: error.message });
    }
  };







