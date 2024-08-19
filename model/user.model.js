
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  about: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: [String], required: true },
  accountType: { type: String, required: true }
}, {
  versionKey: false
});

const UserModel = mongoose.model("UserProfile", userSchema);

module.exports = {
  UserModel
};


