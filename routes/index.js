const express = require('express');
const restrictedPages = require('../config/auth');
const router = express.Router();

router.get('/', restrictedPages.isAuth, (req, res) => {
    res.render('index');
});

router.get('/about', restrictedPages.isAuth, restrictedPages.authSuccess, (req, res) => {
    res.render('about');
});

module.exports = router;