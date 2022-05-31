const Product = require("../models/product");

const prodcuts_getAll = async (req, res) => {
   try {
      await Product.find({}).then((data) => {
         res.send(data);
      });
   } catch (e) {
      res.status(404).send("ID no valid");
   }
};

const product_create_post = async (req, res) => {
   try {
      await Product.create(req.body).then((data) => {
         res.send(data);
      });
   } catch (e) {
      res.status(404).send("ID no valid");
   }
};

const product_deleteAll = async (req, res) => {
   try {
      await Product.deleteMany({ checked: true }).then(() => {
         res.sendStatus(200);
      });
   } catch (e) {
      res.status(404).send("ID no valid");
   }
};

const product_edit = async (req, res) => {
   try {
      await Product.findByIdAndUpdate(req.params.id, req.body).then((data) => {
         res.send(data);
      });
   } catch (e) {
      res.status(404).send("ID no valid");
   }
};

module.exports = {
   prodcuts_getAll,
   product_create_post,
   product_deleteAll,
   product_edit,
};
