const sequelize = require('../../db');
const Sequelize = sequelize.sequelize;
const instance = sequelize.instance();

let db = {
 instance: instance,
 Sequelize: Sequelize,
 users : (require('../schemas/user'))(instance, Sequelize),
 products: (require('../schemas/product'))(instance, Sequelize),
 cart: (require('../schemas/cart'))(instance, Sequelize),

};

(require("./associations"))(db);
module.exports = db;