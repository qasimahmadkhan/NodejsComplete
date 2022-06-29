const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');

const app = express();

const db = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views'); // and where to find these template

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //to load static css file

// db.execute('SELECT * FROM node_complete.products')
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);