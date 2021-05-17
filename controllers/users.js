const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = {
    getRegister(req, res) {
        res.render('users/register');
    },
    
    async postRegister(req, res) {
        const reqUser = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(reqUser.password, salt);
        
        User.create({
            email: reqUser.email,
            password: hash
        }).then((user) => {
            req.logIn(user, (err) => {
                if(err) {
                    res.render('users/register', { error });
                } else {
                    req.flash('success_msg', 'Successful registered!');
                    res.redirect('/');
                }
            });
        }).catch((err) => {
            res.render('users/register', { error_msg: 'This email exsits!' });
        });
    },
    
    getLogin(req, res) {
        res.render('users/login');
    },
    
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    },

    logout(req, res) {
        req.logout();
        req.flash('success_msg', 'Successful log out');
        res.redirect('login');
    }
}