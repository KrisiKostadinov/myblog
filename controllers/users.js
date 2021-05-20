const passport = require("passport");
const bcrypt = require("bcrypt");
const uuid = require('uuid');

const SecretCode = require("../models/SecretCode");
const User = require("../models/User");

const { getUserById, sendVerificationEmail } = require("../services/user");
const { getAllPostsByUserId } = require("../services/post");
const { user } = require("../services");

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
                    SecretCode.create({ email: user.email, code: uuid.v4() })
                        .then((secret) => {
                            sendVerificationEmail(user, secret)
                                .then(() => {
                                    req.flash('success_msg', 'Успешно направена регистрация! Моля, проверете имейл адреса за да потвърдите профила си.');
                                    res.redirect('/');
                                });
                        });
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

    async verify(req, res) {
        const { userId, secret } = req.params;


        const secretModel = await SecretCode.findOne({ code: secret });
        const userModel = await User.findById(userId);

        if (!userModel) {
            return res.render('404');
        }

        if (userModel.status === 'confirmed') {
            req.flash('error_msg', 'Вече сте потвърдили имейла си.');
            return res.redirect('/');
        }

        if (secretModel) {
            await User.findByIdAndUpdate(userModel._id, { status: 'confirmed' });
            await SecretCode.findByIdAndDelete(secretModel._id);
            return res.render('users/verify', {
                title: 'Успешно потвърден имейл.',
                confirmed: true,
                user: userModel,
                success_msg: 'Успешно потвърден имейл адрес.'
            });
        }
        
        res.render('users/verify', { title: 'Невалиден линк.', confirmed: false });
    },

    async resendVerification(req, res) {
        const user = await User.findById(req.user._id);
        if (user && user.status === 'pending') {
            const isOldSecret = await SecretCode.findOne({ email: user.email });
            if (!isOldSecret) {
                const secret = await SecretCode.create({ email: user.email, code: uuid.v4() });
                await sendVerificationEmail(user, secret);
                return res.render('users/verify', {
                    title: 'Успешно изпратен имейл',
                    confirmed: true,
                    user,
                    success_msg: 'Успешно изпратен имейл'
                });
            }

            return res.render('users/verify', { title: 'Невалиден линк.', confirmed: false });
        }

        res.redirect('/');
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