const { User } = require("../models/user");

const findUserById = async(id) =>{
  const user = await User.findUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};


module.exports = { findUserById };
