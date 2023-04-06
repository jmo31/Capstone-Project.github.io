const express = require('express');
const controller = require('../controllers/userController');

const {isGuest, isLoggedIn} =require('../middleware/auth')

const router = express.Router();


router.get('/new', isGuest, controller.new);

router.post('/',isGuest, controller.create);

router.get('/login', isGuest, controller.newLogin);

router.post('/login', isGuest, controller.createLogin);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;