const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');

app.use(morgan('combined'));

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