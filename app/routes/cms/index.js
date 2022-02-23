
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const shopRequestController = require('../../controllers/mobile/shopRequestController');




/******************** Auth  ****************************/
router.post('/signUp', authController.signUp );
router.post('/login', authController.login );

/********************* Vendor ***************************/
router.post('/updateShopRequest',  shopRequestController.updateShopRequest)
router.get('/listShopRequest',  shopRequestController.ListShopRequest)
router.post('/createShop',   shopRequestController.createShop)




module.exports = router;