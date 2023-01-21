const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;

const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, gender } = req.body;

    if (!firstName || !lastName || !email || !password || !dob || !gender)
      throw { message: "Missing required parameters!" };

    const isUser = await User.countDocuments({ email });

    if (isUser)
      throw {
        message: "User is already registered. Please login using email password!",
      };
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) throw err;
      const user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hash,
        dob,
        gender,
      });
      await user.save();

      return res.status(200).json({
        success: true,
        message: "User created successfully!",
      });
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) throw { message: "Missing required parameters!" };

    email = email.toLowerCase();
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      throw new Error("User does not exist!");
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw { message: "Password mismatch!" };
    const { firstName, lastName, id } = user;
    jwt.sign(
      {
        firstName,
        lastName,
        email,
        userId: id,
      },
      secretKey,
      { expiresIn: "7d" },
      async (err, token) => {
        if (err) throw err;
        delete user.password;
        return res.status(200).json({
          success: true,
          token,
          data: {
            firstName,
            lastName,
            email,
          },
          message: "Login successful!",
        });
      }
    );
  } catch (e) {
    res.status(400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { email } = req.session;
    const user = await User.findOne({ email });
    if (!user) throw { message: "User not found!", code: 404 };
    res.status(200).send({ success: true, message: "User profile found!", data: user });
  } catch (e) {
    res.status(e?.code || 400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

module.exports = { userSignup, userLogin, getUserProfile };
