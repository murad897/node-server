const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/productController");

// get all products
router.get("/", auth.verifyToken, productController.prodcuts_getall);
//get by id
router.get("/:id", auth.verifyToken, productController.prodcuts_getEach);
//create product
router.post("/create", auth.verifyToken, productController.product_create_post);
//deleteAll product
router.delete("/delete", auth.verifyToken, productController.product_delete_all);
//delete by id
router.delete("/delete/:id", auth.verifyToken, productController.delete_each_product);
//update/edit product
router.patch("/:id", auth.verifyToken, productController.product_edit);

module.exports = router;
