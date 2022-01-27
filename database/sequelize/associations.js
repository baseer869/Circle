module.exports = function (db) {

    db.users.hasMany(db.cart, {
        as: 'carts',
        foreignKey: 'cart_id',
    });
    db.cart.belongsTo(db.users, {
        as: "users",
        foreignKey: 'cart_id',
    });

    db.cart.hasMany(db.products, {
        as: "products",
        foreignKey: 'product_id',
    });
    db.products.belongsTo(db.cart, {
        as: "cart",
        foreignKey: 'product_id',
    });

}