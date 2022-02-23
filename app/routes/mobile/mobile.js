
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const productController = require('../../controllers/mobile/ProductController');
const shopRequestController = require('../../controllers/mobile/shopRequestController');




/******************** Auth  ****************************/
router.post('/signUp', authController.signUp);
router.post('/login', authController.login)
router.get('/listUser', authenticate(), authorization(), authController.listUser);


/********************** Vendor****************************/
router.post('/shopRequest', shopRequestController.shopRequest)
router.post('/addProduct', authenticate(),  productController.addProduct);
router.post('/editProduct/:id', authenticate(), authorization(), productController.editProduct);
router.delete('/deleteProduct/:id', authenticate(), authorization(), productController.deleteProduct);

// --- // 
router.post('/updateShop', authenticate(), shopRequestController.updateShop)



/******************* End User  ***************************/
router.get('/listProduct', productController.listProduct);
router.post('/addToCart', authenticate(), productController.addToCart)






module.exports = router;