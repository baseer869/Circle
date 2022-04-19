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

  //
  addUpdateCart2: async (req, res, next) => {
    try {
      let cart;

      let findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.productId) },
            { userId: req.body.userId },
          ],
        },
      };
      let itemInCart = await models.cart.findOne(findQuery);
      if (itemInCart) {
        itemInCart.dataValues.totalPrice += req.body.price;
        itemInCart.dataValues.quantity + 1;
        let cartUpdated;
        cartUpdated = await models.cart.update(
          {
            totalPrice: itemInCart.dataValues.totalPrice,
            quantity: (itemInCart.dataValues.quantity += 1),
          },
          {
            where: {
              id: itemInCart.dataValues.id,
              productId: itemInCart.dataValues.productId,
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
      } else if (!itemInCart) {
        let cartDetail = {
          productId: parseInt(req.body.productId),
          shopId: parseInt(req.body.shopId),
          totalPrice: req.body.price,
          quantity: req.body.quantity,
          userId: req.body.userId,
        };
        let cartItem = new models.cart(cartDetail);
        let itemAdded = cartItem.save(cartItem);

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
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },

  listCart: async (req, res, next) => {
    try {
      let totalAmount;
      let shippingFee = 69;
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
            required: true,
          },
          {
            model: models.products,
            as: "products",
          },
          {
            model: models.shops,
            as: "shops",
            attributes: ["id", "name"],
          },
        ],
      };
      let list = await models.cart.findAll(findQuery);
      const initialValue = 69;
      totalAmount = list.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.dataValues.totalPrice,
        initialValue
      );
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
            shippingFee: shippingFee,
            amount: totalAmount,
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
      let cart;

      let findQuery = {
        where: {
          [Op.and]: [
            { productId: parseInt(req.body.productId) },
            { userId: req.body.userId },
          ],
        },
      };
      let itemInCart = await models.cart.findOne(findQuery);
      if (itemInCart && itemInCart.dataValues.quantity > 1) {
        itemInCart.dataValues.totalPrice -= req.body.price;
        itemInCart.dataValues.quantity - 1;
        let cartUpdated;
        cartUpdated = await models.cart.update(
          {
            totalPrice: itemInCart.dataValues.totalPrice,
            quantity: (itemInCart.dataValues.quantity -= 1),
          },
          {
            where: {
              id: itemInCart.dataValues.id,
              productId: itemInCart.dataValues.productId,
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
          return res.status(201).send({
            status: 201,
            message: "DB Error",
            item: cartUpdated,
          });
        }
      } else {
        let removeFromCart = await models.cart.destroy(findQuery);
        if (removeFromCart) {
          return res.status(200).send({
            status: 200,
            message: "Successfully removed from cart",
            data: cart,
          });
        } else {
          return res.status(200).send({
            status: 200,
            message: "DB Error",
            data: cart,
          });
        }
      }
    } catch (error) {
      sendResponse.error(error);
    }
  },
};
