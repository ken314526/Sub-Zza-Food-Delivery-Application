const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/ordersModel");

router.post("/placeorder", async (req, res, next) => {
  const { token, subtotal, currentUser, cartItems } = req.body;
  try {
    const newOrder = new Order({
      name: currentUser.name,
      email: currentUser.email,
      userid: currentUser._id,
      orderItems: cartItems,
      orderAmount: subtotal,
      shippingAddress: token.address,
      transactionId: uuidv4(),
      isDelivered: false,
    });

    await newOrder.save();
    return res.status(200).json("Order Placed Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/getuserorders", async (req, res, next) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid }).sort({ _id: -1 });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findById(orderid);
    order.isDelivered = true;
    await order.save();
    return (200).json("Order Delivered Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/deleteorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findByIdAndDelete(orderid);
    return res.status(200).json("Order Deleted Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
