const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

schema.static('findUserById', function(id) {
  return this.findById(id);
});
const User = mongoose.model("User", schema);

module.exports = { User };
