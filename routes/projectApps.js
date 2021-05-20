const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/all', restrictedPages.setIsLoggedIn, controllers.projectAppController.getAll);

module.exports = router;