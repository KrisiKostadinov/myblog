const express = require('express');
const restrictedPages = require('../config/auth');
const router = express.Router();

router.get('/', restrictedPages.setIsLoggedIn, (req, res) => {
    res.render('index');
});

router.get('/about', restrictedPages.setIsLoggedIn, (req, res) => {
    res.render('about');
});

module.exports = router;