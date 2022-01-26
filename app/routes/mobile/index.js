
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const productController = require('../../controllers/mobile/ProductController');




/******************** Auth Mobile Routes ****************************/
router.post('/signUp', authController.signUp );
router.post('/login', authController.login )
router.get('/listUser', authenticate(), authorization(),  authController.listUser);

/******************** Product  **************************************/
router.post('/addProduct', authenticate(), authorization(), productController.addProduct );
router.get('/listProduct', authenticate(), authorization(), productController.listProduct );


module.exports = router;