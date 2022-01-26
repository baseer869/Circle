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
            console.log('item ---->', req.body);

            let item = await product.save();
            //  let item =  await models.products.create(req.body);
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
            let findQuery = {

            };
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
    }
}