const LoginController = require('./LoginController');
const db = require('../../mysqlconnector');
class SiteController {

    home(req, res) {
        let user;
        if (LoginController.loggedIn(req)) {

            db.query("SELECT * FROM users WHERE username=?", req.session.loggedInUser.username, function (err, user_) {
                user = user_[0];
            });
        }
        res.render('home', { showHeader: true, showFooter: true, loggedIn: LoginController.loggedIn(req), user: user });
    }
    getProducts(req, res) {
        db.query("SELECT * FROM products", function (err, products) {

            if (err) {
                return res.status(404).send(err);
            }
            return res.send(products);
        });

    }


    loginSite(req, res) {
        res.render('login', { showHeader: false, showFooter: false, isLoginForm: true });
    }
    registerSite(req, res) {
        res.render('login', { showHeader: false, showFooter: false, isLoginForm: false });
    }

    profile(req, res) {
        let user;
        db.query("SELECT * FROM users LEFT JOIN user_infos ON users.id = user_infos.id WHERE users.username=?", req.session.loggedInUser.username, function (err, user_) {
            if (err) {
                return res.status(404).send(err.message);
            }
            user = user_[0];

            // Tạo một đối tượng Date từ chuỗi ngày
            const dateObj = new Date(user.birthday);

            // Lấy thông tin ngày, tháng và năm từ đối tượng Date
            const ngay = dateObj.getDate().toString().padStart(2, '0');
            const thang = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const nam = dateObj.getFullYear().toString();

            user.birthday = `${nam}-${thang}-${ngay}`;

            console.log(user);
            return res.render('profile', { showHeader: true, showFooter: true, loggedIn: true, user: user });
        })
    }
}


module.exports = new SiteController;