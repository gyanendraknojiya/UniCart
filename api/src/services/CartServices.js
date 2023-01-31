const products = require("../data/products.json");
const { payment } = require("../helpers/stripePayment");
const { Order } = require("../models/order");
const { redisClient } = require("../utils/redis");

const findProductById = (id) => {
  return products.find((product) => product.id === id);
};

const cartItemsToProducts = (cartItems) => {
  if (!cartItems?.length) return [];
  return cartItems.map((cartItems) => ({ ...cartItems, productDetails: findProductById(cartItems.id) }));
};

const getCartItemsByKey = async (cartKey) => {
  const cartProducts = await redisClient.get(cartKey);

  if (cartProducts) {
    return JSON.parse(cartProducts);
  }
  return [];
};

const removeAllCartItems = async (cartKey) => redisClient.del(cartKey);

const addItemToCartByProductId = async (productId, cartKey) => {
  let cartItemsArray = await getCartItemsByKey(cartKey);
  if (cartItemsArray.length) {
    const isExists = cartItemsArray.find((item) => item.id === productId);
    if (isExists) {
      cartItemsArray = cartItemsArray.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cartItemsArray.push({ id: productId, quantity: 1 });
    }
  } else {
    cartItemsArray = [{ id: productId, quantity: 1 }];
  }
  return cartItemsArray;
};

const decreaseProductQuantityByProductId = async (productId, cartKey) => {
  const cartItemsArray = await getCartItemsByKey(cartKey);
  const updatedCartItemsArray = [];
  if (cartItemsArray.length) {
    cartItemsArray.forEach((item) => {
      if (item?.id === productId) {
        if (item.quantity > 1) {
          updatedCartItemsArray.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        updatedCartItemsArray.push(item);
      }
    });
  }

  return updatedCartItemsArray;
};

const removeProductByProductId = async (productId, cartKey) => {
  const cartItemsArray = await getCartItemsByKey(cartKey);
  let updatedCartItemsArray = [];
  if (cartItemsArray.length) {
    updatedCartItemsArray = cartItemsArray.filter((item) => item?.id !== productId);
  }

  return updatedCartItemsArray;
};

const getCartTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.productDetails.sellPrice * item.quantity, 0);
};

const makePayment = async (amount, paymentMethod, shippingDetails, currency) => {
  const { firstName, lastName, address, state, country, zip } = shippingDetails;
  const shipping = {
    name: `${firstName} ${lastName}`,
    address: {
      line1: address,
      state,
      country,
      postal_code: zip,
    },
  };

  return payment(amount, paymentMethod, shipping);
};

const saveOrder = async (userId, paymentMethod, chargeId, shippingDetails, amount) => {
  const order = new Order({
    userId,
    paymentMethod,
    chargeId,
    products,
    status: "Confirmed",
    shippingDetails,
    amount,
  });

  return order.save();
};

module.exports = {
  findProductById,
  cartItemsToProducts,
  getCartItemsByKey,
  removeAllCartItems,
  addItemToCartByProductId,
  decreaseProductQuantityByProductId,
  removeProductByProductId,
  getCartTotalAmount,
  makePayment,
  saveOrder,
};
