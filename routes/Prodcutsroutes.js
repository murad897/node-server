const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/productController");

// all products
router.get("/", auth.verifyToken, productController.prodcuts_getall);
//create product
router.post("/create", auth.verifyToken, productController.product_create_post);
//deleteAll product
router.post("/delete", auth.verifyToken, productController.product_delete_all);

module.exports = router;
