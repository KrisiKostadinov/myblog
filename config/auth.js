module.exports = {
    authSuccess(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Not logged in');
        res.redirect('/users/login');
    },

    guestSuccess(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');
    },
    
    isAuth(req, res, next) {
        try {
            if(req.isAuthenticated()) {
                res.locals.isLoggedIn = true;
            }
        } catch(err) {
            console.log(err);
        }

        next();
    }
}