
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const productController = require('../../controllers/mobile/ProductController');
const shopRequestController = require('../../controllers/mobile/shopRequestController');
const cartController = require('../../controllers/mobile/cartController');




/******************** Auth  ****************************/
router.post('/signUp', authController.signUp);
router.post('/login', authController.login)
router.get('/listUser', authenticate(), authorization(), authController.listUser);
router.get('/authenticateUser', authenticate(),  authController.authenticateUser);



/********************** Vendor****************************/
router.post('/shopRequest', shopRequestController.shopRequest)
router.post('/addProduct',   productController.addProduct);
router.post('/editProduct/:id', authenticate(),  productController.editProduct);
router.delete('/deleteProduct/:id',  productController.deleteProduct);
router.post('/changeProductStatus/:id', authenticate(),  productController.changeProductStatus);  
router.get('/listStoreCategory/:id', authenticate(),  productController.listStoreCategory);
router.get('/listCategory', productController.listCategory);
router.get('/listStoreProduct/:id', productController.listStoreProduct); //add authroization







// --- // 
router.post('/updateShop', authenticate(), shopRequestController.updateShop)



/******************* End User  ***************************/
router.get('/listMarket', productController.listMarket); 
router.get('/listStore', productController.listStore); 
router.get('/listProduct/:id', productController.listProduct);
// 
router.get('/listShopCategory/:id',  productController.listShopCategory)
router.get('/categoryProduct', productController.categoryProduct )
// 
router.get('/storeChoiceProduct', productController.storeChoiceProduct )

// CART 
router.post('/addUpdateCart', authenticate(), cartController.addUpdateCart )
router.post('/addUpdateCart2', authenticate(), cartController.addUpdateCart2)
router.get('/listCart/:id', authenticate(), cartController.listCart )
router.post('/removeFromCart/:id', authenticate(), cartController.removeFromCart)
router.get('/getProductDetail/:id',   productController.productDetail )


// 







module.exports = router;