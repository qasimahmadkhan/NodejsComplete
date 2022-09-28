const path = require('path');

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('63242b72ecfe39f3b207d874')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://qasim:qasim123@nodeapplication.me7nd.mongodb.net/shop').then(reusult => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Qasim Ahmad',
        email: 'qasim@ahmad.com',
        cart: {
          items: []
        }
      });
      user.save();

    }
  })

  app.listen(3000);
}).catch(err => {
  console.log(err)
})