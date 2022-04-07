const { DataTypes, Sequelize } = require("sequelize");

module.exports = function (sequelize, Sequelizew) {
  const Model = sequelize.define("carts", {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['0', '1'],  // 0 for active 1 for inactive
      defaultValues: '0'  
    },
    active: {
      type: DataTypes.BOOLEAN, // if user
    },
    userId: {
      type: DataTypes.BIGINT(20),
      references: {
        model: "user",
        key: "id",
      },
    },
    createdAt: {
      field: "created_at",
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: "updated_at",
      type: Sequelize.DATE,
    }, 
  });
  return Model;
};
