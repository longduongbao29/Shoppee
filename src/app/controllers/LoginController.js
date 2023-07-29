const bcrypt = require('bcrypt');
const db = require('../../mysqlconnector');
const User = require('../../models/user_model')
const saltRounds = 10;



class LoginController {
    login(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        db.query("SELECT * FROM users WHERE username=? LIMIT 1", username, function (err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (Object.keys(user).length === 0) {
                return res.json({ success: false, message: "User not found!" })
            }
            user = user[0];
            bcrypt.compare(password, user.password_hash, function (err, result) {
                if (err) {
                    return res.status(500).send(err.message)
                } if (result) {
                    req.session.loggedInUser = {
                        id: user.id,
                        username: username,
                        role: 'user', // Hoặc 'admin' nếu là quản trị viên
                    };
                    return res.json({ success: true, message: "Login successful!" });
                }
                else {
                    return res.json({ success: false, message: "Password incorrect!" });
                }
            });
        })
    }

    register(req, res) {
        const username = req.body.username;
        const password = req.body.password;
        db.query("SELECT * FROM users WHERE username=? LIMIT 1", username, function (err, user) {
            if (err) {
                return res.status(500).send(err.message);
            }
            if (Object.keys(user).length !== 0) {
                return res.json({ success: false, message: "User had already existed!" })
            }
            bcrypt.hash(password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(500).send(err.message);
                }
                const new_user = {
                    username: username,
                    password_hash: hash
                }
                User.create(new_user, (err, result) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    } else {
                        return console.log('User added successfully.');
                    }
                }
                );
                return res.json({ success: true, message: "Created new user successfully!" });
            });
        })

    }

    checkLogin(req, res, next) {
        if (!!req.session.loggedInUser) {
            return next(); // Gọi hàm next() để tiếp tục chuyển tiếp request và response
        } else {
            // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
            return res.redirect('/login');
        }
    }

    loggedIn(req) {
        return !!req.session.loggedInUser;
    }
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Lỗi khi đăng xuất:', err);
                return res.status(500).json({ message: 'Có lỗi khi đăng xuất' });
            }
            else {
                return res.redirect("/home");
            }
        });

    }
}

module.exports = new LoginController;