const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedAddresses: {
    type: [
      {
        name: String,
        email: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        city: String,
        postalCode: { type: String, default: null },
        isDefault: { type: Boolean, default: false },
      },
    ],
    default: [], // Initialize as an empty array
  },
  savedItems: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
    },
  ],
  // Add reset token and expiration fields for password reset functionality
  resetToken: { type: String, default: null },
  resetTokenExpiration: { type: Date, default: null },
});

module.exports = mongoose.model("User", userSchema);
