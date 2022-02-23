const sequelize = require('../../db');
const Sequelize = sequelize.sequelize;
const instance = sequelize.instance();

let db = {
 instance: instance,
 Sequelize: Sequelize,
 users : (require('../schemas/user'))(instance, Sequelize),
 products: (require('../schemas/product'))(instance, Sequelize),
 cart: (require('../schemas/cart'))(instance, Sequelize),
 cart_product: (require('../schemas/cart_product'))(instance, Sequelize),
 shop_request: (require('../schemas/shop_request'))(instance, Sequelize),
 auth_key: (require('../schemas/auth_key'))(instance, Sequelize),
 shops: (require('../schemas/shop'))(instance, Sequelize),




};

(require("./associations"))(db);
module.exports = db;