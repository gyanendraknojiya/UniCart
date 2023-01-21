const express = require("express");
const { userSignup, userLogin, getUserProfile } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/tokenValidator");

const userRouter = express();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

userRouter.use(verifyToken);

userRouter.get("/user-profile", getUserProfile);

module.exports = { userRouter };
