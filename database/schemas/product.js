const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        attachment: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        longDesc: {
            type: DataTypes.STRING
        },
        shop_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "shops",
                key: "id"
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "categories",
                key: "id"
            },
        },
        createdAt: {
            field: "created_at",
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: "updated_at",
            type: Sequelize.DATE,
        },
    },
    );
    return Product;
}

