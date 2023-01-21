const express = require("express");
const { addItemToCart, getCart, removeItemToCart, removeProductFromCart } = require("../controllers/cartController");
const { verifyToken } = require("../middlewares/tokenValidator");

const cartRouter = express();

cartRouter.use(verifyToken);

cartRouter.get("/", getCart);
cartRouter.patch("/:productId", addItemToCart);
cartRouter.delete("/:productId", removeItemToCart);
cartRouter.delete("/product/:productId", removeProductFromCart);

module.exports = { cartRouter };
