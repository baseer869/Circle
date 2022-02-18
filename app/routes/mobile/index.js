
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const productController = require('../../controllers/mobile/ProductController');
const shopRequestController = require('../../controllers/mobile/shopRequestController');




/******************** Auth  ****************************/
router.post('/signUp', authController.signUp );
router.post('/login', authController.login )
router.get('/listUser', authenticate(), authorization(),  authController.listUser);

/******************* Product  ***************************/
router.post('/addProduct', authenticate(), authorization(), productController.addProduct );
router.get('/listProduct', authenticate(),  productController.listProduct );
router.post('/editProduct/:id', authenticate(), authorization(), productController.editProduct );
router.delete('/deleteProduct/:id', authenticate(), authorization(), productController.deleteProduct );

/******************** Cart *******************************/
router.post('/addToCart', authenticate(), productController.addToCart )

/********************** Vendor****************************/
router.post('/shopRequest',  shopRequestController.signUp)




module.exports = router;

//shop request 
//list request on cms 
//take action request  
//create account for requested vendor 
//add shop for requested vendor
// vendor can update shop detail,
// vendor can update  