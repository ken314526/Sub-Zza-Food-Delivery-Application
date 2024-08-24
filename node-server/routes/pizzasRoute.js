const router = require("express").Router();
const Pizza = require("../models/pizzaModel");

router.get("/getallpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    return res.status(200).json(pizzas);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/addpizza", async (req, res, next) => {
  const pizza = req.body.pizza;
  try {
    const newPizza = new Pizza({
      name: pizza.name,
      image: pizza.image,
      varients: ["small", "medium", "large"],
      description: pizza.description,
      category: pizza.category,
      prices: [pizza.prices],
    });
    await newPizza.save();
    return res.status(200).json("Pizza Added Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/getpizzabyid", async (req, res) => {
  const pizzid = req.body.pizzaid;
  try {
    const pizza = await Pizza.findById(pizzid);
    return res.status(200).json(pizza);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/editpizza", async (req, res) => {
  const editedPizza = req.body.editedPizza;
  try {
    const pizza = await Pizza.findById(editedPizza._id);

    pizza.name = editedPizza.name;
    pizza.description = editedPizza.description;
    pizza.image = editedPizza.image;
    pizza.category = editedPizza.category;
    pizza.prices = [editedPizza.prices];

    await pizza.save();

    return res.status(200).json("Pizza Updated Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/deletepizza", async (req, res) => {
  const pizzaid = req.body.pizzaid;
  try {
    const pizza = await Pizza.findByIdAndDelete(pizzaid);
    return res.status(200).json("Pizza Deleted Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
