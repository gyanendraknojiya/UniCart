const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentMethod: { type: String, required: true },
    chargeId: { type: String, required: true },
    products: { type: Array, required: true },
    status: { type: String, enum: ["Confirmed", "Canceled", "Pending"], default: "Pending" },
    shippingDetails: { type: Object, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", schema);

module.exports = { Order };
