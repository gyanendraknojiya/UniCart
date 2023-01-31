const { getRedisCartKey } = require("../helpers/redisCartKey");
const { User } = require("../models/user");
const {
  cartItemsToProducts,
  getCartItemsByKey,
  addItemToCartByProductId,
  decreaseProductQuantityByProductId,
  removeProductByProductId,
  createOrder,
  getCartTotalAmount,
  makePayment,
  saveOrder,
  removeAllCartItems,
} = require("../services/CartServices");
const { findUserById } = require("../services/userServices");
const { redisClient } = require("../utils/redis");

const getCart = async (req, res) => {
  try {
    const { userId } = req.session;
    const cartKey = getRedisCartKey(userId);

    const cartItemsArray = await getCartItemsByKey(cartKey);
    const cartItems = cartItemsToProducts(cartItemsArray);
    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const { userId } = req.session;
    const { productId } = req.params;
    if (!productId) throw new Error("Missing required parameter");

    const cartKey = getRedisCartKey(userId);

    const cartItemsArray = await addItemToCartByProductId(productId, cartKey);

    await redisClient.set(cartKey, JSON.stringify(cartItemsArray));

    // clear cart
    await removeAllCartItems(cartKey);
    const cartItems = cartItemsToProducts(cartItemsArray);
    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

const removeItemToCart = async (req, res) => {
  try {
    const { userId } = req.session;
    const { productId } = req.params;
    if (!productId) throw new Error("Missing required parameter");

    const cartKey = getRedisCartKey(userId);

    const cartItemsArray = await decreaseProductQuantityByProductId(productId, cartKey);

    await redisClient.set(cartKey, JSON.stringify(cartItemsArray));
    const cartItems = cartItemsToProducts(cartItemsArray);
    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const { userId } = req.session;
    const { productId } = req.params;
    if (!productId) throw new Error("Missing required parameter");

    const cartKey = getRedisCartKey(userId);

    const cartItemsArray = await removeProductByProductId(productId, cartKey);

    await redisClient.set(cartKey, JSON.stringify(cartItemsArray));
    const cartItems = cartItemsToProducts(cartItemsArray);
    return res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

const checkout = async (req, res) => {
  try {
    const { paymentMethod, shippingDetails } = req.body;
    const { userId } = req.session;
    const cartKey = getRedisCartKey(userId);

    const cartItemsArray = await getCartItemsByKey(cartKey);
    const cartItems = cartItemsToProducts(cartItemsArray);
    if (!cartItems.length) throw new Error("Cart is empty!");

    const amount = getCartTotalAmount(cartItems);

    const chargeId = await makePayment(amount, paymentMethod, shippingDetails);

    const order = await saveOrder(userId, paymentMethod, chargeId, shippingDetails, amount);

    res.status(200).json({
      message: "Order placed successfully",
      success: true,
      orderId: order.id,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

module.exports = { getCart, addItemToCart, removeItemToCart, removeProductFromCart, checkout };
