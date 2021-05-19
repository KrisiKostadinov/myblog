const express = require('express');
const restrictedPages = require('../config/auth');
const post = require('../services/post');

const router = express.Router();

router.get('/', restrictedPages.setIsLoggedIn, async (req, res) => {
    const posts = await post.getAllPosts();
    posts.forEach(post => {
        post.createdOn = new Date(post.createdOn).toLocaleDateString();
    })
    res.render('index', { title: 'Начало', posts });
});

router.get('/about', restrictedPages.setIsLoggedIn, (req, res) => {
    res.render('about', { title: 'За мен' });
});

module.exports = router;