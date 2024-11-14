const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedAddresses: [
    {
      name: String,
      email: String, // Email field within each address object
      mobileNo: String,
      houseNo: String,
      street: String,
      city: String,
      postalCode: { type: String, default: null },
      isDefault: { type: Boolean, default: false }, // New field to mark as default
    },
  ],
  savedItems: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
