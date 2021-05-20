const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const restrictedPages = require('../config/auth');

router.get('/users', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.administrationController.getUsers);
router.get('/users/:page', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.administrationController.getUsers);
router.get('/posts', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.administrationController.getPosts);
router.get('/posts/:page', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.administrationController.getPosts);
router.get('/projects/apps/create', restrictedPages.setIsLoggedIn, restrictedPages.admin, controllers.projectAppController.getCreateProjectApp);

router.post('/projects/apps/create', restrictedPages.admin, controllers.projectAppController.postCreateProjectApp);

module.exports = router;