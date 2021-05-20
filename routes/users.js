const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/register', restrictedPages.guest, controllers.usersController.getRegister);
router.get('/login', restrictedPages.guest, controllers.usersController.getLogin);
router.get('/account', restrictedPages.auth, restrictedPages.setIsLoggedIn, controllers.usersController.getAccount);
router.get('/account/:id', restrictedPages.setIsLoggedIn, controllers.usersController.getAccount);
router.get('/verification/:userId/:secret', restrictedPages.auth, restrictedPages.setIsLoggedIn, controllers.usersController.verify);

router.post('/register', restrictedPages.guest, controllers.usersController.postRegister);
router.post('/login', restrictedPages.guest, controllers.usersController.postLogin);
router.post('/verification', restrictedPages.auth, controllers.usersController.resendVerification);
router.delete('/logout', restrictedPages.auth, controllers.usersController.logout);

module.exports = router;