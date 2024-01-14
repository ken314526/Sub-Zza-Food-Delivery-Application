const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    email: {
      type: Array,
      require,
    },
    userid: {
      type: String,
      require,
    },
    orderItems: [],
    shippingAddress: {
      type: Object,
      require,
    },
    orderAmount: {
      type: Number,
      require,
    },
    isDelivered: {
      type: Boolean,
      require,
    },
    transactionId: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
