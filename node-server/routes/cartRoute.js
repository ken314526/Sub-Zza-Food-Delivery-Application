const router = require("express").Router();
const Cart = require("../models/cartModel");

router.post("/getcartitem", async (req, res) => {
  const userid = req.body.userid;
  try {
    const cartItem = await Cart.find({ userid: userid });
    if (cartItem) {
      return res.status(200).json(cartItem);
    } else {
      return res.status(200).json([]);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/updatecart", async (req, res) => {
  const { userid, cartItems } = req.body;
  try {
    await Cart.findOneAndDelete({ userid: userid });
    const cart = new Cart({
      userid,
      cartItems,
    });
    await cart.save();
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
