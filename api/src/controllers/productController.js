const products = require("../data/products.json");

const getProducts = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Products fetched successfully", products });
  } catch (e) {
    res.status(e?.code || 400).json({ success: false, message: e.message || "Something went wrong!" });
  }
};

module.exports = { getProducts };
