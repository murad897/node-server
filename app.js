const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productRoutes = require("./routes/Prodcutsroutes");
const userRoutes = require("./routes/userRoutes");

const PORT = 3000;

const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://murad:skillet123@cluster0.oegx5.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.listen(PORT, (req, res) => {
  console.log("server start");
});
