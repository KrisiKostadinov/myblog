const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/register', restrictedPages.guestSuccess, controllers.usersController.getRegister);
router.get('/login', restrictedPages.guestSuccess, controllers.usersController.getLogin);

router.post('/register', restrictedPages.guestSuccess, controllers.usersController.postRegister);
router.post('/login', restrictedPages.guestSuccess, controllers.usersController.postLogin);
router.delete('/logout', restrictedPages.authSuccess, controllers.usersController.logout);

module.exports = router;