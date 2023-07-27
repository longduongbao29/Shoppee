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
    loginSite(req, res) {
        res.render('login', { showHeader: false, showFooter: false, isLoginForm: true });
    }
    registerSite(req, res) {
        res.render('login', { showHeader: false, showFooter: false, isLoginForm: false });
    }

}


module.exports = new SiteController;