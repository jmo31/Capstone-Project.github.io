
const express =require('express');
const controller =require('../controllers/wishController')
const {fileUpload} = require('../middleware/fileUpload');
const router =express.Router();

router.get('/',controller.wish);
router.get('/new',controller.new);
router.post('/',fileUpload, controller.create);
router.get('/:id',controller.show);

router.put('/:id',fileUpload,controller.update);
module.exports =router;