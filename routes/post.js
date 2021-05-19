const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/create', restrictedPages.auth, controllers.postController.getCreatePost);

router.post('/create', restrictedPages.auth, controllers.postController.postCreatePost);

module.exports = router;