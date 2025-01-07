const youtube = require('../models/youtube');

// Lấy danh sách tất cả các link
exports.getLink = async (req, res) => {
    try {
        const youtubeLinks = await youtube.find();
        res.status(200).json(youtubeLinks);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách', error: err.message });
    }
};

// Tạo mới một link youtube
exports.createLink = async (req, res) => {
    try {
        const { youtubeLink, title } = req.body;
        const newLink = new youtube({
            youtubeLink,
            title,
        });
        await newLink.save();
        res.status(201).json({ message: "Tạo thành công", data: newLink });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo link', error: err.message });
    }
};

// Lấy thông tin chi tiết của một link theo ID
exports.getAllLinkYoutube = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await youtube.find();

        if (!link) {
            return res.status(404).json({ message: 'Không tìm thấy link' });
        }

        res.status(200).json(link);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin link', error: err.message });
    }
};

exports.getLinkYoutubeById = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await youtube.findById(id);

        if (!link) {
            return res.status(404).json({ message: 'Không tìm thấy link' });
        }

        res.status(200).json(link);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin link', error: err.message });
    }
};


// Cập nhật thông tin của một link theo ID
exports.updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { youtubeLink, title } = req.body;
        const updatedLink = await youtube.findByIdAndUpdate(
            id,
            { youtubeLink, title },
            { new: true } // Trả về document đã cập nhật
        );

        if (!updatedLink) {
            return res.status(404).json({ message: 'Không tìm thấy link để cập nhật' });
        }

        res.status(200).json({ message: 'Cập nhật thành công', data: updatedLink });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật link', error: err.message });
    }
};

// Xóa một link theo ID
exports.deleteLink = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLink = await youtube.findByIdAndDelete(id);

        if (!deletedLink) {
            return res.status(404).json({ message: 'Không tìm thấy link để xóa' });
        }

        res.status(200).json({ message: 'Xóa thành công', data: deletedLink });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa link', error: err.message });
    }
};
