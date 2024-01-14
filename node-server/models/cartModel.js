const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      require,
    },
    cartItems: {
      type: Array,
      require,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
