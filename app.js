const express = require('express');
const connectDB = require('./models/config'); // Kết nối MongoDB
const bodyParser = require('body-parser');
const productRoutes = require('./routes/ProductRoute'); // Import route sản phẩm
const UserRoute = require('./routes/UserRoute');
const routeLinks = require('./routes/youtubeRoute'); // Import route youtube
const path = require('path'); // Thư viện xử lý đường dẫn
const cors = require('cors'); // Thêm cors



const app = express();
const PORT = 3002;

// Middleware xử lý JSON
app.use(express.json());

// Middleware CORS
app.use(cors({
    origin: '*', // Cho phép tất cả các domain (hoặc thay thế bằng danh sách domain cụ thể)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Các phương thức HTTP được phép
    allowedHeaders: 'Content-Type, Authorization' // Các header được phép
}));

// Static file để phục vụ hình ảnh đã upload
app.use('/uploads', express.static('uploads'));
app.use('/css', express.static(path.join(__dirname, 'css'))); // Phục vụ CSS
app.use('/img', express.static(path.join(__dirname, 'img'))); // Phục vụ img
app.use('/js', express.static(path.join(__dirname, 'js'))); // Phục vụ js
app.use('/fonts', express.static(path.join(__dirname, 'fonts'))); // Phục vụ fonts

// Kết nối tới MongoDB
connectDB();

// Sử dụng route sản phẩm
app.use('/api/products', productRoutes);

// sử dụng route youtube
app.use('/api/links', routeLinks);

// Middleware và api đăng nhập
app.use(bodyParser.json());
app.use('/api/users', UserRoute); // Sử dụng route User

// ** Gắn trang index.html **
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ** Gắn trang test.html **
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// gắn trang tư vấn 
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

// gắn trang đăng nhập
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// gắn trang quản lý sản phẩm
app.get('/quanlysp', (req, res) => {
    res.sendFile(path.join(__dirname, 'Product Management Ui.html'));
});

// gắn trang quản lý sản phẩm
app.get('/chitietsp', (req, res) => {
    res.sendFile(path.join(__dirname, 'productDetail.html'));
});

// thêm sản phẩm 
app.get('/themsp', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-product.html'));
});

// sửa sản phẩm
app.get('/suasp', (req, res) => {
    res.sendFile(path.join(__dirname, 'edit-product.html'));
});

// xóa sp
app.get('/xoasp', (req, res) => {
    res.sendFile(path.join(__dirname, 'delete-product.html'));
});


// thêm link yt
app.get('/themlink', (req, res) => {
    res.sendFile(path.join(__dirname, 'addLink.html'));
});

// cập nhật link yt
app.get('/capnhatlink', (req, res) => {
    res.sendFile(path.join(__dirname, 'updateLink.html'));
});

// Lắng nghe server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
