const { DataTypes, Sequelize } = require('sequelize');

module.exports = function (sequelize, Sequelizew) {

    const Model = sequelize.define('cart', {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "user",
                key: "id"
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        price: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        discount: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.BOOLEAN,
        },
    },
    );
    return Model;
}

