const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProdcutSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mpns: {
      type: String,
      required: true,
    },
    manifactuler: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProdcutSchema);

module.exports = Product;
