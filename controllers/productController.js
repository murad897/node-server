const Product = require("../models/product");

const prodcuts_getEach = async (req, res) => {
  try {
    await Product.findById(req.params.id).then((data) => {
      res.send(data);
    });
  } catch (e) {
    res.status(404).send("ID no valid");
  }
};

//await Product.find({}).skip(offset).limit(limit);
const prodcuts_getall = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.skip);
    const productsCollection = await Product.find({ user: req.user._id.toString() });
    console.log(req.user._id.toString());
    const productsCollectionCount = await Product.count();
    const totalPages = Math.ceil(productsCollectionCount / limit);
    const currentPage = Math.ceil(productsCollectionCount % offset);
    return res.status(200).send({
      message: "ok",
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
    const { image, name, mpns, manifactuler, user } = req.body;

    if (!(image && name && mpns && manifactuler)) {
      return res.status(400).send("data product is not valid");
    }

    const data = await Product.create({
      image,
      name,
      mpns,
      manifactuler,
      user: req.user._id,
    });
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
const delete_each_product = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id).then(() => {
      res.sendStatus(200);
    });
  } catch (e) {
    res.status(404).send("ID no valid");
  }
};

Product.find({});
const product_delete_all = async (req, res) => {
  try {
    const data = await Product.deleteMany({ user: req.user._id.toString(), checked: true });
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
const delete_specific_todo = async (req, res, next) => {
  try {
    await todoModel.findByIdAndDelete(req.params.id).then(() => {
      res.sendStatus(200);
    });
  } catch (e) {
    res.status(404).send("ID no valid");
  }
};

const product_edit = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(404).send({
      message: e.message,
    });
  }
};

module.exports = {
  prodcuts_getall,
  product_create_post,
  product_delete_all,
  product_edit,
  delete_specific_todo,
  prodcuts_getEach,
  delete_each_product,
};
