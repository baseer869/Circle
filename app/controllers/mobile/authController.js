const models = require('../../../database/sequelize/sequelize');
var jwt = require('jsonwebtoken');
const sendResponse = require('../../utility/functon/sendResponse');
const User = require('../../../database/schemas/user');

module.exports = {
  
    signUp: async (req, res, next) => {

        try {
            let { email,active, username, password, role } = req.body;

            let user = new models.users({});
            user.email = email;
            user.username = username;
            user.active = active;
            user.role = role
            user.generatePassword(password);
            let test = await user.save();
            if (test) {
                return res.status(200).send({
                    status: 200,
                    message: 'User Created successfully',
                    data: test
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

 login : async (req, res, next) => {
    try {
        let { password, username } = req.body;
        let findQuery = {
            where: { username: username }
        }
        let user = await models.users.findOne(findQuery);
        if (!user || !user.validatePassword(password, user.password)) {
            return res.status(401).send({
                status: 401,
                message: "Invalid Credential"
            });
        } else if (user && user.validatePassword(password, user.password)) {
            let token = jwt.sign({
                id: user.username
            }, 'secret', { expiresIn: 60 });
            user.token = token;
            await user.save(user);
            return res.status(200).json({
                status: 200,
                message: "Login success",
                token: token
            });
        } else {
            return res.status(400).send({
                status: 400,
                message: "DB error"
            });
        }
    } catch (error) {
        sendResponse.error(error);
    }

},
listUser:   async function (req, res, next) {
    try {
        let list;
        let findQuery = {
        };
        list = await models.users.findAll({});
        if (!list) {
            return res.status(200).send({
                status: 200,
                message: 'No record found !'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'Fetch Successfully',
            data: {
                list: list
            },

        })
    } catch (error) {
        sendResponse.error(error)
    }
}   
}
