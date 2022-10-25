const path = require('path');

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://qasim:qasim123@nodeapplication.me7nd.mongodb.net/shop';

const app = express();
const store = MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'qwerty', resave: false, saveUninitialized: false, store: store }));  //resave only be saved when theres somechage

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
app.use(authRoutes);


app.use(errorController.get404);

mongoose.connect(MONGODB_URI).then(reusult => {
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

  app.listen(5000);
}).catch(err => {
  console.log(err)
})