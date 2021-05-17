module.exports = {
    auth(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Тази страница е само за логнати потребители.');
        res.redirect('/users/login');
    },

    guest(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    },
    
    setIsLoggedIn(req, res, next) {
        try {
            if(req.isAuthenticated()) {
                res.locals.isLoggedIn = true;
                res.locals.username = req.user.username;
            }
        } catch(err) {
            console.log(err);
        }

        next();
    }
}