const express =require('express');
const controller =require('../controllers/eventController')
const {fileUpload} = require('../middleware/fileUpload');

const {isLoggedIn, isAuthor} =require('../middleware/auth')

const {validateId} =require('../middleware/validator');

const router =express.Router();

router.get('/',controller.index);

router.get('/new', isLoggedIn, controller.new);

//post

router.post('/', isLoggedIn, fileUpload, controller.create);

router.get('/:id',validateId, controller.show);

//updated
router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

//put
router.put('/:id',  isLoggedIn, validateId, isAuthor,fileUpload,controller.update);


//delete
router.delete('/:id',  isLoggedIn, validateId, isAuthor, controller.delete);


module.exports =router;