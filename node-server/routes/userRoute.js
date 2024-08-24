const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: hashedPassword,
    });

    await user.save();
    return res.status(200).json("User registered successfully.");
  } catch (err) {
    return res.status(500).json("User registeration unsuccessful.");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        return res.status(200).json(user);
      } else {
        res.json("error");
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findByIdAndDelete(userid);
    return res.status(200).json("User Deleted Successfully.");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
