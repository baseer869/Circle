module.exports = function (db) {

    db.users.hasMany(db.cart, {
        as: 'carts',
        foreignKey: 'cart_id',
    });
    db.cart.belongsTo(db.users, {
        as: "users",
        foreignKey: 'cart_id',
    });
    
    db.cart.belongsToMany( db.products, {
        as: 'products',
        foreignKey: 'product_id',
        through: db.cart_product
    });
    db.products.belongsToMany( db.cart, {
        as: 'cart_products',
        foreignKey: 'cart_id',
        through: db.cart_product
    });

}