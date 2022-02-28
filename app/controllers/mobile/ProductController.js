const { Op } = require('sequelize');
const models = require('../../../database/sequelize/sequelize');
const sendResponse = require('../../utility/functon/sendResponse');

module.exports = {

    addProduct: async (req, res, next) => {
        try {
            let { name, description, price, stock, attachment, isAvailable, longDesc, shop_id } = req.body;
            let product = new models.products({});
            product.name = name;
            product.description = description;
            product.price = price;
            product.stock = stock;
            product.attachment = attachment;
            product.isAvailable = isAvailable;
            product.longDesc = longDesc;
            product.shop_id = shop_id
            let item = await product.save();
            if (item) {
                return res.status(200).send({
                    status: 200,
                    message: "Product added scucess",
                    data: item
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Db Error",
                    data: []
                });
            }
        } catch (error) {
            sendResponse.error(error);
        }
    },
    listProduct: async (req, res, next) => {
        try {
            let { search } = req.query;
            let findQuery = {
                where: []
            };
            // if (search) {
            //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
            // }
            let list = await models.products.findAll({});
            if (!list) {
                return res.status(200).send({
                    status: 200,
                    messsage: "No record",
                    data: []
                });
            }
            return res.status(200).send({
                status: 200,
                message: "fetch successfull",
                data: {
                    list: list
                }
            });

        } catch (error) {
            sendResponse.error(error)
        }
    },
    editProduct: async (req, res, next) => {
        try {
            let findQuery = {
                where: { id: req.params.id }
            };
            let product = await models.products.findOne(findQuery);
            if (!product) {
                return res.status(200).send({
                    status: 200,
                    messsage: "No record",
                    data: []
                });
            }
            let isUpdated = await models.products.update(req.body, findQuery);
            if (isUpdated) {
                return res.status(200).send({
                    status: 200,
                    message: "fetch successfull",
                    data: isUpdated
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "DB error",
                    data: []
                });
            }

        } catch (error) {
            sendResponse.error(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            let findQuery = {
                where: { id: req.params.id }
            };
            let product = await models.products.destroy(findQuery);
            if (product) {
                return res.status(200).send({
                    status: 200,
                    message: "Product deleted",
                    data: product
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Record not found",
                    data: []
                });
            }

        } catch (error) {
            sendResponse.error(error)
        }
    },

    changeProductStatus: async (req, res, next) => {
        try {
            let findQuery = {
                where: { id: req.params.id }
            };
            let product = await models.products.update(findQuery);
            if (product) {
                return res.status(200).send({
                    status: 200,
                    message: "Product deleted",
                    data: product
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Record not found",
                    data: []
                });
            }

        } catch (error) {
            sendResponse.error(error)
        }
    },

    listStoreCategory: async (req, res, next) => {
        try {
            let findQuery = {
                where: { shop_id: req.params.id },
                include: {
                    model: models.categories,
                    as: 'categories_shop'
                },                
            };
            let list = await models.shop_and_categories.findOne(findQuery);
            if (list) {
                return res.status(200).send({
                    status: 200,
                    message: "Fetch successfully",
                    data: list
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Record not found",
                    data: []
                });
            }

        } catch (error) {
            sendResponse.error(error)
        }
    },

    listCategory: async (req, res, next) => {
        try {
            let findQuery = {
                where: [],
            };
            if (req.query.search) {
                findQuery.where.push({ name: { [Op.like]: `%${String(req.query.search).trim()}%` } })
            }
            let list = await models.categories.findAll(findQuery);
            if (list) {
                return res.status(200).send({
                    status: 200,
                    message: "Fetch successfully",
                    data: list
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Record not found",
                    data: []
                });
            }

        } catch (error) {
            sendResponse.error(error)
        }
    },

    /********************** CART ************************************* */

    addToCart: async (req, res, next) => {
        try {
            let { user_id, product_id, price, quantity, discount, active } = req.body;
            let cart;
            let findQuery = {
                where: { product_id: product_id }
            };
            console.log('find==>', findQuery);

            //    let item = await models.cart.findAll({});
            //     console.log('cartaaa==>', item)
            //     if (item) {
            //         // increase the quantity

            //         return res.status(200).send({
            //             status: 200,
            //             message: "cart ",
            //             data: item
            //         });
            //     } else if (!item) {

            //create  new cart item 
            cart = new models.cart({});
            cart.user_id = user_id;
            cart.product_id = product_id;
            cart.quantity = quantity;
            cart.price = price;
            cart.discount = discount;
            cart.active = active;
            cart = await cart.save();
            if (cart) {
                return res.status(200).send({
                    status: 200,
                    message: "Item added to cat",
                    data: cart
                });
            } else {
                return res.status(200).send({
                    status: 200,
                    message: "DB Error",
                    data: cart
                });
            }

            // }

        } catch (error) {
            sendResponse.error(error)
        }
    }
}