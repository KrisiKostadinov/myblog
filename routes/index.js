const express = require('express');
const restrictedPages = require('../config/auth');
const router = express.Router();

router.get('/', restrictedPages.setIsLoggedIn, (req, res) => {
    res.render('index', { title: 'Начало' });
});

router.get('/about', restrictedPages.setIsLoggedIn, (req, res) => {
    res.render('about', { title: 'За мен' });
});

module.exports = router;