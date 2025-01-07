const mongoose = require('mongoose');

// định nghĩa cho youtube
const youtubeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    youtubeLink: {
        type: String,
        required: true,
        trim: true,
    }
});

// tạo model youtube từ schema
const youtube = mongoose.model('youtube', youtubeSchema);

module.exports = youtube;