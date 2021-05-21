const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.post('/create/:projectAppId', restrictedPages.auth, controllers.commentAppController.postCreateComment);

router.delete('/delete/:id/:projectAppId', restrictedPages.auth, controllers.commentAppController.deleteComment);

module.exports = router;