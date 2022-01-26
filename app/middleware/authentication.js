const model = require("../../database/sequelize/sequelize");
const sendResponse = require("../utility/functon/sendResponse");

module.exports = function () {

    return async function (req, res, next) {
        try {
            let token = req.headers.authorization;
            let findQuery = {
                where: { token: token }
            }

            if (!token || token === "" || token === null) {
                return res.status(400).send({
                    status: 400,
                    message: "Token Auththenication failed!"
                });
            }
            let user = await model.users.findOne(findQuery)
            if (user && user.token === token) {
                req.user = user            
                next();
            } else {
                return res.status(400).send({
                    status: 400,
                    message: "Token authentication failed"
                });
            }

        } catch (error) {
            sendResponse.error(error);
        }

    }
}