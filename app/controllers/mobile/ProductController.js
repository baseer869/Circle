const { Op } = require('sequelize');
const models = require('../../../database/sequelize/sequelize');
const sendResponse = require('../../utility/functon/sendResponse');

module.exports = {
  
    addProduct: async (req, res, next) => {
        try {
            let { name, description, price, stock, attachment, isAvailable, longDesc } = req.body;
            let product = new models.products({});
            product.name = name;
            product.description = description;
            product.price = price;
            product.stock = stock;
            product.attachment = attachment;
            product.isAvailable = isAvailable;
            product.longDesc = longDesc;

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
            if (search) {
                findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
            }
            let list = await models.products.findAll(findQuery);
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

 /********************** CART ************************************* */

 addToCart: async (req, res, next) => {
        try {
            let findQuery = {
                where: { id: req.params.id }
            };
            let product = await models.products.findOne(findQuery);
            if (product) {
                // increase the quantity

                return res.status(200).send({
                    status: 200,
                    message: "Product deleted",
                    data: product
                });
            } else if(!product) {
                //create  new cart item 
                return res.status(400).send({
                    status: 400,
                    message: "Record not found",
                    data: []
                });
            }

        } catch (error) {
            sendResponse.error(error)
        }
    }
}