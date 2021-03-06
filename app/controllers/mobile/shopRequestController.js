const { Op } = require('sequelize');
const models = require('../../../database/sequelize/sequelize');
const sendResponse = require('../../utility/functon/sendResponse');

module.exports = {
    signUp: async (req, res, next) => {

        try {
            let { name,shop_name,phone, } = req.body;
            
            let shopRequest = new models.shop_request({});
            shopRequest.name = name;
            shopRequest.shop_name = shop_name;
            shopRequest.phone = phone;
            let created = await shopRequest.save();
            if (created) {
                return res.status(200).send({
                    status: 200,
                    message: 'Request successfully sent',
                    data: created
                });
            } else {
                return res.status(400).send({
                    status: 400,
                    message: 'DB Error'
                });
            }
        } catch (error) {
            res.status(404).send({
                code: 404,
                message: 'error',
                error
            });
        }
    },
    listShopRequest: async (req, res, next) => {
        try {
            let { search } = req.query;
            let findQuery = {
                where: []
            };
            // if (search) {
            //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
            // }
            let list = await models.shop_request.findAll(findQuery);
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
}