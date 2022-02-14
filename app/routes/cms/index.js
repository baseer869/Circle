
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');
const authorization = require('../../middleware/authorization');
const authController = require('../../controllers/mobile/authController');
const shopRequestController = require('../../controllers/mobile/shopRequestController');




/******************** Auth  ****************************/
router.post('/signUp', authController.signUp );
router.post('/login', authController.login );
router.get('listShopRequest', shopRequestController.listShopRequest)


module.exports = router;