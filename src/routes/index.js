const siteRouter = require('./site');
const loginRouter = require('./login');
function route(app) {

    app.use('/', siteRouter);
    app.use('/', loginRouter);

}

module.exports = route;