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

    // --// shop -> Category
    db.categories.belongsToMany(db.shops, {
        through: 'shop_and_categories',
        foreignKey: 'shop_id',
    });
    db.shops.belongsToMany(db.categories, {
        through: 'shop_and_categories',
        foreignKey: 'category_id',
    });

}