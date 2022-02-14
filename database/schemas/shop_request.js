const { DataTypes, Sequelize } = require('sequelize');

module.exports = function( sequelize, Sequelizew ) {

const ShopRequest = sequelize.define('shopRequest', {
    id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
},
);
return ShopRequest;
}

