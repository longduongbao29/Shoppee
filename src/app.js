const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const mysqlConnector = require('./mysqlconnector');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const route = require('./routes');

app.use(morgan(':method :url :response-time'));
//Lấy data từ form
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Sử dụng cookie-parser để giải mã thông tin phiên từ cookie
app.use(cookieParser());
// Cấu hình express-session
app.use(session({
    secret: 'your-secret-key', // Chuỗi bí mật này dùng để mã hóa thông tin trong phiên (có thể thay đổi)
    resave: false,
    saveUninitialized: false,
}));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// SỬ dụng Handlebars
app.engine('.hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Route
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});