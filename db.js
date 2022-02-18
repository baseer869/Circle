const Sequelize = require('sequelize');

module.exports.sequelize = Sequelize;
module.exports.instance = function () {

const sequelize = new Sequelize('circle', 'root', 'root',   {
    host:'localhost',
    dialect:'mysql'
});
return sequelize;
}
