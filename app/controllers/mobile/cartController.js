const { Op, Sequelize } = require("sequelize");
const models = require("../../../database/sequelize/sequelize");
const sendResponse = require("../../utility/functon/sendResponse");

/********************** CART ************************************* */

module.exports = {
  addUpdateCart: async (req, res, next) => {
    try {
      let cart;
      let cartDetail = {
        userId: parseInt(req.body.userId),
        status: req.body.status.trim(),
      };
      let findQuery = {
        where: { userId: req.body.userId },
      };
      let isUser = await models.cart.findOne(findQuery);

      if (isUser) {
        let isProductAlreadyInCart = await models.cart_items.findOne({
          where: {
            cartId: isUser.dataValues.id,
            productId: req.body.productId,
          },
        });
        if (isProductAlreadyInCart) {
          isProductAlreadyInCart.dataValues.totalPrice += req.body.price;
          isProductAlreadyInCart.dataValues.quantity + 1;
          let cartUpdated;
          cartUpdated = await models.cart_items.update(
            {
              totalPrice: isProductAlreadyInCart.dataValues.totalPrice,
              quantity: (isProductAlreadyInCart.dataValues.quantity += 1),
            },
            {
              where: {
                cartId: isProductAlreadyInCart.dataValues.cartId,
                productId: isProductAlreadyInCart.dataValues.productId,
              },
            }
          );
          if (cartUpdated) {
            return res.status(200).send({
              status: 200,
              message: "Item updated",
              item: cartUpdated,
            });
          } else {
            return res.status(200).send({
              status: 200,
              message: "not updated",
              item: cartUpdated,
            });
          }
        } else if (!isProductAlreadyInCart) {
          let cartItemDetail = {
            cartId: isUser.id,
            productId: parseInt(req.body.productId),
            shopId: parseInt(req.body.shopId),
            totalPrice: req.body.price,
            quantity: req.body.quantity,
          };
          let cartItem = new models.cart_items(cartItemDetail);
          let itemAdded = await cartItem.save(cartItem);

          if (itemAdded) {
            return res.status(200).send({
              status: 200,
              message: "Item added to cat",
              data: cart,
            });
          } else {
            return res.status(200).send({
              status: 200,
              message: "DB Error",
              data: cart,
            });
          }
        } else {
          return res.status(400).send({
            status: 400,
            message: "Something went wrong",
          });
        }
      } else if (!isUser) {
        cart = new models.cart(cartDetail);
        cart = await cart.save(cart);
        if (cart) {
          let cartItemDetail = {
            cartId: cart.id,
            productId: parseInt(req.body.productId),
            shopId: parseInt(req.body.shopId),
            totalPrice: req.body.price,
            quantity: req.body.quantity,
          };
          let cartItem = new models.cart_items(cartItemDetail);
          let itemAdded = await cartItem.save(cartItem);

          if (itemAdded) {
            return res.status(200).send({
              status: 200,
              message: "Item added to cat",
              data: cart,
            });
          } else {
            return res.status(200).send({
              status: 200,
              message: "DB Error",
              data: cart,
            });
          }
        } else {
          return res.status(400).send({
            status: 400,
            message: "Something went wrong",
          });
        }
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCart: async (req, res, next) => {
    try {
      let findQuery = {
        where: { userId: req.params.id },
        include: [
          {
            model: models.users,
            as: "users",
            attributes: [
              "id",
              "username",
              "city",
              "state",
              "zip",
              "address",
              "phone",
            ],
            required: true
          },
          {
            model: models.cart_items,
            as: "cart_items",
            required: true
          },
        ],
      };
      let list = await models.cart.findAndCountAll(findQuery);
      if (!list) {
        return res.status(200).json({
          status: 200,
          message: "No Record",
          data: [],
        });
      } else if (list) {
        return res.status(200).json({
          status: 200,
          message: "fetch succesfully",
          data: {
            list: list,
          },
        });
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      let findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.productId) },
            { id: parseInt(req.params.id) },
          ],
        },
      };
      let isUser = await models.cart.findOne({
        where: { userId: parseInt(req.body.userId) },
      });
      if (!isUser) {
        return res.status(200).send({
          status: 200,
          message: "No Record",
          data: [],
        });
      } else if (isUser) {
        let cartItem = await models.cart_items.findOne(findQuery);
        if (cartItem) {
          if (cartItem.dataValues.quantity < 2) {
            let removeItem = await models.cart_items.destroy(findQuery);
            if(removeItem){
              return res.status(200).json({
                status:200,
                message:"Item Removed",
                data: removeItem  
              });
            }
          } else {
            let updatecart = await models.cart_items.update(
              {
                quantity: cartItem.dataValues.quantity - 1,
                totalPrice: cartItem.dataValues.totalPrice - req.body.price,
              },
              findQuery
            );
            if(updatecart){
              return res.status(200).json({
                status:200,
                message:"Record Updated",
                data: updatecart
              })
            }
          }
          //check
        }
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
};
