module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log('redirecting')
        return res.redirect('/login');
    }
    else{
        console.log('calling next')
    next();
    }
    
}