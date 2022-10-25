exports.getLogin = (req, res, next) => {
   const isloggedIn = req.session.isloggedIn
  // console.log(req.session.isloggedIn)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isloggedIn
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true');
  req.session.isloggedIn = true;
  res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err); 
    res.redirect('/');
  })
};