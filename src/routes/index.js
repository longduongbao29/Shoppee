const pageRouter = require('./site');
const loginRouter = require('./login');
function route(app) {

    app.use('/', pageRouter);
    app.use('/', loginRouter);

}

module.exports = route;