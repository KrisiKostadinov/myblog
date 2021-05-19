const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/create', restrictedPages.auth, restrictedPages.setIsLoggedIn, controllers.postController.getCreatePost);
router.get('/details/:id', restrictedPages.auth, restrictedPages.setIsLoggedIn, controllers.postController.getPost);

router.post('/create', restrictedPages.auth, controllers.postController.postCreatePost);

module.exports = router;