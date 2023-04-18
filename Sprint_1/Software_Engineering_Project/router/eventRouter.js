const express =require('express');
const controller =require('../controllers/eventController')
const {fileUpload} = require('../middleware/fileUpload');
const router =express.Router();

router.get('/',controller.index);

router.get('/new',controller.new);

//post

router.post('/',fileUpload, controller.create);

router.get('/:id',controller.show);

//updated
router.get('/:id/edit',controller.edit);

//put

router.put('/:id',fileUpload,controller.update);

//delete
router.delete('/:id',controller.delete);


module.exports =router;