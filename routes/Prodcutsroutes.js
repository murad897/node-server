const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
// all products
router.get("/", productController.prodcuts_getAll);
//post data to database
router.post("/create", productController.product_create_post);
// //delete product
router.delete("/deleteall", productController.product_deleteAll);
// //update product
router.patch("/:id", productController.product_edit);

module.exports = router;
