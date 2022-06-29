exports.get404 = (req, res, next) => {   //if no url exist then show 404 page
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not found',path:'/404' });
}