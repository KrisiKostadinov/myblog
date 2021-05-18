const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/register', restrictedPages.guest, controllers.usersController.getRegister);
router.get('/login', restrictedPages.guest, controllers.usersController.getLogin);
router.get('/administration', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.usersController.getAdministration);

router.post('/register', restrictedPages.guest, controllers.usersController.postRegister);
router.post('/login', restrictedPages.guest, controllers.usersController.postLogin);
router.delete('/logout', restrictedPages.auth, controllers.usersController.logout);

module.exports = router;