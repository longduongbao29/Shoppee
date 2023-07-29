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
        const page = req.params.page;
        db.query("SELECT *,FORMAT(oldPrice, 0) AS oldPrice,FORMAT(newPrice, 0) AS newPrice FROM products WHERE products.id BETWEEN ? AND ?", [(page - 1) * 25 + 1, page * 25], function (err, products) {

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
    order(req, res) {
        var product_id = req.params.id;
        db.query("SELECT *,FORMAT(oldPrice, 0) AS oldPrice,FORMAT(newPrice, 0) AS newPrice FROM products WHERE products.id=?", product_id, function (err, product) {
            // return res.send(product)
            res.render('order', { showHeader: true, showFooter: true, loggedIn: true, product: product[0] });
        })

    }
    confirmOrder(req, res) {
        const id = req.params.id;
        const user_id = req.session.loggedInUser.id;

        // Hàm thực hiện truy vấn products
        function getProduct() {
            return new Promise((resolve, reject) => {
                db.query("SELECT *,FORMAT(newPrice,0) as newPrice FROM products WHERE products.id = ?", id, function (err, product_) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(product_[0]);
                    }
                });
            });
        }

        // Hàm thực hiện truy vấn user_infos
        function getUser() {
            return new Promise((resolve, reject) => {
                db.query("SELECT * FROM user_infos WHERE user_infos.id = ?", user_id, function (err, user_) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(user_[0]);
                    }
                });
            });
        }

        // Sử dụng Promise.all để đợi cả hai truy vấn hoàn thành
        Promise.all([getProduct(), getUser()])
            .then(([product, user]) => {
                res.render('confirm_order', { showHeader: true, showFooter: true, loggedIn: true, product: product, user: user });
            })
            .catch((err) => {
                res.send(err); // Xử lý lỗi nếu có
            });
    }

}


module.exports = new SiteController;