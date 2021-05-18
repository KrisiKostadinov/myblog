const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/users', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.administrationController.getUsers);

module.exports = router;