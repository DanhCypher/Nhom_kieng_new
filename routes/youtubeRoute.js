const express = require('express');
const router = express.Router();
const youtubeController = require('../controllers/youtubeController');

// Route để lấy danh sách tất cả các link
router.get('/youtube', youtubeController.getLink);

// Route để tạo mới một link youtube
router.post('/youtube', youtubeController.createLink);

// Route để lấy thông tin chi tiết của tất cả
router.get('/get', youtubeController.getAllLinkYoutube);

// Route để lấy thông tin chi tiết của tất cả
router.get('/getId/:id', youtubeController.getLinkYoutubeById);

// Route để cập nhật thông tin của một link theo ID
router.put('/youtube/:id', youtubeController.updateLink);

// Route để xóa một link theo ID
router.delete('/youtube/:id', youtubeController.deleteLink);

module.exports = router;
