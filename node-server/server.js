const express = require("express");
const cors = require("cors");
const db = require("./db");
const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");
const cartRoute = require("./routes/cartRoute");
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/pizzas/", pizzasRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);
app.use("/api/cart/", cartRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("react-client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/react-client/build/index.html"));
  });
}

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log("Server running on port");
});
