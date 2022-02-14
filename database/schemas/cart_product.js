const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Model = sequelize.define('cart_product', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "product",
                key: "id"
            },
        },
        cart_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "cart",
                key: "id"
            },
        },
      
    },
    );
    return Model;
}

