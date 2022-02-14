const { Op } = require('sequelize');
const models = require('../../../database/sequelize/sequelize');
const sendResponse = require('../../utility/functon/sendResponse');

module.exports = {
    shopRequest: async (req, res, next) => {
        try {
            let { search } = req.query;
            let findQuery = {
                where: []
            };
            // if (search) {
            //     findQuery.where.push({ name: { [Op.like]: '%' + search + '%' } });
            // }
            let list = await models.shop_request.create(req.body);
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