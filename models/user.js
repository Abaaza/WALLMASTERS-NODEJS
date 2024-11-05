const mongoose = require("mongoose");

// Define the schema for user addresses, with an email field added
const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    mobileNo: { type: String, required: true, trim: true },
    houseNo: { type: String, required: true, trim: true },
    street: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
  },
  { _id: false }
);

// Define the schema for saved items
const savedItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    image: { type: String, trim: true },
  },
  { _id: false }
);

// Define the main user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    // Email field for the user itself
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: { type: String, required: true, minlength: 8 },

    // Array of embedded address documents, each with its own email field
    savedAddresses: [addressSchema],

    // Array of embedded saved item documents
    savedItems: [savedItemSchema],
  },
  { timestamps: true }
);

// You can re-enable password hashing if needed by uncommenting below
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Add indexes for faster querying (if necessary)
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
