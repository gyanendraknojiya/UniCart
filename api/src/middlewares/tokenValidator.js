const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    jwt.verify(authorization, secretKey, async (err, decoded) => {
      try {
        if (!decoded) throw { message: "Session expired" };
        req.session = decoded;
        next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: err.message || "Something went wrong",
        });
      }
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = { verifyToken };
