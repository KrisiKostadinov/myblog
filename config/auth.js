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

    admin(req, res, next) {
        if(req.user?.role === 'admin') {
            return next();
        }

        res.redirect('/');
    },
    
    setIsLoggedIn(req, res, next) {
        try {
            if(req.isAuthenticated()) {
                res.locals.username = req.user.username;
                res.locals.role = req.user.role;
                res.locals.isLoggedIn = true;
                console.log(req.flash.error);
            }
        } catch(err) {
            console.log(err);
        }

        next();
    }
}