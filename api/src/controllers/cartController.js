const { getRedisCartKey } = require("../helpers/redisCartKey");
const {
  cartItemsToProducts,
  getCartItemsByKey,
  addItemToCartByProductId,
  decreaseProductQuantityByProductId,
  removeProductByProductId,
} = require("../services/CartServices");
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

const removeProductFromCart = async(req, res) => {
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

module.exports = { getCart, addItemToCart, removeItemToCart, removeProductFromCart };
