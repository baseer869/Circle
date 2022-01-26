const { DataTypes, Sequelize } = require('sequelize');

module.exports = function( sequelize, Sequelizew ) {

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
    price :{
        type: DataTypes.INTEGER,
    },
    attachment:{
        type: DataTypes.STRING,
    },
    stock:{
        type: DataTypes.INTEGER,
    },
    isAvailable:{
        type: DataTypes.BOOLEAN,
    },
    longDesc:{
        type: DataTypes.STRING
    }
},
);
return Product;
}

