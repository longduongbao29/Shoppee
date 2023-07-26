class SiteController {

    home(req, res) {
        res.render('home');
    }
    login(req, res) {
        res.render('login', { showHeader: false, showFooter: false });
    }

}


module.exports = new SiteController;