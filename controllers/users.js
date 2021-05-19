const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { getAllPostsByUserId } = require("../services/post");
const { getUserById } = require("../services/user");

module.exports = {
    getRegister(req, res) {
        res.render('users/register', { title: 'Регистрация' });
    },

    async postRegister(req, res) {
        const reqUser = req.body;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(reqUser.password, salt);

        User.create({
            email: reqUser.email,
            username: reqUser.firstName + ' ' + reqUser.lastName,
            password: hash
        }).then((user) => {
            req.logIn(user, (err) => {
                if (err) {
                    res.render('users/register', { title: 'Регистрация', error });
                } else {
                    req.flash('success_msg', 'Успешно направена регистрация!');
                    res.redirect('/');
                }
            });
        }).catch((err) => {
            res.render('users/register', { title: 'Регистрация', error_msg: 'Този имейл вече съществува!' });
        });
    },

    getLogin(req, res) {
        res.render('users/login', { title: 'Вход' });
    },

    async getAccount(req, res) {
        const id = req.params.id ? req.params.id : req.user._id;
        const posts = await getAllPostsByUserId(id);
        const user = await getUserById(id);

        posts.forEach(post => {
            post.createdOn = new Date(post.createdOn).toLocaleDateString();
        });

        res.render('users/account', { title: req.user ? req.user.username : user.username, posts });
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
        req.flash('success_msg', 'Излизането беше успешно!');
        res.redirect('login');
    }
}