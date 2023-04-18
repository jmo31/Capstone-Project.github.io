
const express =require('express');
const controller =require('../controllers/mainController')
const router =express.Router();

router.get('/',controller.index);
router.get('/about',controller.about);
router.get('/contact', controller.contact);
router.get('/sign', controller.sign);
router.get('/search', controller.search);
router.get('/register', controller.register);


module.exports =router;