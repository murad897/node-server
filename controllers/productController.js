const Product = require("../models/product");

// const prodcuts_getall = async (req, res) => {
//   try {
//     const data = await Product.find({}).limit(10);
//     return res.status(200).send({
//       message: "OK",
//       data,
//     });
//   } catch (e) {
//     return res.status(500).send({
//       message: e.message,
//       data: null,
//     });
//   }
// };
const prodcuts_getall = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.skip);
    const productsCollection = await Product.find().skip(offset).limit(limit);
    const productsCollectionCount = await Product.count();
    const totalPages = Math.ceil(productsCollectionCount / limit);
    const currentPage = Math.ceil(productsCollectionCount % offset);
    return res.status(200).send({
      message: "yes",
      data: productsCollection,
      paging: {
        total: productsCollectionCount,
        page: currentPage,
        pages: totalPages,
      },
    });
  } catch (e) {
    console.log("Error", e);
    return res.status(500).send({
      data: null,
    });
  }
};

const product_create_post = async (req, res) => {
  try {
    const { image, name, mpns, manifactuler } = req.body;
    if (!(image && name && mpns && manifactuler)) {
      return res.status(400).send("data product is not valid");
    }
    const data = await Product.create({ image, name, mpns, manifactuler });
    return res.status(200).send({
      message: "OK",
      data,
    });
  } catch (e) {
    return res.status(500).send({
      message: e.message,
      data: null,
    });
  }
};

const product_delete_all = async (req, res) => {
  try {
    const data = await Product.deleteMany({ checked: true });
    return res.status(200).send({
      message: "OK",
      data,
    });
  } catch (e) {
    return res.status(404).send({
      message: e.message,
      data: undefined,
    });
  }
};

module.exports = {
  prodcuts_getall,
  product_create_post,
  product_delete_all
};
