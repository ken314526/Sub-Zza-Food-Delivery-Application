const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    variants: {
      type: Array,
    },
    prices: {
      type: Array,
      require,
    },
    category: {
      type: String,
      require,
    },
    image: {
      type: String,
      require,
    },
    description: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);
module.exports = Pizza;
