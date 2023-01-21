const express = require("express");
const { cartRouter } = require("./cartRouter");
const { productRouter } = require("./productRouter");
const { userRouter } = require("./userRouter");

const router = express();

router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);

module.exports = router;
