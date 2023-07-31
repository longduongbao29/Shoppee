const siteRouter = require('./site');
const loginRouter = require('./login');
const api = require('./api');
function route(app) {

    app.use('/', siteRouter);
    app.use('/', loginRouter);
    app.use('/', api);
}

module.exports = route;