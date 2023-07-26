const pageRouter = require('./site');
function route(app) {
    app.use('/', pageRouter)

}

module.exports = route;