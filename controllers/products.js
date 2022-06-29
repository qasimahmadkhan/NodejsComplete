//const products = [];
const Product = require('../model/product');



exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  };
  
  exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  };
  
  exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  };
    //render method provided by express and it'll  use default templating engine
    // and the return that template
    //second argument allows us to pass in data that should be added in the view

    //since we defined all the views are in views folder we dont have to contruct a path for that
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

