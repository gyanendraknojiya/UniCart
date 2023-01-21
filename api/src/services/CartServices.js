const products = require("../data/products.json");
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

module.exports = {
  findProductById,
  cartItemsToProducts,
  getCartItemsByKey,
  addItemToCartByProductId,
  decreaseProductQuantityByProductId,
  removeProductByProductId,
};
