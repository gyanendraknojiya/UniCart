const express = require("express");
const { getProducts } = require("../controllers/productController");
const { verifyToken } = require("../middlewares/tokenValidator");

const productRouter = express();
productRouter.use(verifyToken);

productRouter.get("/list/", getProducts);

module.exports = { productRouter };
