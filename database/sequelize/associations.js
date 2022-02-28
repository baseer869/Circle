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
    db.categories.hasMany(db.shop_and_categories, {
        as :"categories_shop",
        foreignKey: 'category_id',
    });
    db.shop_and_categories.belongsTo(db.categories, {
        as :"categories",
        // through: db.shop_and_categories,
        foreignKey: 'category_id',
    });

}