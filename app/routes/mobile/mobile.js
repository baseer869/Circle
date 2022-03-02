
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
router.get('/authenticateUser', authenticate(),  authController.authenticateUser);



/********************** Vendor****************************/
router.post('/shopRequest', shopRequestController.shopRequest)
router.post('/addProduct', authenticate(),  productController.addProduct);
router.post('/editProduct/:id', authenticate(),  productController.editProduct);
router.delete('/deleteProduct/:id', authenticate(),  productController.deleteProduct);
router.post('/changeProductStatus/:id', authenticate(),  productController.changeProductStatus);  // change later when sceneriaio clear 
router.get('/listStoreCategory/:id', authenticate(),  productController.listStoreCategory);  // change later when sceneriaio clear 
router.get('/listCategory', productController.listCategory);  // change later when sceneriaio clear 



// --- // 
router.post('/updateShop', authenticate(), shopRequestController.updateShop)



/******************* End User  ***************************/
router.get('/listProduct', productController.listProduct);
router.post('/addToCart', authenticate(), productController.addToCart)






module.exports = router;