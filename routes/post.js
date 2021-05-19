const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/create', restrictedPages.auth, restrictedPages.setIsLoggedIn, controllers.postController.getCreatePost);
router.get('/details/:id', restrictedPages.setIsLoggedIn, controllers.postController.getPost);
router.get('/?query', restrictedPages.setIsLoggedIn, controllers.postController.searchPosts);

router.post('/create', restrictedPages.auth, controllers.postController.postCreatePost);

router.delete('/delete/:id', restrictedPages.auth, controllers.postController.deletePost);

module.exports = router;